import InterestsStorage from "../Storage/interestsStorage.js";

export default class InterestsRepository {
    constructor() {
        this.storage = new InterestsStorage()
    }

    getInterests() {
        return this.storage.getInterests()
    }

    createInterests(interests) {
        return this.storage.createInterests(interests)
    }
}