import { LikeDto } from "../dtos";
import prisma from "./prisma.repository";

export class LikeRepository {
  /**
   * Cria um novo like no banco de dados, representando a ação de um usuário curtir um tweet.
   * @param data - Dados necessários para criar um like (userId, tweetId)
   * @returns Like criado retornado pelo Prisma
   */
  public async likeTweet(data: LikeDto) {
    return prisma.like.create({
      data
    });
  }

  /**
   * Remove um like do banco de dados, representando a ação de um usuário deixar de curtir um tweet.
   * @param param - Dados necessários para deletar um like (userId, tweetId)
   * @returns Like deletado retornado pelo Prisma
   */
  public async dislikeTweet({ userId, tweetId }: LikeDto) {
    return prisma.like.delete({
      where: {
        userId_tweetId: {
          userId,
          tweetId
        }
      }
    });
  }
}