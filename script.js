// margins

var margin = {
    top: 20,
    right: 150, // add space here to make room for legend
    bottom: 30,
    left: 60
},
	width = 600 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// x and y scale. y ordinal and x linear for vertically stacked bars

var y = d3.scale.ordinal()
    .rangeRoundBands([height, 0], .1);

var x = d3.scale.linear()
    .rangeRound([0, width-30]); // add space here to make room for legend

// pretty colors!
var color = d3.scale.ordinal()
    .range(["#FD8D3C",  "#fdbe85", "#756bb1", "#cbc9e2", "#969696"]);

var colors = ["#FD8D3C",  "#fdbe85", "#756bb1", "#cbc9e2", "#969696"];

var labels = ["% heating", "% cooling", "% crisis", "% weatherization", "% administrative and other"]

// drawing axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .tickFormat(d3.format(".2s"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>" + d.state + ": <span style='color:#" + d.color + "'>" + d.value + "%</span> " + d.label + "</strong><br>" + d.note;
  })

// adds chart to the div
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg.call(tip);

var data = [
  {"state": "WY", "stateLong": "Wyoming", "heat": 60, "cool": 0, "crisis": 10, "weather": 15, "other": 15, "note": ""},
  {"state": "WI", "stateLong": "Wisconsin", "heat": 60, "cool": 0, "crisis": 9, "weather": 15, "other": 16, "note": "Note: In a declared heat emergency, the state <br>may provide crisis cooling assistance."}, 
  {"state": "WV", "stateLong": "West Virginia", "heat": 50, "cool": 0, "crisis": 24, "weather": 15, "other": 11, "note": ""},
  {"state": "WA","stateLong": "Washington","heat": 40.17,"cool": 0,"crisis": 31,"weather": 15,"other": 13.83, "note": ""},
  {"state": "VA","stateLong": "Virginia","heat": 40,"cool": 15,"crisis": 10,"weather": 15,"other": 20, "note": ""},
  {"state": "VT","stateLong": "Vermont","heat": 70.62,"cool": 0,"crisis": 16.3,"weather": 0,"other": 13.08, "note": ""},
  {"state": "UT","stateLong": "Utah","heat": 60,"cool": 0,"crisis": 6,"weather": 15,"other": 19, "note": "Note: Crisis funds may be used for cooling <br>equipment repair or replacement."},
  {"state": "TX","stateLong": "Texas","heat": 10,"cool": 40,"crisis": 25,"weather": 15,"other": 10, "note": ""},
  {"state": "TN","stateLong": "Tennessee","heat": 51,"cool": 17,"crisis": 10,"weather": 10,"other": 12, "note": ""},
  {"state": "SD","stateLong": "South Dakota","heat": 78,"cool": 0,"crisis": 10,"weather": 0,"other": 12, "note": ""},
  {"state": "SC","stateLong": "South Carolina","heat": 30,"cool": 20,"crisis": 25,"weather": 15,"other": 10, "note": ""},
  {"state": "RI","stateLong": "Rhode Island","heat": 55,"cool": 0,"crisis": 10,"weather": 15,"other": 20, "note": ""},
  {"state": "PA","stateLong": "Pennsylvania","heat": 55,"cool": 0,"crisis": 20,"weather": 15,"other": 10, "note": ""},
  {"state": "OR","stateLong": "Oregon","heat": 51.92,"cool": 0,"crisis": 10,"weather": 15,"other": 23.08, "note": ""},
  {"state": "OK","stateLong": "Oklahoma","heat": 40,"cool": 28,"crisis": 10,"weather": 2,"other": 20, "note": ""},
  {"state": "OH","stateLong": "Ohio","heat": 42.5,"cool": 0,"crisis": 25,"weather": 15,"other": 17.5, "note": "Note: Summer crisis program."},
  {"state": "ND","stateLong": "North Dakota","heat": 60,"cool": 0.1,"crisis": 4.9,"weather": 15,"other": 20, "note": "Note: If funds are available, the state may offer temporary <br>cooling assistance in unusually high heat."},
  {"state": "NC","stateLong": "North Carolina","heat": 37.21,"cool": 0,"crisis": 43.52,"weather": 11.83,"other": 7.44, "note": "Note: Crisis funds are available year-round <br>for heating and cooling crises."},
  {"state": "NY","stateLong": "New York","heat": 65,"cool": 1,"crisis": 16,"weather": 10,"other": 8, "note": ""},
  {"state": "NM","stateLong": "New Mexico","heat": 41,"cool": 15,"crisis": 10,"weather": 14,"other": 20, "note": "Note: Once-a-year benefit can be used for heating, <br>cooling and expedited crisis."},
  {"state": "NJ","stateLong": "New Jersey","heat": 65,"cool": 4,"crisis": 6,"weather": 15,"other": 10, "note": ""},
  {"state": "NH","stateLong": "New Hampshire","heat": 75,"cool": 0,"crisis": 8,"weather": 3,"other": 14, "note": ""},
  {"state": "NV","stateLong": "Nevada","heat": 55,"cool": 1,"crisis": 15,"weather": 5,"other": 24, "note": "Note: Combined year-round heating and cooling program."},
  {"state": "NE","stateLong": "Nebraska","heat": 57,"cool": 15,"crisis": 6,"weather": 10,"other": 12, "note": ""},
  {"state": "MT","stateLong": "Montana","heat": 66.92,"cool": 0,"crisis": 3,"weather": 15,"other": 15.08, "note": "Note: Certain types of cooling assistance may be <br>available during long periods of high heat."},
  {"state": "MO","stateLong": "Missouri","heat": 42,"cool": 0,"crisis": 28,"weather": 10,"other": 20, "note": "Note: Unused winter crisis funds roll over to summer crisis."},
  {"state": "MS","stateLong": "Mississippi","heat": 37,"cool": 27,"crisis": 5,"weather": 15,"other": 16, "note": ""},
  {"state": "MN","stateLong": "Minnesota","heat": 58.5,"cool": 0,"crisis": 19,"weather": 4.5,"other": 18, "note": ""},
  {"state": "MI","stateLong": "Michigan","heat": 25,"cool": 0,"crisis": 60,"weather": 5,"other": 10, "note": ""},
  {"state": "MA","stateLong": "Massachusetts","heat": 73.95,"cool": 0,"crisis": 3,"weather": 10,"other": 13.05, "note": ""},
  {"state": "MD","stateLong": "Maryland","heat": 73.74,"cool": 0,"crisis": 5,"weather": 2.18,"other": 19.08, "note": "Note: The 5% for crisis represents heating funds expedited in crises."},
  {"state": "ME","stateLong": "Maine","heat": 67,"cool": 0,"crisis": 5,"weather": 15,"other": 13, "note": ""},
  {"state": "LA","stateLong": "Louisiana","heat": 30,"cool": 37.2,"crisis": 10,"weather": 12,"other": 10.8, "note": ""},
  {"state": "KY","stateLong": "Kentucky","heat": 35,"cool": 0,"crisis": 41.3,"weather": 13.5,"other": 10.2, "note": ""},
  {"state": "KS","stateLong": "Kansas","heat": 65,"cool": 0,"crisis": 10,"weather": 15,"other": 10, "note": ""},
  {"state": "IA","stateLong": "Iowa","heat": 60,"cool": 0,"crisis": 5,"weather": 15,"other": 20, "note": ""},
  {"state": "IN","stateLong": "Indiana","heat": 45,"cool": 10,"crisis": 10,"weather": 15,"other": 20, "note": ""},
  {"state": "IL","stateLong": "Illinois","heat": 45,"cool": 0,"crisis": 15,"weather": 15,"other": 25, "note": "Note: Cooling is provided in summer if funding is available."},
  {"state": "ID","stateLong": "Idaho","heat": 61.92,"cool": 0,"crisis": 1.06,"weather": 15,"other": 22.02, "note": ""},
  {"state": "HI","stateLong": "Hawaii","heat": 0,"cool": 65,"crisis": 15,"weather": 0,"other": 20, "note": ""},
  {"state": "GA","stateLong": "Georgia","heat": 58.3,"cool": 0,"crisis": 29.1,"weather": 2.59,"other": 10.01, "note": "Note: Cooling is provided if funding is available."},
  {"state": "FL","stateLong": "Florida","heat": 10.5,"cool": 16,"crisis": 38,"weather": 15,"other": 20.5, "note": ""},
  {"state": "DC","stateLong": "District of Columbia","heat": 45,"cool": 15,"crisis": 10,"weather": 15,"other": 15, "note": ""},
  {"state": "DE","stateLong": "Delaware","heat": 55,"cool": 12.5,"crisis": 10,"weather": 10,"other": 12.5, "note": ""},
  {"state": "CT","stateLong": "Connecticut","heat": 47.72,"cool": 0,"crisis": 39.21,"weather": 1.84,"other": 11.23, "note": ""},
  {"state": "CO","stateLong": "Colorado","heat": 65,"cool": 0,"crisis": 5,"weather": 15,"other": 15, "note": ""},
  {"state": "CA","stateLong": "California","heat": 14.2,"cool": 14.2,"crisis": 31.6,"weather": 15,"other": 25,"note": "Note: Heating and cooling are one year-round program."},
  {"state": "AR","stateLong": "Arkansas","heat": 53,"cool": 0,"crisis": 17,"weather": 15,"other": 15, "note": "Note: Cooling is provided if funding is available."},
  {"state": "AZ","stateLong": "Arizona","heat": 21.8,"cool": 42.2,"crisis": 5,"weather": 15,"other": 16, "note": "Note: Year-round crisis includes heating and cooling."},
  {"state": "AK","stateLong": "Alaska","heat": 67,"cool": 0,"crisis": 10,"weather": 3,"other": 20, "note": ""},
  {"state": "AL","stateLong": "Alabama","heat": 35,"cool": 32,"crisis": 16,"weather": 2,"other": 15, "note": ""}
];

