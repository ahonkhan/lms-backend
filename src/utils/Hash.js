const bcrypt = require("bcrypt");
class Hash {
  static make = async (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        // using 10 directly or this.saltRounds (if non-static)
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  };

  static check = async (password, hash) => {
    return await bcrypt.compare(password, hash);
  };
}
module.exports = Hash;
