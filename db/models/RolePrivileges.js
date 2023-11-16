const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const schema = mongoose.Schema({

    // Roles tablosu ile ilişki kurulacak
    //(_id -> karşılık gelir)
    role_id:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    //(key -> config/role_privileges.js içerisindeki key değeri)
    permission: {type: String, required: true},
    // Users tablosu ile ilişki kurulacak
    created_by:{
        type: mongoose.SchemaTypes.ObjectId,
    }
},
{
    versionKr: false,
    timesmaps: {
        createdAt: "created_at",
        updatedeAt: "updated_at"
    }
})

class RolePrivileges extends mongoose.Model{

} 

schema.loadClass(RolePrivileges)
module.exports = mongoose.model("role_privileges", schema)