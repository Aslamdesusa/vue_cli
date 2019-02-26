var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BatchSchema = new Schema({
    batchName: {
        type: String, 
        unique: true,
        index: true,
    },
    batchID: {
        type: String, 
        unique: true,
        index: true,
    },
    stateName: String,
    areaName: String,
    centerName: String,
    startDate: String,
    numberOfClass: Number,
    actualClassLimit: Number,
    batchDay: String,
    batchSchedule: String,
    teacher: String,
    isActivate: Boolean,
    Date: {type: Date, default: Date.now},
});

const Batch = mongoose.model('Batch', BatchSchema)

module.exports = Batch;