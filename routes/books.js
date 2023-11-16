var express = require('express');
var router = express.Router();

const Books = require('../db/models/Books');
const Response = require('../lib/Response');

const CustomError = require('../lib/Error');
const Enum = require('../config/Enum');


// GET /api/books
router.get('/', async(req, res) => {
  try{
    let books = await Books.find({});
    res.json(Response.succesResponse(books));

  } catch(err) {
    let errorResponse= Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);  }
});

// CREATE /api/books/add
router.post('/add', async(req, res) => {
  let body = req.body;

  try{
    validateBookData(body);

    let book = new Books({
      img: body.img,
      name: body.name,
      writer: body.writer,
      translator: body.translator,
      price: body.price,
      amount: body.amount,
      publisher: body.publisher,
      numberOfPages: body.numberOfPages,
      language: body.language,
      barcode: body.barcode,
    });

    await book.save();
    res.json(Response.succesResponse({success: true}));

  } catch(err) {
     let errorResponse= Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);

  }
});

function validateBookData(data) {
    if (!data.name || !data.price || !data.amount) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        'Validation Error!',
        'name, price, and amount fields must be filled'
      );
    }
}

// // UPDATE /api/books/update
router.post('/update', async(req, res) => {
  let body = req.body;

  try{
    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', '_id field must be filled');

    let updates = {};

    if(body.name) updates.name = body.name;

    if (body.writer) updates.writer = body.writer;
  
    if (body.translator) updates.translator = body.translator;
    
    if (body.price) updates.price = body.price;

    if (body.amount) updates.amount = body.amount;

    if (body.publisher) updates.publisher = body.publisher;

    if (body.numberOfPages) updates.numberOfPages = body.numberOfPages;

    if (body.language) updates.language = body.language;

    if (body.barcode) updates.barcode = body.barcode;
    
    await Books.updateOne({_id: body._id}, updates);
    res.json(Response.succesResponse({success: true}));

  } catch(err) {
    let errorResponse= Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);  }
});

// DELETE /api/books/delete
router.post('/delete', async(req, res) => {
  let body = req.body;
  try{
    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', '_id field must be filled');

    await Books.remove({_id: body._id});
    res.json(Response.succesResponse({success: true}));

  } catch(err) {
    let errorResponse= Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);  }
});

module.exports = router;
