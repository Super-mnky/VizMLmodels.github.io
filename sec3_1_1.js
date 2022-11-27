var dataX = 160
var modelX = 450;

function sec3_1_1(loaded) {
    var svg;
    if (loaded) {
        svg = d3.select("#sec3").select("svg")
    } else {
        svg = d3.select("#sec3").append("svg")
            .attr('width', width).attr('height', height)
    }

    var transitionPath = d3.transition().ease(d3.easeSin).duration(2000);

    svg.append('line').attr('id', 'data-line').attr("class", "viz-3-elms")
        .attr('stroke', 'black').attr('stroke-width', '1')
        .attr('x1', dataX).attr('x2', dataX)
        .attr('y1', '140').attr('y2', '140')
        .transition(transitionPath)
        .attr('y2', '480')

    svg.append('line').attr('id', 'model-line').attr("class", "viz-3-elms")
        .attr('stroke', 'black').attr('stroke-width', '1')
        .attr('x1', modelX).attr('x2', modelX)
        .attr('y1', '140').attr('y2', '140')
        .transition(transitionPath)
        .attr('y2', '480')

    var lines = ['bin-to-lr', 'bin-to-ln', 'mc-to-lr', 'mc-to-knn', 'rgsn-to-ln']
    var y1s = [180, 180, 325, 325, 420]
    var y2s = [180, 325, 180, 240, 325]

    for (i = 0; i < lines.length; i++) {
        svg.append('line').attr('id', lines[i]).attr("class", "viz-3-elms")
            .attr('stroke', 'black').attr('stroke-width', '1')
            .attr('x1', dataX).attr('x2', dataX)
            .attr('y1', y1s[i]).attr('y2', y1s[i])
            .transition(transitionPath)
            .attr('y2', y2s[i])
            .attr('x2', modelX)
    }

    var points = ['bin-circle', 'mc-circle', 'rgsn-circle', 'lr-circle', 'knn-circle', 'ln-circle', 'unamed-1', 'unamed-2']
    var cxs = [dataX, dataX, dataX, modelX, modelX, modelX, modelX, modelX]
    var cys = [180, 325, 420, 180, 240, 325, 380, 450]

    for (i = 0; i < points.length; i++) {
        svg.append('circle').attr('id', points[i]).attr("class", "viz-3-elms")
            .attr('r', '0').attr('cx', cxs[i]).attr('cy', cys[i])
            .transition(transitionPath).attr('r', '5')
    }

    var texts = ['Data', 'Models', 'Binary', 'Multi-Classes', 'Regression', 'Logistic Regression',
        'KNN', 'Linear Regression']
    var transforms = ['(140,120)', '(420,120)', '(100,185)', '(50,330)', '(65,425)', '(470,185)',
        '(470,245)', '(470,330)']

    for (i = 0; i < texts.length; i++) {
        svg.append('text').attr('class', 'label').attr("class", "viz-3-elms")
            .attr('fill', 'black').attr('opacity', '0')
            .attr('transform', 'translate' + transforms[i])
            .text(texts[i])
            .transition(transitionPath)
            .attr('opacity', '1')
    }
}

function sec3_2_1(loaded) {
    svg = d3.select("#sec3").select("svg")

    svg.append("line").attr("id","line2")
    .attr('stroke', 'black').attr('stroke-width', '1')
    .attr('x1', dataX).attr('x2', modelX)
    .attr('y1', 180).attr('y2', 325)

    svg.selectAll("circle").attr("fill", "black")
    svg.selectAll("line").attr("stroke", "black").attr("stroke-width", "1")

    svg.select("#bin-circle").transition().duration(500).attr("fill", "red")
    svg.select("#bin-to-lr").transition().duration(500).attr("stroke-width", "3").attr("stroke", "red")
    svg.select("#line2").transition().duration(500).attr("stroke-width", "3").attr("stroke", "red")
    svg.select("#lr-circle").transition().duration(500).attr("fill", "red")
    svg.select("#ln-circle").transition().duration(500).attr("fill", "red")
}

function sec3_2_2(loaded) {
    svg = d3.select("#sec3").select("svg")

    svg.select("#line2").remove()
    svg.selectAll("circle").attr("fill", "black")
    svg.selectAll("line").attr("stroke", "black").attr("stroke-width", "1")

    svg.select("#mc-circle").transition().duration(500).attr("fill", "red")
    svg.select("#mc-to-lr").transition().duration(500).attr("stroke-width", "3").attr("stroke", "red")
    svg.select("#mc-to-knn").transition().duration(500).attr("stroke-width", "3").attr("stroke", "red")
    svg.select("#lr-circle").transition().duration(500).attr("fill", "red")
    svg.select("#knn-circle").transition().duration(500).attr("fill", "red")
}

function sec3_2_3(loaded) {
    sec3_1_1(false)
    svg = d3.select("#sec3").select("svg")

    svg.selectAll("circle").attr("fill", "black")
    svg.selectAll("line").attr("stroke", "black").attr("stroke-width", "1")

    svg.select("#rgsn-circle").transition().duration(500).attr("fill", "red")
    svg.select("#rgsn-to-ln").transition().duration(500).attr("stroke-width", "3").attr("stroke", "red")
    svg.select("#ln-circle").transition().duration(500).attr("fill", "red")
}