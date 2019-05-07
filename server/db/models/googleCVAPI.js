const vision = require('@google-cloud/vision');

class GoogleCloudVisionAPI {
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
  }
  getLabels() {
    return this.labels;
  }
}

module.exports = GoogleCloudVisionAPI;
