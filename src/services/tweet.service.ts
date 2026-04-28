import { TweetRepository } from "../database";
import { CreateTweet } from "../dtos";
import { Tweet } from '../models';
import { TweetPartialRelations } from "../config";
import { HTTPError } from "../utils";

/**
 * Service responsável por gerenciar as operações relacionadas aos tweets, incluindo criação, resposta e deleção.
 * Ele atua como uma camada intermediária entre os controllers e o repositório, encapsulando a lógica de negócios.
 */
export class TweetService {
  constructor(private tweetRepository: TweetRepository) { }

  /**
   * Cria um novo tweet no sistema.
   * @param data - Dados necessários para criar um novo tweet (conteúdo e autor)
   * @returns Tweet criado ou um erro caso a criação falhe
   */
  public async createTweet(data: CreateTweet) {
    const createdTweet = await this.tweetRepository.createTweet({
      ...data,
      type: 'POST'
    })

    return this.mapToModel(createdTweet);
  }

  /**
   * Responde a um tweet existente.
   * @param data - Dados necessários para criar a resposta (conteúdo e autor)
   * @param parentId - ID do tweet ao qual a resposta está sendo feita
   * @returns Tweet criado como resposta ou um erro caso a criação falhe
   */
  public async replyTweet(data: CreateTweet, parentId: string) {
    const createdTweet = await this.tweetRepository.createTweet({
      ...data,
      type: 'REPLY',
      parentId
    })

    return this.mapToModel(createdTweet);
  }

  /**
   * Recupera um tweet por seu ID.
   * @param id - ID do tweet a ser recuperado
   * @returns Tweet encontrado ou um erro caso o tweet não seja encontrado
   * @throws HTTPError 404 se o tweet não for encontrado
   */
  public async getTweetById(id: string) {
    const tweet = await this.tweetRepository.getTweetById(id);

    if (!tweet) {
      throw new HTTPError(404, "Tweet não encontrado.");
    }

    return this.mapToModel(tweet, true);
  }

  /**
   * Deleta um tweet existente.
   * @param authorId - ID do autor do tweet
   * @param tweetId - ID do tweet a ser deletado
   * @returns Tweet deletado ou um erro caso a deleção falhe
   * @throws HTTPError 404 se o tweet não for encontrado
   */
  public async deleteTweet(authorId: string, tweetId: string) {
    const deletedTweet = await this.tweetRepository.deleteTweet(authorId, tweetId);

    if (!deletedTweet) {
      throw new HTTPError(404, "Tweet não encontrado ou você não tem permissão para deletá-lo");
    }

    return this.mapToModel(deletedTweet);
  }

  /**
   * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
   * 
   * @param entity - Tweet vindo do Prisma
   * @param withRelations - Indica se as relações (replies) devem ser incluídas no modelo
   * @returns Instância de Tweet (modelo da aplicação), com ou sem relações dependendo do parâmetro withRelations
   */
  private mapToModel(entity: TweetPartialRelations, withRelations?: boolean): Tweet {
    const tweet = new Tweet(
      entity.id,
      entity.content,
      entity.authorId,
      entity.type,
      entity.createdAt,
      entity.updatedAt,
      entity?.parentId || undefined,
    );

    if (withRelations) {
      tweet.withReplies(
        (entity.replies || []).map((reply) => ({
          ...reply,
          parentId: reply.parentId ?? undefined,
        }))
      );
    }

    return tweet;
  }
}