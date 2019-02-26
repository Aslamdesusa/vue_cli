const stateModal = require('../models/state');

const Joi = require('joi');

require('dotenv').config();

const routes = [
	{
		method: 'GET',
		path: '/api/posts',
		config: {
			description: 'API State',
			notes: 'Getting State api',
			tags: ['api'],
		},
		handler: async (request, h) =>{
            let gs = async (resolve, reject) => {
                stateModal.find()
                .then(function(res){
                    return resolve(res)
                })
            }
            return new Promise(gs)
		}
    },
    {
		method: 'POST',
		path: '/api/posts',
		config: {
			description: 'API Post State',
			notes: 'Posting State api',
            tags: ['api'],
            validate: {
				payload: {
                    stateName: Joi.string(),
                    Abbr: Joi.string(),
                    contactPerson: Joi.string(),
                    Email: Joi.string(),
                    Mobile: Joi.string()
				}
			}
		},
		handler: async (request, h) =>{
            let ps = async (resolve, reject) => {
                const newState = new stateModal(request.payload);
                newState.save()
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
            return new Promise(ps)
		}
    },
    {
		method: 'DELETE',
		path: '/api/posts/{_id}',
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
            let ds = async (resolve, reject) => {
                stateModal.findOneAndDelete({_id: request.params._id})
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
    },
    {
		method: 'PUT',
		path: '/api/posts/{_id}',
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
                stateModal.findOneAndUpdate({_id: request.params._id}, request.payload)
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

