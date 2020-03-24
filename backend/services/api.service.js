"use strict";

const ApiGateway = require("moleculer-web");
module.exports = {
	name: "api",
	mixins: [ApiGateway],
	settings: {
		// Exposed port
		port: process.env.PORT || 3000,
		// Exposed IP
		ip: "0.0.0.0",
		use: [],
		cors: {
			origin: "*",
			methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
			allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
			exposedHeaders: [],
			credentials: false,
			maxAge: 3600
		},
		routes: [
			{
				path: "/api",
				whitelist: [
					"**"
				],
				use: [],
				mergeParams: true,
				authentication: false,
				authorization: false,
				autoAliases: false,
				aliases: {
					"POST notes": "notes.create",
					"GET notes/:keyword": "notes.search",
					"GET cataloge/:book_name": "cataloge.search",
					"POST searchLog": "searchLog.create"
				},
				callingOptions: {},
				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},
				mappingPolicy: "all", // Available values: "all", "restrict"
				logging: true
			}
		],

		log4XXResponses: false,
		logRequestParams: null,
		logResponseData: null,
		assets: {
			folder: "public",
			options: {}
		}
	},
	methods: {}
};
