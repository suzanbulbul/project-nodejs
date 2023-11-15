const mongoose = require("mongoose");
const RolePrivileges = require("./RolePrivileges");
mongoose.set('strictQuery', false);

//required: true -> bu alanın boş geçilmesini engeller
//default-> varsayılan değer
//unique: true -> bu alanın benzersiz olmasını sağlar
//versionKey: false -> sürüm bilgisinin tutulmasını engeller

const schema = mongoose.Schema({
    role_name: {type: String, required: true, unique: true},
    is_active: {type: Boolean, default: true},

    //Users tablosu ile ilişki kurulacak
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
    }
},
{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
}
)

class Roles extends mongoose.Model {
}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);