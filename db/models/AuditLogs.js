const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// mixed -> her türlü veri tipi olabilir

const schema = mongoose.Schema({
    level: {type: String, required: false},

    // Users tablosu ile ilişki kurulacak
    // email: {
    //     type: mongoose.SchemaTypes.String,
    //     required: true,
    // },

    email: {type: String, required: false},
    location: {type: String, required: false},
    proc_type: {type: String, required: false},
    log: {type: mongoose.SchemaTypes.Mixed, required: false},

},
{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

class AuditLogs extends mongoose.Model{

}

schema.loadClass(AuditLogs);
module.exports = mongoose.model("audit_logs", schema);