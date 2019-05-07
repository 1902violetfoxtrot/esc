// const path = require('path');
// const multer = require('multer');
const vision = require('@google-cloud/vision');
const router = require('express').Router();
const { Label } = require("../db/models/");
const { Locations } = require("../db/models/");
const redis = require("redis");
const redisClient = redis.createClient();
module.exports = router;

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

async function quickstart(aFile) {
  // Imports the Google Cloud client library

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './API.json'
  });

  // Caching database query with redis
  let labels;

  await redisClient.get("idAndLabels", async function(reply) {
    if (reply){
      labels = (JSON.parse(reply))
    } else {
      labels = await Label.findAll({attributes: ['id', 'name']});
      redisClient.set("idAndLabels", JSON.stringify(labels));
    }
  });
  
  // Performs label detection on the image file

  const uniqueLabelOutput = new Set([]);
  const [result] = await client.labelDetection(aFile);

  result.labelAnnotations.forEach(label => {
    labels.forEach(labelEl => {
      let foundLabel = label.description.toLowerCase();
      if (foundLabel.includes(labelEl.name)) {
        uniqueLabelOutput.add(labelEl.name);
      }
    });
  });

  let setArray = Array.from(uniqueLabelOutput);
  
  let locationNames = await Promise.all(setArray.map(async currLabel => {
    let labelSearchResult = await Label.findOne({
      where: {
        name: currLabel
      }
    })

    let location = await labelSearchResult.getLocations();

    const locationList = location.map(currLocation => {
      return currLocation.dataValues.name
    })

    return locationList;
  }))

  let locationOccurence = {};

    locationNames.forEach(currLocationName => {
      currLocationName.forEach(names => {
        if (!locationOccurence[names]) {
          locationOccurence[names] = 1
        } else {
          locationOccurence[names] += 1
        }
      })
    })
  
  let bestCities = []
  let cityMatches = setArray.length;

  while (bestCities.length < 5) {
    for (let key in locationOccurence) {
      if (locationOccurence[key] === cityMatches) {
        bestCities.push(key)
      }
    }
    cityMatches--;
  }

  console.log(bestCities)
}


router.post('/', (req, res, next) => {
  try {
    res.sendStatus(200);
    quickstart(req.files.file.path);
  } catch (error) {
    next(error);
  }
});
