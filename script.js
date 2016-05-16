var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
},
	width = 400 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
    .rangeRoundBands([height, 0], .1);

var x = d3.scale.linear()
    .rangeRound([0, width]);

var color = d3.scale.ordinal()
    .range(["#FD8D3C", "#756bb1", "#fdbe85", "#cbc9e2", "#969696"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.format(".2s"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    // ;

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
		
		y.domain(data.map(function(d){
			return d.state;
		}));
		x.domain([0, d3.max(data,function(d){
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
				return "translate(0," + y(d.state) + ")";
			});

		state.selectAll("rect")
			.data(function(d){
				return d.assistance;
			})
			.enter().append("rect")
			.attr("height", y.rangeBand())
			.attr("x", function(d){
				return x(d.y0);
			})
			.attr("width", function(d){
				return x(d.y1) - x(d.y0);
			})
			.style("fill", function(d){
				return color(d.name);
			});
});