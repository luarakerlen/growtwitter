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
export class UsersRoutes {
  public static bind() {
    const router = express.Router();

    // Qualquer usuário pode criar uma conta
    router.post("/users",
      /*  #swagger.tags = ['Users']
          #swagger.description = 'Endpoint para criar um novo usuário. O corpo da requisição deve conter os campos name, username, email, password e opcionalmente photoUrl. O campo username deve ser único e o campo email deve estar em formato válido. A senha deve ter pelo menos 6 caracteres. O endpoint retorna os dados do usuário criado, incluindo seu ID gerado.'

          #swagger.security = []

          #swagger.requestBody = {
            description: 'Dados para criar um novo usuário',
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createUserSchema"
                }
              }
            }
          }

          #swagger.responses[201] = {
            description: 'Usuário criado com sucesso',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createUserResponse"
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

          #swagger.responses[409] = {
            description: 'Conflito, email/username já existe.',
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/Error409Response'
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
        body("name").isString().withMessage("Nome inválido").isLength({ min: 1 }).withMessage("O nome é obrigatório"),
        body("username").isString().withMessage("Nome de usuário inválido").isLength({ min: 3 }).withMessage("O nome de usuário deve ter pelo menos 3 caracteres"),
        body("email").isEmail().withMessage("Formato de email inválido"),
        body("password").isString().isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
        body("photoUrl").optional().isURL().withMessage("URL da foto inválida"),
      ]),
      userController.createUser
    )

    // Somente o próprio usuário pode atualizar seus dados
    router.post("/user",
      /*  #swagger.tags = ['Users']
          #swagger.description = 'Endpoint para atualizar as informações do usuário autenticado. Requer autenticação. O corpo da requisição pode conter os campos name, username, email, password e photoUrl para atualização. O campo username deve ser único e o campo email deve estar em formato válido. A senha deve ter pelo menos 6 caracteres. O endpoint retorna os dados atualizados do usuário.'

          #swagger.requestBody = {
            description: 'Dados para atualizar o usuário autenticado',
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/updateUserSchema"
                }
              }
            }
          }

          #swagger.responses[200] = {
            description: 'Usuário atualizado com sucesso',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/updateUserResponse"
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

          #swagger.responses[409] = {
            description: 'Conflito, email/username já existe.',
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/Error409Response'
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
        body("name").optional().isString().withMessage("Nome inválido").isLength({ min: 1 }).withMessage("O nome é obrigatório"),
        body("username").optional().isString().withMessage("Nome de usuário inválido").isLength({ min: 3 }).withMessage("O nome de usuário deve ter pelo menos 3 caracteres"),
        body("email").optional().isEmail().withMessage("Formato de email inválido"),
        body("password").optional().isString().isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
        body("photoUrl").optional().isURL().withMessage("URL da foto inválida"),
      ]),
      authMiddleware,
      userController.updateUser
    )

    // Somente o próprio usuário pode excluir sua conta
    router.delete("/user",
      /*  #swagger.tags = ['Users']
          #swagger.description = 'Endpoint para excluir a conta do usuário autenticado. Requer autenticação. O endpoint deleta o usuário e retorna uma mensagem de sucesso.'

          #swagger.responses[200] = {
            description: 'Usuário deletado com sucesso',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/deleteUserResponse"
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
      userController.deleteUser
    )

    // Qualquer usuário autenticado pode acessar
    router.get("/user/:id",
      /*  #swagger.tags = ['Users']
          #swagger.description = 'Endpoint para obter informações de um usuário específico. Requer autenticação. O ID do usuário deve ser passado como parâmetro na URL. O endpoint retorna os dados do usuário, incluindo seu ID, nome, nome de usuário, email, URL da foto (se disponível), tweets e seguidores.'
      
          #swagger.parameters['id'] = {
            $ref: '#/components/parameters/userId'
          }

          #swagger.responses[200] = {
            description: 'Usuário encontrado com sucesso',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/getUserByIdResponse"
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
      userController.getUserById
    )

    return router;
  }
}