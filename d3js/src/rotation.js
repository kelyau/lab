import * as d3 from 'd3'

export default function rotation() {
  const box = {
	  width: 400,
	  height: 400,
	  scale: 180
  }
  const canvas = d3.select('body')
    .append('canvas')
	.attr('width', box.width)
	.attr('height', box.height)
	.style('display', 'block')
	.style('margin', '40px auto')
	
  const context = canvas.node().getContext('2d');
  
  const sphere = {type: 'Sphere'}
  const graticule = d3.geoGraticule()()
  
  d3.timer((elapsed) => {
  })
}