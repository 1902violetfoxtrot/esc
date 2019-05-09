const Instagram = require('node-instagram').default;

class InstagramAPI {
  constructor() {
    this.images = [];
  }

  async setImages(token) {
    const instagram = new Instagram({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      accessToken: token
    });

    const { data } = await instagram.get('users/self/media/recent');
    data.map(image => {
      this.images.push(image.images.standard_resolution.url);
    });
  }
  getImages() {
    // console.log(this.labels);
  }
}

const instagramAPI = new InstagramAPI();

module.exports = instagramAPI;
