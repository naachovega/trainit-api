import express from "express";
import Gym from "../models/gym.js";

const {
    randomBytes,
} = await import('node:crypto');


const router = express.Router()

router.post('/', (req, res) => {

    const { name, price, location } = req.body

    const randomString = randomBytes(10).toString('hex').toUpperCase()

    const gym = new Gym(name, price, location, randomString)

    //aca llamo al repository y lo guardo en la base...

    return res.status(200).json({ gym: gym })

})

router.get("/entrance/:gymToken", (req, res) => {
    const { gymToken } = req.params

    return res.status(200).json({ token: gymToken })
})

export default router