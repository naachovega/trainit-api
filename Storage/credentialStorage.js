import StorageConnection from "./storageConnection.js"


export default class CredentialStorage {
    constructor() {
        this.storageConnection = new StorageConnection("Credentials")
        this.collection = this.storageConnection.getCollection()
    }

    async registerUser(user) {
        return await this.collection.insertOne(user)
    }

    async getUsersCredential(username) {
        return await this.collection.find({ username: username }).toArray()
    }

    async deleteCredential(_id) {
        return await this.collection.deleteOne({ _id: _id })
    }
}