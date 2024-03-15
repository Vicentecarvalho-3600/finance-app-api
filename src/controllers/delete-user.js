import { DeleteUserUseCase } from "../use-cases/index.js"
import {
    ok,
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    userNotfound,
} from "./helpers/index.js"

export class DeleteUserController {
    async execute(httpResquest) {
        try {
            const userId = httpResquest.params.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deleteUser = await deleteUserUseCase.execute(userId)

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
