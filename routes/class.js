import express from 'express'
import { addUserToClass, cancelClass, createClass, dropFromClass, getAllClasses, getCommonClasses, getOneClass, getUserClasses } from '../services/classSerivces.js'

const router = express.Router()

router.post('/', createClass)

router.get('/', getAllClasses)

router.get('/:_id', getOneClass)

router.get('/user/:socialMediaId', getUserClasses)

router.get('/common/:socialMediaId/:socialMediaId2', getCommonClasses)

router.put('/add-user/', addUserToClass)

router.put('/cancel/', cancelClass)

router.put('/drop/', dropFromClass)

export default router