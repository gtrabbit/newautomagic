const tinyreq = require("tinyreq");
const JSZip = require('jszip');
const fs = require('fs');
var pdf = require('html-pdf');

let count;

	
const doAllTheMagic = function(data, cb){
	let date = new Date();
    let dateDisplay = "" + date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
	count = data.data.length;
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
			
			extraMagic(body, a, dateDisplay, cb);
			

		})
	})
}



const extraMagic = function(website, cat, date, cb){
  		let catDisplay = cat.cat + " - Google Scholar Metrics";
  		let zip = new JSZip();
		let options = {
			"header": {
				"height": "10mm",
				"contents": "<span style='position: absolute; font-size 12px'>" + date + "</span> <p style='text-align: center'> " + catDisplay + "</p>"
			},
			"footer":{
				"height": "10mm",
				"contents": "<span style='font-size: 10px; overflow: hidden'>" + cat.url + "</span>"
			},
			"format": "Letter",
			"border": {
				"top": "0px",
				"bottom": "0px",
				"right": "25px",
				"left": "25px"
			},
			"zoomFactor": "0.6",
			"name": "GS_" + cat.cat +"_" + cat.numbers.sort().join(", ")
		}

		pdf.create(website, options).toBuffer(function(err, buffer){
			if (err) return console.log(err);
			pdfArr.push({buffer: buffer, name: options.name});
			count--;
			if (count < 1){
				let data;
				pdfArr.forEach(function(a, i){
					let name = a.name + ".pdf";
					zip.file(name, a.buffer);
					data = zip.generate({base64:false,compression:'DEFLATE'});
					
				})
				let uid = Math.random().toString().substr(2, 7);
				let location = './tmp/' + uid;
			
				if (!fs.existsSync('./tmp')){
					fs.mkdirSync('./tmp')
				} 
				fs.mkdir(location, function(){
					if (fs.existsSync(location)){
		
				}
					fs.writeFileSync(location + "/pldocs.zip", data, 'binary')

					cb({msg: location})
				})
				
				
				
			}

		})

}




exports.module = {
	makePDF: doAllTheMagic
}
  



