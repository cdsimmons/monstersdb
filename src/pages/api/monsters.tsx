import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGODB_DB);

		const monsters = await db
			.collection('monsters')
			.find({})
			.sort({ name: 1 })
			.toArray();

		res.json(monsters);
	} catch (e) {
		console.error(e, req);
	}
};