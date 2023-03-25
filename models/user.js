import { v4 as uuid } from 'uuid'

export default class User {
    constructor(_id, name, lastName, birthdate, email, socialMediaId, picture, role, credential) {
        this._id = _id != undefined ? _id : uuid(), 
        this.name = name
        this.lastName = lastName
        this.birthdate = birthdate
        this.email = email
        this.socialMediaId = socialMediaId
        this.registered = false
        this.picture = picture
        this.role = role,
        this.interests = [],
        this.bio = '',
        this.classes = []
        this.lastDayGym = new Date()
        this.gymAttendanceMonthly = 0
        this.activeRegisteredGyms = [],
        this.credential = credential
    }
}