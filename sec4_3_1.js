var lengthScale = d3.scaleLinear()
    .domain([4, 8]).range([heightMargin, height - heightMargin]);

var widthScale = d3.scaleLinear()
    .domain([1.8, 4.5]).range([height - heightMargin, heightMargin]);

const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);

function color(d) {
    if (d == 'Iris-virginica') {
        return 'orange';
    } else {
        if (d == 'Iris-versicolor') {
            return 'red';
        } else {
            if (d == 'Iris-setosa') {
                return 'blue';
            }
        }
    }
}

function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
}

function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
}

function distance(p1, p2) {
    return Math.hypot(scaleLength(p1.SepalLengthCm) - scaleLength(p2.SepalLengthCm),
        scaleWidth(p1.SepalWidthCm) - scaleWidth(p2.SepalWidthCm))
}

var data = []
var iris_data = []
var r = 8;

var svg = d3.select('#sec4_3').append('svg')
.attr('width', width)
.attr('height', height)

function sec4_3_1() {

    /*
    var hexbin = d3
    .hexbin()
    .extent([
      [widthMargin/2* r, heightMargin/8 * r],
      [width - widthMargin/2 * r, height - heightMargin/8 * r]
    ])
    .radius(r);
    hexbin.centers().map(([x, y], i) => data.push({x: x, y: y, Species: 'Iris-setosa'}))

    console.log(data)
    */
    d3.csv('iris.csv').then(function (dataset) {
        //console.table(dataset)
        var g = svg.selectAll("g")
            .data(dataset)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                iris_data.push({ x: scaleLength(d.SepalLengthCm), y: scaleWidth(d.SepalWidthCm), Species: d.Species })
                return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
            })

        svg.append('g').attr('class', 'x axis')
            .attr("transform", "translate(" + widthMargin + "," + (height - heightMargin) + ")")
            .call(d3.axisBottom(lengthScale).tickFormat(function (d) { return d; }));

        svg.append('g').attr('class', 'y axis')
            .attr("transform", "translate(" + (widthMargin + heightMargin) + ",0)")
            .call(d3.axisLeft(widthScale));

        svg.append('text')
            .attr('class', 'label')
            .attr('transform', 'translate(' + ((width - widthMargin) / 2 - 20) + ',' + (height - (heightMargin / 3)) + ')')
            .text('Sepal Length');

        svg.append('text')
            .attr('class', 'label')
            .attr('transform', 'translate(' + widthMargin + ',' + (height - heightMargin) / 2 + ') rotate(90)')
            .text('Sepal Width');

        var circles = svg.selectAll("g")
        console.log('showing dots')
        g.append("circle")
            .attr("r", 3.5)
            .attr('fill', function (d) { return color(d.Species); })

        d3.csv('knn-predictions.csv').then(function (dataset) {
            var hexbin = d3.hexbin()
                .x(d => d.x)
                .y(d => d.y)
                .radius((r * width / (height - 1))-0.45)
                .extent([[widthMargin, heightMargin], [width - widthMargin, height - heightMargin]])

            bins = hexbin(dataset)

            svg.append("g")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0)
                .selectAll("path")
                .data(dataset)
                .join("path")
                .attr('class','hexagon')
                .attr("d", hexbin.hexagon())
                .attr("fill-opacity", 0.5)
                .attr("transform", d => `translate(${d.x},${d.y})`)
                .attr('fill', function (d) { return color(d.knn1); })
        })

    })
    setupButtonsKNN();
}

function updateKNN(knnVal) {
    d3.csv('knn-predictions.csv').then(function (dataset) {
        var hexbin = d3.hexbin()
            .x(d => d.x)
            .y(d => d.y)
            .radius(r * width / (height - 1))
            .extent([[widthMargin, heightMargin], [width - widthMargin, height - heightMargin]])

        bins = hexbin(dataset)

        svg.selectAll("path.hexagon")
            .transition(transitionPath)
            .attr('fill', function (d) {console.log(d[knnVal]); return color(d[knnVal]); })
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

