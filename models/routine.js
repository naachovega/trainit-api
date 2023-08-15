
import { v4 as uuid } from "uuid"

export default class Routine {
    constructor(name, dateString, day, month, year, exercises) {
        this.id = uuid()
        this.name = name
        this.dateString = dateString
        this.day = day
        this.month = month
        this.year = year
        this.exercises = exercises //object
    }
}