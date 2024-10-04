const { Schema, model } = require("mongoose");

const blacklistTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const BlacklistToken = model("BlacklistToken", blacklistTokenSchema);
module.exports = BlacklistToken;
