var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');
router.use(cors({
  origin: 'http://localhost:3001'
}));
var config = {
  host: 'localhost',
  user: 'root',
  password: 'H@rit#@16',
  database: 'hospital search'
}
const pool = mysql.createPool(config);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/hospitals', async function (req, res, next) {
  var name = req.query.name;

  pool.query('SELECT * FROM covid_bed_vaccancy where hospital_details like "%' + name + '%"', (error, result) => {
    console.log(error);
    if (error) throw error;

    res.send(result);
  });
})
router.get('/area', async function (req, res, next) {

  pool.query('SELECT distinct area from covid_bed_vaccancy', (error, result) => {
    console.log(error);
    let areas = [];
    result.map((area) => {
      areas.push(area.area)
    })
    if (error) throw error;
    res.send(areas);
  });
})
router.get('/hospitalsbyarea', async function (req, res, next) {
  var area = req.query.area;
  // var area = 'CS/Nagarpalika';
  //SELECT id, hospital_details from `hospital search`.covid_bed_vaccancy where area='CS/Nagarpalika';

  pool.query('SELECT id, hospital_details from covid_bed_vaccancy where area="' + area + '"', (error, result) => {
    console.log(error);
    if (error) throw error;
    res.send(result);
  });
})
router.get('/hospitalsbyfilter', async function (req, res, next) {
  var area = req.query.area;
  var category = req.query.category;
  var charges = req.query.charges;
  var query1 = category === "All" ? ' ' : ' AND hospital_category = "' + category + '"';
  var query2 = charges === "Show All" ? ' ' : ' AND charges = "' + charges + '"';
  var query = 'SELECT * from covid_bed_vaccancy where area="' + area + '"' + query1 + query2;
  console.log(query);
  pool.query(query, (error, result) => {
    console.log(error);
    if (error) throw error;
    res.send(result);
  });
})
router.get('/getcenters', async function (req, res, next) {

  pool.query('select * from covid_testcenters', (error, result) => {
    console.log(error);
    if (error) throw error;
    console.log(result)
    res.send(result);
  });
})
router.get('/getslots', async function (req, res, next) {
  var date = req.query.date;
  var name = req.query.center;
  pool.query('select * from bookingdetails where SlotDate="' + date + '" and VID=(select CID from covid_testcenters where HospitalName="' + name + '")', (error, result) => {
    console.log(error);
    if (error) throw error;

    res.send(result);
  });
});

router.get('/getbookingid', async function(req, res, next){
  pool.query('select count(BID) from bookingdetails',(error, result) => {
    console.log(error);
    if (error) throw error;
    
    res.send(result);
  });
})

router.post('/bookslot', async function (req, res, next) {
  console.log(req.body);
  var date = req.body.params.date;
  var name = req.body.params.name;
  var uid = req.body.params.uid;
  var vid = req.body.params.vid;
  var time = req.body.params.time;
  var bid = req.body.params.bid;

  pool.query('INSERT INTO bookingdetails(Name,BID,SlotDate, VID, UID, time) VALUES ("' + name + '","' + bid + '","' + date + '","' + vid + '","' + uid + '","' + time + '")', (error, result) => {
    console.log(error);
    if (error) throw error;

    res.send(result);
  });
})
/* GET home page. */


module.exports = router;