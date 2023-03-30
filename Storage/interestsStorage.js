import StorageConnection from "./storageConnection.js"

export default class InterestsStorage {
    constructor() {
        this.storage = new StorageConnection("Interests")
        this.collection = this.storage.getCollection()
    }

    async getInterests() {
        return await this.collection.find({}, { projection: { Description: 1, _id: 0 } }).toArray()
    }

    async createInterests(interests) {
        return await this.collection.insertMany(interests)
    }
}