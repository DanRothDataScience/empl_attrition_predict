var static_data = [{
  grad_year: 2010,
  student_count: 42
},{
  grad_year: 2015,
  student_count: 102
},{
  grad_year: 2016,
  student_count: 160
},{
  grad_year: 2017,
  student_count: 82
},{
  grad_year: 2018,
  student_count: 48
},{
  grad_year: 2019,
  student_count: 68
},{
  grad_year: 2020,
  student_count: 28
}];
var tip = d3.select(".chart-container")
	.append("div")
  .attr("class", "tip")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden");

var svg = d3.select("svg").attr("class", "background-style"),
    margin = {top: 20, right: 20, bottom: 42, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.json("apiPlaceholderURL", function(error, data) {
  //if (error) throw error;

d3.csv("/mar_info.csv", function(data) {
	console.log(data);
	// data = static_data;
	
	x.domain(data.map(function(d) { return d.MaritalStatus; }));
	y.domain([0, d3.max(data, function(d) { return d.AttrRatio; })]);

	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
	 .append("text")
		.attr("y", 6)
		.attr("dy", "2.5em")
		.attr("dx", width/2 - margin.left)
		.attr("text-anchor", "start")
		.text("Grad Year");

	g.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y).ticks(10))
	  .append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Student Count");
   

	g.selectAll(".bar")
	  .data(data)
	  .enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.MaritalStatus); })
		.attr("y", function(d) { return y(d.AttrRatio); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - y(d.AttrRatio)})
		.on("mouseover", function(d) {return tip.text(d.AttrRatio).style("visibility", "visible").style("top", y(d.AttrRatio) - 13+ 'px' ).style("left", x(d.MaritalStatus) + x.bandwidth() - 12 + 'px')})
		  //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
		  .on("mouseout", function(){return tip.style("visibility", "hidden");});
	   });
	
