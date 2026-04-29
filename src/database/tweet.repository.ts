import prisma from "./prisma.repository";
import { CreateTweetDto } from "../dtos";
import { tweetWithRelations, feedTweets } from "../config";

/**
 * Repository responsável por todas as operações de banco relacionadas a Tweet.
 * 
 * Esta classe abstrai o Prisma e centraliza o acesso à entidade Tweet,
 * evitando que a camada de Service dependa diretamente do ORM.
 */
export class TweetRepository {
  /**
   * Cria um novo tweet no banco de dados.
   * 
   * @param data - Dados necessários para criação do tweet (conteúdo, autor, tipo e opcionalmente o ID do tweet pai)
   * @returns Tweet criado retornado pelo Prisma
   */
  public async createTweet(data: CreateTweetDto) {
    return prisma.tweet.create({
      data
    })
  }

  /**
   * Busca um tweet por ID, incluindo as informações do autor e as respostas associadas.
   * 
   * @param id - ID do tweet a ser buscado
   * @returns Tweet encontrado com as relações de autor e respostas, ou null se não encontrado
   */
  public async getTweetById(id: string) {
    return prisma.tweet.findUnique({
      where: { id },
      ...tweetWithRelations
    });
  }

  /**
   * Deleta um tweet no banco de dados.
   * 
   * @param authorId - ID do autor do tweet
   * @param tweetId - ID do tweet a ser deletado
   * @returns Tweet deletado retornado pelo Prisma
   */
  public async deleteTweet(authorId: string, tweetId: string) {
    return prisma.tweet.delete({
      where: { id: tweetId, authorId }
    })
  }

  /**
   * Busca os tweets para o feed de um usuário, filtrando pelos IDs dos autores e paginando os resultados.
   * @param authorIds - Lista de IDs dos autores cujos tweets devem ser incluídos no feed
   * @param params - Parâmetros de paginação (skip e take)
   * @returns Lista de tweets encontrados para o feed, incluindo as informações do autor, likes e respostas, ordenados por data de criação (mais recentes primeiro)
   */
  public async getFeedTweets(authorIds: string[], params: { skip: number; take: number }) {
    return prisma.tweet.findMany({
      where: {
        authorId: {
          in: authorIds
        }
      },
      ...feedTweets,
      skip: params.skip,
      take: params.take,
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  /**
   * Conta o total de tweets para um conjunto de autores, utilizado para calcular a paginação do feed.
   * @param authorIds - Lista de IDs dos autores cujos tweets devem ser contados
   * @returns Número total de tweets encontrados para os autores especificados
   */
  public async getTotalFeedTweets(authorIds: string[]) {
    return prisma.tweet.count({
      where: {
        authorId: {
          in: authorIds
        }
      }
    })
  }
}
