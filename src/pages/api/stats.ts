import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt"
import {getStats} from "../../server/statsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req })
  if (!token) {
    res.status(401).end()
    return
  }

  const stats = await getStats();
  res.status(200).json(stats);
}