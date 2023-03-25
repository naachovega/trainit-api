import { v4 as uuid } from "uuid"

export default class Gym {
    constructor(name, price, location, token) {
        this.id = uuid()
        this.name = name
        this.price = price
        this.location = location
        this.gymToken = token
        this.clients = []
    }
}