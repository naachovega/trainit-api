import User from '../models/user.js';
import UserRepository from '../Repository/userRepository.js';

import fetch from 'node-fetch';

const googleUrlAuth = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='

const repository = new UserRepository()

const generateRandomCredential = () => {
    const credential = `${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`
    return credential

}

export const googleLogin = async (req, res) => {
    const { accessToken } = req.body

    fetch(`${googleUrlAuth}${accessToken}`)
        .then(res => res.json())
        .then(async data => {
            const { id, email, picture, errors } = data
            if (errors) {
                if (errors.length > 0) {
                    return res.status(401).json({
                        errorMessage: "No posee la autenticacion correcta para poder acceder a la cuenta de google que se envio"
                    })
                }
            }
            const credential = `${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`
            console.log(credential);
            const defaultUser = new User(
                "", //name
                "", //lastname
                "", //birthdate
                email,
                id,
                picture,
                "", //role
                credential,
            )

            try {
                const newUser = await repository.userAuthentication(defaultUser)
                return res.status(201).json(newUser)
                
            } catch (error) {
                return res.status(500).json({
                    errorMessage: "Hubo un error al buscar al usuario de google"
                })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: "Su usuario no es valido para registrase con google. Por favor, reintente mas tarde."
            })
        })
}