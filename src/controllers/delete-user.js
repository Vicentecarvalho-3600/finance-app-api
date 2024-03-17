import {
    ok,
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    userNotfound,
} from "./helpers/index.js"

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }
    async execute(httpResquest) {
        try {
            const userId = httpResquest.params.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deleteUser = await this.deleteUserUseCase.execute(userId)

            if (!deleteUser) {
                return userNotfound()
            }

            return ok(deleteUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
