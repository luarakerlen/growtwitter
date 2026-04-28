import { Follow as FollowEntity } from "@prisma/client";
import { FollowRepository } from "../database";
import { FollowDto } from "../dtos";
import { HTTPError } from "../utils";
import { Follow } from '../models';

/**
 * Service responsável por lidar com a lógica de negócios relacionada aos follows (seguir/deixar de seguir).
 * Ele recebe os dados do controlador, processa as regras de negócio e interage com o repositório para acessar o banco de dados.
 */
export class FollowService {
  constructor(private followRepository: FollowRepository) { }

  /**
   * Permite que um usuário siga outro usuário, verificando se o usuário não está tentando seguir a si mesmo.
   * @param data - Dados necessários para seguir um usuário (followerId e followingId)
   * @returns Instância de Follow representando a relação de follow criada ou um erro caso a operação falhe
   * @throws HTTPError 400 se o usuário tentar seguir a si mesmo
   * @throws HTTPError 500 se ocorrer um erro ao criar a relação de follow no banco de dados
   */
  public async followUser(data: FollowDto) {
    if (data?.followerId === data?.followingId) {
      throw new HTTPError(400, "Um usuário não pode seguir a si mesmo.");
    }

    const follow = await this.followRepository.followUser(data);

    if (!follow) {
      throw new HTTPError(500, "Erro ao seguir o usuário.");
    }

    return this.mapToModel(follow);
  }

  /**
   * Permite que um usuário deixe de seguir outro usuário.
   * @param data - Dados necessários para deixar de seguir um usuário (followerId e followingId)
   * @returns Instância de Follow representando a relação de follow removida ou um erro caso a operação falhe
   * @throws HTTPError 400 se o usuário tentar deixar de seguir a si mesmo
   * @throws HTTPError 500 se ocorrer um erro ao remover a relação de follow no banco de dados
   */
  public async unfollowUser(data: FollowDto) {
    if (data?.followerId === data?.followingId) {
      throw new HTTPError(400, "Um usuário não pode deixar de seguir a si mesmo.");
    }

    const unfollow = await this.followRepository.unfollowUser(data);

    if (!unfollow) {
      throw new HTTPError(500, "Erro ao deixar de seguir o usuário.");
    }

    return this.mapToModel(unfollow);
  }

  /**
   * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
   * 
   * @param entity - Usuário vindo do Prisma
   * @returns Instância de Follow (modelo da aplicação)
   */
  private mapToModel(entity: FollowEntity): Follow {
    const follow = new Follow(
      entity.followerId,
      entity.followingId,
      entity.createdAt,
      entity.updatedAt,
    );

    return follow;
  }
}