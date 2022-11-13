// requiring and configuring everything from dotenv that we are going to need
require("dotenv").config();
// requiring express and cors
const express = require("express");
const cors = require("cors");

const { sequelize } = require("./util/database");
const { SERVER_PORT } = process.env;
const { User } = require("./models/user");
const { Badge } = require("./models/badge");
const { getCurrentUserBadges } = require("./controllers/badges");
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const { addBadge } = require("./controllers/badges");
// setting variable app to express() so we do not have to say that over and over again
const app = express();
// we want JSON data!
app.use(express.json());
app.use(cors());

Badge.hasMany(User, { foreignKey: "userId" });
User.hasMany(Badge, { foreignKey: "id" });

//AUTH
app.post("/register", register);
app.post("/login", login);

// CRUD POSTS - auth required
app.post("/badges", addBadge);
// letting the back end know what is going to need auth to do
app.get("/userbadges/:userId", isAuthenticated, getCurrentUserBadges);
// app.post("/posts", isAuthenticated, addBadge);
// app.delete("/posts/:id", isAuthenticated, deleteBadge);

// the force: true is for development -- it DROPS tables!!!
sequelize
  .sync({ force: true })
  // sequelize.sync()
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`db sync successful & server running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
