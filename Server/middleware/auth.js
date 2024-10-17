const { validateToken } = require("../services/auth");

function authentication(){
    return (req , res , next) => {
       
        const token = req.cookies?.token;
        if(!token){
            return next()
        }
        const payload = validateToken(token);
        if(!payload){
            return next();
        }
        req.user = payload;
       
        return next();

        
    }
}
module.exports = authentication;