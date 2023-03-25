import express from "express"
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




export default router