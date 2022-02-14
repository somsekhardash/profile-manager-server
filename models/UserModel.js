import mongo from "mongoose";
const { Schema: _Schema, model } = mongo;
const Schema = _Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  status: { type: String, required: true },
});

export default model("User", UserSchema);