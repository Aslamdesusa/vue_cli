var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CenterSchema = new Schema({
    centerName: {
        type: String, 
        unique: true,
        index: true,
    },
    stateName: String,
    areaName: String,
    contactPerson: String,
    Email: String,
    Mobile: String,
    Date: {type: Date, default: Date.now}
});

const Center = mongoose.model('Center', CenterSchema)

module.exports = Center; 