import CredentialStorage from "../Storage/credentialStorage.js";

export default class CredentialRepository {
    constructor() {
        this.storage = new CredentialStorage()
    }

    registerUser(user) {
        return this.storage.registerUser(user)
    }

    getUserCredential(username) {
        return this.storage.getUsersCredential(username)
    }

    deleteCredential(_id) {
        return this.storage.deleteCredential(_id)
    }
}