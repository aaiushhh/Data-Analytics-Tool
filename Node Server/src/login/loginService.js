const { use } = require("../../route/routes");
var loginModel = require("./loginModel");

module.exports.createLoginDBService = async (loginDetails) => {
    try {
        // Check if the email already exists
        const existingUser = await loginModel.findOne({ email: loginDetails.email });
        if (existingUser) {
            throw { status: false, message: "Email already exists" };
        }

        // Create a new user if the email is unique
        var loginModelData = new loginModel();
        loginModelData.email = loginDetails.email;
        loginModelData.password = loginDetails.password;
        loginModelData.username = loginDetails.username;

        // Save the data using async/await
        const savedData = await loginModelData.save();
        return savedData; // Resolve with the saved data
    } catch (err) {
        throw err; // Throw any errors encountered during save or email check
    }
};

     
module.exports.loginLoginDBService = async (loginDetails) => {
    try {
        const user = await loginModel.findOne({ username: loginDetails.username });
        if (!user) {
            throw { status: false, message: "Invalid Username" };
        }

        const isPasswordValid = await comparePasswords(loginDetails.password, user.password);
        if (!isPasswordValid) {
            throw { status: false, message: "incorrect pass"}  ;
        }

        return { status: true, message: "correct pass" };
    } catch (err) {
        throw err;
    }
};

module.exports.getAllUserData = async () => {
    try {
        const userData = await loginModel.find({}, { username: 1, email: 1, _id: 1 }); // Exclude _id, include only username and email
        return userData;
    } catch (err) {
        throw err;
    }
};


module.exports.deleteUserById = async (userId) => {
    try {
        const deletedUser = await loginModel.findByIdAndDelete(userId);
        return deletedUser;
    } catch (err) {
        throw err;
    }
};

async function comparePasswords(inputPassword, storedPassword) {
    // Implement your password comparison logic here
     return inputPassword === storedPassword;
}

module.exports.getEmailByUsername = async (username) => {
    try {
      const user = await loginModel.findOne({ username });
      if (user) {
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw err;
    }
  };
  