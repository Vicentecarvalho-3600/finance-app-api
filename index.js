import "dotenv/config.js"
import express from "express"
import {
    UpdatedUserController,
    GetUserByIdController,
    CreateUserController,
    DeleteUserController,
} from "./src/controllers/index.js"

import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    UpdatedUserUseCase,
} from "./src/use-cases/index.js"

import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdatedUserRepository,
} from "./src/repositories/postgres/index.js"

const app = express()

app.use(express.json())

app.get("/api/users/:userId", async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.post("/api/users", async (request, response) => {
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const postgresCreateUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(
        postgresGetUserByEmailRepository,
        postgresCreateUserRepository,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.patch("/api/users/:userId", async (request, response) => {
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const postgresUpdatedUserRepository = new PostgresUpdatedUserRepository()

    const updateUserUseCase = new UpdatedUserUseCase(
        postgresGetUserByEmailRepository,
        postgresUpdatedUserRepository,
    )

    const updatedUserController = new UpdatedUserController(updateUserUseCase)

    const { statusCode, body } = await updatedUserController.execute(request)

    response.status(statusCode).send(body)
})

app.delete("/api/users/:userId", async (request, response) => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )

    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deleteUserController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
