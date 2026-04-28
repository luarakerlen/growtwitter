import express from "express";
import { dataValidation } from "../middlewares";
import { body } from "express-validator";
import { authController } from "../container";

/**
 * Classe responsável por definir as rotas de autenticação.
 * - POST /auth/login: Rota para autenticar um usuário. O corpo da requisição deve conter os campos email e password. O endpoint retorna um token JWT em caso de sucesso.
 */
export class AuthRoutes {
  public static bind() {
    const router = express.Router();

    router.post("/auth/login",
      /*  #swagger.tags = ['Auth']
          #swagger.description = 'Endpoint para autenticar um usuário. O corpo da requisição deve conter os campos email e password. O endpoint retorna um token JWT em caso de sucesso.'

          #swagger.security = []

          #swagger.requestBody = {
            description: 'Dados para autenticar um usuário',
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/loginSchema"
                }
              }
            }
          }

          #swagger.responses[200] = {
            description: 'Autenticação bem-sucedida',
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/loginResponse"
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
            description: 'Credenciais inválidas, como email ou senha incorretos.',
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/Error401CredentialsResponse'
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
        body("username").optional().isString().withMessage("Nome de usuário inválido").isLength({ min: 3 }).withMessage("O nome de usuário deve ter pelo menos 3 caracteres"),
        body("email").optional().isEmail().withMessage("Formato de email inválido"),
        body("password").isString().isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
      ]),
      authController.login
    )

    return router;
  }
}