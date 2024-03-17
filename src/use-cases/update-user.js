import bcrypt from "bcrypt"
import { EmailAlreadyInUseError } from "../errors/user.js"

export class UpdatedUserUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresUpdatedUserRepository,
    ) {
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
        this.postgresUpdatedUserRepository = postgresUpdatedUserRepository
    }

    async execute(userId, updateUserParams) {
        // 1 se o email estiver sendo atualizado, verificar se ele ja esta em uso

        if (updateUserParams.email) {
            const userWithprovidedEmail =
                await this.postgresGetUserByEmailRepository.execute(
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

        const updatedUser = await this.postgresUpdatedUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
