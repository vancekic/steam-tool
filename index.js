/**
 * Steam Store
 * ===========
 *
 */

var SteamStore = require('steam-store/lib/store');
var JSONStream = require('JSONStream');

var store = new SteamStore({
  country: 'US',
  language: 'en'
});

var count = 0;

store.getProducts('game', true)
     .pipe(JSONStream.parse())
     .on('data', function (product) {
        count++;
        if (product.release_date.date.includes('2019')) {
            var eligible = false;
            if (!Array.isArray(product.genres)) {
                eligible = product.genres.description === 'Strategy';
            } else {
                eligible = product.genres.findIndex(x => x.description === 'Strategy') !== -1
            }

            if (eligible) {
                // TODO: would be exported to .csv format
                console.log(product.name);
                console.log('Released on ' + product.release_date.date);
                console.log('Tags: ' + product.genres.map(x => x.description));
            }
        } else {
            //console.log(product.name + '\t\t -- Released on ' + product.release_date.date);
            console.log('# of games being processed: %d', count)
        }
      })
     .on('end', function(){
      console.log('END')
     });