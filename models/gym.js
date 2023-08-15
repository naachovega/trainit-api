import { v4 as uuid } from "uuid"

export default class Gym {
    constructor(name, price, location, token, days) {
        this._id = uuid()
        this.name = name
        this.price = price
        this.location = location
        this.gymToken = token
        this.days = days
        this.clients = []
    }
}
/**
 * location: {
 *      lat,
 *      lng:
 *      address:
 *      
 * }
 */