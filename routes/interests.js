
import express from "express"
import { createInterests, getInterests } from "../services/interestsServices.js"

const router = express.Router()

router.get('/', getInterests)

router.post('/', createInterests)

export default router