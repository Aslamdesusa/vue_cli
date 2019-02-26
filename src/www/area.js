const areaModal = require('../models/area');

const Joi = require('joi');

require('dotenv').config();

const routes = [
	{
		method: 'GET',
		path: '/api/area',
		config: {
			description: 'API State',
			notes: 'Getting State api',
			tags: ['api'],
		},
		handler: async (request, h) =>{
            let gs = async (resolve, reject) => {
                areaModal.find()
                .then(function(res){
                    return resolve(res)
                })
            }
            return new Promise(gs)
		}
    },
    {
		method: 'POST',
		path: '/api/area',
		config: {
			description: 'API Post State',
			notes: 'Posting State api',
            tags: ['api'],
            validate: {
				payload: {
                    areaName: Joi.string().required(),
                    stateName: Joi.string().required(),
                    contactPerson: Joi.string().required(),
                    Email: Joi.string().required(),
                    Mobile: Joi.string().required()
				}
			}
		},
		handler: async (request, h) =>{
            let pa = async (resolve, reject) => {
                areaModal.find({ 'areaName': request.payload.areaName },async function (err, data) {
                    if (err) {
                        return resolve({
                            "status": "error", 
                            "message": err
                        })
                    } else if (data.length == 0) {
                        const newArea = new areaModal({
                            "areaName": request.payload.areaName,
                            "stateName": request.payload.stateName,
                            "contactPerson": request.payload.contactPerson,
                            "Email": request.payload.Email,
                            "Mobile": request.payload.Mobile,
                        });
                        newArea.save(function async (error, Area) {
                            if (err) {
                                return resolve({
                                    "status": "error", 
                                    "message": error
                                })
                            } else {
                                return resolve({
                                    "status": 'success',
                                    "message": "Area created successfully",
                                });
                            }
                        })
                    } else {
                        return resolve({
                            "status": "error", 
                            "message": "Area already exist"
                        })
                    }
                });
            }
        return new Promise(pa)
        }
    },
    {
		method: 'DELETE',
		path: '/api/area/{_id}',
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
            let da = async (resolve, reject) => {
                areaModal.findOneAndDelete({_id: request.params._id})
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
            return new Promise(da)
		}
    },
    {
		method: 'GET',
		path: '/api/area/{state}',
		config: {
			description: 'API GET Center',
			notes: 'Getting Area By State Name api',
            tags: ['api'],
            validate: {
				params: {
					state: Joi.string()
                }
			}
		},
		handler: async (request, h) =>{
            let ga = async (resolve, reject) => {
                areaModal.find({stateName: request.params.state})
                .then(function(res){
                    return resolve({
                        statusCode: 200,
                        message: 'success',
                        data: res
                    })
                })
                .catch(function(error){
                    return reject(error)
                })
            }
            return new Promise(ga)
		}
    },
    {
		method: 'PUT',
		path: '/api/area/{_id}',
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

