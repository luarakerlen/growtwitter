import { Like as LikeEntity } from "@prisma/client";
import { LikeRepository } from "../database";
import { LikeDto } from "../dtos";
import { HTTPError } from "../utils";
import { Like } from '../models';

/**
 * Service responsável por lidar com a lógica de negócios relacionada aos likes a um tweet (curtir/deixar de curtir).
 * Ele recebe os dados do controlador, processa as regras de negócio e interage com o repositório para acessar o banco de dados.
 */
export class LikeService {
  constructor(private likeRepository: LikeRepository) { }

  /**
   * Permite que um usuário curta um tweet.
   * @param data - Dados necessários para curtir um tweet (userId e tweetId)
   * @returns Instância de Like representando o like criado ou um erro caso a operação falhe
   * @throws HTTPError 500 se ocorrer um erro ao criar o like no banco de dados
   */
  public async likeTweet(data: LikeDto) {
    const like = await this.likeRepository.likeTweet(data);

    if (!like) {
      throw new HTTPError(500, "Erro ao curtir o tweet.");
    }

    return this.mapToModel(like);
  }

  /**
   * Permite que um usuário deixe de curtir um tweet.
   * @param data - Dados necessários para deixar de curtir um tweet (userId e tweetId)
   * @returns Instância de Like representando o like removido ou um erro caso a operação falhe
   * @throws HTTPError 500 se ocorrer um erro ao remover o like no banco de dados
   */
  public async dislikeTweet(data: LikeDto) {
    const dislike = await this.likeRepository.dislikeTweet(data);

    if (!dislike) {
      throw new HTTPError(500, "Erro ao deixar de curtir o tweet.");
    }

    return this.mapToModel(dislike);
  }

  /**
   * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
   * 
   * @param entity - Like vindo do Prisma
   * @returns Instância de Like (modelo da aplicação)
   */
  private mapToModel(entity: LikeEntity): Like {
    const like = new Like(
      entity.userId,
      entity.tweetId,
      entity.createdAt,
      entity.updatedAt,
    );

    return like;
  }
}
