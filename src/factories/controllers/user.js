import {
    UpdatedUserController,
    GetUserByIdController,
    CreateUserController,
    DeleteUserController,
} from "../../controllers/index.js"

import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    UpdatedUserUseCase,
} from "../../use-cases/index.js"

import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdatedUserRepository,
} from "../../repositories/postgres/index.js"

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}

export const makeCreateUserController = () => {
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const postgresCreateUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(
        postgresGetUserByEmailRepository,
        postgresCreateUserRepository,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}

export const makeUpdateUserController = () => {
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const postgresUpdatedUserRepository = new PostgresUpdatedUserRepository()

    const updateUserUseCase = new UpdatedUserUseCase(
        postgresGetUserByEmailRepository,
        postgresUpdatedUserRepository,
    )

    const updatedUserController = new UpdatedUserController(updateUserUseCase)

    return updatedUserController
}

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )

    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    return deleteUserController
}
