import StorageConnection from "./storageConnection.js"

export default class GymStorage {
    constructor() {
        this.storageConnection = new StorageConnection("Gym")
        this.collection = this.storageConnection.getCollection()
    }

    async createGym(gym) {
        return await this.collection.insertOne(gym)
    }

    async getAllGyms() {
        return await this.collection.find({}).toArray()
    }
}