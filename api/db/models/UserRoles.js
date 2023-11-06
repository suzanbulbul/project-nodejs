const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const shmea = mongoose.Schema({
    // Roles ile ilişki kurulacak
    role_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
      // Users ile ilişki kurulacak
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
},
{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"   
    }
})

class UserRoles extends mongoose.Model{

}

shema.loadClass(UserRoles)

module.exports = mongoose.model("user_roles", shema)