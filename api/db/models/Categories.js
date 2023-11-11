const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const shema = mongoose.Schema({
    name: {type: String, required: true},
    is_active: {type: Boolean, default: true},

    //Users tablosu ile ilişki kurulacak
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
    },
},
{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedeAt: "updated_at"
    }
})

class Categoies extends mongoose.Model{

}

shema.loadClass(Categoies)
module.exports = mongoose.model("categories", shema)