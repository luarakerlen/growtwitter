import express from "express";
import { param } from "express-validator";
import { authMiddleware, dataValidation } from "../middlewares";
import { followController } from "../container";

/**
 * Classe responsável por definir as rotas relacionadas ao gerenciamento de seguidores (follow) na API do GrowTwitter.
 * - POST /users/:id/follow: Permite que um usuário siga outro usuário.
 * - DELETE /users/:id/follow: Permite que um usuário deixe de seguir outro usuário.
 */
export class LikesRoutes {
  public static bind() {
    const router = express.Router();

    return router;
  }
}