//comoare model-data
function sec3_1_1(loaded) {
    var svg;
    if (loaded){
        svg = d3.select("#sec3").select("svg")
    } else {
        svg = d3.select("#sec3").append("svg")
            .attr('width', w_width).attr('height', w_height)
        visContainer = svg.append('g').attr("class", "iris")
            .attr('transform', function(d, i) {return 'translate('+ (w_width/2) +','+(w_height/2.2) +')'})
    }
    
    var dividen = 5
    var modelX = (w_width/dividen);
    var dataX = -w_width/dividen
    var chartY1 = -150
    var chartY2 = 150
    var yDist = (chartY1-chartY2)
    var transitionPath = d3.transition().ease(d3.easeSin).duration(2000);

    visContainer.append('line').attr('id', 'data-line')
        .attr('stroke', 'black').attr('stroke-width', '2')
        .attr('x1', dataX).attr('x2', dataX)
        .attr('y1', chartY1).attr('y2', chartY1)
        // .transition(transitionPath)
        .attr('y2', chartY2)

    visContainer.append('line').attr('id', 'model-line')
        .attr('stroke', 'black').attr('stroke-width', '2')
        .attr('x1', modelX).attr('x2', modelX)
        .attr('y1', chartY1).attr('y2', chartY1)
        // .transition(transitionPath)
        .attr('y2', chartY2)

    var points = ['unamed-1', 'bin-circle', 'mc-circle', 'rgsn-circle', 'unamed-1', 'unamed-1', 'lr-circle', 'knn-circle', 'ln-circle', 'unamed-1', 'unamed-2']
    var cxs = [dataX, dataX, dataX, dataX, dataX, modelX, modelX, modelX, modelX, modelX, modelX]
    var cys = [150, 180, 325, 420, 450, 150, 180, 240, 325, 380, 450]

    for (i = 0; i < points.length; i++) {
        visContainer.append('circle').attr('id', points[i])
            .attr('r', '5').attr('cx', cxs[i]).attr('cy', yDist+cys[i])
            .transition(transitionPath).attr('r', '5')
    }

    var lines = ['bin-to-lr', 'bin-to-ln', 'mc-to-lr', 'mc-to-knn', 'rgsn-to-ln']
    var y1s = [180, 180, 325, 325, 420]
    var y2s = [180, 325, 180, 240, 325]

    for (i = 0; i < lines.length; i++) {
        visContainer.append('line').attr('id', lines[i])
            .attr('stroke', 'black').attr('stroke-width', '1')
            .attr('x1', dataX).attr('x2', dataX)
            .attr('y1', yDist+y1s[i]).attr('y2', yDist+y1s[i])
            .transition(transition_800)
            .attr('y2', yDist+y2s[i])
            .attr('x2', modelX)
    }

    var texts = ['Binary', 'Multi-Classes', 'Regression', 'Logistic Regression',
        'KNN', 'Linear Regression']
    var dX = 130;
    var mX = 20;
    var tcxs = [dataX-dX+55, dataX-dX, dataX-dX+20, modelX+mX, modelX+mX, modelX+mX, modelX+mX]
    var tcys = [180, 325, 420, 180, 240, 325, 380]
   
    for (i = 0; i < texts.length; i++) {
        visContainer.append('text').attr('class', 'label')
        .attr('fill','black').attr('opacity','0')
        // .attr('transform','translate'+transforms[i])
        .attr('transform', 'translate('+ tcxs[i] +','+ (yDist+tcys[i]+5) +')')
        .text(texts[i])
        .transition(transition_800)
        .attr('opacity','1')
    }

    var labels = ['Data types', 'Models']
    // var transforms = ['(140,120)', '(420,120)']
    var lcxs = [dataX, modelX]
    var lcys = [chartY1, chartY1]

    for (i = 0; i < labels.length; i++) {
        visContainer.append('text').attr('class', 'label')
        .attr('fill','black').attr('opacity','0')
        // .attr('transform','translate'+transforms[i])
        .attr('transform', 'translate('+ (lcxs[i]-5) +','+ (lcys[i]-20) +')')
        .text(labels[i])
        .transition(transition_800)
        .attr('opacity','1')

    }

    /*
    <text class="label" fill="black" opacity="1" transform="translate(140,120)">Data</text>
    <text class="label" fill="black" opacity="1" transform="translate(420,120)">Models</text>
    <text class="label" fill="black" opacity="1" transform="translate(100,185)">Binary</text>
    <text class="label" fill="black" opacity="1" transform="translate(50,305)">Multi-Classes</text>
    <text class="label" fill="black" opacity="1" transform="translate(65,425)">Regression</text>
    <text class="label" fill="black" opacity="1" transform="translate(470,185)">Logistic Regression</text>
    <text class="label" fill="black" opacity="1" transform="translate(470,245)">KNN</text>
    <text class="label" fill="black" opacity="1" transform="translate(470,305)">Linear Regression</text>
    
    <line stroke="black" x1="160" x2="160" y1="140" y2="480" stroke-width="1" id="data-line"></line>
    <line stroke="black" y1="140" y2="480" stroke-width="1" x2="450" x1="450" id="model-line"></line>
    
    <line stroke="black" x1="160" stroke-width="1" x2="450" y2="180" y1="180" id="bin-to-lr"></line>
    <line stroke="black" x1="160" stroke-width="1" x2="450" y1="180" id="bin-to-ln" y2="300"></line>
    <line stroke="black" x1="160" stroke-width="1" x2="450" id="mc-to-lr" y1="300" y2="180"></line>
    <line stroke="black" x1="160" stroke-width="1" x2="450" y1="300" id="mc-to-knn" y2="240"></line>
    <line stroke="black" x1="160" stroke-width="1" x2="450" y1="420" id="rgsn-to-ln" y2="300"></line>
    
    <circle r="5" cx="160" cy="180" id="bin-circle"></circle>
    <circle r="5" cx="160" cy="300" id="mc-circle"></circle>
    <circle r="5" cx="160" cy="420" id="rgsn-circle"></circle>
    <circle r="5" cx="450" cy="180" id="lr-circle"></circle>
    <circle r="5" cx="450" cy="240" id="knn-circle"></circle>
    <circle r="5" cx="450" cy="300" id="ln-circle"></circle>
    <circle r="5" cx="450" cy="360"></circle>
    <circle r="5" cy="420" cx="450"></circle>
    
    */
}