"use strict";

const DbService = require("../mixins/db.mixin");
const MongoAdapter = require("moleculer-db-adapter-mongo");
const writeJsonFile = require('write-json-file');
const loadJsonFile = require('load-json-file');
const fs = require("fs");

module.exports = {
	name: "notes",
	// version: 1
	mixins: [
		DbService("notes"),
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
		create: {
			params:{
				note_text: "string",
				key:"string"
			},
			async handler(ctx) {
				
				let text = ctx.params.note_text;
				let k = ctx.params.key;				
				console.log("entity",text,k);
				if(k){
					//generate files here
					const data = await loadJsonFile('data/notes.json');
					var key = k;
					var note_value = {};
					note_value["key"] =k;
					note_value["note_text"]=text;
					data.notes.push(note_value);
					console.log("dictionary,",data);
					fs.writeFile('data/notes.json', JSON.stringify(data), function (err) {
						if (err) throw err;
						console.log('Saved!');}); 
				}
				else{
					console.log("failed")
				}
			},
		},
		
		search: {
			rest: "GET /:keyword",
			params:{
				keyword: "string",
			},
			async handler(ctx){
				
				var s = ctx.params.keyword;
				console.log(s);
				
				const data = await loadJsonFile('data/notes.json');
				var result = [];
				//console.log(data.notes[0].note_text);
				for (var n in data.notes){
					console.log(n)
					if(s==data.notes[n].key){
						console.log("matched")
						result.push(data.notes[n].note_text) 
					}
					else
					{
					console.log("not matched")}
					console.log(result)
				}
				return result;
			}
		}
	},
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	}
};
