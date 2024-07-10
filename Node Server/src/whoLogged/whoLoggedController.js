var whoLoggedService = require("./whoLoggedService");


var whoLoggedcreateLoginControllerFn = async (req, res) => {
    try {
        var status = await whoLoggedService.createWhoLoggedDBService(req.body);
        if (status) {
            res.send({ status: true, message: "User logged successfully" });
        } else {
            res.send({ status: false, message: "Error logging user" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error logging user" });
    }
};

var getWhoLoggedFn = async (req, res) => {
    try {
        const userData = await whoLoggedService.getAllUserData();
        if (userData.length > 0) {
            // Extract usernames from userData
            const usernames = userData.map(user => user.username);
            res.send({ status: true, data: usernames });
        } else {
            res.send({ status: false, message: "No user data found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error fetching user data" });
    }
};


var delWhoLoggedFn = async (req, res) => {
    try {
        const deleteResult = await whoLoggedService.deleteAllUserData();
        res.send({ status: true, message: "All user data deleted successfully", data: deleteResult });
    } catch (err) {
        console.error(err);
        res.send({ status: false, message: "Error deleting user data" });
    }
};

module.exports = { getWhoLoggedFn, delWhoLoggedFn ,whoLoggedcreateLoginControllerFn};
