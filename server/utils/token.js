const config = require('config');
const jwt = require('jsonwebtoken');

const generateToken = data => {
    const token = jwt.sign({
        data
      },config.get('token.secret'),{ expiresIn: 60*60 });
    return token;
}

const  verifyToken = token => {
    try {
        //{ data: '615038f22de7ce86b746eb52', iat: 1633339103, exp: 1633339703 }
        return jwt.verify(token, config.get('token.secret')).data
    }
    catch (err) {
        return false
    }
}

module.exports = {
    generateToken,
    verifyToken
}