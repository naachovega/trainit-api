import express from 'express';

import athlete from '../trainit-api/routes/athlete.js'
import authentication from '../trainit-api/routes/authentication.js'
import user from '../trainit-api/routes/user.js'
import trainingClass from '../trainit-api/routes/class.js'
import interests from '../trainit-api/routes/interests.js'
import test from '../trainit-api/routes/test.js'
import gym from '../trainit-api/routes/gym.js'

const app = express()
const port = 3000
const defaultEndpoint = "/api"

app.use(express.json())

app.use(`${defaultEndpoint}/athlete`, athlete)
app.use(`${defaultEndpoint}/auth`, authentication)
app.use(`${defaultEndpoint}/user`, user)
app.use(`${defaultEndpoint}/class`, trainingClass)
app.use(`${defaultEndpoint}/interests`, interests)
app.use(`${defaultEndpoint}/test`, test)
app.use(`${defaultEndpoint}/gym`, gym)

app.get("/", (req, res) => {
    res.status(200).json({
        status: 'API currently running'
    })
})

app.listen(port, () => {
    console.log(`API Listening on port: ${port}`);
})
