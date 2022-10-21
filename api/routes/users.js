var express = require("express");
var router = express.Router();
const user = require("../models/user");
router.post("/addUser", (req, res) => {
  const date = new Date();

  const newUser = new user({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    cell: req.body.cell,
    created: date.toLocaleDateString(),
    deleted: false,
  });
  user
    .find({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return res.status(401).json({ message: "Email already registered" });
      } else {
        newUser.save(function (err, doc) {
          if (err) return console.error(err);
          return res.status(200).json({ message: "User added" });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.get("/getUsers/:search", (req, res) => {
  if (req.params.search === "All") {
    user.find({}).exec((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  } else {
    user.find({ name: req.params.search }).exec((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  }
});
module.exports = router;
