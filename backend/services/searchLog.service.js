"use strict";

const DbService = require("../mixins/db.mixin");
const MongoAdapter = require("moleculer-db-adapter-mongo");
const writeJsonFile = require('write-json-file');
const loadJsonFile = require('load-json-file');
const fs = require("fs");

module.exports = {
	name: "searchLog",
	// version: 1
	mixins: [
		DbService("searchLog"),		
	],
	settings: {	},
	actions: {
		create: {
			params:{
				key: "string"
			},
			async handler(ctx) {	
				let keyword = ctx.params.key;
				console.log("entity",keyword);
				if(keyword){
					//generate files here
					const data = await loadJsonFile('data/searchLog.json');
                    var note_value = {};
                    var result = [];
                    var count = 1;
                    let time = Date.now();
                    let date_ob = new Date(time);
                    console.log(date_ob);
                    var status = true;

                    for(var n in data){
                        if(data[n].key == keyword){
                            status=false;
                            var count_update = 0 ;
                            status=false;
                            count_update=data[n].count+1;
                            data[n].key=keyword;
                            data[n].time = date_ob;
                            data[n].count = count_update;
                            console.log("dictionary with matched keyword,",data);

                            fs.writeFile('data/searchLog.json', JSON.stringify(data), function (err) {
                                if (err) throw err;
                                console.log('Saved!');
                              }); 
                        }
                    }
                    if(status){
                        note_value["key"] =keyword;
                        note_value["time"]=date_ob;
                        note_value["count"]=count;
                        data.push(note_value);
                        console.log("dictionary,",data);
                        fs.writeFile('data/searchLog.json', JSON.stringify(data), function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                          }); 
                    }
				}else{					
					console.log("failed")
				}
			},
		},
	},
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	}
};
