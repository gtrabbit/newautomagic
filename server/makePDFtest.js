const tinyreq = require("tinyreq");
const zip = new require('node-zip')();
const fs = require('fs');
var pdf = require('html-pdf');



	
const doAllTheMagic = function(data, cb){
	let date = new Date();
    let dateDisplay = "" + date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
	let count = data.data.length;
	pdfArr = [];


	data.data.forEach(function(a){
	
		tinyreq({
			url: a.url,
			headers: {
      			'charset': 'utf-8',
      			'user-agent': "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
    			},
    		encoding: "UTF-8",
    		data_endcoding: "UTF-8"
		}, (err, body) =>{
			if (err){
				console.log("an error with tinyreq?")
				return console.log(err)
			}
			count--;
			extraMagic(body, a, dateDisplay, count, cb);
			

		})
	})
}



const extraMagic = function(website, cat, date, count, cb){
  		let catDisplay = cat.cat + " - Google Scholar Metrics";
  	
		let options = {
			"header": {
				"height": "10mm",
				"contents": "<span style='position: absolute'>" + date + "</span> <p style='text-align: center'> " + catDisplay + "</p>"
			},
			"footer":{
				"height": "10mm",
				"contents": "<span>" + cat.url + "</span>"
			},
			"name": "GS_" + cat.cat +"_" + cat.numbers.sort().join(", ")
		}

		pdf.create(website, options).toBuffer(function(err, buffer){
			if (err) return console.log(err);
			pdfArr.push({buffer: buffer, name: options.name});
		
			if (count < 1){
				let data;
				pdfArr.forEach(function(a, i){
					let name = a.name + ".pdf";
					zip.file(name, a.buffer);
					data = zip.generate({base64:false,compression:'DEFLATE'});
					
				})
				let uid = Math.random().toString().substr(2, 7);
				let location = './tmp/' + uid;
				fs.mkdir(location, function(){
					
					fs.writeFileSync(__dirname + "/." + location + "/pldocs.zip", data, 'binary')

					cb({msg: location})
				})
				
				
				
			}

		})

}




exports.module = {
	makePDF: doAllTheMagic
}
  



