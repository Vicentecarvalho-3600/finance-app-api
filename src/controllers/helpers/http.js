export const badRequest = (body) => ({ statusCode: 400, body: body })

export const created = (body) => ({ statusCode: 201, body: body })

export const serverError = () => ({
    statusCode: 500,
    body: {
        message: "Internal server error",
    },
})

export const ok = (body) => ({ statusCode: 200, body: body })

export const notfound = (body) => ({ statusCode: 404, body: body })
