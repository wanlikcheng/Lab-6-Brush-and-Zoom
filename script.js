let data;
let unemploymentData;

d3.csv('unemployment (1).csv', d3.autoType)
    .then(data => {
        unemploymentData = data;
        console.log('unemployment data', data);
        AreaChart(".container");
    })

// input: selector for a chart container e.g., ".chart"
function AreaChart(container) {

	// margin
    const margin = ({top: 40, right: 40, bottom: 40, left: 40})

    const width = 750 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    const svg = d3.select(".areachart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // create scales without domains
    // scales
    const xScale = d3.scaleTime()
        .range([0, width])

    const yScale = d3.scaleLinear()
        .range([height, 0])

    // create path for area
    svg.append("path")
        .datum(data)
        .attr("class", "area");

    // create axes and axis title containers

    // using axis
    let xAxis = d3.axisBottom()
        .scale(xScale)

    let yAxis = d3.axisLeft()
        .scale(yScale)

    // Draw the axis
    let xAxisGroup = svg.append("g")
        .attr("class", "axis x-axis")

    let yAxisGroup = svg.append("g")
        .attr("class", "axis y-axis")

    // adding labels

    svg.append("text")
        .attr("class", "ylabel")
        .attr('x', -12)
        .attr('y', -3)
        .attr("alignment-baseline", "baseline")
        .text("Industry")

	function update(data) { 
        // update domains
        xScale.domain([
            d3.min(data, function(d) { return d.date; }),
            d3.max(data, function(d) { return d.date; })
        ])

        yScale.domain([0, d3.max(data, function(d) {
            return d.total;
        })]);

        // area chart
        var area = d3.area()
            .x(function(d) { return xScale(d.date); })
            .y0(function() { return yScale.range()[0]; })
            .y1(function(d) { return yScale(d.total); })
            .attr("d", area)

		// update scales, encodings, axes (use the total count)
        // update axis
        let xAxis = d3.axisBottom()
            .scale(xScale)

        let yAxis = d3.axisLeft()
            .scale(yScale)

        xAxisGroup = svg
            .select(".x-axis") // don't need the entire "axis x-axis"?
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        yAxisGroup = svg.select(".y-axis") // don't need the entire "axis y-axis"?
            .call(yAxis);
                
    }

    update(unemploymentData);

	return {
		update // ES6 shorthand for "update": update
	};
}

function StackedAreaChart(container) {

	// margin
    const margin = ({top: 40, right: 40, bottom: 40, left: 40})

    const width = 750 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    const svg = d3.select(".areachart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // create scales without domains
    // scales
    const xScale = d3.scaleTime()
        .range([0, width])

    const yScale = d3.scaleLinear()
        .range([height, 0])

    const colorScale = scaleOrdinal()
        .range()

    // create path for area
    svg.append("path")
        .datum(data)
        .attr("class", "area");

    // create axes and axis title containers

    // using axis
    let xAxis = d3.axisBottom()
        .scale(xScale)

    let yAxis = d3.axisLeft()
        .scale(yScale)

    // Draw the axis
    let xAxisGroup = svg.append("g")
        .attr("class", "axis x-axis")

    let yAxisGroup = svg.append("g")
        .attr("class", "axis y-axis")

    // adding labels

    svg.append("text")
        .attr("class", "ylabel")
        .attr('x', -12)
        .attr('y', -3)
        .attr("alignment-baseline", "baseline")
        .text("Industry")

	function update(data) { 
        // update domains
        xScale.domain([
            d3.min(data, function(d) { return d.date; }),
            d3.max(data, function(d) { return d.date; })
        ])

        yScale.domain([0, d3.max(data, function(d) {
            return d.total;
        })]);

        // area chart
        var area = d3.area()
            .x(function(d) { return xScale(d.date); })
            .y0(function() { return yScale.range()[0]; })
            .y1(function(d) { return yScale(d.total); })
            .attr("d", area)

		// update scales, encodings, axes (use the total count)
        // update axis
        let xAxis = d3.axisBottom()
            .scale(xScale)

        let yAxis = d3.axisLeft()
            .scale(yScale)

        xAxisGroup = svg
            .select(".x-axis") // don't need the entire "axis x-axis"?
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        yAxisGroup = svg.select(".y-axis") // don't need the entire "axis y-axis"?
            .call(yAxis);
                
    }

    update(unemploymentData);

	return {
		update // ES6 shorthand for "update": update
	};
}