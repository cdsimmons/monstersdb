require('dotenv').config();
import https from 'https';
import querystring from 'querystring';
import cheerio from 'cheerio';
import { connectToDatabase } from './src/utils/mongodb';
import { capitalize } from './src/utils/helpers';
import { Monster } from './src/types/monster';
import { scrapeBlacklist, scrapeOverrides } from './scrape-overrides';

const scrape = async () => {
	if (!process.env.POPULATE_PATH) { return; }
	console.log('Populating...');
	
	const monsters = []; // TODO... would be nice to use monster model
	const monsterListPage = await getUrlContents(process.env.POPULATE_PATH);
	const $ = cheerio.load(monsterListPage);
	const $monsterLinks = $('.item a');

	for (const monsterLink of $monsterLinks) {
		// if (monsters.length > 3) { continue; }

		const link = $(monsterLink).attr('href');
		const monsterPage = await getUrlContents(link); // Must await, or else it's DDOS
		const $m = cheerio.load(monsterPage);

		// TODO... since data is not clean, should really add in a schema/validation, maybe Zod?
		const key = link?.split('=')[1];
		const name = $m('h1').html();
		const description = $m('.description').html();
		const imageUrl = $m('.picture img').attr('src');
		const details = $m('.type').html()?.split(', ');
		if (!details) { return; }
		const detailsMixed = details[0]?.split(' ');
		if (!detailsMixed) { return; }
		const size = detailsMixed[0] as Monster['size'];
		const type = (capitalize(detailsMixed[1]) || 'Unknown') as Monster['type'];
		const alignment = capitalize(details[details.length-1]) || 'Unaligned';
		
		// TODO... add CR? Not sure if it fits with a monsters database, since its not supposed to be aimed at DnD

		if (!key || !description || !name || !imageUrl || !size || scrapeBlacklist.includes(key)) { continue; } // Only adding monsters with key info

		const monster: Monster = {
			key,
			name,
			description,
			imageUrl,
			type,
			size,
			alignment,
			environments: ['Dungeon'],
			source: 'scrape',
			approved: true,
			...scrapeOverrides[key]
		}

		monster.environments = monster.environments.sort((a, b) => a.localeCompare(b));

		monsters.push(monster);
		console.log(link);
	}

	const client = await connectToDatabase();
	const db = await client.db(process.env.MONGODB_DB);
	const colMonsters = await db.collection('monsters');

	await colMonsters.deleteMany({source: 'scrape'});
	await colMonsters.insertMany(monsters);

	console.log('Populated!');
	process.exit();
}

// Just get the HTML of the page...
const getUrlContents = async (path?: string): Promise<string> => {
	if (!process.env.POPULATE_HOSTNAME || !path) { return ''; }
	path = path.replace('http://', '');
	path = path.replace('https://', '');
	path = path.replace(process.env.POPULATE_HOSTNAME, '');

	var postData = querystring.stringify({
		'Filtre1[]': ['M', 'A'],
		nivMin: '-1',
		nivMax: '30',
		filtrer: 'FILTER'
	});

	const options = {
		hostname: process.env.POPULATE_HOSTNAME,
		port: 443,
		path: path,
		method: 'POST',
		headers: { 
			// ...form.getHeaders(),
			'cache-control': 'no-cache',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postData.length
		}
	}

	return new Promise(function (resolve, reject) {
		var request = https.request(options, async (response) => {
			var html = '';
			response.setEncoding('utf8');

			if (response.statusCode === 301) {
				html = await getUrlContents(response.headers.location);
				resolve(html);
			} else {
				response.on('error', function(e) {
					reject('problem with request: ' + e.message);
				});

				response.on('data', (chunk) => {
					html = html + chunk;
				});

				response.on('end', () => {
					resolve(html);
				});
			}
		});
		request.write(postData);
		request.end();
	});
}

// Init!
scrape();