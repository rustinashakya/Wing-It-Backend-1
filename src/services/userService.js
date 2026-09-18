
const User = require("../models/userModal")
class UserService {
    getUsers = async () => {
        const resp = await User.find()

        return resp

    }
}



const userService = new UserService()


module.exports = userService