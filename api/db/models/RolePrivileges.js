const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const shema = mongoose.Schema({

    // Roles tablosu ile ilişki kurulacak
    role_id:{
        type: mongoose.SchemaType.ObjectId,
        required: true,
    },
    permission: {type: String, required: true},
    // Users tablosu ile ilişki kurulacak
    created_by:{
        type: mongoose.SchemaType.ObjectId,
        required: false,
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

shema.loadClass(RolePrivileges)
module.exports = mongoose.model("role_privileges", shema)