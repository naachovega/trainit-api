import StorageConnection from "./storageConnection.js"

export default class InterestsStorage {
    constructor() {
        this.storage = new StorageConnection("Interests")
        this.collection = this.storage.getCollection()
    }

    async getInterests() {
        return await this.collection.find({}).toArray()
    }

    async createInterests(interests){
        return await this.collection.insertMany(interests)
    }
}