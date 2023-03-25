import express from "express"
import { log } from "node:console";
import { v4 as uuid } from 'uuid'
import User from "../models/user.js";
import UserCredential from "../models/userCredential.js";
import CredentialRepository from "../Repository/credentialRepository.js";
import UserRepository from "../Repository/userRepository.js";
import { googleLogin } from "../services/authenticationServices.js"
const {
    randomBytes,
    pbkdf2Sync
} = await import('node:crypto');

const credentialRepo = new CredentialRepository()
const userRepo = new UserRepository()

const router = express.Router()

router.post("/login/google/",
    googleLogin)


//Agregar un nuevo modelo que sea solo user (usuario, salt y hashedPass)
//Preguntar en SIS si esta bien guardar en la base de datos el hash y el salt para validar despues
router.post('/register', async (req, res) => {

    try {

        const { username, password } = req.body

        const userExist = await (await credentialRepo.getUserCredential(username.toLowerCase())).at(0)

        if (userExist) {
            return res.status(400).json({
                message: `The email ${username} is already taken`,
                code: 400
            })
        }

        const salt = randomBytes(16).toString('hex');

        const hash = pbkdf2Sync(password.toString(), salt, 1000, 64, `sha512`).toString(`hex`);

        const _id = uuid()
        const user = new UserCredential(_id, username.toLowerCase(), hash, salt)

        await credentialRepo.registerUser(user)

        const credential = `${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`

        const defaultUser = new User(
            _id,
            "",
            "",
            "",
            username,
            "",
            "",
            "",
            credential
        )

        await userRepo.registerUser(defaultUser)

        const returnUser = (await userRepo.existsCredential(credential)).at(0)

        return res.status(201).json(returnUser)

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err,
        })
    }
})

router.post('/signIn', async (req, res) => {
    const { username, password } = req.body

    const user = (await credentialRepo.getUserCredential(username.toLowerCase())).at(0)

    if (!user) return res.status(200).json({
        message: `The email ${username} doesnt exist`,
        code: 204
    })

    const valid = validatePassowrd(password, user.salt, user.hash)

    if (!valid) return res.status(401).json({
        message: "The email or password are incorrect. Please try again",
        code: 401
    })

    const validUser = (await userRepo.getUserByEmail(username.toLowerCase())).at(0)

    return res.status(200).json({ user: validUser, code: 200 })

})

const validatePassowrd = (password, salt, hashedPassword) => {
    const hash = pbkdf2Sync(password,
        salt, 1000, 64, `sha512`).toString(`hex`);

    return hash === hashedPassword;
}

export default router
