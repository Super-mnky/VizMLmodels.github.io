function sec3_1_1() {
    var svg = d3.select("#sec3").append("svg")
        .attr('width', width).attr('height', height)

    var dataX = 160
    var modelX = 450;
    const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);

    svg.append('line').attr('id', 'data-line')
        .attr('stroke', 'black').attr('stroke-width', '1')
        .attr('x1', dataX).attr('x2', dataX)
        .attr('y1', '140').attr('y2', '140')
        .transition(transitionPath)
        .attr('y2', '480')

    svg.append('line').attr('id', 'model-line')
        .attr('stroke', 'black').attr('stroke-width', '1')
        .attr('x1', modelX).attr('x2', modelX)
        .attr('y1', '140').attr('y2', '140')
        .transition(transitionPath)
        .attr('y2', '480')

    var points = ['bin-circle', 'mc-circle', 'rgsn-circle', 'lr-circle', 'knn-circle', 'ln-circle', 'unamed-1', 'unamed-2']
    var cxs = [dataX, dataX, dataX, modelX, modelX, modelX, modelX, modelX]
    var cys = [180, 300, 420, 180, 240, 300, 360, 450]

    for (i = 0; i < points.length; i++) {
        svg.append('circle').attr('id', points[i])
            .attr('r', '0').attr('cx', cxs[i]).attr('cy', cys[i])
            .transition(transitionPath).attr('r', '5')
    }

    var lines = ['bin-to-lr', 'bin-to-ln', 'mc-to-lr', 'mc-to-knn', 'rgsn-to-ln']
    var y1s = [180, 180, 300, 300, 420]
    var y2s = [180, 300, 180, 240, 300]

    for (i = 0; i < lines.length; i++) {
        svg.append('line').attr('id', lines[i])
            .attr('stroke', 'black').attr('stroke-width', '1')
            .attr('x1', dataX).attr('x2', dataX)
            .attr('y1', y1s[i]).attr('y2', y1s[i])
            .transition(transitionPath)
            .attr('y2', y2s[i])
            .attr('x2', modelX)
    }

    var texts = ['Data', 'Models', 'Binary', 'Multi-Classes', 'Regression', 'Logistic Regression',
        'KNN', 'Linear Regression']
    var transforms = ['(140,120)', '(420,120)', '(100,185)', '(50,305)', '(65,425)', '(470,185)',
        '(470,245)', '(470,305)']

    for (i = 0; i < lines.length; i++) {
        svg.append('text').attr('class', 'label')
        .attr('fill','black').attr('opacity','0')
        .attr('transform','translate'+transforms[i])
        .text(texts[i])
        .transition(transitionPath)
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