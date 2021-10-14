//암호화 모듈
const crypto = require('crypto');

function encrypt(pw) {

    return crypto.createHash('sha512').update(pw).digest('hex')
  
  }


module.exports.encrypt = encrypt;
