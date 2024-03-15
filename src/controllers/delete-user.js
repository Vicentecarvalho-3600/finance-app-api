import { DeleteUserUseCase } from "../use-cases/index.js"
import {
    ok,
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
} from "./helpers/index.js"

export class DeleteUserController {
    async execute(httpResquest) {
        try {
            const userId = httpResquest.params.userid

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deleteUser = deleteUserUseCase.execute(userId)

            return ok(deleteUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
