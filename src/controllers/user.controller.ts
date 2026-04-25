import { Request, Response } from "express";
import { HTTPResponse, onError } from "../utils";
import { UserService } from "../services";

/**
 * Controlador responsável por lidar com as requisições relacionadas aos usuários.
 * Ele recebe as requisições, chama os serviços apropriados e retorna as respostas.
 */
export class UsersController {
  constructor(private userService: UserService) { }

  public async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.userService.createUser(data);

      return HTTPResponse({
        res,
        statusCode: 201,
        message: "Usuário criado com sucesso",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }
}
