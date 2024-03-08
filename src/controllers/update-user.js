import { badRequest, serverError, ok } from "./helpers.js"
import validator from "validator"
import { EmailAlreadyInUseError } from "../errors/user.js"
import { UpdatedUserUseCase } from "../use-cases/update-user.js"

export class UpdatedUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return badRequest({
                    message: "The provided id is not valid",
                })
            }

            const updateUserParams = httpRequest.body

            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ]

            const someFieldIsNotAllwed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllwed) {
                return badRequest({
                    message: "Some provided field is not allowed",
                })
            }

            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length < 6

                if (passwordIsNotValid) {
                    return badRequest({
                        message: "Password must be at least 6 characters",
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email)

                if (!emailIsValid) {
                    return badRequest({
                        message: "Invalid e-mail. please provide a valid one.",
                    })
                }
            }

            const updateUserUseCase = new UpdatedUserUseCase()

            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
