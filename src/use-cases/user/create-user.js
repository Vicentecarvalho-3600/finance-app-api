import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"
import { EmailAlreadyInUseError } from "../../errors/user.js"

export class CreateUserUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresCreateUserRepository,
    ) {
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
        this.postgresCreateUserRepository = postgresCreateUserRepository
    }
    async execute(createUserParams) {
        // verificar se email ja esta cadastrado

        const userWithprovidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
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

        const createUser = await this.postgresCreateUserRepository.execute(user)

        return createUser
    }
}
