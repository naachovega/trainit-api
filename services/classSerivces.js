import TrainingClass from "../models/trainingClass.js"
import ClassRepository from "../Repository/classRepository.js"
import UserRepository from "../Repository/userRepository.js"

const repository = new ClassRepository()

export const createClass = async (req, res) => {
    const { title, quota, tags, date, admin, location } = req.body

    const users = [admin]

    const newClass = new TrainingClass(
        title,
        quota,
        tags,
        users,
        date,
        admin,
        location
    )

    try {
        const created = await repository.createClass(newClass)

        return created.insertedId !== null ?
            res.status(201).json({
                message: "New class created OK"
            })
            :
            res.status(204).json({
                message: "The class couldnt be created. Pleae try again"
            })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: "There was a problem creating the class"
        })
    }

}

export const getAllClasses = async (req, res) => {
    try {
        const classes = await repository.getAllClasses()
        return classes.length > 0 ?
            res.status(200).json(classes)
            :
            res.status(204).json({
                message: "There arent any classes to display"
            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            errMsg: "There was a problem fetching the classes from the database"
        })
    }
}

export const getOneClass = async (req, res) => {
    const { _id } = req.params
    try {
        const classFetched = await repository.getOneClass(_id)
        return res.status(200).json(classFetched[0])

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: "There was a problem trying to get the class",
            error: err
        })

    }
}

export const getUserClasses = async (req, res) => {
    const { socialMediaId } = req.params

    try {
        const classFetched = await repository.getUserClasses(socialMediaId)

        return classFetched.length > 0
            ?
            res.status(200).json(classFetched)
            :
            res.status(204).json({
                message: "The user doesnt have any classes"
            })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: "There was a problem trying to get the user classes",
            error: err
        })
    }
}

export const getCommonClasses = async (req, res) => {
    const { socialMediaId, socialMediaId2 } = req.params

    try {
        const classesFetched = await repository.getCommonClasses(socialMediaId, socialMediaId2)

        return classesFetched.length > 0
            ?
            res.status(200).json(classesFetched)
            :
            res.status(204).json({
                message: "Both users dont share any classes"
            })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: "There was a problem trying to get the classes",
            error: err
        })
    }
}

export const addUserToClass = async (req, res) => {
    const { socialMediaId, classId } = req.body

    try {
        const added = await repository.addUserToClass(socialMediaId, classId)
        return added.modifiedCount > 0
            ?
            res.status(200).json({
                message: "Congreatulations! You have been added to the class"
            })
            :
            res.status(500).json({
                message: "There was an error adding the user to the class. Please try again later"
            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            errMsg: "There was an error joining the class"
        })
    }
}

export const cancelClass = async (req, res) => {
    const { classId } = req.body

    try {
        const updated = await repository.cancelClass(classId)
        return updated.modifiedCount > 0
            ?
            res.status(200).json({
                message: "The class was succesfully cancelled"
            })
            :
            res.status(500).json({
                message: "There was a problem cancelling the class"
            })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: "The class couldn't be cancelled. Please try again later"
        })
    }
}

export const dropFromClass = async (req, res) => {
    const { socialMediaId, classId } = req.body
    try {
        const pulled = await repository.dropFromClass(classId, socialMediaId)

        return pulled.modifiedCount > 0
            ?
            res.status(200).json({
                message: "User succesfully dropped from class"
            })
            :
            res.status(400).json({
                message: "The user coudln't be dropped from the class"
            })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            errMsg: "There was a problem dropping from the class"
        })
    }
}
