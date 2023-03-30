import UserStorage from "../Storage/usersStorage.js";

export default class UserRepository {
    constructor() {
        this.storage = new UserStorage()
    }

    getAllAthletes() {
        return this.storage.getAllAthletes()
    }

    getAnAthlete(id) {
        return this.storage.getAnAthlete(id)
    }

    getAllCoaches() {
        return this.storage.getAllCoaches()
    }

    getACoach(id) {
        return this.storage.getACoach(id)
    }

    userAuthentication(user) {
        return this.storage.userAuthentication(user)
    }

    finalizeRegistration(_id, obj) {
        return this.storage.finalizeRegistration(_id, obj)
    }

    getUser(id) {
        return this.storage.getUser(id)
    }

    getAllUsers() {
        return this.storage.getAllUsers()
    }

    editInterests(_id, interests) {
        return this.storage.editInterests(_id, interests)
    }

    editBio(_id, biography) {
        return this.storage.editBio(_id, biography)
    }

    getUserDetailInfo(socialMediaId) {
        return this.storage.getUserDetailInfo(socialMediaId)
    }

    setGymAttendanceMonthly(socialMediaId, counter) {
        return this.storage.setGymAttendanceMonthly(socialMediaId, counter)
    }

    setLastDayGym(socialMediaId, date) {
        return this.storage.setLastDayGym(socialMediaId, date)
    }

    existsCredential(credential) {
        return this.storage.existsCredential(credential)
    }

    registerUser(user) {
        return this.storage.registerUser(user)
    }

    getUserByEmail(email) {
        return this.storage.getUserByEmail(email)
    }

    getUserByObjId(_id) {
        return this.storage.getUserByObjId(_id)
    }

    deleteUser(_id) {
        return this.storage.deleteUser(_id)
    }

    setUserAttendance(_id, attendance) {
        return this.storage.setUserAttendance(_id, attendance)
    }

    setUserActivityDate(_id){
        return this.storage.setUserActivityDate(_id)
    }
}