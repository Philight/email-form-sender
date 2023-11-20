import { Prisma, User } from '@prisma/client';
import customConfig from '../config/default';
import redisClient from '../utils/connectRedis';
import { signJwt } from '../utils/jwt';
import { prisma } from '../utils/prisma';

export const sendEmail = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User;
};

export const findUser = async (
  where: Partial<Prisma.UserCreateInput>,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};
