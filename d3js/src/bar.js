import * as d3 from 'd3'
import data from './data.json'

window.d3 = d3;

export default function bar() {
  const boxWidth = 400;
  const boxHeight = 200;
  const boxPl = 25;
  const boxPb = 25;
  const boxPt = 25;
  const boxPr = 25;
  const width = 10;
  const distance = 15;
  
  function valF (collection){
    return collection.map(item => {
      return d3.values(item)[0]
    })
  }
  let xScale = d3.scaleLinear().domain([0, data.temperature.length -1]).range([0, boxWidth - boxPl - boxPr])
  let yScale = d3.scaleLinear().domain([0, d3.max(valF(data.temperature))]).range([boxHeight - boxPb - boxPt, 0])
  let xAxis = d3.axisBottom().scale(xScale).tickFormat(i => d3.keys(data.temperature[i])[0])
  let yAxis = d3.axisLeft().scale(yScale).tickFormat(i => !(i % 5) ? i : null);

  function clcX (d, i) {
    return xScale(i);
  }
  
  function clcH (d, i) { 
    const h = boxHeight - boxPb - boxPl - yScale(d3.values(d)[0])
    return h;
  }
  function clcY (d, i) {
    const y = boxHeight - clcH(d, i)
    return y
  }
  
  const barContext = d3.select('body').append('svg')
  barContext.attr('width', boxWidth)
            .attr('height', boxHeight)
            .style('display', 'block')
            .style('margin', '0 auto')
  barContext.append('g')
            .classed('bars', true)
            .attr('transform', `translate(${boxPl}, -${boxPb})`)
  barContext.append('g')
            .classed('tooltips', true)
            .attr('transform', `translate(${boxPl}, -${boxPb})`)
  barContext.append('g')
            .classed('xaxis', true)
            .attr('transform', `translate(${boxPl}, ${boxHeight - boxPt} )`)
  barContext.append('g')
            .classed('yaxis', true)
            .attr('transform', `translate(${boxPl}, ${boxPt})`)
            .append('text')
            .attr('transform', 'rotate(-90)')
                      
  //柱体
  barContext.select('.bars')
            .selectAll('rect')
            .data(data.temperature)
            .enter()
            .append('rect')
            .attr('width', width)
            .attr('height', clcH)
            .attr("x", clcX)
            .attr("y", clcY)
            .style('fill', 'cadetblue')
  //文字标签          
  barContext.select('.tooltips')
            .selectAll('text')
            .data(data.temperature)
            .enter()
            .append('text')
            .attr('x', clcX)
            .attr('y', clcY)
            .text(item => d3.values(item)[0])
  //坐标尺
  barContext.select('.xaxis').call(xAxis)
  barContext.select('.yaxis').call(yAxis)

}