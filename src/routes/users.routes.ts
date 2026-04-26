import express from "express";
import { body, param } from "express-validator";
import { dataValidation } from "../middlewares";
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

    // Qualquer usuário autenticado pode acessar
    // router.get("/user:id",
    //   /*  #swagger.tags = ['Users'] */
    //   dataValidation([
    //     param("id").isUUID().withMessage("ID de usuário inválido"),
    //   ])
    //   // authMiddleware,
    //   // userController.getUserById
    // )

    // Somente o próprio usuário pode atualizar seus dados
    // router.post("user:id",
    //   /*  #swagger.tags = ['Users'] */
    //   dataValidation([
    //     param("id").isUUID().withMessage("ID de usuário inválido"),
    //     body("name").optional().isString().withMessage("Nome inválido").isLength({ min: 1 }).withMessage("O nome é obrigatório"),
    //     body("username").optional().isString().withMessage("Nome de usuário inválido").isLength({ min: 3 }).withMessage("O nome de usuário deve ter pelo menos 3 caracteres"),
    //     body("email").optional().isEmail().withMessage("Formato de email inválido"),
    //     body("password").optional().isString().isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
    //     body("photoUrl").optional().isURL().withMessage("URL da foto inválida"),
    //   ])
    //   // authMiddleware,
    //   // userController.getUserById
    // )

    // Somente o próprio usuário pode excluir sua conta
    // router.delete("/user:id",
    //   /*  #swagger.tags = ['Users'] */
    //   dataValidation([
    //     param("id").isUUID().withMessage("ID de usuário inválido"),
    //   ])
    //   //authMiddleware,
    //   // userController.deleteUserById
    // )

    return router;
  }
}