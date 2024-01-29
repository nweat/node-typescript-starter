import { PrismaClient } from '@prisma/client';

export const usersService = (prisma: PrismaClient) => {
  // const prisma = new PrismaClient();

  const getUser = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  };

  const createUser = async ({ name, gender }: { name: string; gender: string }) => {
    const result = await prisma.user.create({ data: { name, gender } });
    return result.id;
  };

  return {
    getUser,
    createUser,
  };
};

/**
 *
 * class UsersService {
 *   private prisma: PrismaClient
 *
 *   constructor(prisma) {
 *     this.prisma = prisma
 *   }
 *
 *   public getUser()
 *   public createUser()
 *
 *
 * }
 *
 * export default UsersService;
 *
 *
 */
