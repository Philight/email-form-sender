import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('🚀 MAILER: Prisma Database connected successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
//    await prisma.$disconnect();
  }
}

// export default connectDB;
