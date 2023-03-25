import {v4 as uuid} from "uuid"
export default class TrainingClass{
    constructor(title,quota ,tags, users,date, admin, location){
        this._id = uuid()
        this.title = title
        this.quota = quota
        this.cancelled = false
        this.tags = tags ? tags : []
        this.admin = admin
        this.users = users
        this.date = date
        this.location = location
    }
}