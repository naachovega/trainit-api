import UserRepository from "../Repository/userRepository.js"

const repository = new UserRepository()

export const athleteExist = async (req,res,next) => {
    const {_id} = req.params
    return repository.getAnAthlete(_id)
    .then(result => result.length > 0 ? result.json() : null)
    .then(data => {
        if(data) {
            next()
        } else {
            return res.status(400).json({
                errMsg: "No existe el atleta enviado"
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            errMsg : "Hubo un error al validar que el usuario exista"
        })
    })
}