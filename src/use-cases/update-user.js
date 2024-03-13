import bcrypt from "bcrypt"
import { EmailAlreadyInUseError } from "../errors/user.js"
import {
    PostgresUpdatedUserRepository,
    PostgresGetUserByEmailRepository,
} from "../repositories/postgres/index.js"

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
            if (userWithprovidedEmail && userWithprovidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        // 2 se a senha esyiver sendo atualizada, criptografar

        const user = { ...updateUserParams }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        const postgresUpdatedUserRepository =
            new PostgresUpdatedUserRepository()

        const updatedUser = await postgresUpdatedUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
