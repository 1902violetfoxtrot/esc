'use strict';

const db = require('../server/db');
const { User, Location, Label } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const labels = [
    { name: 'urban' }, // 0
    { name: 'arctic' },
    { name: 'beach' },
    { name: 'mountain' },
    { name: 'park' },
    { name: 'forest' }, // 5
    { name: 'plain' },
    { name: 'desert' },
    { name: 'historical' },
    { name: 'ocean' },
    { name: 'festival' }, // 10
    { name: 'tropical' },
    { name: 'architecture' },
    { name: 'nature' },
    { name: 'cruise' },
    { name: 'canyon' }, // 15
    { name: 'geyser' },
    { name: 'volcano' },
    { name: 'museum' },
    { name: 'cathedral' },
    { name: 'amusement park' }, // 20
    { name: 'indoors' },

    { name: 'outdoors' },
    { name: 'resort' },
    { name: 'camp' },
    { name: 'restaurant' }, // 25
    { name: 'orchard' },
    { name: 'valley' },
    { name: 'temple' },
    { name: 'lake' },
    { name: 'waterfall' }, // 30
    { name: 'lighthouse' },
    { name: 'statue' },
    { name: 'memorial' },
    { name: 'road' },
    { name: 'island' }, // 35
    { name: 'animals' },
    { name: 'flowers' },
    { name: 'aquarium' },
    { name: 'casino' } // 39
  ];

  const locations = [
    { name: 'paris', longitude: 2.3522, latitude: 48.8566 }, // 0
    { name: 'reykjavik', longitude: -21.9426, latitude: 64.1466 },
    { name: 'oslo', longitude: 10.7522, latitude: 59.9139 },
    { name: 'havana', longitude: -82.3666, latitude: 23.1136 },
    { name: 'tokyo', longitude: 139.6503, latitude: 35.6762 },
    { name: 'ibiza', longitude: 1.4821, latitude: 39.02 }, // 5
    { name: 'copenhagen', longitude: 12.5683, latitude: 55.6761 },
    { name: 'new york', longitude: -74.006, latitude: 40.7128 },
    { name: 'miami', longitude: -80.1918, latitude: 25.7617 },
    { name: 'new orleans', longitude: -90.0715, latitude: 29.9511 },
    { name: 'san francisco', longitude: -122.4194, latitude: 37.7749 }, // 10
    { name: 'sao paulo', longitude: -46.6333, latitude: -23.5505 },
    { name: 'venice', longitude: 12.3155, latitude: 45.4408 },
    { name: 'vienna', longitude: 16.3738, latitude: 48.2082 },
    { name: 'prague', longitude: 14.4378, latitude: 50.0755 },
    { name: 'milan', longitude: 9.19, latitude: 45.4642 }, // 15
    { name: 'bali', longitude: 115.092, latitude: -8.3405 },
    { name: 'macau', longitude: 113.5429, latitude: 22.1987 },
    { name: 'monaco', longitude: 7.4246, latitude: 43.7384 },
    { name: 'barcelona', longitude: 2.1734, latitude: 41.3851 },
    { name: 'montreal', longitude: -73.5673, latitude: 45.5017 }, // 20
    { name: 'seoul', longitude: 126.978, latitude: 37.5665 },
    { name: 'sicily', longitude: 14.0154, latitude: 37.6 },
    { name: 'amorgos', longitude: 25.8877, latitude: 36.84 },
    { name: 'bahamas', longitude: -77.3963, latitude: -25.0343 },
    { name: 'barbuda', longitude: -61.7713, latitude: 17.6266 }, // 25
    { name: 'barbados', longitude: -59.5432, latitude: 13.1939 },
    { name: 'cyprus', longitude: 33.4299, latitude: 35.1264 },
    { name: 'auckland', longitude: 174.7633, latitude: 36.8485 },
    { name: 'aruba', longitude: 69.9683, latitude: 12.5211 },
    { name: 'adelaide', longitude: 138.6007, latitude: 34.9285 }, // 30
    { name: 'acapulco', longitude: -99.8237, latitude: 16.8531 },
    { name: 'cancun', longitude: -86.8515, latitude: 21.1619 },
    { name: 'bora bora', longitude: -151.7415, latitude: -16.5004 },
    { name: 'biarritz', longitude: -1.5586, latitude: 43.4832 },
    { name: 'shanghai', longitude: 121.4737, latitude: 31.2304 }, // 35
    { name: 'bermuda', longitude: -64.7505, latitude: 32.3078 },
    { name: 'casablanca', longitude: -7.5898, latitude: 33.5731 },
    { name: 'seattle', longitude: -122.3321, latitude: 47.6062 },
    { name: 'nice', longitude: 7.262, latitude: 43.7102 },
    { name: 'durres', longitude: 19.4565, latitude: 41.3246 }, // 40
    { name: 'kathmandu', longitude: 85.324, latitude: 27.7172 },
    { name: 'rapa nui', longitude: -109.3497, latitude: -27.1127 },
    { name: 'tongariro', longitude: 175.5802, latitude: -39.2727 },
    { name: 'galapagos', longitude: -91.1425, latitude: -0.7772 },
    { name: 'guadeloupe', longitude: 61.551, latitude: 16.265 }, // 45
    { name: 'sapporo', longitude: 141.3545, latitude: 43.0618 },
    { name: 'hammamet', longitude: 10.6225, latitude: 36.4074 },
    { name: 'warsaw', longitude: 21.0122, latitude: 52.2297 },
    { name: 'london', longitude: -0.1278, latitude: 51.5074 },
    { name: 'hvar', longitude: 16.4411, latitude: 43.1729 }, // 50
    { name: 'vatican city', longitude: 12.4534, latitude: 41.9029 },
    { name: 'jeffreys bay', longitude: 24.9102, latitude: 34.0507 },
    { name: 'kauai', longitude: -159.5261, latitude: 22.0964 },

    { name: 'honolulu', longitude: -157.8583, latitude: 21.3069 } // 54
  ];

  const [createdLabels, createdLocations] = await Promise.all([
    Label.bulkCreate(labels, {
      validate: true,
      individualHooks: true
    }),

    Location.bulkCreate(locations, {
      validate: true,
      individualHooks: true
    })
  ]);

  await Promise.all([
    createdLabels[0].setLocations([
      createdLocations[0],
      createdLocations[1],
      createdLocations[2],
      createdLocations[3],
      createdLocations[4],
      createdLocations[6],
      createdLocations[7],
      createdLocations[8],
      createdLocations[9],
      createdLocations[10],
      createdLocations[11],
      createdLocations[12],
      createdLocations[13],
      createdLocations[14],
      createdLocations[15],
      createdLocations[16],
      createdLocations[17],
      createdLocations[18],
      createdLocations[19],
      createdLocations[20],
      createdLocations[21],
      createdLocations[22],
      createdLocations[24],
      createdLocations[25],
      createdLocations[26],
      createdLocations[27],
      createdLocations[28],
      createdLocations[29],
      createdLocations[30],
      createdLocations[31],
      createdLocations[32],
      createdLocations[33],
      createdLocations[34],
      createdLocations[35],
      createdLocations[36],
      createdLocations[37],
      createdLocations[38],
      createdLocations[39],
      createdLocations[40],
      createdLocations[41],
      createdLocations[42],
      createdLocations[43],
      createdLocations[45],
      createdLocations[46],
      createdLocations[48],
      createdLocations[49],
      createdLocations[50],
      createdLocations[51],
      createdLocations[52],
      createdLocations[54]
    ]), // urban
    createdLabels[1].setLocations([createdLocations[1]]), // arctic,
    createdLabels[2].setLocations([
      createdLocations[3],
      createdLocations[5],
      createdLocations[6],
      createdLocations[8],
      createdLocations[10],
      createdLocations[11],
      createdLocations[16],
      createdLocations[17],
      createdLocations[19],
      createdLocations[21],
      createdLocations[22],
      createdLocations[23],
      createdLocations[24],
      createdLocations[25],
      createdLocations[26],
      createdLocations[27],
      createdLocations[28],
      createdLocations[29],
      createdLocations[30],
      createdLocations[31],
      createdLocations[32],
      createdLocations[33],
      createdLocations[34],
      createdLocations[36],
      createdLocations[37],
      createdLocations[39],
      createdLocations[40],
      createdLocations[42],
      createdLocations[44],
      createdLocations[46],
      createdLocations[47],
      createdLocations[48],
      createdLocations[50],
      createdLocations[52],
      createdLocations[53],
      createdLocations[54]
    ]), // beach

    createdLabels[3].setLocations([
      createdLocations[1],
      createdLocations[3],
      createdLocations[5],
      createdLocations[11],
      createdLocations[16],
      createdLocations[17],
      createdLocations[18],
      createdLocations[19],
      createdLocations[20],
      createdLocations[21],
      createdLocations[22],
      createdLocations[23],
      createdLocations[26],
      createdLocations[27],
      createdLocations[28],
      createdLocations[30],
      createdLocations[34],
      createdLocations[35]
    ]), // mountain

    createdLabels[22].setLocations([
      createdLocations[1],
      createdLocations[3],
      createdLocations[5],
      createdLocations[16],
      createdLocations[22],
      createdLocations[23],
      createdLocations[25],
      createdLocations[26],
      createdLocations[27],
      createdLocations[28],
      createdLocations[30],
      createdLocations[31],
      createdLocations[32],
      createdLocations[33],
      createdLocations[34],
      createdLocations[39],
      createdLocations[40],
      createdLocations[41],
      createdLocations[42],
      createdLocations[43],
      createdLocations[44],
      createdLocations[45],
      createdLocations[46],
      createdLocations[47],
      createdLocations[50],
      createdLocations[52],
      createdLocations[53],
      createdLocations[54]
    ]), // outdoors
    createdLabels[23].setLocations([
      createdLocations[5],
      createdLocations[16],
      createdLocations[24],
      createdLocations[23],
      createdLocations[24],
      createdLocations[25],
      createdLocations[26],
      createdLocations[27],
      createdLocations[28],
      createdLocations[29],
      createdLocations[31],
      createdLocations[34],
      createdLocations[36],
      createdLocations[37],
      createdLocations[44],
      createdLocations[45],
      createdLocations[53],
      createdLocations[54]
    ]), // resort
    createdLabels[24].setLocations([
      createdLocations[16],
      createdLocations[28],
      createdLocations[30],
      createdLocations[31],
      createdLocations[33],
      createdLocations[42]
    ]), // camp
    createdLabels[25].setLocations([
      createdLocations[0],
      createdLocations[2],
      createdLocations[3],
      createdLocations[5],
      createdLocations[6],
      createdLocations[4],
      createdLocations[7],
      createdLocations[9],
      createdLocations[10],
      createdLocations[12],
      createdLocations[13],
      createdLocations[14],
      createdLocations[15],
      createdLocations[18],
      createdLocations[19],
      createdLocations[20],
      createdLocations[21],
      createdLocations[19],
      createdLocations[35],
      createdLocations[48]
    ]), // restaurant
    createdLabels[26].setLocations([
      createdLocations[3],
      createdLocations[12],
      createdLocations[13],
      createdLocations[14],
      createdLocations[15],
      createdLocations[34],
      createdLocations[39],
      createdLocations[40]
    ]) // orchard
  ]);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
