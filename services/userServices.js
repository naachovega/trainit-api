import ClassRepository from "../Repository/classRepository.js"
import UserRepository from "../Repository/userRepository.js"

const repository = new UserRepository()

export const getAllUsers = async (req, res) => {

    try {
        const users = await repository.getAllUsers()

        return users.length > 0 ? res.status(200).json(users) : res.status(204).json({
            message: "There are no users logged in the db yet"
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: "There was an error fetching users"
        })
    }

}

export const editInterests = async (req, res) => {

    const { _id, interests } = req.body

    try {

        const edited = await repository.editInterests(_id, interests)

        if (edited.modifiedCount === 0) {
            return res.status(400).json({
                message: "The interests couldn't be updated"
            })
        }

        const user = await repository.getUserByObjId(_id)

        return res.status(200).json(user[0])

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: "There was an error updating the interests of the user"
        })
    }

}

export const editBio = async (req, res) => {
    const { _id, biography } = req.body

    try {
        const edited = await repository.editBio(_id, biography)

        if (edited.matchedCount === 0) {
            return res.stats(400).json({
                message: "The biography coulnd't be updated"
            })
        }
        const user = await repository.getUserByObjId(_id)

        
        return res.status(200).json(user[0])

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: "There was a problem updating the biography"
        })
    }
}

export const getDetailInfoUser = async (req, res) => {
    const { classId } = req.params

    try {

        const repoClass = new ClassRepository()
        const classes = await repoClass.getOneClass(classId)

        const specificClass = classes[0]

        const users = specificClass.users

        const userInfo = await Promise.all(
            users.map(async value => {
                return await (await repository.getUser(value)).at(0)
            })
        )

        const userDetailInfo = userInfo.map(value => {
            const { socialMediaId, name, lastName, picture } = value
            return { socialMediaId, name, lastName, picture }
        })

        return res.status(200).json(userDetailInfo)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            errMsg: "There was a problem obtaining the information about the user"
        })
    }
}