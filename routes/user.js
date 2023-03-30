import express from "express"
import CredentialRepository from "../Repository/credentialRepository.js"
import UserRepository from "../Repository/userRepository.js"
import { getAnAthlete, getUser } from "../services/athleteServices.js"
import { editBio, editInterests, getAllUsers, getDetailInfoUser } from "../services/userServices.js"

const router = express.Router()

router.get('/', getAllUsers)

router.get('/:socialMediaId', getAllUsers)

router.get('/information/:_id', getUser)

router.get("/athlete/:socialMediaId",
    //    (req, res, next) => athleteExist,
    getAnAthlete
)

router.put('/edit-interests',
    editInterests
)

router.put('/edit-bio',
    editBio
)

router.get('/information/detail/:classId', getDetailInfoUser)

router.delete('/delete/:_id', async (req, res) => {

    try {

        const { _id } = req.params

        const userRepo = new UserRepository()
        const credentialRepo = new CredentialRepository()
        await userRepo.deleteUser(_id)
        await credentialRepo.deleteCredential(_id)

        return res.status(204).json({
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