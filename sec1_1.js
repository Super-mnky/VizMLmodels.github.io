function sec1_1(loaded){
    var svg;
    if (loaded){
        svg = d3.select("#sec1").select("svg")
    } else {
        svg = d3.select("#sec1").append("svg")
        .attr('width','1200').attr('height',height)
    }

    svg.append("text").attr("class","intro-heading")
    .attr("transform","translate(100,315)")
    .text("Visualizing ML Model Selection")

    svg.append("text").attr("class","intro-subheading")
    .attr("transform","translate(100,350)")
    .text("Created by. Jerry Jones, Hyemi Song, and Kaitlyn Yang")

    var bigCircle = svg.append('circle').attr('fill', 'none')
    .attr('r', '400').attr('cx', '340').attr('cy', '290')
    .attr('stroke', 'black').attr('stroke-dasharray', '8')
    .transition().duration(1000).attr('stroke-dasharray', '4').attr('r','300')

    var smallCircle = svg.append('circle').attr('fill', 'none')
    .attr('r', '50').attr('cx', '600').attr('cy', '450')
    .attr('stroke', 'black').attr('stroke-dasharray', '8')
    .transition().duration(1000).attr('stroke-dasharray', '4').attr('r','150')


}
