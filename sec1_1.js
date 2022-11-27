function sec1_1(loaded){
    var svg;
    if (loaded){
        svg = d3.select("#sec1").select("svg")
    } else {
        svg = d3.select("#sec1").append("svg")
        .attr('width',w_width).attr('height',w_height)
    }

    var radius = 400;
    var data=[1,2,3,4]
    
    // var svg = d3.select('#sec1_1').append('svg').attr("class", "svg1-1-1")
    // .attr('width', w_width)
    // .attr('height', w_height)

    var circleGroup = svg.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function(d, i) {return 'translate('+ xPos(i) +','+ yPos(i) +')'})

    function xPos(i){
        var x;
        if(i==0){x = w_width/2}
        if(i==1){x = w_width/4}
        if(i==2){x = w_width/6}
        if(i==3){x = w_width/5}
        return x
    }
    function yPos(i){
        var y;
        if(i==0){y = w_height/2}
        if(i==1){y = w_height/4}
        if(i==2){y = w_height/6}
        if(i==3){y = w_height/5}
        return y
    }

    var bgCircle = circleGroup.append("circle")
    .attr("class", "bcCircle")
    .attr("fill", 'none')
    .attr("stroke", mainColor['darkblue'])
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", 1)
    .attr("cx", 0).attr("cy", 0)
    .attr("r", function(d, i) {return i == 0 ? radius : radius/(i*2)})
    repeat();
    
    function repeat() {
        bgCircle
        .attr('r', function(d, i) {return i == 0 ? radius : radius/(i*2)})
        .transition()        // apply a transition
        .duration(2000)      // apply it over 2000 milliseconds
        .attr('r', function(d, i) {return i == 0 ? radius*0.95 : radius/(i*2)*0.95})
        .transition()        // apply a transition
        .duration(2000)      // apply it over 2000 milliseconds
        .attr('r', function(d, i) {return i == 0 ? radius : radius/(i*2)})
        .on("end", repeat);  // when the transition finishes start again
    };

    var title1 = svg.append('text').text('Learning').attr("class", "text-mlg").attr("fill", mainColor['darkblue'])
    var title2 = svg.append('text').text('ML Model Comparison').attr("class", "text-mlg").attr("fill", mainColor['darkblue'])
    title1.attr('transform', function(d, i) {return 'translate('+ (w_width/20) +','+((w_height/2)-30) +')'})
    title2.attr('transform', function(d, i) {return 'translate('+ (w_width/20) +','+((w_height/2)+30) +')'})


    // svg.append("text").attr("class","intro-heading")
    // .attr("transform","translate(100,315)")
    // .text("Visualizing ML Model Selection")

    // svg.append("text").attr("class","intro-subheading")
    // .attr("transform","translate(100,350)")
    // .text("Created by. Jerry Jones, Hyemi Song, and Kaitlyn Yang")

    // var bigCircle = svg.append('circle').attr('fill', 'none')
    // .attr('r', '400').attr('cx', '340').attr('cy', '290')
    // .attr('stroke', 'black').attr('stroke-dasharray', '8')
    // .transition().duration(1000).attr('stroke-dasharray', '4').attr('r','300')

    // var smallCircle = svg.append('circle').attr('fill', 'none')
    // .attr('r', '50').attr('cx', '600').attr('cy', '450')
    // .attr('stroke', 'black').attr('stroke-dasharray', '8')
    // .transition().duration(1000).attr('stroke-dasharray', '4').attr('r','150')
}
