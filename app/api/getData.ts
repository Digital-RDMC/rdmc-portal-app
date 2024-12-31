import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const dbRef = ref(database, `/documents/hr/documents`);
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                res.status(200).json({ data: snapshot.val() });
            } else {
                res.status(404).json({ message: 'No data found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data', details: error });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
