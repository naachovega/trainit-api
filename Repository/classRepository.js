import ClassStorage from '../Storage/classesStorage.js'


export default class ClassRepository {
    constructor() {
        this.storage = new ClassStorage()
    }

    createClass(newClass) {
        return this.storage.createClass(newClass)
    }

    getAllClasses() {
        return this.storage.getAllClasses()
    }

    getOneClass(id) {
        return this.storage.getOneClass(id)
    }

    getUserClasses(socialMediaId) {
        return this.storage.getUserClasses(socialMediaId)
    }

    getCommonClasses(socialMediaId1, socialMediaId2) {
        return this.storage.getCommonClasses(socialMediaId1, socialMediaId2)
    }

    addUserToClass(userInfo, classId) {
        return this.storage.addUserToClass(userInfo, classId)
    }

    cancelClass(classId) {
        return this.storage.cancelClass(classId)
    }

    dropFromClass(classId, socialMediaId) {
        return this.storage.dropFromClass(classId, socialMediaId)
    }
}