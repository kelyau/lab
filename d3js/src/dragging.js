import * as d3 from 'd3'

export default function dragging() {
  const box = {
    width: 400,
    height: 200,
    padding: 20
  }
  const radius = 22;
  const colors = d3.scaleOrdinal()
    .range(d3.schemeCategory20);
  const svgContext = d3.select('body')
    .append('svg')
	.attr('width', box.width)
	.attr('height', box.height)
	.style('display', 'block')
	.style('margin','20px auto')
	
  const circles = d3.range(20)
    .map(() => {
		return {
			x: Math.round(Math.random() * (box.width - radius * 2)  + radius ),
			y: Math.round(Math.random() * (box.height - radius * 2)  + radius ),
		}
	})
  svgContext.selectAll('circle')
    .data(circles)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', radius)
    .style('fill', (d, i) => colors(i))
	.call(d3.drag()
	  .on('start', dragStart)
	  .on('drag', dragIng)
	  .on('end', dragEnd))
	  
  function dragStart(d){
	  d3.select(this).raise().classed('active', true);
  }	  
  function dragIng(d){
	  d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y)
  }
  function dragEnd(d){
	  d3.select(this).classed('active', false);
  }
}