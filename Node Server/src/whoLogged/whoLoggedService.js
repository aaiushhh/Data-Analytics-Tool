var whoLoggedModel=require("./whoLoggedModel");


module.exports.createWhoLoggedDBService = async (whoLoggedDetails) => {
    //
    try{var whoLoggedModelData = new whoLoggedModel();
       
        whoLoggedModelData.username = whoLoggedDetails.username;

        const savedData = await whoLoggedModelData.save();
        return savedData; 
    } catch (err) {
        throw err; 
    }
}
module.exports.getAllUserData = async () => {
    try {
        const userData = await whoLoggedModel.find({}); 
        return userData;
    } catch (err) {
        throw err;
    }
};

module.exports.deleteAllUserData = async () => {
    try {
        const deleteResult = await whoLoggedModel.deleteMany({});
        return deleteResult;
    } catch (err) {
        throw err;
    }
};