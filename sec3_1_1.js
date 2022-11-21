function sec3_1_1(){
    var svg = d3.select("#sec3").append("svg")
    .attr('width', width).attr('height', height)  

    svg.append("line").attr('stroke','black').attr('stroke-width','2')
    .attr('x1', '160').attr('x2', '160')
    .attr('y1','140').attr('y2', '480')

}