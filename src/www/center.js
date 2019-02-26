const centerModal = require('../models/center');

const Joi = require('joi');

require('dotenv').config();

const routes = [
	{
		method: 'GET',
		path: '/api/center',
		config: {
			description: 'API Center',
			notes: 'Getting Center api',
			tags: ['api'],
		},
		handler: async (request, h) =>{
            let gs = async (resolve, reject) => {
                centerModal.find()
                .then(function(res){
                    return resolve(res)
                })
            }
            return new Promise(gs)
		}
    },
    {
		method: 'POST',
		path: '/api/center',
		config: {
			description: 'API Post Center',
			notes: 'Posting Center api',
            tags: ['api'],
            validate: {
				payload: {
                    centerName: Joi.string().required(),
                    stateName: Joi.string().required(),
                    areaName: Joi.string().required(),
                    contactPerson: Joi.string().required(),
                    Email: Joi.string().required(),
                    Mobile: Joi.string().required()
				}
			}
		},
		handler: async (request, h) =>{
            let pa = async (resolve, reject) => {
                centerModal.find({ 'centerName': request.payload.centerName },async function (err, data) {
                    if (err) {
                        return resolve({
                            "status": "error", 
                            "message": err
                        })
                    } else if (data.length == 0) {
                        const newCenter = new centerModal({
                            "centerName": request.payload.centerName,
                            "stateName": request.payload.stateName,
                            "areaName": request.payload.areaName,
                            "contactPerson": request.payload.contactPerson,
                            "Email": request.payload.Email,
                            "Mobile": request.payload.Mobile,
                        });
                        newCenter.save(function async (error, Area) {
                            if (err) {
                                return resolve({
                                    "status": "error", 
                                    "message": error
                                })
                            } else {
                                return resolve({
                                    "status": 'success',
                                    "message": "Center created successfully",
                                });
                            }
                        })
                    } else {
                        return resolve({
                            "status": "error", 
                            "message": "Center already exist"
                        })
                    }
                });
            }
        return new Promise(pa)
        }
    },
    {
		method: 'DELETE',
		path: '/api/center/{_id}',
		config: {
			description: 'API DELETE Center',
			notes: 'Delete Center api',
            tags: ['api'],
            validate: {
				params: {
					_id: Joi.string()
                }
			}
		},
		handler: async (request, h) =>{
            let da = async (resolve, reject) => {
                centerModal.findOneAndDelete({_id: request.params._id})
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
		path: '/api/center/{state}/{area}',
		config: {
			description: 'API GET Center',
			notes: 'Getting center By Area and state Name api',
            tags: ['api'],
            validate: {
				params: {
					state: Joi.string(),
					area: Joi.string()
                }
			}
		},
		handler: async (request, h) =>{
            let ga = async (resolve, reject) => {
                centerModal.find({stateName: request.params.state, areaName: request.params.area})
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
		path: '/api/center/{_id}',
		config: {
			description: 'API DELETE Center',
			notes: 'Delete Center api',
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

