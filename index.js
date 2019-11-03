//stock market portfolio app
const express = require('express')
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: false }));



//api pk_1a8e22625d1846d5abc21f5a8517a9d8
//create call api function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_1a8e22625d1846d5abc21f5a8517a9d8', { json: true}, (err, res, body) =>{
	if(err) { return console.log(err);}
	if (res.statusCode === 200) {
		//console.log(body);
		finishedAPI(body);
	};
  });
};


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";


app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home',{
    	stock: doneAPI
    	});
	}, "fb");   
});


app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		//posted_stuff = req.body.stock_ticker
		res.render('home',{
    	stock: doneAPI
    	});
	}, req.body.stock_ticker);   
});

app.get('/about.html', function (req, res) {
    res.render('about',{});
});



// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT))
