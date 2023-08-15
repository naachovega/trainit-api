import express from "express";
import Gym from "../models/gym.js";
import GymRepository from "../Repository/gymRepository.js";
import UserRepository from "../Repository/userRepository.js";

const {
    randomBytes,
} = await import('node:crypto');


const userRepo = new UserRepository()
const gymRepo = new GymRepository()
const router = express.Router()

router.post('/', async (req, res) => {

    const { name, price, location, openedDays } = req.body

    const randomString = randomBytes(10).toString('hex').toUpperCase()

    const gym = new Gym(name, price, location, randomString, openedDays)


    try {
        await gymRepo.createGym(gym)
        return res.status(200).json({ gym: gym })

    } catch (error) {
        return res.status(500).json({
            message: error,
            code: 500
        })
    }

})

router.get('/', async (req, res) => {
    try {
        const gyms = await gymRepo.getAllGyms()
        return res.status(200).json(gyms)

    } catch (error) {
        return res.status(500).json({
            message: error,
            code: 500
        })
    }
})


router.post("/entrance/", async (req, res) => {

    try {
        const { _id, gymToken } = req.body

        //previa validacion del usuario, del gym, y que el usuario este registrado en ese gym

        const user = (await userRepo.getUserByObjId(_id)).at(0)

        await userRepo.setUserAttendance(_id, user.gymAttendanceMonthly)
        await userRepo.setUserActivityDate(_id)

        return res.status(200).json({
            message: "Read Successful",
            code: 200,
            exit: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'There was a problem trying to enter the Gym. Please try again later',
            code: 500,
            exit: false
        })
    }

})

export default router