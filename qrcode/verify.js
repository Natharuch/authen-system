const speakeasy = require('speakeasy')

var verified = speakeasy.totp.verify({
    secret: '!s^E,k/7,WGo$]mPQ5w{Pr&Ug8hW9uAz',
    encoding :'ascii',
    token : '774157'
})
console.log(verified)