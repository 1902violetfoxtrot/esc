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
    { name: 'adelaide', longitude: 138.6007, latitude: -34.9285, code: 'ADL' }, // 30
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
      name: "jeffrey's bay",
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
    createdLabels[0].setLocations(
      [
        // urban
        0,
        1,
        2,
        3,
        4,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        45,
        46,
        48,
        49,
        50,
        51,
        52,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[1].setLocations([[1]]), // arctic
    createdLabels[2].setLocations(
      [
        // beach
        3,
        5,
        6,
        8,
        10,
        11,
        16,
        17,
        19,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        36,
        37,
        39,
        40,
        42,
        44,
        46,
        47,
        48,
        50,
        52,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[3].setLocations(
      [
        // mountain
        1,
        3,
        5,
        11,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        26,
        27,
        28,
        30,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        43,
        44,
        46,
        47,
        48,
        50,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[4].setLocations(
      [
        // park
        0,
        1,
        2,
        3,
        4,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        45,
        46,
        48,
        49,
        50,
        51,
        52,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[5].setLocations(
      [
        // forest
        2,
        3,
        4,
        5,
        6,
        7,
        9,
        10,
        11,
        13,
        14,
        16,
        17,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        30,
        31,
        32,
        33,
        35,
        36,
        37,
        38,
        39,
        41,
        42,
        43,
        44,
        45,
        46,
        48,
        49,
        50,
        52,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[6].setLocations(
      [
        // plain
        4,
        12,
        20,
        21,
        22,
        23,
        27,
        28,
        30,
        40,
        50
      ].map(index => createdLocations[index])
    ),
    createdLabels[7].setLocations(
      [
        // desert
        11,
        29,
        43,
        47
      ].map(index => createdLocations[index])
    ),
    createdLabels[8].setLocations(
      [
        // historical
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[9].setLocations(
      [
        // ocean
        1,
        3,
        4,
        5,
        8,
        10,
        11,
        16,
        17,
        19,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        36,
        37,
        39,
        40,
        42,
        44,
        46,
        47,
        48,
        50,
        52,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[10].setLocations(
      [
        // festival
        // how to do this when it's time-sensitive?
      ].map(index => createdLocations[index])
    ),
    createdLabels[11].setLocations(
      [
        // tropical
        3,
        8,
        11,
        16,
        17,
        24,
        25,
        26,
        29,
        31,
        32,
        33,
        44,
        45,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[12].setLocations(
      [
        // architecture
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[13].setLocations(
      [
        // nature
        0,
        1,
        2,
        3,
        4,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        45,
        46,
        48,
        49,
        50,
        51,
        52,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[14].setLocations(
      [
        // cruise
        1,
        3,
        4,
        5,
        6,
        8,
        10,
        11,
        16,
        17,
        19,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        36,
        37,
        39,
        40,
        42,
        44,
        46,
        47,
        48,
        50,
        52,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[15].setLocations(
      [
        // canyon
        3,
        4,
        5,
        7,
        10,
        14,
        16,
        18,
        19,
        20,
        22,
        23,
        24,
        27,
        28,
        30,
        31,
        32,
        38,
        40,
        41,
        45,
        53,
        54
      ].map(index => createdLocations[index])
    ),
    createdLabels[16].setLocations(
      [1, 24, 25, 26, 36, 44, 53, 54].map(el => createdLocations[el])
    ), // geyser
    createdLabels[17].setLocations(
      [1, 4, 32, 33, 42, 43, 44, 45, 46, 53, 54].map(el => createdLocations[el])
    ), // volcano
    createdLabels[18].setLocations(
      [0, 1, 2, 4, 6, 7, 10, 12, 13, 14, 15, 20, 27, 42, 48, 49, 51].map(
        el => createdLocations[el]
      )
    ), // museum
    createdLabels[19].setLocations(
      [0, 1, 2, 3, 4, 6, 7, 12, 13, 14, 15, 19, 20, 22, 27, 49, 48, 51].map(
        el => createdLocations[el]
      )
    ), // cathedral
    createdLabels[20].setLocations(
      [0, 4, 5, 6, 7, 8, 9, 11, 17, 19, 20, 21, 35, 38, 48].map(
        el => createdLocations[el]
      )
    ), // amusement park
    createdLabels[21].setLocations(
      [0, 1, 2, 4, 6, 7, 20, 21, 35, 48, 49].map(el => createdLocations[el])
    ), // indoors
    createdLabels[22].setLocations(
      [
        1,
        3,
        5,
        16,
        22,
        23,
        25,
        26,
        27,
        28,
        30,
        31,
        32,
        33,
        34,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        50,
        52,
        53,
        54
      ].map(el => createdLocations[el])
    ), // outdoors
    createdLabels[23].setLocations(
      [5, 16, 24, 23, 25, 26, 27, 28, 29, 31, 34, 36, 37, 44, 45, 53, 54].map(
        el => createdLocations[el]
      )
    ), // resort
    createdLabels[24].setLocations(
      [16, 28, 30, 31, 33, 42].map(el => createdLocations[el])
    ), // camp
    createdLabels[25].setLocations(
      [0, 2, 3, 5, 6, 4, 7, 9, 10, 12, 13, 14, 15, 18, 19, 20, 21, 35, 48].map(
        el => createdLocations[el]
      )
    ), // restaurant
    createdLabels[26].setLocations(
      [3, 12, 13, 14, 15, 34, 39, 40].map(el => createdLocations[el])
    ), // orchard
    createdLabels[27].setLocations(
      [1, 2, 3, 10, 13, 14, 20, 28, 34, 45].map(el => createdLocations[el])
    ), // valley
    createdLabels[28].setLocations(
      [12, 13, 14, 15, 16, 27, 42, 47, 51].map(el => createdLocations[el])
    ), // temple
    createdLabels[29].setLocations(
      [1, 2, 6, 9, 10, 16, 20, 28, 30].map(el => createdLocations[el])
    ), // lake
    createdLabels[30].setLocations(
      [1, 3, 5, 23, 24, 25, 26, 28, 29, 33, 44, 45, 53, 54].map(
        el => createdLocations[el]
      )
    ), // waterfall
    createdLabels[31].setLocations(
      [1, 2, 3, 5, 6, 10, 21, 22, 23, 24, 25, 26, 27, 28, 33, 34, 53, 54].map(
        el => createdLocations[el]
      )
    ), // lighthouse
    createdLabels[32].setLocations(
      [0, 1, 2, 6, 7, 13, 14, 15, 19, 20, 21, 51].map(
        el => createdLocations[el]
      )
    ), // statue
    createdLabels[33].setLocations(
      [0, 1, 2, 3, 4, 6, 7, 12, 13, 14, 15, 20, 21, 26, 35, 42, 48, 49, 51].map(
        el => createdLocations[el]
      )
    ), // memorial
    createdLabels[34].setLocations(
      [1, 4, 9, 11, 27, 30, 31, 42, 53, 54].map(el => createdLocations[el])
    ), // road
    createdLabels[35].setLocations(
      [
        1,
        4,
        5,
        16,
        18,
        23,
        24,
        25,
        26,
        27,
        29,
        33,
        36,
        42,
        44,
        45,
        52,
        53,
        54
      ].map(el => createdLocations[el])
    ), // island
    createdLabels[36].setLocations(
      [
        1,
        4,
        5,
        11,
        16,
        23,
        24,
        25,
        26,
        30,
        31,
        32,
        33,
        36,
        37,
        42,
        43,
        44,
        45,
        53,
        54
      ].map(el => createdLocations[el])
    ), // animals
    createdLabels[37].setLocations(
      [
        0,
        3,
        5,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        33,
        34,
        53,
        54
      ].map(el => createdLocations[el])
    ), // flowers
    createdLabels[38].setLocations(
      [0, 2, 4, 6, 7, 8, 35, 38, 21].map(el => createdLocations[el])
    ), // aquarium
    createdLabels[39].setLocations(
      [
        0,
        2,
        6,
        8,
        9,
        13,
        14,
        17,
        18,
        19,
        20,
        21,
        24,
        27,
        34,
        32,
        30,
        31,
        28,
        40,
        48
      ].map(el => createdLocations[el])
    ) // casino
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
