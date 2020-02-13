const bcrypt = require("bcrypt");

console.log(bcrypt.hashSync("passowrd", 9));
/**
 * $2b$09$Vll3ZZiSqfyC3roieEA/M.q.fJ6QhDItjDTZxrdVRBjHXWC6EvIVC
 */
