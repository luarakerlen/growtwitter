import { User as UserEntity } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { UserRepository } from "../database";
import { CreateUserDto } from "../dtos";
import { HTTPError } from "../utils";
import { User } from '../models';

/**
 * Service responsável por gerenciar as operações relacionadas aos usuários,
 * como criação, autenticação, atualização de perfil e exclusão de contas.
 * Ele interage com o banco de dados para armazenar e recuperar informações dos usuários,
 * garantindo a segurança e a integridade dos dados.
 * Além disso, o UserService pode incluir funcionalidades para lidar com senhas,
 * tokens de autenticação e outras operações relacionadas à gestão de usuários.
 */
export class UserService {
  constructor(private userRepository: UserRepository) { }

  /**
   * Cria um novo usuário no sistema.
   * @param data - Dados necessários para criar um novo usuário (nome, email, username, senha, foto)
   * @returns Usuário criado ou um erro caso a criação falhe
   * @throws HTTPError 409 se os dados forem inválidos ou se o email/username já estiverem em uso
   */
  public async createUser(data: CreateUserDto) {
    const hashedPassword = hashSync(data.password, 10);
    const createdUser = await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    return this.mapToModel(createdUser);
  }

  /**
   * Busca um usuário pelo seu ID.
   * @param id - ID do usuário a ser buscado
   * @returns Usuário encontrado ou null se não existir
   * @throws HTTPError 404 se o usuário não for encontrado
   */
  // public async getUserById(id: string) {
  //   const user = await this.userRepository.getUserById(id);

  //   if (!user) throw new HTTPError(404, "Usuário não encontrado");

  //   return this.mapToModel(user);
  // }

  /**
   * Atualiza um usuário existente.
   * @param id - ID do usuário a ser atualizado
   * @param data - Dados a serem atualizados (nome, email, username, senha, foto)
   * @returns Usuário atualizado ou um erro caso a atualização falhe
   * @throws HTTPError 404 se o usuário não for encontrado
   */
  // public async updateUser(id: string, data: Partial<CreateUserDto>) {
  //   const userToBeUpdated = await this.getUserById(id);

  //   const updatedUser = await this.userRepository.updateUser(userToBeUpdated.toJSON().id, data);

  //   return this.mapToModel(updatedUser);
  // }

  /**
   * Desativa um usuário no sistema.
   * @param id - ID do usuário a ser desativado
   * @returns Usuário desativado ou um erro caso a exclusão falhe
   * @throws HTTPError 404 se o usuário não for encontrado
   */
  // public async deleteUser(id: string) {
  //   const userToBeDeleted = await this.getUserById(id);

  //   const deletedUser = await this.userRepository.deleteUser(userToBeDeleted.toJSON().id);

  //   return this.mapToModel(deletedUser);
  // }

  /**
   * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
   * 
   * @param entity - Usuário vindo do Prisma
   * @returns Instância de User (modelo da aplicação)
   */
  private mapToModel(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.username,
      entity.createdAt,
      entity.updatedAt,
      // entity.tweets?.map(tweet => ({
      //   id: tweet.id,
      //   content: tweet.content,
      //   createdAt: tweet.createdAt,
      //   updatedAt: tweet.updatedAt,
      // })),
      // entity.followers?.map(follower => ({
      //   id: follower.id,
      //   name: follower.name,
      //   email: follower.email,
      //   username: follower.username,
      //   createdAt: follower.createdAt,
      //   updatedAt: follower.updatedAt,
      // })),
      // entity.following?.map(following => ({
      //   id: following.id,
      //   name: following.name,
      //   email: following.email,
      //   username: following.username,
      //   createdAt: following.createdAt,
      //   updatedAt: following.updatedAt,
      // }))
    );
  }
}