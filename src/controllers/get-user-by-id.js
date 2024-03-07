import { serverError, ok, badRequest, notfound } from "./helpers.js"
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js"
import validator from "validator"

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return badRequest({
                    message: "The provided is is not valid",
                })
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
