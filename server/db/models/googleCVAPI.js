const vision = require('@google-cloud/vision');
const { Label } = require('./label');
const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

class GoogleCVAPI {
  constructor() {
    this.labels = [];
  }
  async setLabels(aFile) {
    const client = new vision.ImageAnnotatorClient({
      keyFilename: './API.json'
    });

    // Performs label detection on the image file
    const [result] = await client.labelDetection(aFile);
    const labels = result.labelAnnotations;
    labels.forEach(label => {
      this.labels.push(label.description);
    });
    //console.log(this.labels);
  }
  
  async getMostFrequentCities() {
    let labels;
    await redisClient.get('idAndLabels', async function(reply) {
      if (reply) {
        labels = JSON.parse(reply);
      } else {
        labels = await Label.findAll({ attributes: ['id', 'name'] });
        redisClient.set('idAndLabels', JSON.stringify(labels));
      }
    });

    const uniqueLabelOutput = new Set([]);

    this.labels.forEach(label =>
      labels.forEach(labelEl => {
        let foundLabel = label.toLowerCase();
        if (foundLabel.includes(labelEl.name)) {
          uniqueLabelOutput.add(labelEl.name);
        }
      })
    );
    let setArray = Array.from(uniqueLabelOutput);

    let locationNames = await Promise.all(
      setArray.map(async currLabel => {
        let labelSearchResult = await Label.findOne({
          where: {
            name: currLabel
          }
        });

        let location = await labelSearchResult.getLocations();

        const locationList = location.map(currLocation => {
          return currLocation.dataValues.name;
        });

        return locationList;
      })
    );

    let locationOccurence = {};

    locationNames.forEach(currLocationName => {
      currLocationName.forEach(names => {
        if (!locationOccurence[names]) {
          locationOccurence[names] = 1;
        } else {
          locationOccurence[names] += 1;
        }
      });
    });

    let bestCities = [];
    let cityMatches = setArray.length;

    while (bestCities.length < 5) {
      for (let key in locationOccurence) {
        if (locationOccurence[key] === cityMatches) {
          bestCities.push(key);
        }
      }
      cityMatches--;
    }

    console.log(bestCities);
  }
}

const googleCV = new GoogleCVAPI();

module.exports = googleCV;
