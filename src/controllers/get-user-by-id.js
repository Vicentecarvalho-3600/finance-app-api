import { GetUserByIdUseCase } from "../use-cases/index.js"
import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    ok,
    userNotfound,
} from "./helpers/index.js"

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return userNotfound()
            }

            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
