"use strict";

const DbService = require("../mixins/db.mixin");
const MongoAdapter = require("moleculer-db-adapter-mongo");
const fs = require("fs");
const mkdir = require("mkdirp").sync;
const writeJsonFile = require('write-json-file');


/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "cataloge",
	// version: 1
	mixins: [
		DbService("books"),
		
	],
	settings: {
		// Available fields in the responses
		fields: 
		[
			"author",
			"title",
		],
	},
	actions: {
		search: {
			rest: "GET /:book_name/",
			params: {
				book_name: "string",
				
			},
			async handler(ctx) {
				
				var s = ctx.params.book_name;				
				const doc = await this.adapter.find( {  query : { $text: { $search: s } }});
				console.log(doc);
				//var json = JSON.stringify(doc);
				//console.log(json);
				if(doc){					
					//generate files here	
					var dict = [];
					dict.push({
						key:   s,
						value: doc
					});	
					console.log("dictionaly",dict);
				
					fs.appendFile('data/cataloge.json', JSON.stringify(dict), function (err) {
						if (err) throw err;
						console.log('Saved!');
					  }); 
					
					return doc;
				}else{
					return {"error":"not Found"}
				}
			},
			
		},
		
	},

	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	}
};
