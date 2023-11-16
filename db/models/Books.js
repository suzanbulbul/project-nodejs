const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const bookSchema = new mongoose.Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    writer: { type: String, required: true },
    translator: { type: String, required: false },
    price: { type: Number, required: true, validate: validatePrice },
    amount: { type: Number, required: true },
    publisher: { type: String, required: true },
    numberOfPages: { type: Number, required: true },
    language: { type: String, required: true },
    barcode: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

function validatePrice(value) {
    if (isNaN(value) || value <= 0) {
        throw new Error('Price must be a positive number.');
    }
    return true;
}

class Book extends mongoose.Model {}

bookSchema.loadClass(Book);
bookSchema.index({ name: 1 });

const BookModel = mongoose.model('books', bookSchema);

module.exports = BookModel;
