import express from "express"
import { finalizeRegistrationAthlete, getAnAthlete, getAthletes } from "../services/athleteServices.js"
import { athleteExist } from "../Validators/athletesValidator.js"

const router = express.Router()

router.get("/",
    getAthletes
)

router.get("/:socialMediaId",
    //    (req, res, next) => athleteExist,
    getAnAthlete
)

router.put("/finalize-registration",
    finalizeRegistrationAthlete
)

export default router