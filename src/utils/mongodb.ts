import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || '';

let cachedClient: MongoClient | null = null;

export const connectToDatabase = async () => {
  if (cachedClient && (cachedClient as any).topology.isConnected()) {
    return cachedClient;
  }
	
  const client = new MongoClient(uri);
	await client.connect();

  cachedClient = client;

  return client;
}

export const getUser = async (email: string) => {
  const client = await connectToDatabase();
  const db = client.db(dbName);

  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email, trustLevel: { $gt: 0 } });

  return user;
}

export const createUser = async (email: string, password: string) => {
  const client = await connectToDatabase();
  const db = client.db(dbName);
  const usersCollection = db.collection('users');

  const result = await usersCollection.insertOne({ 
		email, 
		password,
		trustLevel: 0, // TODO... maybe look into email verification to up the trust level, and then the trust level would also rise if their monsters are 100% approved or something like that... if I'm going to do email verification should do it now~
		createdAt: new Date().toLocaleDateString('en-UK')
	});

  return result.insertedId.toString();
}