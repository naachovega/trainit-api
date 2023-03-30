import express from 'express'
import CredentialRepository from '../Repository/credentialRepository.js';
import UserRepository from '../Repository/userRepository.js';

const router = express.Router()

const userRepository = new UserRepository()
const uniqueToken = 'ASIF3O2LRl?ajFBe!M!?pZjQe4bKaMctK4IXKH6vA!ubKtwstK9-KdKxyvk?4A6zn/?VeGQE8uy1/6n9g50JxUJleqzWFkmrWmiPCOyIYYmscaqEckgc?RmL8e2hjRoj/Q=d9AtTytCoWCX9R7k--5zY8GrF70Tl0ktrXmp9QFWZl!vA5oA3eMxH3mwi/qIBw337uchGxvkwYow7xMDKDLW95NXxa4HnIEW!Ze0PjTc!o?cuyvb2Q/glyLsC/k1y'

router.put("/entrance", async (req, res) => {

    const { token, id, gymToken } = req.body
    try {

        if (token !== uniqueToken) return res.status(401).json({ message: "Unauthorized" })

        if (!id) return res.status(400).json({ message: "Error" })

        const user = (await userRepository.getUser(id)).at(0)

        if (!user) return res.status(400).json({ message: `There isnt a user registered with the id ${id}` })

        await userRepository.setGymAttendanceMonthly(user.socialMediaId, user.gymAttendanceMonthly + 1)
        await userRepository.setLastDayGym(user.socialMediaId, new Date())

        return res.status(200).json({
            id: id,
            gymId: gymId,
            contador: user.gymAttendanceMonthly,
            gymDate: user.lastDayGym
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
})
router.delete('/:_id', async (req, res) => {

    try {
        const { _id } = req.params
        const userRepo = new UserRepository()
        const credentialRepo = new CredentialRepository()
        await userRepo.deleteUser(_id)
        await credentialRepo.deleteCredential(_id)

        return res.status(200).json({
            message: "The user has been deleted",
            code: 200
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error,
            code: 500
        })
    }
})

export default router