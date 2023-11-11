var express = require('express');
var router = express.Router();

const Categories = require('../db/models/Categories');
const Response = require('../lib/Response');
const CustomError = require('../lib/Error');
//Enum -> sabit değerlerin tutulduğu yapı.
const Enum = require('../config/Enum');


// GET /api/categories
router.get('/', async(req, res) => {
  try{
    let categories = await Categories.find({});
    res.json(Response.succesResponse(categories));

  } catch(err) {
    let errorResponse= Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);  }
});

// POST /api/categories//add
router.post('/add', async(req, res) => {
  let body = req.body;
  console.log(body);
  try{
    // throw -> hata fırlatır.
    //name gönderilmediğinde hata fırlatır.
    if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', 'name field must be filled');

    let category = new Categories({
      name: body.name,
      //db models içerisindeki is_active alanı default olarak true gelir.
      //Yani bu alanı göndermesek bile true olarak gelir.
      is_active: body.is_active,
      //req.user -> login olan kullanıcının bilgilerini tutar.
      created_by: req.user?.id,
    });

    // save -> db'ye kaydetme işlemi yapar.
    await category.save();
    res.json(Response.succesResponse({success: true}));

  } catch(err) {
    // Bu kullanımda kullanıcıya hep 200 dönüyorum yani success response dönüyor hata olsa bile
    // res.json(Response.errorResponse(err));

    //errorResponse.code === status(err.code || Enum.HTTP_CODES.INT_SERVER_ERROR)-> Bu kullanımda ise hata kodunu döndürüyorum.
    let errorResponse= Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);

  }
});

// Update /api/categories/update
router.post('/update', async(req, res) => {
  let body = req.body;
  try{
    //id gönderilmediğinde hata fırlatır.
    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', '_id field must be filled');

    let updates = {};

    if(body.name) updates.name = body.name;
    //typeof -> bir değişkenin tipini döndürür.
    // === -> hem değer hem tip kontrolü yapar.
    if(typeof body.is_active === "boolean") updates.is_active = body.is_active;

    await Categories.updateOne({_id: body._id}, updates);
    res.json(Response.succesResponse({success: true}));

  } catch(err) {
    let errorResponse= Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);  }
});

// delete /api/categories/delete
router.post('/delete', async(req, res) => {
  let body = req.body;
  try{
    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', '_id field must be filled');

    await Categories.remove({_id: body._id});
    res.json(Response.succesResponse({success: true}));

  } catch(err) {
    let errorResponse= Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);  }
});

module.exports = router;
