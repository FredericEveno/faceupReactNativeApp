var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var fs = require('fs')

var cloudinary = require('cloudinary').v2;

cloudinary.config({
 cloud_name: 'dt9gxyfei',
 api_key: '912623326292476',
 api_secret: 'njcKtKTGZsSWtNGISBSM1Rr2LSk' 
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', async function(req, res, next) {
  console.log('req.files.image', req.files.image);
  console.log(req.files.image.name);
  console.log(req.files.image.mimetype);
  console.log(req.files.image.data);

  var imagePath = `./public/images/${uniqid()}.jpg`;
  var resultCopy = await req.files.image.mv(imagePath);

  // if(!resultCopy) {
  //   res.json({result: true, message: 'File uploaded!'} );      
  // } else {
  //   res.json({result: false, message: resultCopy} );
  // }

  var resultCloudinary = await cloudinary.uploader.upload(imagePath);

  // console.log('resultCloudinary : ', resultCloudinary)

  await fs.unlink(imagePath, (err) => {
    if (err) throw err;
    console.log('Image was deleted');
  } )

  res.json({result: true, response: resultCloudinary});

})

module.exports = router;
