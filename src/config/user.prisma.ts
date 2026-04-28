
import { Prisma, User } from "@prisma/client";

export const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    tweets: {
      select: {
        id: true,
        content: true,
        createdAt: true,
      }
    },
    followers: {
      select: {
        follower: {
          select: {
            id: true,
            name: true,
            username: true,
          }
        }
      }
    },
    following: {
      select: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
          }
        }
      }
    }
  }
});

type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelations>;

export type UserPartialRelations = User & Partial<UserWithRelations>;