import "dotenv/config.js"
import express from "express"
import {
    UpdatedUserController,
    GetUserByIdController,
    CreateUserController,
} from "./src/controllers/index.js"

const app = express()

app.use(express.json())

app.post("/api/users", async (request, response) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.get("/api/users/:userId", async (request, response) => {
    const getUserByIdController = new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.patch("/api/users/:userId", async (request, response) => {
    const updatedUserController = new UpdatedUserController()

    const { statusCode, body } = await updatedUserController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
