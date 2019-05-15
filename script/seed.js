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
    { name: 'paris', longitude: 2.3522, latitude: 48.8566, code: 'PAR' }, // 0
    { name: 'reykjavik', longitude: -21.9426, latitude: 64.1466, code: 'REK' },
    { name: 'oslo', longitude: 10.7522, latitude: 59.9139, code: 'OSL' },
    { name: 'havana', longitude: -82.3666, latitude: 23.1136, code: 'HAV' },
    { name: 'tokyo', longitude: 139.6503, latitude: 35.6762, code: 'TYO' },
    { name: 'ibiza', longitude: 1.4821, latitude: 39.02, code: 'IBZ' }, // 5
    { name: 'copenhagen', longitude: 12.5683, latitude: 55.6761, code: 'CPH' },
    { name: 'new york', longitude: -74.006, latitude: 40.7128, code: 'NYC' },
    { name: 'miami', longitude: -80.1918, latitude: 25.7617, code: 'MIA' },
    {
      name: 'new orleans',
      longitude: -90.0715,
      latitude: 29.9511,
      code: 'MSY'
    },
    {
      name: 'san francisco',
      longitude: -122.4194,
      latitude: 37.7749,
      code: 'SFO'
    }, // 10
    { name: 'sao paulo', longitude: -46.6333, latitude: -23.5505, code: 'SAO' },
    { name: 'venice', longitude: 12.3155, latitude: 45.4408, code: 'VCE' },
    { name: 'vienna', longitude: 16.3738, latitude: 48.2082, code: 'VDD' },
    { name: 'prague', longitude: 14.4378, latitude: 50.0755, code: 'PRG' },
    { name: 'milan', longitude: 9.19, latitude: 45.4642, code: 'MXP' }, // 15
    { name: 'bali', longitude: 115.092, latitude: -8.3405, code: 'BAJ' },
    { name: 'macau', longitude: 113.5429, latitude: 22.1987, code: 'MFM' },
    { name: 'monaco', longitude: 7.4246, latitude: 43.7384, code: 'XMM' },
    { name: 'barcelona', longitude: 2.1734, latitude: 41.3851, code: 'BCN' },
    { name: 'montreal', longitude: -73.5673, latitude: 45.5017, code: 'YUL' }, // 20
    { name: 'seoul', longitude: 126.978, latitude: 37.5665, code: 'SEL' },
    { name: 'sicily', longitude: 14.0154, latitude: 37.6, code: 'PMO' },
    { name: 'amorgos', longitude: 25.8877, latitude: 36.84, code: 'ATH' },
    { name: 'bahamas', longitude: -77.3963, latitude: -25.0343, code: 'NAS' },
    { name: 'barbuda', longitude: -61.7713, latitude: 17.6266, code: 'BBQ' }, // 25
    { name: 'barbados', longitude: -59.5432, latitude: 13.1939, code: 'BGI' },
    { name: 'cyprus', longitude: 33.4299, latitude: 35.1264, code: 'LCA' },
    { name: 'auckland', longitude: 174.7633, latitude: -36.8485, code: 'AKL' },
    { name: 'aruba', longitude: 69.9683, latitude: 12.5211, code: 'AUA' },
    { name: 'adelaide', longitude: 138.6007, latitude: 34.9285, code: 'ADL' }, // 30
    { name: 'acapulco', longitude: -99.8237, latitude: 16.8531, code: 'ACA' },
    { name: 'cancun', longitude: -86.8515, latitude: 21.1619, code: 'CUN' },
    {
      name: 'bora bora',
      longitude: -151.7415,
      latitude: -16.5004,
      code: 'BOB'
    },
    { name: 'biarritz', longitude: -1.5586, latitude: 43.4832, code: 'BIQ' },
    { name: 'shanghai', longitude: 121.4737, latitude: 31.2304, code: 'SHA' }, // 35
    { name: 'bermuda', longitude: -64.7505, latitude: 32.3078, code: 'BDA' },
    { name: 'casablanca', longitude: -7.5898, latitude: 33.5731, code: 'CAS' },
    { name: 'seattle', longitude: -122.3321, latitude: 47.6062, code: 'SEA' },
    { name: 'nice', longitude: 7.262, latitude: 43.7102, code: 'NCE' },
    { name: 'durres', longitude: 19.4565, latitude: 41.3246, code: 'TIA' }, // 40
    { name: 'kathmandu', longitude: 85.324, latitude: 27.7172, code: 'KTM' },
    { name: 'rapa nui', longitude: -109.3497, latitude: -27.1127, code: 'IPC' },
    { name: 'tongariro', longitude: 175.5802, latitude: -39.2727, code: 'AKL' },
    { name: 'galapagos', longitude: -91.1425, latitude: -0.7772, code: 'GPS' },
    { name: 'guadeloupe', longitude: 61.551, latitude: 16.265, code: 'GBJ' }, // 45
    { name: 'sapporo', longitude: 141.3545, latitude: 43.0618, code: 'SPK' },
    { name: 'hammamet', longitude: 10.6225, latitude: 36.4074, code: 'NBE' },
    { name: 'warsaw', longitude: 21.0122, latitude: 52.2297, code: 'WAW' },
    { name: 'london', longitude: -0.1278, latitude: 51.5074, code: 'LCY' },
    { name: 'hvar', longitude: 16.4411, latitude: 43.1729, code: 'SPU' }, // 50
    {
      name: 'vatican city',
      longitude: 12.4534,
      latitude: 41.9029,
      code: 'CIA'
    },
    {
      name: 'jeffreys bay',
      longitude: 24.9102,
      latitude: 34.0507,
      code: 'PLZ'
    },
    { name: 'kauai', longitude: -159.5261, latitude: 22.0964, code: 'LIH' },
    { name: 'honolulu', longitude: -157.8583, latitude: 21.3069, code: 'HIK' } // 54
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
    createdLocations[0].setLabels([5,9,13,34,19,26,40,20,33,38]),
    createdLocations[1].setLabels([1,5,2,17,18,37,19,15,20,10,31]),
    createdLocations[2].setLabels([2,9,13,34,6,19,28,20,33,14]),
    createdLocations[3].setLabels([3,5,13,27,12,15,20,10,14,31]),
    createdLocations[4].setLabels([1,5,9,34,6,15,10,21,36,39]),
    createdLocations[5].setLabels([3,5,9,34,6,32,19,20,33,14]),
    createdLocations[6].setLabels([1,5,9,13,34,6,19,20,33,39]),
    createdLocations[7].setLabels([1,3,5,12,40,15,10,14,21,39]),
    createdLocations[8].setLabels([5,9,13,6,40,30,14,21,38]),
    createdLocations[9].setLabels([1,3,5,13,6,32,16,28,15,30]),
    createdLocations[10].setLabels([1,3,5,9,12,8,15,20,14,38]),
    createdLocations[11].setLabels([1,9,13,27,29,19,26,20,14,38]),
    createdLocations[12].setLabels([5,9,13,34,6,19,26,28,20,33]),
    createdLocations[13].setLabels([9,27,34,29,19,26,28,20,33,14]),
    createdLocations[14].setLabels([1,5,13,27,19,26,20,33,14,34]),
    createdLocations[15].setLabels([3,4,24,29,12,15,10,14,25,36]),
    createdLocations[16].setLabels([1,5,4,24,6,12,40,15,10,21]),
    createdLocations[17].setLabels([1,5,4,9,13,16,26,40,14,36]),
    createdLocations[18].setLabels([1,3,4,13,40,15,20,33,10,14]),
    createdLocations[19].setLabels([1,5,4,9,28,20,30,33,14,34]),
    createdLocations[20].setLabels([1,3,5,9,13,6,15,10,21,34]),
    createdLocations[21].setLabels([3,4,9,13,6,32,7,15,20,14]),
    createdLocations[22].setLabels([3,5,24,17,12,16,15,14,31,36]),
    createdLocations[23].setLabels([3,24,17,12,15,10,14,31,36,38]),
    createdLocations[24].setLabels([3,4,24,6,17,32,12,15,10,31,36,38,34]),
    createdLocations[25].setLabels([1,3,4,9,29,16,19,15,20,10,36]),
    createdLocations[26].setLabels([1,5,4,6,16,28,15,30,14,31]),
    createdLocations[27].setLabels([3,24,12,8,15,10,14,31,36,38]),
    createdLocations[28].setLabels([1,3,5,9,13,6,40,15,30,10,38]),
    createdLocations[29].setLabels([1,3,5,24,12,16,40,15,10,14]),
    createdLocations[30].setLabels([3,5,6,18,12,16,40,15,10]),
    createdLocations[31].setLabels([3,6,18,32,12,15,10,25,31,36,38]),
    createdLocations[32].setLabels([3,13,24,27,32,28,40,15,10]),
    createdLocations[33].setLabels([1,4,9,13,26,14,21,34,39]),
    createdLocations[34].setLabels([3,4,13,24,6,17,15,10,14,36]),
    createdLocations[35].setLabels([1,5,4,9,13,24,6,15,10,14]),
    createdLocations[36].setLabels([1,5,4,9,13,6,16,14,21,39]),
    createdLocations[37].setLabels([1,3,5,4,9,13,27,15,10,14]),
    createdLocations[38].setLabels([3,5,4,9,27,7,16,40,10,14]),
    createdLocations[39].setLabels([1,5,4,9,13,6,16,14]),
    createdLocations[40].setLabels([3,9,6,18,29,19,15,10,14,25,36,34]),
    createdLocations[41].setLabels([1,5,4,9,13,6,18,37,8,14]),
    createdLocations[42].setLabels([5,9,24,18,12,16,28,14,31,36]),
    createdLocations[43].setLabels([1,3,5,4,9,6,18,10,14]),
    createdLocations[44].setLabels([1,5,9,13,6,19,20,14,34]),
    createdLocations[45].setLabels([1,5,9,13,6,19,20,14,34]),
    createdLocations[46].setLabels([3,5,4,9,6,7,15,10,14]),
    createdLocations[47].setLabels([5,9,13,29,19,20,33,14,34]),
    createdLocations[48].setLabels([1,3,5,9,13,6,15,10,14,36]),
    createdLocations[49].setLabels([3,9,24,6,17,18,32,12,16,15,10,14,31,36,38]),
    createdLocations[50].setLabels([3,4,9,13,24,16,15,10,38]),
    createdLocations[51].setLabels([3,9,6,32,7,16,15,10,36]),
    createdLocations[52].setLabels([3,4,24,6,17,18,37,12,15,10,31,36]),
    createdLocations[53].setLabels([3,4,9,13,29,8,15,10]),
    createdLocations[54].setLabels([3,4,24,17,18,32,37,12,16,15,10,31,36,38])
  ]);

  await Promise.all([
    User.create({
      name: 'Cody The Dog',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      name: 'Travel McTravelFace',
      email: 'travel@email.com',
      password: '123'
    }),
    User.create({
      name: 'Bon Voyage',
      email: 'bvh@email.com',
      password: 'trip'
    }),
    User.create({
      name: 'Hotels Guy',
      email: 'hg@email.com',
      password: 'stay'
    })
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

// personal use: loop through our location names
/*
const LOCATIONS = [
  'paris', 'reykjavik', 'oslo', 'havana', 'tokyo', 'ibiza', 'copenhagen', 'new york', 'miami',
  'new orleans', 'san francisco', 'sao paulo', 'venice', 'vienna', 'prague', 'milan', 'bali',
  'macau', 'monaco', 'barcelona', 'montreal', 'seoul', 'sicily', 'amorgos', 'bahamas', 'barbuda',
  'barbados', 'cyprus', 'auckland', 'aruba', 'adelaide', 'acapulco', 'cancun', 'bora bora',
  'biarritz', 'shanghai', 'bermuda', 'casablanca', 'seattle', 'nice', 'durres', 'kathmandu',
  'rapa nui', 'tongariro', 'galapagos', 'guadeloupe', 'sapporo', 'hammamet', 'warsaw', 'london',
  'hvar', 'vatican city', 'jeffreys bay', 'kauai', 'honolulu'
];
function* getLoc() {
	let i = 0;
	while (true) {
		if (i === LOCATIONS.length) i = 0;
    var textArea = document.createElement("textarea");
    textArea.value = LOCATIONS[i];
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove()
		yield( `${LOCATIONS[i]} ${i++}` );
    }
}
const locMaker = getLoc();
function nextLoc() { console.log(locMaker.next().value); }
*/
