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

  let xScale = d3.scaleLinear().domain([0, data.temperature.length - 1]).range([0, box.width - box.paddingLeft - box.paddingRight])
  let yScale = d3.scaleLinear().domain([0, d3.max(valF(data.temperature))]).range([box.width - box.paddingTop - box.paddingBottom, 0])

  console.log(xScale(5))
  function clcLine(data){
    var line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => {
          return box.height - yScale(d3.values(d)[0])
        })
    return line(data);    
  }
  d3.select('.line')
    .append('path')
    .attr('d', clcLine(data.temperature))
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('strokeWidth', 2)

}