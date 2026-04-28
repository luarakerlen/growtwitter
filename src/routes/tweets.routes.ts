import express from "express";
import { body, param } from "express-validator";
import { authMiddleware, dataValidation } from "../middlewares";
import { userController } from "../container";

/**
 * Classe UsersRoutes define as rotas para operações relacionadas aos usuários, incluindo:
 * - POST /users: Criar um novo usuário.
 * - GET /user:id: Obter informações de um usuário específico (requer autenticação).
 * - POST /user:id: Atualizar informações de um usuário específico (requer autenticação).
 * - DELETE /user:id: Excluir um usuário específico (requer autenticação).
 */
export class TweetsRoutes {
  public static bind() {
    const router = express.Router();

    return router;
  }
}