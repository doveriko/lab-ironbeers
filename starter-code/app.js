const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((allBeers) => {
      res.render('beers', { allBeers });
      //console.log("ALL BEERS", allBeers)
    })
    .catch((error) => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then((randomBeer) => {
      res.render('randomBeer', {randomBeer: randomBeer[0]})
      //console.log("RANDOM BEER", randomBeer[0]);
    })
    .catch((error) => console.log(error));
});

app.get('/beers/:id', (req, res) => {
    const beerId = req.params.id
    punkAPI
    .getBeer(beerId)
    .then((oneBeer) => {
        res.render('onebeer', {oneBeer: oneBeer[0]})
        //console.log("ONE BEER", oneBeer);
    })
    .catch((error) => console.log(error)
    )
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
