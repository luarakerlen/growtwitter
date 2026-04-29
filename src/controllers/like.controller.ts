import { Request, Response } from "express";
import { HTTPResponse, onError } from "../utils";
import { LikeService } from "../services";

/**
 * Controlador responsável por gerenciar as operações de curtir e descurtir tweets,
 * utilizando o LikeService para realizar as ações no banco de dados e retornando
 * respostas HTTP adequadas para cada operação.
 */
export class LikeController {
  constructor(private likeService: LikeService) { }

  /**
   * Permite que um usuário curta um tweet, recebendo os IDs do usuário e do tweet na requisição.
   * @param req - Requisição HTTP contendo os IDs do usuário (userId) e do tweet (tweetId)
   * @param res - Resposta HTTP
   * @return Resposta HTTP com a relação de like criada ou um erro caso a operação falhe
   * @throws HTTPError 500 se ocorrer um erro ao criar a relação de like no banco de dados
   */
  public likeTweet = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const { id: tweetId } = req.params;

      const like = await this.likeService.likeTweet({ userId, tweetId: String(tweetId) });

      return HTTPResponse({
        res,
        statusCode: 201,
        message: 'Tweet curtido com sucesso!',
        data: like.toJSON(),
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Permite que um usuário descurta um tweet, recebendo os IDs do usuário e do tweet na requisição.
   * @param req - Requisição HTTP contendo os IDs do usuário (userId) e do tweet (tweetId)
   * @param res - Resposta HTTP
   * @return Resposta HTTP com a relação de like removida ou um erro caso a operação falhe
   * @throws HTTPError 500 se ocorrer um erro ao remover a relação de like no banco de dados
   */
  public dislikeTweet = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const { id: tweetId } = req.params;

      const dislike = await this.likeService.dislikeTweet({ userId, tweetId: String(tweetId) });

      return HTTPResponse({
        res,
        statusCode: 200,
        message: 'Tweet descurtido com sucesso!',
        data: dislike.toJSON(),
      })
    } catch (error) {
      onError(error, res);
    }
  }
}
