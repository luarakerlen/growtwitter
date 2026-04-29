import express from "express";
import { param } from "express-validator";
import { authMiddleware, dataValidation } from "../middlewares";
import { feedController } from "../container";

/**
 * Classe FeedRoutes define as rotas para operações relacionadas ao feed do usuário, incluindo:
 * - GET /feed: Obter o feed do usuário autenticado (requer autenticação).
 */
export class FeedRoutes {
  public static bind() {
    const router = express.Router();

    // Somente o próprio usuário pode acessar seu feed
    router.get("/feed",
      /*  #swagger.tags = ['Feed']
          #swagger.description = 'Endpoint para obter o feed do usuário autenticado. Requer autenticação. O endpoint retorna os tweets do usuário e de seus seguidores.'

          #swagger.responses[200] = {
            description: 'Feed do usuário obtido com sucesso',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/getUserFeedResponse"
                }
              }
            }
          }

          #swagger.responses[400] = {
            description: 'Requisição inválida, com detalhes dos erros de validação.',
            content: {
              "application/json": {
                  schema: {
                    $ref: '#/components/Error400Response'
                  }
              }
            }
          }

          #swagger.responses[401] = {
            description: 'Não autorizado, token de autenticação ausente ou inválido.',
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: '#/components/Error401TokenAusenteResponse' },
                    { $ref: '#/components/Error401TokenInvalidoResponse' }
                  ]
                }
              }
            }
          }

          #swagger.responses[404] = {
            description: 'Usuário não encontrado.',
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/Error404Response'
                }
              }
            }
          }

          #swagger.responses[500] = {
            description: 'Erro interno do servidor.',
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/Error500Response'
                }
              }
            }
          }
      */
      authMiddleware,
      feedController.getUserFeed
    )

    return router;
  }
}