const jwt = require('jsonwebtoken')
const JWT_SECRET = "probook";

const fetchuser = (req, res, next)=>{
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');//we named the header auth-token and we will send this with same name in the request
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;   //when a user is created their information is stored in req.user for easy access and this req.user can be accessed anywhere in the project
        next();
        
    } catch (error) {
                res
                  .status(401)
                  .send({ error: "please authenticate using a correct token" });

        
    }

}

module.exports = fetchuser;