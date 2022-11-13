const { User } = require("../models/user");
const { Badge } = require("../models/badge");

module.exports = {
  addBadge: async (req, res) => {
    try {
      const { parkCode, parkName, parkImgUrl, userId } = req.body;
      await Badge.create({ parkCode, parkName, parkImgUrl, userId });
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN addBadge");
      console.log(error);
      res.sendStatus(400);
    }
  },

  getCurrentUserBadges: async (req, res) => {
    try {
      const { userId } = req.params;
      const badges = await Badge.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(badges);
    } catch (error) {
      console.log("ERROR IN getCurrentUserBadges");
      console.log(error);
      res.sendStatus(400);
    }
  },

  deleteBadge: async (req, res) => {
    try {
      const { id } = req.params;
      await Badge.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN getCurrentUserPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
