import { Request, Response } from "express";
import { HTTPResponse, onError } from "../utils";
import { FollowService } from "../services";

/**
 * Controlador responsável por 
 */
export class FollowController {
  constructor(private followService: FollowService) { }

  /**
   * Permite que um usuário siga outro usuário, recebendo os IDs do seguidor e do seguido na requisição.
   * @param req - Requisição HTTP contendo os IDs do seguidor (followerId) e do seguido (followingId)
   * @param res - Resposta HTTP
   * @return Resposta HTTP com a relação de follow criada ou um erro caso a operação falhe
   * @throws HTTPError 400 se o usuário tentar seguir a si mesmo
   * @throws HTTPError 500 se ocorrer um erro ao criar a relação de follow no banco de dados
   */
  public followUser = async (req: Request, res: Response) => {
    try {
      const { id: followerId } = req.user;
      const { id: followingId } = req.params;

      const follow = await this.followService.followUser({ followerId, followingId: String(followingId) });

      return HTTPResponse({
        res,
        statusCode: 201,
        message: 'Usuário seguido com sucesso!',
        data: follow.toJSON(),
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Permite que um usuário deixe de seguir outro usuário, recebendo os IDs do seguidor e do seguido na requisição.
   * @param req - Requisição HTTP contendo os IDs do seguidor (followerId) e do seguido (followingId)
   * @param res - Resposta HTTP
   * @return Resposta HTTP com a relação de follow removida ou um erro caso a operação falhe
   * @throws HTTPError 400 se o usuário tentar deixar de seguir a si mesmo
   * @throws HTTPError 500 se ocorrer um erro ao remover a relação de follow no banco de dados
   */
  public unfollowUser = async (req: Request, res: Response) => {
    try {
      const { id: followerId } = req.user;
      const { id: followingId } = req.params;

      const unfollow = await this.followService.unfollowUser({ followerId, followingId: String(followingId) });

      return HTTPResponse({
        res,
        statusCode: 200,
        message: 'Usuário deixado de seguir com sucesso!',
        data: unfollow.toJSON(),
      })
    } catch (error) {
      onError(error, res);
    }
  }
}
