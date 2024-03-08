import bcrypt from "bcrypt"
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email"
import { EmailAlreadyInUseError } from "../errors/user"
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user"

export class UpdatedUserUseCase {
    async execute(userId, updateUserParams) {
        // 1 se o email estiver sendo atualizado, verificar se ele ja esta em uso

        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithprovidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )
            if (userWithprovidedEmail) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        // 2 se a senha esyiver sendo atualizada, criptografar

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

        const updateUser = await postgresUpdateUserRepository(userId, user)

        return updateUser
    }
}
