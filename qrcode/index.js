const speakeasy = require ('speakeasy');
const qrcode = require ('qrcode')

var secret = speakeasy.generateSecret({
    name : "Natharuch"
})
    console.log(secret)

qrcode.toDataURL(secret.otpauth_url, (err,data)=>{
    console.log (data)
})