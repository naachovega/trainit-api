import GymStorage from "../Storage/gymStorage.js";

export default class GymRepository {
    constructor() {
        this.storage = new GymStorage()
    }

    createGym(gym) {
        return this.storage.createGym(gym)
    }

    getAllGyms() {
        return this.storage.getAllGyms()
    }
}