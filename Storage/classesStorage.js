import { ObjectId } from "mongodb";
import StorageConnection from "./storageConnection.js";

export default class ClassStorage {
    constructor() {
        this.storage = new StorageConnection("Classes")
        this.collection = this.storage.getCollection()
    }

    async createClass(newClass) {
        return await this.collection.insertOne(newClass)
    }

    async getAllClasses() {
        return await this.collection.find({}).toArray()
    }

    async getOneClass(id) {
        return await this.collection.find(
            { _id: id }
        ).toArray()
    }

    async getUserClasses(socialMediaId) {
        return await this.collection.find(
            { users: socialMediaId }
        ).toArray()
    }

    async getCommonClasses(socialMediaIdUser, socialMediaIdUser2) {
        return await this.collection.find({
            $and: [
                { users: socialMediaIdUser },
                { users: socialMediaIdUser2 }
            ]
        }).toArray()
    }

    async addUserToClass(userInfo, classId) {
        return await this.collection.updateOne(
            { _id: classId },
            { $push: { users: userInfo } }
        )
    }

    async cancelClass(classId) {
        return await this.collection.updateOne(
            { _id: classId },
            { $set: { cancelled: true } }
        )
    }

    async dropFromClass(classId, socialMediaId) {
        return await this.collection.updateOne(
            { _id: classId },
            { $pull: { users: socialMediaId } }
        )
    }


}