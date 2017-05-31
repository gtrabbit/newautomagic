var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');



const PBFSchema = new Schema({
	name: String,
	pbf: String
})



const PBF = mongoose.model("PBF", PBFSchema);

const giveChart = function(cb){
	PBF.find({name: "the chart"}, function(err, chart){
	
		cb(chart[0].pbf);

	})
}


const makeChart = function(averages, percentiles, firstYear, cb){
	let years = makeYears(firstYear);
	let pbf = JSON.stringify(buildChart(years, percentiles, averages));



	
	PBF.find({name: "the chart"}, function(err, chart){
		if (err){
			cb("there was an error")
		} else if (!chart.length){
			let updatedPBF = new PBF({
				name: "the chart",
				pbf: pbf
				});
		
			updatedPBF.save(function(err){
				if (err) {
					console.log(err);
					cb("some kinda weird saving error")
				} else {
					cb("new chart saved")
				}
			})
		} else {
			chart[0].pbf = pbf;
			chart[0].save(function(err){
				err ? cb("error updating chart") : cb("chart updated!")
			})

		}
	})




}

const makeYears = function (firstYear){
	let arr = [];
	for (let i=0; i<11; i++){
		arr.push(Number(firstYear)+i);
	}
	return arr;
}


const buildChart = function(years, data, data2){
	let pbf = {};
	data = data.replace(/,/g, "");
	data2 = data2.replace(/,/g, "");
	let matches2 = data2.match(/[\w\s&\/]+[\W\s\d]+/g);
	let averages = [];
	matches2.forEach(function(a){
		a = a.replace(/[A-Za-z\/&]+/g, "").trim();
		a = a.split(" ");
		averages.push(a);

	})
	

	let matches = data.match(/[\w\s&\/]+[\W\s\d]+/g);
	matches.forEach(function(a, index){
		a = a.split(" ");
		let start = a.indexOf("0.01%");
		let fieldName = a.slice(0, start).join(" ");
		fieldName = fieldName.toLowerCase();
		fieldName[0] = fieldName[0].toUpperCase();
		let percentiles = a.slice(start);
		let one = percentiles.slice(1, 12);
		
		let two = percentiles.slice(14, 25);
		let three = percentiles.slice(27, 38);
		let four = percentiles.slice(40, 51);		
		pbf[fieldName] = {};
		pbf[fieldName].percentiles = {};
		pbf[fieldName].averages = {};
		
		for (let i=0; i<years.length; i++){
			
				let group = {
				[one[i]]: "0.01%",
				[two[i]]: "0.10%",
				[three[i]]: "1.00%",
				[four[i]]: "10.00%"
				};
			
			pbf[fieldName].percentiles[[years[i]]] = group;
			pbf[fieldName].averages[[years[i]]] = averages[index][i];

		}

		
	


});

	return pbf;
}


exports.module = {
	makeChart: makeChart,
	giveChart: giveChart
}