import { Request, Response } from "express";
import { HTTPResponse, onError } from "../utils";
import { TweetService } from "../services";

/**
 * Controlador responsável por lidar com as requisições relacionadas aos tweets.
 * Ele recebe as requisições, chama os serviços apropriados e retorna as respostas.
 */
export class TweetController {
  constructor(private tweetService: TweetService) { }

  /**
   * Cria um novo tweet no sistema.
   * @param req - Requisição HTTP contendo o conteúdo do tweet no corpo da requisição e o ID do autor no objeto de usuário (req.user)
   * @param res - Resposta HTTP
   * @return Resposta HTTP com o tweet criado ou um erro caso a criação falhe
   */
  public createTweet = async (req: Request, res: Response) => {
    try {
      const { content } = req.body;

      const result = await this.tweetService.createTweet({
        content,
        authorId: req.user.id
      });

      return HTTPResponse({
        res,
        statusCode: 201,
        message: "Tweet criado com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Cria uma resposta a um tweet existente.
   * @param req - Requisição HTTP contendo o conteúdo da resposta no corpo da requisição, o ID do autor no objeto de usuário (req.user) e o ID do tweet pai nos parâmetros da rota
   * @param res - Resposta HTTP
   * @returns Resposta HTTP com a resposta ao tweet criada ou um erro caso a criação falhe
   */
  public replyTweet = async (req: Request, res: Response) => {
    try {
      const { content } = req.body;
      const { id: parentId } = req.params;

      const result = await this.tweetService.replyTweet({
        content,
        authorId: req.user.id,
      }, String(parentId));

      return HTTPResponse({
        res,
        statusCode: 201,
        message: "Resposta ao tweet criada com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Recupera um tweet pelo seu ID.
   * @param req - Requisição HTTP contendo o ID do tweet a ser recuperado nos parâmetros da rota
   * @param res - Resposta HTTP
   * @returns Resposta HTTP com as informações do tweet recuperado ou um erro caso o tweet não seja encontrado
   * @throws HTTPError 404 se o tweet não for encontrado
   */
  public getTweetById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await this.tweetService.getTweetById(String(id));

      return HTTPResponse({
        res,
        statusCode: 200,
        message: "Tweet recuperado com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Deleta um tweet existente do usuário logado.
   * @param req - Requisição HTTP contendo o ID do usuário nos parâmetros da rota
   * @param res - Resposta HTTP
   * @returns Resposta HTTP com as informações do tweet deletado ou um erro caso a exclusão falhe
   * @throws HTTPError 404 se o tweet não for encontrado
   */
  public deleteTweet = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const { id: tweetId } = req.params;

      const result = await this.tweetService.deleteTweet(userId, String(tweetId));

      return HTTPResponse({
        res,
        statusCode: 200,
        message: "Tweet deletado com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }
}
