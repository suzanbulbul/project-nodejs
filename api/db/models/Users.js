const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//required: true -> bu alanın boş geçilmesini engeller
//default-> varsayılan değer
//unique: true -> bu alanın benzersiz olmasını sağlar
//versionKey: false -> sürüm bilgisinin tutulmasını engeller

const schema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    first_name: String,
    last_name: String,
    phone_number: String,
    language: { type: String, default: DEFAULT_LANG }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class Users extends mongoose.Modal{

}

schema.loadClass(Users);
module.exports = mongoose.model("users", schema);
