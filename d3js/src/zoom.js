import * as d3 from 'd3';
import { price } from './data.json';

export default function zoom() {
  const box = {
    height: 500,
    width: 800,
    margin1: {
      top: 20, right:20, bottom: 110, left: 40
    },
    margin2: {
      top: 430, right: 20, bottom: 30, left: 40
    },
    innerWidth: 740,
    innerHeight1: 370,
    innerHeight2: 40
  }

  const parseDate = d3.timeParse('%b %Y');

  const svg = d3.select('body')
    .append('svg')
    .attr('height', box.height)
    .attr('width', box.width)

  const x = d3.scaleTime().range([0, box.innerWidth]);
  const x2 = d3.scaleTime().range([0, box.innerWidth]);
  const y = d3.scaleLinear().range([box.innerHeight1, 0]);
  const y2 = d3.scaleLinear().range([box.innerHeight2, 0]);
  x.domain(d3.extent(price, d => parseDate(d[0])))
  y.domain([0, d3.max(price, d => + d[1])])
  x2.domain(x.domain())
  y2.domain(y.domain())

  const xAxis = d3.axisBottom(x);
  const xAxis2 = d3.axisBottom(x2);
  const yAxis = d3.axisLeft(y);

  const brush = d3.brushX()
    .extent([[0,0], [box.width, box.innerHeight2]])
    .on('brush end', brushed)

  const zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [box.innerWidth, box.innerHeight1]])
    .extent([[0, 0], [box.innerWidth, box.innerHeight1]])
    .on('zoom', zoomed)

  const area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(d => x(parseDate(d[0])))
    .y0(box.innerHeight1)
    .y1(d => y(+ d[1]))

  const area2 = d3.area()
    .curve(d3.curveMonotoneX)
    .x(d => x2(parseDate(d[0])))
    .y0(box.innerHeight2)
    .y1(d => y2(+ d[1]))

  svg.append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', box.innerWidth)
    .attr('height', box.innerHeight1)

  const focus = svg.append('g')
    .attr('class', 'focus')
    .attr('transform', `translate(${box.margin1.left}, ${box.margin1.top})`)

  const context = svg.append('g')
    .attr('class', 'context')
    .attr('transform', `translate(${box.margin2.left}, ${box.margin2.top})`)



  focus.append('path')
    .datum(price)
    .attr('class', 'area')
    .attr('d', area)
    .style('fill', 'steelblue')
    .style('clip-path','url(#clip)')

  focus.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${box.innerHeight1})`)
    .call(xAxis)
  
  focus.append('g')
     .attr('class', 'axis axis--y')
     .call(yAxis)

  context.append('path')
    .datum(price)
    .attr('class', 'area')
    .attr('d', area2)

  context.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${box.innerHeight2})`)
    .call(xAxis2)

  context.append('g')
    .attr('class', 'brush')
    .call(brush)
    .call(brush.move, x.range())  

  svg.append('rect')
    .attr('class', 'zoom')
    .attr('width', box.innerWidth)
    .attr('height', box.innerHeight1)
    .attr('transform', `translate(${box.margin1.left}, ${box.margin1.top})`)
    .style('cursor', 'move')
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .call(zoom);

  function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') {
      return;
    }
    const s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    focus.select('.area').attr('d', area)
    focus.select('.axis--x').call(xAxis)
    svg.select('.zoom').call(zoom.transform, d3.zoomIdentity
      .scale(box.innerWidth / (s[1] -s [0]))
      .translate(-s[0], 0))
    
  }

  function zoomed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    var t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    focus.select(".area").attr("d", area);
    focus.select(".axis--x").call(xAxis);
    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
 }

  function type(d) {
    d.date = parseDate(d[0]);
    d.price = +d[1];
    return d;
  }  
}