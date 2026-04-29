import express from "express";
import { param } from "express-validator";
import { authMiddleware, dataValidation } from "../middlewares";
import { likeController } from "../container";

/**
 * Classe responsável por definir as rotas relacionadas ao gerenciamento de curtidas (like) na API do GrowTwitter.
 * - POST /tweets/:id/like: Permite que um usuário curta um tweet.
 * - DELETE /tweets/:id/like: Permite que um usuário descurta um tweet.
 */
export class LikesRoutes {
  public static bind() {
    const router = express.Router();

    router.post("/tweets/:id/like",
      /*  #swagger.tags = ['Likes']
          #swagger.description = 'Endpoint para curtir um tweet. O ID do tweet a ser curtido deve ser fornecido como parâmetro de caminho.'
 
          #swagger.parameters['id'] = {
            $ref: '#/components/parameters/tweetId'
          }
 
          #swagger.responses[201] = {
            description: 'Tweet curtido com sucesso.',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/likeResponse"
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
      dataValidation([
        param("id").isUUID().withMessage("ID de usuário inválido"),
      ]),
      authMiddleware,
      likeController.likeTweet
    )

    router.delete("/tweets/:id/like",
      /*  #swagger.tags = ['Likes']
          #swagger.description = 'Endpoint para descurtir um tweet. O ID do tweet a ser descurtido deve ser fornecido como parâmetro de caminho.'
 
          #swagger.parameters['id'] = {
            $ref: '#/components/parameters/tweetId'
          }
 
          #swagger.responses[200] = {
            description: 'Tweet descurtido com sucesso.',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/likeResponse"
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
      dataValidation([
        param("id").isUUID().withMessage("ID de usuário inválido"),
      ]),
      authMiddleware,
      likeController.dislikeTweet
    )

    return router;
  }
}