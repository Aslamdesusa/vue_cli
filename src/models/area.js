var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AreaSchema = new Schema({
    areaName: {
        type: String, 
        unique: true,
        index: true,
    },
    stateName: String,
    contactPerson: String,
    Email: String,
    Mobile: String,
    Date: {type: Date, default: Date.now}
});

const Area = mongoose.model('Area', AreaSchema)

module.exports = Area;