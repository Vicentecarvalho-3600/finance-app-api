import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js"
import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    ok,
    notfound,
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
                return notfound({
                    message: "User not found.",
                })
            }

            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
