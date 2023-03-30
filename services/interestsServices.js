import InterestsRepository from "../Repository/interestsRepository.js"

const repository = new InterestsRepository()

export const getInterests = async (req, res) => {
    try {
        
        const interests = await repository.getInterests()

        const result = interests.map(v => v.Description)

        return result.length ?
            res.status(200).json(result)
            :
            res.status(204).json({
                message: "There arent any interests loaded."
            })
    } catch (err) {
        return res.status(500).json({
            errMsg: "There was a problem fetching the interests"
        })
    }
}

export const createInterests = async (req, res) => {
    const { interests } = req.body

    try {

        const interestsCreated = await repository.createInterests(interests)

        return interestsCreated.insertedCount > 0 ?
            res.status(201).json({
                message: "The interests were succesfully created"
            })
            :
            res.status(204).json({
                message: "The interests couldn't be created"
            })
    } catch (err) {
        return res.status(500).json({
            errMsg: "There was a problem creating the interests"
        })
    }
}