// Generate Token for JWT
const TOKEN = require("crypto").randomBytes(64).toString("hex");

console.log("Here is ur token generated : \n" + TOKEN);
