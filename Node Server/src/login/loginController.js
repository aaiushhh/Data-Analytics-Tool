var loginService=require("./loginService");

var createLoginControllerFn = async (req, res) => {
    try {
        const result = await loginService.createLoginDBService(req.body);
        res.send({ status: true, message: result.message });
    } catch (err) {
        console.error(err);
        res.send({ status: false, message: "Error creating user" });
    }
};

var loginLoginControllerFn=async (req,res)=>{
    // var result=null;
    try{
        result=await loginService.loginLoginDBService(req.body);
        console.log(result);
        if(result.status){
            res.send({"status":true,"message":result.message});
        }else{
            res.send({"status":false,"message":result.message});
        }

    }
    catch(err){
        res.send({"status":false,"message":err.message});
    }
}

var getAllUserDataControllerFn = async (req, res) => {
    try {
        const userData = await loginService.getAllUserData();
        res.send({ status: true, data: userData });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error fetching user data" });
    }
};

var deleteUserByIdControllerFn = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the ID is passed in the request params
        const deletedUser = await loginService.deleteUserById(userId);
        res.send({ status: true, message: "User deleted successfully", data: deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error deleting user" });
    }
};

async function getEmailByUsernameControllerFn(req, res) {
    try {
      const { username } = req.params;
      const email = await loginService.getEmailByUsername(username);
      res.send({ status: true, data: email });
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: false, message: "Error fetching email address" });
    }
  }

module.exports={createLoginControllerFn,loginLoginControllerFn,getAllUserDataControllerFn,deleteUserByIdControllerFn, getEmailByUsernameControllerFn};