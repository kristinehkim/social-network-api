const { User, Thought } = require('../models');
// const Thought = require('../models/Thought');

const userController = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v'); //this part?

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser({ body }, res) {
    //{body} instead of req
    try {
      const user = await User.create(body); //since {body}, you don't need to put req.body just body
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts} });
      res.json({ message: 'User and thoughts deleted!' });
        // { users: req.params.userId },
        // { $pull: { users: req.params.userId } },
        // { new: true }
      // )

      // if (!thought) {
      //   return res.status(404).json({
      //     message: 'User deleted, but no thoughts found',
      //   });
      // }

      // res.json({ message: 'User successfully deleted'});
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend to user's friend list
  async addFriend(req, res) {
    console.log('You are adding a new friend');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
        .status(404)
        .json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
        .status(404)
        .json({ message: 'No user found with this ID' });
      }

      res.json(user);
    } catch(err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
