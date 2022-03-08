import type { NextApiRequest, NextApiResponse } from 'next';
import {getStats} from "../../server/statsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const stats = await getStats();
  res.status(200).json(stats);
}