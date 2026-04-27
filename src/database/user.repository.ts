import prisma from "./prisma.repository";
import { CreateUserDto, GetUserByEmailOrUsernameDto } from "../dtos";
import { userWithRelations } from "../config";

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
  public async createUser(data: CreateUserDto) {
    return prisma.user.create({
      data
    })
  }

  /**
   * Busca um usuário pelo seu email ou username.
   * 
   * @param email - Email do usuário
   * @param username - Nome de usuário
   * @returns Usuário encontrado ou null se não existir
   */
  public async getUserByEmailOrUsername({ email, username }: GetUserByEmailOrUsernameDto) {
    const whereClause = email ? { email } : { username }
    return prisma.user.findUnique({
      where: {
        isActive: true,
        ...whereClause
      }
    })
  }

  /**
   * Busca um usuário pelo seu ID.
   * 
   * @param id - ID do usuário
   * @returns Usuário encontrado incluindo tweets e seguidores ou null se não existir
   */
  public async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id, isActive: true },
      ...userWithRelations
    })
  }

  /**
   * Atualiza um usuário existente.
   * 
   * @param id - ID do usuário a ser atualizado
   * @param data - Dados a serem atualizados (nome, email, username, senha, foto)
   * @returns Usuário atualizado retornado pelo Prisma
   */
  public async updateUser(id: string, data: Partial<CreateUserDto>) {
    return prisma.user.update({
      where: { id, isActive: true },
      data
    })
  }

  /**
   * Desativa um usuário no banco de dados, marcando-o como inativo e registrando a data de exclusão.
   * 
   * @param id - ID do usuário a ser desativado
   * @returns Usuário desativado retornado pelo Prisma
   */
  public async deleteUser(id: string) {
    return prisma.user.update({
      where: { id, isActive: true },
      data: {
        isActive: false,
        deletedAt: new Date()
      }
    })
  }
}