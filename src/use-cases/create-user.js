import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js"

export class CreateUserUseCase {
    async execute(createUserParams) {
        //TODO: verificar se email ja esta cadastrado
        // gerar id do usuario
        const userId = uuidv4()

        //criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //inserir o usuario no banco
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repository
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        return await postgresCreateUserRepository.execute(user)
    }
}
