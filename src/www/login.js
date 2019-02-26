const UserModel = require('../models/login');

const Joi = require('joi');

require('dotenv').config();

const routes = [
    {
		method: 'POST',
		path: '/api/create/moderotere',
		config: {
			description: 'Creating moderotere with bcrypt password',
			notes: 'user can signup',
			tags: ['api'],
			validate: {
				payload: {
					firstName: Joi.string().required(),
					lastName: Joi.string().required(),
					email: Joi.string().required(),
					password: Joi.string().required(),
					moderator: Joi.string().required(),
					HeadPlace: Joi.string().required(),
				}
			}
		},
		handler: async (request, h) => {
			let pr = async (resolve, reject) => {
				UserModel.find({ 'email': request.payload.email },async function (err, data) {
					if (err) {
						return resolve({
							"status": "error", 
							"message": err
						})
					} else if (data.length == 0) {
						const newUser = new UserModel({
							"firstName": request.payload.firstName,
							"lastName": request.payload.lastName,
							"email": request.payload.email,
							"password": request.payload.password,
							"moderator": request.payload.moderator,
							"HeadPlace": request.payload.HeadPlace,
							"isLogin": false
						});
						newUser.save(function async (error, user) {
							if (err) {
								return resolve({
									"status": "error", 
									"message": error
								})
							} else {
								return resolve({
									"status": 'success',
									"message": "Moderotere created successfully",
								});
							}
						})
					} else {
                        return resolve({
                            "status": "error", 
                            "message": "user already exist"
                        })
					}
				});
			}
			return new Promise(pr)

		}
	},
	{
		method: 'POST',
		path: '/api/login',
		config: {
			description: 'login authentication done by JWT',
			notes: 'user can login',
			tags: ['api'],
			validate: {
				payload: {
					email: Joi.string().required(),
					password: Joi.string().required()
				}
			}
		},
		handler: async (request, h) => {
			let pr = async (resolve, reject) => {
				UserModel.find({ 'email': request.payload.email },async function (err, data) {
					if (err) {
						return resolve({"status": "error", "message": err})
					} else if (data.length == 0) {
						return resolve({"status": "error", "message": "User not exist"})
					} else {
						const validUser = await UserModel.login(request.payload.email, request.payload.password);

						if (validUser) {
							const token = UserModel.generateToken(data[0])
							request.cookieAuth.set({ token });
							return resolve({
								status: 'success',
								token: token,
								userid: data[0]['_id'],
							});
						} else {
							return resolve({"status": "error", "message": "Invalid password"})
						}
					}
				});
			}
			return new Promise(pr)

		}
	},
	{
		method: 'GET',
		path: '/api/get/moderators',
		config: {
			description: 'API moderators',
			notes: 'Getting moderators api',
			tags: ['api'],
		},
		handler: async (request, h) =>{
            let gs = async (resolve, reject) => {
                UserModel.find()
                .then(function(res){
                    return resolve(res)
                })
            }
            return new Promise(gs)
		}
    },
]
export default routes;

