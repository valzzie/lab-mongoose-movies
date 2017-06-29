const express = require('express');

const CelebrityModel = require('../models/celebrity.js');

const router = express.Router();


router.get('/celebrities', (req, res, next) => {
  CelebrityModel.find((err, celebrityResults) => {
    if (err) {
      // use next() to skip to the ERROR PAGE
      next(err);
      return;
    }
//Note: celebsAndStuff must be represented on index.ejs page
    res.locals.celebsAndStuff = celebrityResults;

    // Pass the array of celebrities into the view as a variable.
    res.render('views/celebrities/celebrities-index.ejs', {
    // CelebrityArray: celebrityResults
  });
  });
});

router.get('/celebrities/:id', (req, res, next) => {
//    /products/595174b1e7890a86da4f5f0b
//                       |
//                 req.params.myId

    CelebrityModel.findById(
      req.params.id,           // 1st argument -> the id to find in the DB
      (err, celebFromDb) => {  // 2nd argument -> callback
          if (err) {
            // use next() to skip to the ERROR PAGE
            next(err);
            return;
          }
//Note: celebDetails must be represented on show.ejs
          res.locals.celebDetails = celebFromDb;

          res.render('views/celebrities/show.ejs');

          // Other way of transfering variables to the view:
          //
          // res.render('product-views/product-details-view.ejs', {
          //   productDetails: productFromDb
          // });
      }
    );
});

// STEP #1 of form submission for a new product
router.get('/celebrities/new', (req, res, next) => {
  // display "new-product-view.ejs"
  res.render('views/celebrities/new.ejs');
});

// STEP #2 of form submission for a new product
// <form method="post" action="/products">
//                |                |
//      -----------                |
//      |        -------------------
//      |        |
router.post('/celebrities', (req, res, next) => {
    const theCelebrity = new CelebrityModel({
        name: req.body.celebrityName,
        occupation: req.body.celebrityOccupation,
        catchPhrase: req.body.celebrityCatchPhrase

    });

    theCelebrity.save((err) => {
        if (err) {
          // If there was an error, use next() to skip to the ERROR PAGE.
          next(err);
          return;
        }

        // If saved successfully, redirect to a URL.
        // (redirect is STEP #3 of form submission for a new product)
        res.redirect('/celebrities-index');
          // you can ONLY redirect to a URL 🌏

          // 🚨🚨🚨
          // If you don't redirect, you can refresh and duplicate your data!
          // 🚨🚨🚨
    });
});

// STEP #1 of form submission for UPDATING a product
router.get('/celebrities/:id/edit', (req, res, next) => {
//    /products/595174b1e7890a86da4f5f0b/edit
//                       |
//                 req.params.myId

    CelebrityModel.findById(
      req.params.id,           // 1st argument -> the id to find in the DB
      (err, celebFromDb) => {  // 2nd argument -> callback
          if (err) {
            // use next() to skip to the ERROR PAGE
            next(err);
            return;
          }
//what does this line do again???????????????????????
          res.locals.celebDetails = celebFromDb;

          res.render('celebrities/edit.ejs');

          // Other way of transfering variables to the view:
          //
          // res.render('product-views/edit-product-view.ejs', {
          //   productDetails: productFromDb
          // });
      }
    );
});
// Delete from a FORM BUTTON (POST)
//   (same code as GET version)
router.post('/celebrities/:id/delete', (req, res, next) => {
  CelebrityModel.findByIdAndRemove(
    req.params.myId,           // 1st argument -> id of document to remove

    (err, celebFromDb) => {  // 2nd argument -> callback
      if (err) {
        // use next() to skip to the ERROR PAGE
        next(err);
        return;
      }

      // If removed successfully, redirect to a URL.
      res.redirect('/index');
        // you can ONLY redirect to a URL 🌏
    }
  );
});

module.exports = router;
