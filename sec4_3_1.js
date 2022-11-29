var lengthScale = d3.scaleLinear()
.domain([4,8]).range([centered_x, -centered_x]);

var widthScale = d3.scaleLinear()
.domain([1.8,4.5]).range([-centered_x, centered_x]);

function scaleLength(SepalLengthCm) {
  return lengthScale(SepalLengthCm);
}

function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
}

function color(d) {
    if (d == 'Iris-virginica') {
        return mainColor['yellow'];
    } else {
        if (d == 'Iris-versicolor') {
            return mainColor['red'];
        } else {
            if (d == 'Iris-setosa') {
                return mainColor['blue'];
            }
        }
    }
}

function distance(p1, p2) {
    return Math.hypot(scaleLength(p1.SepalLengthCm) - scaleLength(p2.SepalLengthCm),
        scaleWidth(p1.SepalWidthCm) - scaleWidth(p2.SepalWidthCm))
}

var data = []
var iris_data = []
var r = 8;
var tooltip = floatingTooltip('gates_tooltip', 240);

function sec4_3_1(loaded) {
    /*
     * Function called on mouseover to display the
     * details of a bubble in the tooltip.
     */
    function showDetail(d) {
        // change outline to indicate hover state.
        d3.select(this).attr('stroke', mainColor['darkblue']);

        var content = '<span class="name">Sepal Length: </span><span class="value">' +
            addCommas(d.SepalLengthCm) +
            'cm</span><br/>' +
            '<span class="name">Sepal Width: </span><span class="value">' +
            addCommas(d.SepalWidthCm) +
            'cm</span><br/>' +
            '<span class="name">Species: </span><span class="value">' +
            d.Species +
            '</span>';

        tooltip.showTooltip(content, d3.event);
    }

    /*
     * Hides tooltip
     */
    function hideDetail(d) {
        tooltip.hideTooltip();
    }

    var svg;
    if (loaded){
        svg = d3.select("#sec4_3").select("svg").select("g.iris")
    } else {
      svg = d3.select('#sec4_3').append('svg')
        .attr('width', w_width).attr('height', w_height)
      svg = svg.append('g').attr("class", "iris")
        .attr('transform', function(d, i) {return 'translate('+ (w_width/2) +','+(w_height/2.2) +')'})
    }
      
    /*var hexbin = d3
    .hexbin()
    .extent([
      [(centered_x)/8* r, (centered_x)/8 * r],
      [(-centered_x)/8 * r, (-centered_x)/8 * r]
    ])
    .radius(r);
    hexbin.centers().map(([x, y], i) => data.push({x: x, y: y, Species: 'Iris-setosa'}))

    console.log(data)*/

    var layer1 = svg.append("g").attr("stroke", "#000").attr("stroke-opacity", 0)
    var layer2 = svg.append("g")

    d3.csv('knn-predictions.csv').then(function (dataset) {
        var hexbin = d3.hexbin()
            .x(function(d) { return d.x})
            .y(function(d) { return d.y})
            .radius(r)
            .extent([[-centered_x, -centered_x], [centered_x, centered_x]])

        bins = hexbin(dataset)

        layer1.selectAll("path")
            .data(dataset)
            .join("path")
            .attr('class', 'hexagon')
            .attr("d", hexbin.hexagon())
            .attr("fill-opacity", 0)
            .attr("transform", function(d) { 
                return "translate("+d.x +","+ d.y+")"})
            .attr('fill', function (d) { return color(d.knn3); })
            .transition().duration(1500)
            .attr("fill-opacity", 0.5)
    })

    d3.csv('iris.csv').then(function (dataset) {
        //console.table(dataset)
        var g = layer2.selectAll("g")
            .data(dataset)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                iris_data.push({ x: scaleLength(d.SepalLengthCm), y: scaleWidth(d.SepalWidthCm), Species: d.Species })
                return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
            })

        svg.append('g').attr('class', 'x axis')
            .attr("transform", "translate("+0+","+(-centered_x)+")")
            .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}))
        
        svg.append('g').attr('class', 'y axis')
            .attr("transform", "translate("+centered_x+",0)")
            .call(d3.axisLeft(widthScale))
            .attr("opacity","0")
            .transition().duration(1000)
            .attr("opacity","1")
        
        svg.append('text')
            .attr('class', 'label')
            .attr('transform','translate('+-50+','+ (-centered_x + 50) +')')
            .text('Sepal Length');

        svg.append('text')
            .attr('class', 'label')
            .attr('transform','translate('+(centered_x - 50)+','+ -50 +') rotate(90)')
            .text('Sepal Width');

        console.log('showing dots')
        g.append("circle")
            .attr("r", 3.5)
            .attr("stroke", mainColor['darkblue'])
            .attr('fill', function (d) { return color(d.Species); })
            .on('mouseover', showDetail)
            .on('mouseout', hideDetail)
    })

    setupButtonsKNN();
    //console.log(iris_data);
}

function updateKNN(knnVal) {
    var svg = d3.select("#sec4_3").select("svg").select("g.iris")
    d3.csv('knn-predictions.csv').then(function (dataset) {
        var hexbin = d3.hexbin()
            .x(d => d.x)
            .y(d => d.y)
            .radius(r)
            .extent([[-centered_x, -centered_x], [centered_x, centered_x]])

        bins = hexbin(dataset)

        svg.selectAll("path.hexagon")
            .transition(transitionPath)
            .attr('fill', function (d) { console.log(d[knnVal]); return color(d[knnVal]); })
    })
}

function setupButtonsKNN() {
    d3.select('#toolbar-knn')
        .selectAll('.button-knn')
        .on('click', function () {
            // Remove active class from all buttons
            d3.selectAll('.button-knn').classed('knn-active', false);
            // Find the button just clicked
            var button = d3.select(this);

            // Set it as the active button
            button.classed('knn-active', true);

            // Get the id of the button
            var buttonId = button.attr('id');

            // Toggle the bubble chart based on
            // the currently clicked button.
            updateKNN(buttonId);
        });
}

