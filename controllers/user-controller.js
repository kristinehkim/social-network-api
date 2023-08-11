const User = require("../models/User");
const Thought = require("../models/Thought");

const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createUser({ body }, res) {
    //{body} instead of req
    try {
      const user = await User.create(body); //since {body}, you don't need to put req.body just body
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select("__v");

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
module.exports = userController;
