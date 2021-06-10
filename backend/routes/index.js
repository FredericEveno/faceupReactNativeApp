var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var fs = require('fs')

var cloudinary = require('cloudinary').v2;

const request = require('sync-request');

const subscriptionKey = '93e27b4cd19c4b1c82bd28662d3****';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

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
  // console.log('req.files.image', req.files.image);
  // console.log(req.files.image.name);
  // console.log(req.files.image.mimetype);
  // console.log(req.files.image.data);

  var imagePath = `./public/images/${uniqid()}.jpg`;
  var resultCopy = await req.files.image.mv(imagePath);

  if(!resultCopy) {

    var resultCloudinary = await cloudinary.uploader.upload(imagePath);
    console.log('resultCloudinary : ', resultCloudinary)
    // var resultVision = await resultVisionRaw.body;
    // resultVision = await JSON.parse(resultVision);

    await fs.unlink(imagePath, (err) => {
      if (err) throw err;
      console.log('Image was deleted');
    } )

    // Face Detection
    // const params = {
    //   returnFaceId: 'true',
    //   returnFaceLandmarks: 'false',
    //   returnFaceAttributes: 'age,gender,smile,facialHair,glasses,emotion,hair',
    // };

    // const options = {
    //   qs: params,
    //   body: `{"url": "${resultCloudinary.url}" }`,
    //   headers: {
    //       'Content-Type': 'application/json',
    //       'Ocp-Apim-Subscription-Key' : subscriptionKey
    //   }
    // };
    
    // var resultVisionRaw = await request('POST', uriBase, options);
    // var resultVision = await resultVisionRaw.body;
    // resultVision = await JSON.parse(resultVision);

    // console.log('resultVision : ', resultVision);

    res.json({url: resultCloudinary.url, gender:'male' , age:'40', glasses:'glasses', beard:'toto', happy:'happy', hairColor:'brown'});

  }
  //   var gender;
  //     var age;
  //     var glasses;
  //     var beard;
  //     var happy;
  //     var hairColor;
      
  //     if(resultVision[0]){
  //       gender = resultVision[0].faceAttributes.gender == "male"? 'homme' : 'femme';
  //       age = resultVision[0].faceAttributes.age+" ans"; 
  //       glasses = resultVision[0].faceAttributes.glasses == "NoGlasses" ? false : true;
  //       beard = resultVision[0].faceAttributes.facialHair.beard > 0.5 ? true : false;
  //       happy = resultVision[0].faceAttributes.emotion.happiness > 0.7 ? true : false;
  //       if(resultVision[0].faceAttributes.hair.hairColor[0].color == "brown") {
  //         hairColor = "cheveux châtain";
  //       } else if(resultVision[0].faceAttributes.hair.hairColor[0].color == "black") {
  //         hairColor = "cheveux brun";
  //       } else if(resultVision[0].faceAttributes.hair.hairColor[0].color == "blond") {
  //         hairColor = "cheveux blond";
  //       } else if(resultVision[0].faceAttributes.hair.hairColor[0].color == "red") {
  //         hairColor = "cheveux roux";
  //       } else if(resultVision[0].faceAttributes.hair.hairColor[0].color == "gray") {
  //         hairColor = "cheveux gris";
  //       }  
  //     }

  //     res.json({url: resultCloudinary.url, gender , age, glasses, beard, happy, hairColor});

  // } else {
  //   res.json({error: resultCopy});
  // }

})

module.exports = router;