const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

router.use(bodyParser.json());
let waifu = [];
const readWaifuData = function () {
  const data = fs.readFileSync(
    path.resolve(__dirname, "../data.json"),
    "utf-8"
  );
  waifu = JSON.parse(data);
};

const writeWaifuData = function () {
  const data = JSON.stringify(waifu, null, 2);
  fs.readFileSync(path.resolve(__dirname, "../data.json"), data, "utf-8");
};
readWaifuData();

router.get("/", (req, res) => {
  res.json(waifu);
});

router.post("/", (req, res) => {
  const data = req.body;
  const waifuWithId = { mainId: uuidv4(), ...data };
  waifu.push(waifuWithId);

  res.end("you have added a new waifu to the list");
});

router.get("/:id", (req, res) => {
  const ID = req.params.id;
  const data = waifu.find((el) => {
    return el.mainId == ID;
  });
  res.json(data);
});

router.delete("/:id", (req, res) => {
  const ID = req.params.id;
  const dataIndex = waifu.findIndex((el) => {
    return el.mainId == ID;
  });
  console.log(dataIndex);

  res.end(`${waifu[dataIndex].name} has been removed from the list`);
  waifu.splice(dataIndex, 1);
});

router.patch("/:id", (req, res) => {
  const ID = req.params.id;
  const {
    name,
    anime,
    age,
    birthday,
    gender,
    description,
    image,
    traits,
    first_appearance,
    voice_actor,
    rating,
  } = req.body;

  const user = waifu.find((el) => {
    return (el.mainId = ID);
  });
  if (name) {
    user.name = name;
  }
  if (anime) {
    user.anime = anime;
  }
  if (age) {
    user.age = age;
  }
  if (birthday) {
    user.birthday = birthday;
  }
  if (gender) {
    user.gender = gender;
  }
  if (description) {
    user.description = description;
  }
  if (image) {
    user.image = image;
  }
  if (traits) {
    user.traits = traits;
  }
  if (first_appearance) {
    user.first_appearance = first_appearance;
  }
  if (voice_actor) {
    user.voice_actor = voice_actor;
  }
  if (rating) {
    user.rating = rating;
  }

  res.end(`waifu with the id ${user.mainId}has been updated`);
});

module.exports = router;
