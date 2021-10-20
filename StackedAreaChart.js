export default function StackedAreaChart(container) {

	// initialization
    const margin = {top: 50, right: 20, bottom: 20, left: 50};
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // create svg with margin conventions
    var svg = d3.select(container).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // create scales
	let xScale = d3.scaleTime()
        .range([0,width])

    let xAxis = d3.axisBottom()
        .scale(xScale)

    let yScale = d3.scaleLinear()
        .range([height, 0])

    let yAxis = d3.axisLeft()
        .scale(yScale)

    let colorScale = d3.scaleOrdinal()
        .range(d3.schemeTableau10);
    
    let xAxisGroup = svg.append('g')
        .attr('class', 'x-axis')

    let yAxisGroup = svg.append('g')
        .attr('class', 'y-axis')

    var tooltip = svg.append('text')
        .attr('x', -20)
        .attr('y', -20)
        .attr('font-size', 14);

    svg.append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('x', 0)
        .attr('y', 0);

    var selected = null, xDomain, data

    //update function
    function update(_data) {
        // keys
        data = _data
        var keys = selected ? [selected] : data.categories;

        var stack = d3.stack()
            .keys(keys)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);

        var series = stack(data);

        colorScale.domain(keys)
        xScale.domain(xDomain ? xDomain : d3.extent(data, d=> d.date))
        yScale.domain([0, d3.max(series, a=> d3.max(a, d=> d[1]))])

        var area = d3.area()
            .x(d=> xScale(d.data.date))
            .y0(d=> yScale(d[0]))
            .y1(d=> yScale(d[1]))

        var areas = svg.selectAll('.area')
            .data(series, d=> d.key)

        areas.enter()
            .append('path')
            .attr('clip-path', 'url(#clip)')
            .attr('class', 'area')
			.attr('id', d => 'myArea ' + d.key)
			.attr('fill', d => colorScale(d.key))
			.on('mouseover', (event, d) => tooltip.text(d.key))
			.on('mouseout', (event, d) => {
				if (selected == null) tooltip.text('')
			})
			.on('click', (event, d) => {
				if (selected == d.key) selected = null
				else selected = d.key
				tooltip.text(d.key)
				update(data)
			})
			.merge(areas)
			.attr('d', area);

        areas.exit().remove();

        xAxisGroup.call(xAxis).attr('transform', 'translate(0,' + height + ')');
        yAxisGroup.call(yAxis);

	}

    function filterByDate(range) {
        xDomain = range;
        update(data);
    }

	return {
		update, filterByDate
	}
}