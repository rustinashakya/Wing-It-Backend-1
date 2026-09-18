const userService = require("../services/userService")

class UserController {
    getallUsers = async (req, res) => {
        const response = await userService.getUsers()
        res.json({
            data: response
        })
    }
}



const userController = new UserController()


module.exports = userController