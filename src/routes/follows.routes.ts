import express from "express";
import { param } from "express-validator";
import { authMiddleware, dataValidation } from "../middlewares";
import { followController } from "../container";

/**
 * Classe responsável por definir as rotas relacionadas ao gerenciamento de seguidores (follow) na API do GrowTwitter.
 * - POST /users/:id/follow: Permite que um usuário siga outro usuário.
 * - DELETE /users/:id/follow: Permite que um usuário deixe de seguir outro usuário.
 */
export class FollowsRoutes {
  public static bind() {
    const router = express.Router();

    router.post("/users/:id/follow",
      /*  #swagger.tags = ['Follows']
          #swagger.description = 'Endpoint para seguir um usuário. O ID do usuário a ser seguido deve ser fornecido como parâmetro de caminho.'

          #swagger.parameters['id'] = {
            $ref: '#/components/parameters/userId'
          }

          #swagger.responses[201] = {
            description: 'Usuário seguido com sucesso.',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/FollowResponse"
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
      followController.followUser
    )

    router.delete("/users/:id/follow",
      /*  #swagger.tags = ['Follows']
          #swagger.description = 'Endpoint para deixar de seguir um usuário. O ID do usuário a ser deixado de seguir deve ser fornecido como parâmetro de caminho.'

          #swagger.parameters['id'] = {
            $ref: '#/components/parameters/userId'
          }

          #swagger.responses[200] = {
            description: 'Usuário deixado de seguir com sucesso.',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/FollowResponse"
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
      followController.unfollowUser
    )

    return router;
  }
}