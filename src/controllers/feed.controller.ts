import { Request, Response } from "express";
import { FeedService } from "../services";
import { HTTPResponse, onError } from "../utils";

/**
 * Controlador responsável por gerenciar as operações relacionadas ao feed de um usuário,
 * utilizando o FeedService para recuperar as postagens do feed e retornando respostas HTTP adequadas para cada operação.
 */
export class FeedController {
  constructor(private feedService: FeedService) { }

  /**
   * Recupera o feed de um usuário, incluindo as postagens dos usuários que ele segue, com suporte para paginação.
   * @param req - Requisição HTTP contendo o ID do usuário autenticado e os parâmetros de paginação (page e pageSize)
   * @param res - Resposta HTTP
   * @return Resposta HTTP com o feed do usuário ou um erro caso a operação falhe
   * @throws HTTPError 500 se ocorrer um erro ao recuperar o feed do usuário no banco de dados
   */
  public getUserFeed = async (req: Request, res: Response) => {
    try {
      const { id } = req.user;
      const { page, pageSize } = req.query;

      const result = await this.feedService.getUserFeed(String(id), {
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      });

      return HTTPResponse({
        res,
        statusCode: 200,
        message: "Feed do usuário recuperado com sucesso!",
        data: {
          tweets: result.data.map(tweet => tweet.toJSON()),
          pagination: result.pagination,
        },
      })
    } catch (error) {
      onError(error, res);
    }
  }
}