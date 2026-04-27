import { NextFunction, Request, Response } from "express";
import { HTTPError, onError } from "../utils";
import { AuthService } from "../services";

/**
 * Middleware de autenticação que verifica a presença e a validade do token JWT no cabeçalho Authorization das requisições.
 * Ele utiliza o AuthService para validar o token e, se for válido, adiciona as informações do usuário ao objeto req.user para uso posterior nos controladores.
 * Caso o token esteja ausente, inválido ou expirado, o middleware retorna um erro 401 Unauthorized com uma mensagem apropriada.
 * 
 * @param req Request do Express, contendo os dados da requisição, incluindo os headers onde o token JWT deve ser fornecido.
 * @param res Response do Express, utilizado para enviar a resposta de erro em caso de falha na autenticação.
 * @param next NextFunction do Express, chamado para passar o controle para o próximo middleware ou controlador se a autenticação for bem-sucedida.
 * 
 * @throws HTTPError 401 Unauthorized se o token estiver ausente, inválido ou expirado, com mensagens detalhadas para cada caso.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      throw new HTTPError(401, "Token de autenticação ausente. Por favor, forneça um token válido no cabeçalho Authorization.")
    }

    const [_, token] = authorization.split(' ');

    const payload = new AuthService().validateToken(token)

    if (!payload) {
      throw new HTTPError(401, "Token de autenticação inválido ou expirado. Por favor, forneça um token válido.")
    }

    req.user = payload;
    next();
  } catch (error) {
    onError(error, res);
  }
}