const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

let instance = null;
class Database {

    constructor() {
        if (!instance) {
            this.mongoConnection = null; 
            instance = this;
        }

        return instance;
    }

    async connect(options) {
        try {
            if(process.env.CONNECTION_STRING === "mongodb://127.0.0.1:27017/project-nodejs"){
                console.log("DB Connecting...");
                let db = await mongoose.connect(options.CONNECTION_STRING);

                this.mongoConnection = db;
                console.log("DB Connected.");
            }
            else{
                mongoose.connect(options.CONNECTION_STRING, {
                    dbName: 'test',
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }).then(() => console.log('Live DB Connected!'))
                  .catch(err => {
                    console.log(`DB Connection Error: ${err.message}`);
                });
            }
           
        } catch (err) {
            console.error(err);
            process.exit(1);
        }

    }

}

module.exports = Database;