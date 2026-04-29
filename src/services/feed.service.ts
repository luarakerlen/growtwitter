import { FollowRepository, TweetRepository } from "../database";
import { UserFeedTweets } from '../models';
import { FeedTweets } from '../config';

/**
 * Service responsável por gerenciar as operações relacionadas aos usuários,
 * como criação, autenticação, atualização de perfil e exclusão de contas.
 * Ele interage com o banco de dados para armazenar e recuperar informações dos usuários,
 * garantindo a segurança e a integridade dos dados.
 * Além disso, o UserService pode incluir funcionalidades para lidar com senhas,
 * tokens de autenticação e outras operações relacionadas à gestão de usuários.
 */
export class FeedService {
  constructor(
    private followRepository: FollowRepository,
    private tweetRepository: TweetRepository
  ) { }

  public async getUserFeed(userId: string, pagination?: { page?: number; pageSize?: number }) {
    /* Get user's following IDs */
    const following = await this.followRepository.getUserFollowingIds(userId);

    const authorIds = following.map(f => f.followingId)
    authorIds.push(userId)

    /* Pagination */
    const page = pagination?.page ?? 1;
    const pageSize = pagination?.pageSize ?? 10;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    /* Get feed tweets */
    const feedTweets = await this.tweetRepository.getFeedTweets(authorIds, { skip, take });
    const total = await this.tweetRepository.getTotalFeedTweets(authorIds);

    return {
      data: feedTweets.map(this.mapToModel),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      }
    };
  }


  /**
   * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
   * 
   * @param entity - Tweet vindo do Prisma
   * @returns Instância de UserFeedTweets (modelo da aplicação)
   */
  private mapToModel(entity: FeedTweets): UserFeedTweets {
    const feed = new UserFeedTweets(
      entity.id,
      entity.content,
      entity.authorId,
      entity.type,
      entity.createdAt,
      entity.updatedAt,
      entity?.parentId ?? undefined,
      entity.likes,
    );

    return feed;
  }
}