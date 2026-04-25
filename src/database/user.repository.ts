import { CreateUserDto } from "../dtos";
import prisma from "./prisma.repository";

/**
 * Repository responsável por todas as operações de banco relacionadas a Usuário.
 * 
 * Esta classe abstrai o Prisma e centraliza o acesso à entidade User,
 * evitando que a camada de Service dependa diretamente do ORM.
 */
export class UserRepository {
  /**
   * Cria um novo usuário no banco de dados.
   * 
   * @param data - Dados necessários para criação do usuário (nome, email, username, senha, foto)
   * @returns Usuário criado retornado pelo Prisma
   */
  async createUser(data: CreateUserDto) {
    return prisma.user.create({
      data
    })
  }

  /**
   * Busca um usuário pelo seu ID.
   * 
   * @param id - ID do usuário
   * @returns Usuário encontrado ou null se não existir
   */
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id }
    })
  }

  /**
   * Atualiza um usuário existente.
   * 
   * @param id - ID do usuário a ser atualizado
   * @param data - Dados a serem atualizados (nome, email, username, senha, foto)
   * @returns Usuário atualizado retornado pelo Prisma
   */
  async updateUser(id: string, data: Partial<CreateUserDto>) {
    return prisma.user.update({
      where: { id },
      data
    })
  }

  /**
   * Desativa um usuário no banco de dados, marcando-o como inativo e registrando a data de exclusão.
   * 
   * @param id - ID do usuário a ser desativado
   * @returns Usuário desativado retornado pelo Prisma
   */
  async deleteUser(id: string) {
    return prisma.user.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date()
      }
    })
  }
}