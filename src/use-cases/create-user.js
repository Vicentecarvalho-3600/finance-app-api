import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js"
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js"
import { EmailAlreadyInUseError } from "../errors/user.js"

export class CreateUserUseCase {
    async execute(createUserParams) {
        // verificar se email ja esta cadastrado
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithprovidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )
        if (userWithprovidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

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

        const createUser = await postgresCreateUserRepository.execute(user)

        return createUser
    }
}
