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

// drawing axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .tickFormat(d3.format(".2s"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// var tip = d3.tip()
//   .attr('class', 'd3-tip')
//   .offset([-10, 0])
//   .html(function(d) {
//     return "<strong>Frequency:</strong> <span style='color:red'>" + d.value + "</span>";
//   })

// adds chart to the div
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// svg.call(tip);

// pull in data
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
		
		y.domain(data.map(function(d){
			return d.state;
		}));
		x.domain([0, d3.max(data,function(d){
			return d.total;
		})]);

		svg.append("g")
			.attr("class", "x axis")
			// getting rid of this code leaves x axis at top of chart: '.attr("transform", "translate(0," + height + ")")'
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		var state = svg.selectAll(".state")
			.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d){
				return "translate(0," + y(d.state) + ")"; // this line important for vertical stacking (using y instead of x)
			});

		state.selectAll("rect")
			.data(function(d){
				return d.assistance;
			})
			.enter().append("rect")
			.attr("height", y.rangeBand()) // height in rangeBand for vertical stacking
			.attr("x", function(d){
				return x(d.y0);
			}) // the horizontal position in the stack
			.attr("width", function(d){
				return x(d.y1) - x(d.y0);
			}) //horizontal 'height' of the bar
			.style("fill", function(d){
				return color(d.name);
			})
			// .on('mouseover', tip.show)
   //    		.on('mouseout', tip.hide);

			.on("mouseover",function(){
				tooltip.style("display", null);
			})
			.on("mouseout", function(){
				tooltip.style("display", "none");
			})
			.on("mousemove", function(d){
				var xPosition = d3.mouse(this)[0] - 15;
				var yPosition = d3.mouse(this)[1] - 25;
				tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
				tooltip.select("text").text(d.y);
			});

		// draws the legend
		var legend = svg.selectAll(".legend")
			.data(color.domain().slice())
			.enter()
			.append("g")
			.attr("class", "legend")
			.attr("transform", function(d,i){
				return "translate(0," + i*20 + ")";
			});

		legend.append("rect")
			.attr("x", width - 18)
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", color);

		legend.append("text")
			.attr("x", width + 5) 
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "start") // "start" for text aligned right
			.text(function(d){
				return d;
			});

		// draw the tooltip

		var tooltip = svg.append("g")
  			.attr("class", "tooltip")
  			.style("display", "none");
    
		tooltip.append("rect")
		  .attr("width", 30)
		  .attr("height", 20)
		  .attr("fill", "white")
		  .style("opacity", 0.5);

		tooltip.append("text")
		  .attr("x", 15)
		  .attr("dy", "1.2em")
		  .style("text-anchor", "middle")
		  .attr("font-size", "12px")
		  .attr("font-weight", "bold");
});