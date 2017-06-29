const mongoose = require('mongoose');
                                    // database name
                                    //    |
//name of the database I will refer to in mongo is lab-mongoose-movies
mongoose.connect('mongodb://localhost/lab-mongoose-movies');
                               //         |
                               // use ironshop

// We have to connect the DB again here
// because seed.js is SEPARATE from app.js.


const Celebrity = require('../models/celebrity.js');

const CelebrityArray = [
  {
    name: 'Enrique Iglesias',
    occupation: "singer",
    catchPhrase: 'All is well in the world.'
  },
  {
    name: 'PitBull',
    occupation: "singer",
    catchPhrase: 'Firecracker!.'
  },
  {
    name: 'Kourtney Kardashian',
    occupation: "TV personality",
    catchPhrase: 'Where is Scott?'
  }
];


Celebrity.create(
  CelebrityArray,            // 1st argument -> array of product info objects

  (err, celebrityResults) => {   // 2nd argument -> callback!
    if (err) {
      console.log('OMG! Database error.');
      return;
    }

    celebrityResults.forEach((oneCeleb) => {
      console.log('Its a Celebrity! ' + oneCeleb.name);
    });
  }
);
