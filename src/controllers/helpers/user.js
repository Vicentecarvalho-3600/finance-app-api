import validator from "validator"
import { badRequest, notfound } from "./http.js"

export const invalidPasswordResponse = () =>
    badRequest({
        message: "Password must be at least 6 characters",
    })

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: "Invalid e-mail. please provide a valid one.",
    })

export const invalidIdResponse = () =>
    badRequest({
        message: "The provided id is not valid",
    })

export const userNotfound = () =>
    notfound({
        message: "User not Found",
    })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const checkIfIdIsValid = (id) => validator.isUUID(id)
