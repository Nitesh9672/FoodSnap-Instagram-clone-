const express = require("express");
const app = express();
const PORT = 3000;

const mongoose = require("mongoose");
const hbs = require("hbs");
const router = require("./routes/posts");
const User = require("./models/users");

const cookieParser = require("cookie-parser");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");
const passport = require("./auth/passport");

hbs.registerPartial(__dirname + "/views/partials", function (err) {});

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
app.use(cookieParser());
app.use(
  session({
    secret: "asdjbaskdadbaskdv",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes/login"));

app.use("/signup", require("./routes/signup"));

app.get("/profile", async (req, res) => {
  console.log(req.user);
  let data = await User.findOne({ _id: req.user }).populate("posts");
  res.render("profile", {
    data: data.posts,
    username: req.user.username,
  });
});

app.use("/posts", router);

// mongoConnect().then(() => {
//   app.listen(PORT, () => {
//     console.log(`server started at port ${PORT}`);
//   });
// });
mongoose
  .connect("mongodb://127.0.0.1:27017/myFoodApp")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
