const mongoose = require("mongoose");

const dataSchema =   mongoose.Schema({
        fName: { type: String, require: true },
        lName: { type: String, require: true },
        email: { type: String, },
        userName: { type: String, unique: true,minLength: 6  },
        password: { type: String, minLength: 6 ,require: true },
    },{ versionKey: false });

const userModel = mongoose.model("userData", dataSchema);
module.exports = userModel;
