import { v4 as uuidv4 } from "uuid"
import { UserNotFoundError } from "../../errors/user.js"

export class CreateTransactionUseCase {
    constructor(createTrasactionRepository, getUserByIdRepository) {
        this.createTrasactionRepository = createTrasactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(createTransactionParams) {
        // validar se o ususario existe

        const userId = createTransactionParams.userId

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactionId = uuidv4()

        const transaction = await this.createTrasactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })

        return transaction
    }
}
