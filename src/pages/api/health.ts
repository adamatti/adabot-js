import type { NextApiRequest, NextApiResponse } from 'next';
import startup from '../../server/startup';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startup();

  res.status(200).json({
    status: 'ok'
  });
}