import express from "express";
import { body, param } from "express-validator";
import { authMiddleware, dataValidation } from "../middlewares";
import { tweetController } from "../container";

/**
 * Classe TweetsRoutes define as rotas para operações relacionadas aos tweets, incluindo:
 * - POST /tweets: Criar um novo tweet (requer autenticação).
 * - POST /tweets/:id/reply: Criar uma resposta a um tweet específico (requer autenticação).
 * - DELETE /tweets/:id: Excluir um tweet específico (requer autenticação).
 */
export class TweetsRoutes {
  public static bind() {
    const router = express.Router();

    router.post("/tweets",
      /*  #swagger.tags = ['Tweets']
          #swagger.description = 'Endpoint para criar um novo tweet. O corpo da requisição deve conter o campo "content" com o conteúdo do tweet. Requer autenticação.'

          #swagger.requestBody = {
            description: 'Dados para criar um novo tweet',
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createTweetSchema"
                }
              }
            }
          }

          #swagger.responses[201] = {
            description: 'Tweet criado com sucesso.',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/tweetResponse"
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
        body("content").isString()
          .withMessage("O conteúdo do tweet deve ser uma string.")
          .isLength({ min: 1, max: 280 })
          .withMessage("O conteúdo do tweet deve ter entre 1 e 280 caracteres.")
      ]),
      authMiddleware,
      tweetController.createTweet
    )

    router.post("/tweets/:id/reply",
      /*  #swagger.tags = ['Tweets']
          #swagger.description = 'Endpoint para criar uma resposta a um tweet específico. O corpo da requisição deve conter o campo "content" com o conteúdo da resposta. Requer autenticação.'

          #swagger.parameters['id'] = {
            $ref: '#/components/parameters/tweetId'
          }

          #swagger.requestBody = {
            description: 'Dados para criar uma resposta a um tweet',

            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createTweetSchema"
                }
              }
            }
          }

          #swagger.responses[201] = {
            description: 'Resposta ao tweet criada com sucesso.',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createTweetReplyResponse"
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
        param("id").isUUID()
          .withMessage("O ID do tweet pai deve ser um UUID válido."),
        body("content").isString()
          .withMessage("O conteúdo do tweet deve ser uma string.")
          .isLength({ min: 1, max: 280 })
          .withMessage("O conteúdo do tweet deve ter entre 1 e 280 caracteres.")
      ]),
      authMiddleware,
      tweetController.replyTweet
    )

    router.get("/tweets/:id",
      /*  #swagger.tags = ['Tweets']
          #swagger.description = 'Endpoint para recuperar um tweet pelo seu ID e suas respostas. O ID do tweet a ser recuperado deve ser fornecido como parâmetro de caminho.'
 
          #swagger.parameters['id'] = {
            $ref: '#/components/parameters/tweetId'
          }
 
          #swagger.responses[200] = {
            description: 'Tweet recuperado com sucesso.',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/getTweetResponse"
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
            description: 'Tweet não encontrado.',
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
      tweetController.getTweetById
    )

    router.delete("/tweets/:id",
      /*  #swagger.tags = ['Tweets']
          #swagger.description = 'Endpoint para deletar um tweet. O ID do tweet a ser deletado deve ser fornecido como parâmetro de caminho.'
 
          #swagger.parameters['id'] = {
            $ref: '#/components/parameters/tweetId'
          }
 
          #swagger.responses[200] = {
            description: 'Tweet deletado com sucesso.',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/tweetResponse"
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
      tweetController.deleteTweet
    )

    return router;
  }
}