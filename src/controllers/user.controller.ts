import { Request, Response } from "express";
import { HTTPResponse, onError } from "../utils";
import { UserService } from "../services";

/**
 * Controlador responsável por lidar com as requisições relacionadas aos usuários.
 * Ele recebe as requisições, chama os serviços apropriados e retorna as respostas.
 */
export class UserController {
  constructor(private userService: UserService) { }

  /**
   * Cria um novo usuário no sistema.
   * @param req - Requisição HTTP contendo os dados do usuário
   * @param res - Resposta HTTP
   * @return Resposta HTTP com o usuário criado ou um erro caso a criação falhe
   * @throws HTTPError 409 se os dados forem inválidos ou se o email/username já estiverem em uso
   */
  public createUser = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const result = await this.userService.createUser(data);

      return HTTPResponse({
        res,
        statusCode: 201,
        message: "Usuário criado com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Realiza o login de um usuário.
   * @param req - Requisição HTTP contendo os dados de login (email ou username e senha)
   * @param res - Resposta HTTP
   * @return Resposta HTTP com o token de autenticação e informações do usuário logado ou um erro caso o login falhe
   * @throws HTTPError 401 se o usuário não for encontrado ou se a senha for inválida
   */
  public login = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const result = await this.userService.login(data);

      return HTTPResponse({
        res,
        statusCode: 200,
        message: "Login realizado com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Busca um usuário pelo seu ID.
   * @param req - Requisição HTTP contendo o ID do usuário nos parâmetros da rota
   * @param res - Resposta HTTP
   * @returns Resposta HTTP com as informações do usuário ou um erro caso o usuário não seja encontrado
   * @throws HTTPError 404 se o usuário não for encontrado
   */
  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.userService.getUserById(String(id));

      return HTTPResponse({
        res,
        statusCode: 200,
        message: "Usuário encontrado com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Atualiza um usuário existente.
   * @param req - Requisição HTTP contendo o ID do usuário nos parâmetros da rota e os dados a serem atualizados no corpo da requisição
   * @param res - Resposta HTTP
   * @returns Resposta HTTP com as informações do usuário atualizado ou um erro caso a atualização falhe
   * @throws HTTPError 404 se o usuário não for encontrado
   */
  public updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.user;
      const data = req.body;

      const result = await this.userService.updateUser(id, data);

      return HTTPResponse({
        res,
        statusCode: 200,
        message: "Usuário atualizado com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }

  /**
   * Deleta um usuário existente.
   * @param req - Requisição HTTP contendo o ID do usuário nos parâmetros da rota
   * @param res - Resposta HTTP
   * @returns Resposta HTTP com as informações do usuário deletado ou um erro caso a exclusão falhe
   * @throws HTTPError 404 se o usuário não for encontrado
   */
  public deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.user;

      const result = await this.userService.deleteUser(id);

      return HTTPResponse({
        res,
        statusCode: 200,
        message: "Usuário deletado com sucesso!",
        data: result,
      })
    } catch (error) {
      onError(error, res);
    }
  }
}
