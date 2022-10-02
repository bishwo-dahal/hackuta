const Router = require("express").Router();
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const fs = require("fs");
Router.get("/call", async (req, res) => {
  const twiml = new VoiceResponse();

  const animal = {
    type: "",
    name: "",
    age: 0,
    other_info: "",
  };

  twiml.say(
    "Hello, Hope you are doing good. We are statefarm team. We do all kind of pet Insurance. Do you have a dog or cat or any other animal?"
  );
  const animalType = twiml
    .record({
      timeout: 2,
      transcribe: true,
      action: "/api/type",
      method: "POST",
      recordingStatusCallback: 10,
    })
    .toString()
    .toUpperCase();
  console.log(animalType);

  // if (animalType.includes("DOG")) {
  //   animalType.type = "DOG" || "other";
  //   twiml.say("You Choose Dog. What is your dog name?");
  // } else if (animalType.includes("CAT")) {
  //   animalType.type = "CAT" || "other";
  //   twiml.say("You chose cat. What is your cat name?");
  // } else {
  //   animalType.type = animalType || "other";
  //   twiml.say(`You said ${animalType}. What is its name?`);
  // }

  // const name = twiml
  //   .record({
  //     timeout: 5,
  //     transcribe: true,
  //   })
  //   .toString();
  // animal.name = name || "bruno";

  // twiml.say("What is it's age?");

  // const age = twiml
  //   .record({
  //     timeout: 5,
  //     transcribe: true,
  //   })
  //   .toString();
  // if (isNaN(age)) {
  //   animal.age = 0;
  // } else {
  //   animal.age = age;
  // }
  // twiml.say(`Do you have any other info about animal?`);
  // const other_info = twiml
  //   .record({
  //     timeout: 10,
  //     transcribe: true,
  //   })
  //   .toString();
  // animal.other_info = other_info || "other";

  // twiml.say(
  //   `You said following things Name: ${animal.name}, Age:${animal.age}, Type: ${
  //     animal.type
  //   }, Special info: ${
  //     animal.other_info || "hi"
  //   }. Agent will be shortly in contact with you.`
  // );

  // await Message.create({
  //   name: animal.name || "name",
  //   type: animal.type || "type",
  //   age: animal.age || 1,
  //   other_info: animal.other_info || "other",
  // });

  res.type("text/xml");
  res.end(twiml.toString());
});

Router.post("/type", (req, res) => {
  const twiml = new VoiceResponse();

  console.log(req.body);

  twiml.say(
    `We would like to get more information on this. What is the age of your pet?`
  );

  const animalAge = twiml
    .record({
      timeout: 2,
      transcribe: true,
      action: "/api/age",
      method: "POST",
      recordingStatusCallback: 10,
    })
    .toString()
    .toUpperCase();
  console.log(animalAge);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

Router.post("/age", (req, res) => {
  const twiml = new VoiceResponse();

  console.log(req.body);

  twiml.say(
    `Thank you for your information, One of agent would reach to you soon.`
  );

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

const multer = require("multer");
const path = require("path");
const { Message } = require("./models");

const destination = (req, file, cb) => {
  cb(null, "static/");
};

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const uploadImage = multer({
  storage,
});

// don't want to make filename more than 105 characters so restricting it to 10
const createValidFileName = (usingFileName) =>
  slugify(usingFileName, "-").length <= 100
    ? slugify(usingFileName, { replacement: "-", lower: true })
    : slugify(usingFileName, { replacement: "-", lower: true }).substr(0, 100);

Router.post("/info", uploadImage.single("file"), async (req, res) => {
  const errors = [];
  let returningData = {};
  const { file } = req;
  const { email, type, age, other_info, name } = req.body;

  try {
    console.log(file);
    await Message.create({
      email,
      type,
      age,
      other_info,
      image: file.filename,
      name,
    });

    returningData = file;
  } catch (error) {
    const thrown = thrownError(error);
    errors.push(thrown.length === 0 ? error : thrown);
  }
  if (errors.length == 0) {
    res.send(returningData);
  } else {
    res.send("error");
  }
});

Router.get("/messages/all", async (req, res) => {
  const allMessages = await Message.findAll();
  res.send(allMessages);
});

module.exports = Router;
