const jwt = require('jsonwebtoken');

const secret = 'Chetainya Manchanda'


function generateToken(user){

    const payload = {
        id : user.id
    };
    try{
    const token = jwt.sign(payload , secret) 
    if(!token){
        throw new Error('Error while generating token')
    }   
    return token;
    }catch(err){
        return {err : err.message}
    }
}

function validateToken(token){
    console.log("token" , token)
    try{
    const payload = jwt.verify(token , secret);
    return payload;
    }catch(err){
        return {err : err.message}
    }
}

module.exports = {
    generateToken,
    validateToken
}