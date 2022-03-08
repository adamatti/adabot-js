import {prisma} from "./db"
import moment from 'moment';

type getStatsResponse = {
  last24hrsCalls: number
  last30daysCalls: number
  totalCalls: number
}

// FIXME use the proper type for telegramUpdate
export function saveStats(telegramUpdate: any) {
  return prisma.messageStats.create({
    data: {
      userId: telegramUpdate.message.from.id
    }
  });
}

export async function getStats(): Promise<getStatsResponse> {
  const last24hrsCallsPromise = prisma.messageStats.count({where: {
    createdAt: {
      gte: moment().subtract(1, 'day').toDate(),
    }
  }})

  const last30daysCallsPromise = prisma.messageStats.count({where: {
    createdAt: {
      gte: moment().subtract(30, 'days').toDate(),
    }
  }})

  const totalCallsPromise = prisma.messageStats.count();

  const last24hrsCalls = await last24hrsCallsPromise;
  const last30daysCalls = await last30daysCallsPromise;
  const totalCalls = await totalCallsPromise;
  
  return {
    last24hrsCalls,
    last30daysCalls,
    totalCalls
  }
}