x.domain([0,100]);
y.domain(data.map(function(d){
	return d.state;
}));

// adds each subset of data individually, so that tooltip can target

svg.selectAll(".barHeat")
	.data(data)
	.enter()
	.append("rect")
	.attr("class", "barHeat")
	.attr("x",function(d){
		return x(0);
	})
	.attr("y", function(d){
		return y(d.state);
	})
	.attr("width", function(d){
		return x(d.heat);
	})
	.attr("height", y.rangeBand())
	.on('mouseover', function(d){
		tip.show({
			state: d.stateLong,
			value: d.heat,
			color: "FD8D3C",
			label: "to heating assistance",
			note: d.note
		});
	})
	.on('mouseout', tip.hide);

svg.selectAll(".barCool")
	.data(data)
	.enter()
	.append("rect")
	.attr("class", "barCool")
	.attr("x", function(d){
		return x(d.heat);
	})
	.attr("y", function(d){
		return y(d.state);
	})
	.attr("width", function(d){
		return x(d.cool);
	})
	.attr("height", y.rangeBand())
	.on('mouseover', function(d){
		tip.show({
			state: d.stateLong,
			value: d.cool,
			color: "fdbe85",
			label: "to cooling assistance",
			note: d.note
		});
	})
	.on('mouseout', tip.hide);

