import StorageConnection from "./storageConnection.js";

export default class UserStorage {
    constructor() {
        this.storageConnection = new StorageConnection("Users")
        this.collection = this.storageConnection.getCollection()
    }

    async getUser(id) {
        return await this.collection.find({
            socialMediaId: id
        }).toArray()
    }

    async getAllAthletes() {
        return await this.collection.find({
            rol: "Athlete"
        }).toArray()
    }

    async getAnAthlete(id) {

        return await this.collection.find({
            socialMediaId: id,
            role: "Athlete"
        }).toArray()
    }

    async getAllCoaches() {
        return await this.collection.find({
            rol: "Coach"
        }).toArray()
    }

    async getACoach(id) {
        return await this.collection.find({
            _id: id,
            rol: "Coach"
        }).toArray()
    }

    async userAuthentication(user) {

        const { socialMediaId } = user
        let returnUser = await this.collection.find({ socialMediaId: socialMediaId }).toArray()
        if (returnUser.length === 0) {
            await this.collection.insertOne(user)
            returnUser = await this.collection.find({ socialMediaId: socialMediaId }).toArray()
        }
        const newUser = JSON.parse(JSON.stringify(returnUser[0]))

        return newUser

    }

    async finalizeRegistration(_id, obj) {

        return this.collection.updateOne(
            { _id: _id },
            {
                $set: {
                    name: obj.tempName,
                    lastName: obj.tempLastName,
                    birthdate: obj.tempBirthdate,
                    interests: obj.tempInterests,
                    role: obj.tempRole,
                    registered: true
                }
            },
            true)
    }

    //Future method to modify the users classes interests
    async editInterests(_id, newInterests) {
        return await this.collection.updateOne(
            { _id: _id },
            {
                $set: {
                    interests: newInterests
                }
            }
        )
    }

    async getAllUsers() {
        return await this.collection.find({}).toArray()
    }

    async editBio(_id, biography) {
        return await this.collection.updateOne(
            { _id: _id },
            {
                $set: {
                    bio: biography
                }
            }
        )
    }

    async getUserDetailInfo(socialMediaId) {
        return await this.collection.find({ socialMediaId: socialMediaId }, { name: 1, lastName: 1, picture: 1 }).toArray()
    }

    async setGymAttendanceMonthly(socialMediaId, counter) {
        return await this.collection.updateOne(
            { socialMediaId: socialMediaId },
            {
                $set: {
                    gymAttendanceMonthly: counter

                }
            }
        )
    }

    async setLastDayGym(socialMediaId, date) {
        return await this.collection.updateOne(
            { socialMediaId: socialMediaId },
            {
                $set: {
                    lastDayGym: date
                }
            }
        )
    }

    async existsCredential(credential) {
        return await this.collection.find({ credential: credential }).toArray()
    }

    async registerUser(user) {
        return await this.collection.insertOne(user)
    }

    async getUserByEmail(email) {
        return await this.collection.find({
            email: email
        }).toArray()
    }

    async getUserByObjId(_id) {
        return await this.collection.find({ _id: _id }).toArray()
    }
    async deleteUser(_id) {
        return await this.collection.deleteOne({ _id: _id })
    }

    async setUserAttendance(_id, attendance) {
        return this.collection.updateOne(
            { _id: _id },
            {
                $set:
                    { gymAttendanceMonthly: attendance + 1 }
            }
        )
    }

    async setUserActivityDate(_id) {
        return this.collection.updateOne(
            { _id: _id },
            {
                $set:
                    { lastDayGym: new Date() }
            }
        )

    }
}