const user = require("../models/UserModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "probook";

//creating user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  let success = false;
  try {
    //check whether the user already exists or not
    let User = await user.findOne({ email: req.body.email });
    if (User) {
      return res
        .status(400)
        .json({success, error: "user already exists with this email" });
    }

    const salt = await bycrypt.genSalt(10);
    const secPass = await bycrypt.hash(req.body.password, salt); //encrypting the password

    //if user does not exists create new user
    User = await user.create({ name, email, password: secPass });

    //sending the authentication token to the user using jwt token
    const data = {  //this is the payload that we are sending to the token basically it is some data to store in token we mostly use this to store the id of the user so that we can retrieve the user easily
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true
    return res.json({success, authToken });

    // res.status(200).json(User)
  } catch (error) {
    return res.status(400).json(error);
  }
};

//authenticating user
const userLogin = async (req, res) => {
  let success = false
  const { email, password } = req.body;
  try {
    let User = await user.findOne({ email });
    if (!User) {
      success = false
      return res.status(404).json({ error: "user not found" });
    }

    const passwordCompare = await bycrypt.compare(password, User.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ error: "incorrect password" });
    }
 
    const data = {
      user: {
        id: User.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    return res.json({success, authToken });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


//get user details
const userDetails = async (req, res)=>{
    try{
        const userId = req.user.id;
        const User = await user.findById(userId).select("-password");
        res.send(User)

    }catch(error){
        res.status(500).send("internal server error")
    }

}

module.exports = { createUser, userLogin, userDetails };



