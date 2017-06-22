import * as d3 from 'd3'
import data from './data.json'

export default function pie() {
  const box = {
    width: 400,
    height: 200,
    innerRadius: 40,
	outerRadius: 80
  }
  
  //插入svg
  const pieContext = d3.select('body')
    .append('svg')
	.style('display', 'block')
	.style('margin', '20px auto')
	.attr('height', box.height)
	.attr('width', box.width);
  
  //插入图例容器
  pieContext.append('g').attr('class', 'legend')
    .attr('transform', `translate(${box.width - 90}, 0)`)
  
  const arcs = d3.pie().value(d => d3.values(d)[0])(data.temperature);
  const colors = d3.schemeCategory10
  const arc = d3
    .arc()
	.innerRadius(box.innerRadius)
    .outerRadius(box.outerRadius)
  pieContext.selectAll('g.arc')
    .data(arcs)
    .enter()
	.append('g')
	.attr('class', 'arc')
	.attr('transform', `translate(${box.width/2}, ${box.height/2})`)
	.append('path')
	.attr('d', arc)
	.attr('fill', (d,i) => {
		return colors[d.index]
	})
	
  //插入图例
  pieContext.select('.legend')
    .selectAll('rect')
    .data(arcs)
	.enter()
	.append('rect')
	.attr('x', 0)
  	.attr('y', (d, i) => i * 20)
	.attr('width', 10)
	.attr('height', 10)
	.attr('fill', (d) => colors[d.index])
	
   //插入图例文字
   pieContext.select('.legend')
   .selectAll('text')
   .data(arcs)
   .enter()
   .append('text')
   .attr('x', 20)
   .attr('y', (d, i) => i * 20 + 10)
   .text(d => d3.keys(d.data)[0])
}