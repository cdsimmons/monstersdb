import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const key = req.query.key;
		if (!key) { return; }

		const client = await clientPromise;
		const db = client.db(process.env.MONGODB_DB);

		const monster = await db
			.collection('monsters')
			.findOne({key: key});

		res.json(monster);
	} catch (e) {
		console.error(e, req);
	}
};