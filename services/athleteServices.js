import UserRepository from "../Repository/userRepository.js"

const userRepository = new UserRepository()

export const getAthletes = async (req, res) => {
    try {
        const users = await userRepository.getAllAthletes()
        if (users.length > 0) {
            return res.stauts(200).json(users)
        } else {
            res.status(204).json({
                message: "No content"
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            errMsg: "Hubo un error al buscar a todos los atletas"
        })
    }
}

export const getAnAthlete = async (req, res) => {
    const { socialMediaId } = req.params

    try {
        const user = await userRepository.getAnAthlete(socialMediaId)

        return user.length > 0 ? res.status(200).json(user[0]) : res.status(204).json({
            message: "The user doesnt exists"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            errMsg: "Hubo un error al buscar al atleta"
        })
    }
}

export const finalizeRegistrationAthlete = async (req, res) => {
    const { _id, name, lastName, birthdate, interests } = req.body


    const objectToModify = {
        tempRole: "Athlete",
        tempName: name,
        tempLastName: lastName,
        tempBirthdate: birthdate,
        tempInterests: interests
    }

    await userRepository.finalizeRegistration(_id, objectToModify)

    const user = await userRepository.getUserByObjId(_id)

    if (user.length > 0) {
        return res.status(200).json(user)
    } else {
        return res.status(400).json({
            message: "No se modificaron los datos. Por favor reviselo"
        })
    }
}

export const getUser = async (req, res) => {
    const { _id } = req.params

    try {
        const user = await userRepository.getUserByObjId(_id)
        return res.status(200).json(user[0])
    } catch (err) {
        return res.status(500).json({
            errMsg: "There was a problem fetching the user"
        })
    }

} 