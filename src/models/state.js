var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StateSchema = new Schema({
    stateName: {
        type: String, 
        unique: true,
        index: true,
    },
    Abbr: String,
    contactPerson: String,
    Email: String,
    Mobile: String,
    Date: {type: Date, default: Date.now}
});

const State = mongoose.model('State', StateSchema)

module.exports = State;