svg.selectAll(".barCrisis")
	.data(data)
	.enter()
	.append("rect")
	.attr("class", "barCrisis")
	.attr("x", function(d){
		return (x(d.heat) + x(d.cool));
	})
	.attr("y", function(d){
		return y(d.state);
	})
	.attr("width", function(d){
		return x(d.crisis);
	})
	.attr("height", y.rangeBand())
	.on('mouseover', function(d){
		tip.show({
			state: d.stateLong,
			value: d.crisis,
			color: "8f87c0",
			label: "to crisis assistance",
			note: d.note
		});
	})
	.on('mouseout', tip.hide);

svg.selectAll(".barWx")
	.data(data)
	.enter()
	.append("rect")
	.attr("class", "barWx")
	.attr("x", function(d){
		return (x(d.heat) + x(d.cool) + x(d.crisis));
	})
	.attr("y", function(d){
		return y(d.state);
	})
	.attr("width", function(d){
		return x(d.weather);
	})
	.attr("height", y.rangeBand())
	.on('mouseover', function(d){
		tip.show({
			state: d.stateLong,
			value: d.weather,
			color: "cbc9e2",
			label: "to weatherization",
			note: d.note
		});
	})
	.on('mouseout', tip.hide);

svg.selectAll(".barOther")
	.data(data)
	.enter()
	.append("rect")
	.attr("class", "barOther")
	.attr("x", function(d){
		return (x(d.heat) + x(d.cool) + x(d.crisis) +x(d.weather));
	})
	.attr("y", function(d){
		return y(d.state);
	})
	.attr("width", function(d){
		return x(100) - (x(d.heat) + x(d.cool) + x(d.crisis) +x(d.weather));
	})
	.attr("height", y.rangeBand())
	.on('mouseover', function(d){
		tip.show({
			state: d.stateLong,
			value: d.other,
			color: "969696",
			label: "to administrative and other costs",
			note: d.note
		});
	})
	.on('mouseout', tip.hide);

// draw the axes
svg.append("g")
	.attr("class", "x axis")
	.call(xAxis);

svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);

// draw the legend
d3.legend = svg.selectAll(".legend")
	.data(colors)
	.enter()
	.append("g")
	.attr("class", "legend")
	.attr("transform", function(d,i){
		return "translate(0," + i*20 + ")";
	});

d3.legend.append("rect")
	.attr("x", width - 18)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", color);

d3.legend.append("text")
	.data(labels)
	.attr("x", width + 5) 
	.attr("y", 9)
	.attr("dy", ".35em")
	.attr("class", "fun")
	.style("text-anchor", "start") // "start" for text aligned right
	.text(function(d, i){
		return labels[i];
	});