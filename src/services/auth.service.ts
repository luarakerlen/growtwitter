import { sign, SignOptions } from "jsonwebtoken";
import { envs } from "../envs";
import { HTTPError } from "../utils";

interface JwtUserPayload {
  id: string;
  email: string;
  username: string;
}

/**
 * Service responsável pela autenticação dos usuários, incluindo a criação e a validação de tokens JWT.
 * Ele fornece métodos para gerar tokens de autenticação com base nas informações do usuário,
 * garantindo que as credenciais sejam válidas e seguras.
 */
export class AuthService {
  /**
   * Cria um token JWT para autenticação do usuário.
   * @param data - Dados do usuário para criar o token (id, email, username)
   * @returns Token JWT
   */
  public createToken(data: JwtUserPayload) {
    if (!envs.JWT_SECRET) {
      throw new HTTPError(500, "JWT_SECRET não configurado. Verifique as variáveis de ambiente.")
    }

    const expiresIn = envs.JWT_EXPIRES_IN || "1d";
    const isValid = /^(\d+)([smhd])$/.test(expiresIn);
    if (!isValid) {
      throw new HTTPError(500, "JWT_EXPIRES_IN inválido. Use formatos como: 1d, 2h, 30m, 10s");
    }

    const token = sign(data, envs.JWT_SECRET, {
      expiresIn: expiresIn as SignOptions["expiresIn"]
    });
    return token;
  }

  public validateToken() { }
}