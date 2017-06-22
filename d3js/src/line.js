import * as d3 from 'd3'
import data from './data.json'

export default function line() {
  const box = {
    width: 400,
    height: 200,
    paddingLeft: 25,
    paddingTop: 25,
    paddingRight: 25,
    paddingBottom: 25
  }
  const lineContext = d3.select('body').append('svg').style('display', 'block').style('margin', '0 auto')

  lineContext.attr('width', box.width).attr('height', box.height)

  lineContext.append('g').classed('line', true)
  lineContext.append('g').classed('tooltips', true)
  lineContext.append('g').classed('xaxis', true)
  lineContext.append('g').classed('yaxis', true)
  lineContext.append('g').classed('titl', true)

  function valF (collection){
    return collection.map(item => {
      return d3.values(item)[0]
    })
  }

  let xScale = d3.scaleLinear().domain([0, (data.temperature.length - 1) * 1.1]).range([0, box.width - box.paddingLeft - box.paddingRight])
  let yScale = d3.scaleLinear().domain([0, d3.max(valF(data.temperature)) * 1.1]).range([box.height - box.paddingTop - box.paddingBottom, 0])
  let xAxis = d3.axisBottom().scale(xScale).ticks(data.temperature.length - 1).tickFormat(i => d3.keys(data.temperature[i])[0])
  let yAxis = d3.axisLeft().scale(yScale).ticks(3)
  
  function clcLine(data){
    var line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => {
          return yScale(d3.values(d)[0])
        })
    return line(data);    
  }
  // 画线
  lineContext.select('.line')
    .attr('transform', `translate(${box.paddingLeft}, ${box.paddingTop})`)
    .append('path')
    .attr('d', clcLine(data.temperature))
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('strokeWidth', 2)
	
    //坐标尺
  lineContext.select('.xaxis').attr('transform', `translate(${box.paddingLeft}, ${box.height - box.paddingBottom})`).call(xAxis)
  lineContext.select('.yaxis').attr('transform', `translate(${box.paddingLeft}, ${box.paddingTop})`).call(yAxis)	

}