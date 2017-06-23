import * as d3 from 'd3'

export default function rotation() {
  const box = {
	  width: 400,
	  height: 400,
	  scale: 180
  }
  const context = d3.select('body')
    .append('svg')
	.attr('width', box.width)
	.attr('height', box.height)
	.style('display', 'block')
	.style('margin', '20px auto')
	 
	
var projection = d3.geoAzimuthalEqualArea()
    .scale(	80)
    .translate([box.width / 2, box.height / 2])
    .precision(0.1);

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule();



context.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path)
	.style('fill', 'none')
	.style('stroke', '#777777')
	.style('stroke-width', '1px')
	.style('stroke-opacity', '0.5')

//canvas 实现	动态旋转
  function dynCtxPath(x = 0){
    const dynProjection = d3.geoAzimuthalEqualArea()
      .scale(80)
      .translate([box.width /2, box.height / 2])
      .rotate([x, 0, -10])
      .precision(0.1)

    return d3.geoPath().projection(dynProjection).context(ctx);
  }
  const ctx = d3.select('body')
     .append('canvas')
	 .attr('width', box.width)
	 .attr('height', box.height)
	 .style('display', 'block')
	 .style('margin', '20px auto')
	 .node()
	 .getContext('2d')
	 
  const ctxPath = d3.geoPath().projection(projection).context(ctx);
  
  d3.timer(function(elapsed) {
    ctx.clearRect(0, 0, box.width, box.height);
    ctx.beginPath();
    dynCtxPath(elapsed / 500)(graticule());
    ctx.strokeStyle='rgba(150,150,150, 0.5)';
    ctx.stroke();
    ctx.restore();
  });
}