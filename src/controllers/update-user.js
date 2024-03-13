import { EmailAlreadyInUseError } from "../errors/user.js"
import { UpdatedUserUseCase } from "../use-cases/update-user.js"
import {
    invalidPasswordResponse,
    emailIsAlreadyInUseResponse,
    invalidIdResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    checkIfIdIsValid,
    badRequest,
    serverError,
    ok,
} from "./helpers/index.js"

export class UpdatedUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ]

            const someFieldIsNotAllwed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllwed) {
                return badRequest({
                    message: "Some provided field is not allowed",
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)

                if (!passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)

                if (!emailIsValid) {
                    return emailIsAlreadyInUseResponse()
                }
            }

            const updateUserUseCase = new UpdatedUserUseCase()

            const updatedUser = await updateUserUseCase.execute(userId, params)

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
