const batchModal = require('../models/batch');

const Joi = require('joi');

require('dotenv').config();

const routes = [
	{
		method: 'GET',
		path: '/api/batch',
		config: {
			description: 'API State',
			notes: 'Getting State api',
			tags: ['api'],
		},
		handler: async (request, h) =>{
            let gb = async (resolve, reject) => {
                batchModal.find()
                .then(function(res){
                    return resolve(res)
                })
            }
            return new Promise(gb)
		}
    },
    {
		method: 'POST',
		path: '/api/batch',
		config: {
			description: 'API Post State',
			notes: 'Posting State api',
            tags: ['api'],
            validate: {
				payload: {
                    batchName: Joi.string().required(),
                    batchID: Joi.string().required(),
                    stateName: Joi.string().required(),
                    areaName: Joi.string().required(),
                    centerName: Joi.string().required(),
                    startDate: Joi.string().required(),
                    actualClassLimit: Joi.number().required(),
                    batchDay: Joi.string().required(),
                    batchSchedule: Joi.string().required(),
                    teacher: Joi.string().required()    
				}
			}
		},
		handler: async (request, h) =>{
            let pb = async (resolve, reject) => {
                batchModal.find({ batchName: request.payload.batchName },async function (err, data) {
                    if (err) {
                        return resolve({
                            "status": "error", 
                            "message": err
                        })
                    } else if (data.length == 0) {
                        const newBatch = new batchModal({
                            "batchName": request.payload.batchName,
                            "batchID": request.payload.batchID,
                            "stateName": request.payload.stateName,
                            "areaName": request.payload.areaName,
                            "centerName": request.payload.centerName,
                            "startDate": request.payload.startDate,
                            "numberOfClass": 0,
                            "actualClassLimit": request.payload.actualClassLimit,
                            "batchDay": request.payload.batchDay,
                            "batchSchedule": request.payload.batchSchedule,
                            "teacher": request.payload.teacher,
                            "isActivate": false,
                        });
                        console.log(newBatch)
                        newBatch.save(function async (error, batch) {
                            if (err) {
                                return resolve({
                                    "status": "error", 
                                    "message": error
                                })
                            } else {
                                return resolve({
                                    "status": 'success',
                                    "message": "Batch created successfully",
                                });
                            }
                        })
                    } else {
                        return resolve({
                            "status": "error", 
                            "message": "Batch already exist"
                        })
                    }
                });
            }
        return new Promise(pb)
        }
    },
    {
		method: 'DELETE',
		path: '/api/batch/{_id}',
		config: {
			description: 'API DELETE State',
			notes: 'Delete state api',
            tags: ['api'],
            validate: {
				params: {
					_id: Joi.string()
                }
			}
		},
		handler: async (request, h) =>{
            let db = async (resolve, reject) => {
                batchModal.findOneAndDelete({_id: request.params._id})
                .then(function(res){
                    return resolve({
                        statusCode: 200,
                        message: 'success',
                    })
                })
                .catch(function(error){
                    return reject(error)
                })
            }
            return new Promise(db)
		}
    },
    {
		method: 'PUT',
		path: '/api/batch/{_id}',
		config: {
			description: 'API DELETE State',
			notes: 'Delete state api',
            tags: ['api'],
            validate: {
				params: {
					"_id": Joi.string()
                },
                payload:{
                    "text": Joi.string()
                }
			}
		},
		handler: async (request, h) =>{
            let ds = async (resolve, reject) => {
                areaModal.findOneAndUpdate({_id: request.params._id}, request.payload)
                .then(function(res){
                    return resolve({
                        statusCode: 200,
                        message: 'success',
                    })
                })
                .catch(function(error){
                    console.log(error)
                    return reject(error)
                })
            }
            return new Promise(ds)
		}
	}
]
export default routes;

