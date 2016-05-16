var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
},
	width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["orange", "blue", "red", "green"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", function (error, data) {
		if(error) throw error;

		color.domain(d3.keys(data[0]).filter(function(key){
			return key !== "state";
		}));

		data.forEach(function(d){
			var y0 = 0;
			d.assistance = color.domain().map(function(name){
				return {
					name:name,
					y0:y0,
					y1:y0 += +d[name]
				};
			})
			d.total = d.assistance[d.assistance.length - 1].y1;
		});

		// data.sort(function(a,b){
		// 	return b.total - a.total;
		// });
		
		x.domain(data.map(function(d){
			return d.state;
		}));
		y.domain([0, d3.max(data,function(d){
			return d.total;
		})]);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		var state = svg.selectAll(".state")
			.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d){
				return "translate(" + x(d.state) + ",0)";
			});

		state.selectAll("rect")
			.data(function(d){
				return d.assistance;
			})
			.enter().append("rect")
			.attr("width", x.rangeBand())
			.attr("y", function(d){
				return y(d.y1);
			})
			.attr("height", function(d){
				return y(d.y0) - y(d.y1);
			})
			.style("fill", function(d){
				return color(d.name);
			});
});