import { FollowDto } from "../dtos";
import prisma from "./prisma.repository";

export class FollowRepository {
  /**
   * Cria um novo follow no banco de dados, representando a ação de um usuário seguir outro.
   * @param data - Dados necessários para criar um follow (followerId, followingId)
   * @returns Follow criado retornado pelo Prisma
   */
  public async followUser(data: FollowDto) {
    return prisma.follow.create({
      data
    });
  }

  /**
   * Remove um follow do banco de dados, representando a ação de um usuário deixar de seguir outro.
   * @param param - Dados necessários para deletar um follow (followerId, followingId)
   * @returns Follow deletado retornado pelo Prisma
   */
  public async unfollowUser({ followerId, followingId }: FollowDto) {
    return prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    });
  }
}