async function sec_3_1_1_transition(loaded) {
  console.log("transitioning...")

  var svg;
  if (loaded) {
    svg = d3.select("#sec4_1").select("svg")
  } else {
    svg = d3.select('#sec4_1').append('svg')
      .attr('width', width)
      .attr('height', height)
  }

  var dataX = 160
  var modelX = 450;
  var transitionPath = d3.transition().ease(d3.easeSin).duration(1000);

  svg.append('line').attr('id', 'data-line').attr('class', 'transition')
    .attr('stroke', 'black').attr('stroke-width', '1')
    .attr('x1', dataX).attr('x2', dataX)
    .attr('y1', '140').attr('y2', '480')
    .transition(transitionPath)
    .attr('y1', '325').attr('y2', '325')
    .attr('x1', dataX).attr('x2', dataX)


  svg.append('line').attr('id', 'model-line').attr('class', 'transition')
    .attr('stroke', 'black').attr('stroke-width', '1')
    .attr('x1', modelX).attr('x2', modelX)
    .attr('y1', '140').attr('y2', '480')
    .transition(transitionPath)
    .attr('y1', '325').attr('y2', '325')
    .attr('x1', modelX).attr('x2', modelX)

  var points = ['bin-circle', 'rgsn-circle', 'lr-circle', 'knn-circle', 'ln-circle', 'unamed-1', 'unamed-2']
  var cxs = [dataX, dataX, modelX, modelX, modelX, modelX, modelX]
  var cys = [180, 420, 180, 240, 325, 380, 450]

  var final = []
  for (i = 0; i < points.length; i++) {
    svg.append('circle').attr('id', points[i]).attr('class', 'transition')
      .attr('r', '5').attr('cx', cxs[i]).attr('cy', cys[i])
      .transition(transitionPath)
      .attr('r', '0')
  }

  var pivot = svg.append('circle').attr('r', '5').attr('cx', dataX).attr('cy', '325')
    .attr('class', 'transition').attr('class', 'transition2')

  var lines = ['bin-to-lr', 'bin-to-ln', 'mc-to-lr', 'mc-to-knn', 'rgsn-to-ln']
  var y1s = [180, 180, 325, 325, 420]
  var y2s = [180, 325, 180, 240, 325]

  for (i = 0; i < lines.length; i++) {
    svg.append('line').attr('id', lines[i]).attr('class', 'transition').attr('class', 'transition2')
      .attr('stroke', 'black').attr('stroke-width', '1')
      .attr('x1', dataX).attr('x2', modelX)
      .attr('y1', y1s[i]).attr('y2', y2s[i])
      .transition(transitionPath)
      .attr('y1', '325').attr('y2', '325')
      .attr('x1', dataX).attr('x2', modelX)
  }

  var texts = ['Data', 'Models', 'Binary', 'Multi-Classes', 'Regression', 'Logistic Regression',
    'KNN', 'Linear Regression']
  var transforms = ['(140,120)', '(420,120)', '(100,185)', '(50,330)', '(65,425)', '(470,185)',
    '(470,245)', '(470,330)']

  for (i = 0; i < texts.length; i++) {
    svg.append('text').attr('class', 'transition')
      .attr('fill', 'black').attr('opacity', '1')
      .attr('transform', 'translate' + transforms[i])
      .text(texts[i])
      .transition(transitionPath)
      .attr('opacity', '0')
  }

  await delay(1000);
  svg.selectAll('.transition2').transition().duration(500).attr('x2', '160');

  await delay(750);
  console.log("transition over")

  pivot.transition().duration(500).attr("opacity", "0");
}

//_4_comparison

async function sec4_1_1(loaded) {
  var tooltip = floatingTooltip('gates_tooltip', 240);

  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Petal Length: </span><span class="value">' +
      addCommas(d.PetalLengthCm) +
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

  sec_3_1_1_transition(loaded);

  await delay(1600);

  var lengthScale = d3.scaleLinear()
    .domain([0.0, 8]).range([heightMargin, height - heightMargin]);


  var widthScale = d3.scaleLinear()
    .domain([1.8, 4.5]).range([height - heightMargin, heightMargin]);

  function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
  }

  function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
  }

  var tooltip = floatingTooltip('gates_tooltip', 240);

  d3.csv('iris.csv').then(function (dataset) {
    //console.table(dataset)
    console.log("at section 4_1_1")
    console.log(dataset.length)

    var svg = d3.select('#sec4_1').select('svg')

    svg.append('g').attr('class', 'x axis')
      .attr("transform", "translate(" + widthMargin + "," + (height - heightMargin) + ")")
      .attr('opacity', '0')
      .call(d3.axisBottom(lengthScale).tickFormat(function (d) { return d; }))
      .transition().duration(1000)
      .attr("opacity", "1")

    svg.append('text')
      .attr('class', 'label')
      .attr('id', 'sepal_length_label')
      .attr('transform', 'translate(' + ((width - widthMargin) / 2 - 20) + ',' + (height - (heightMargin / 3)) + ')')
      .text('Petal Length');

    svg.append('text')
      .attr('class', 'label')
      .attr('transform', 'translate(' + widthMargin + ',' + (height - heightMargin - 250) + ') rotate(0)')
      .text('Vericolor');

    svg.append('text')
      .attr('class', 'label')
      .attr('transform', 'translate(' + widthMargin + ',' + (height - heightMargin - 180) + ') rotate(0)')
      .text('Virginica');

    svg.append('text')
      .attr('class', 'label')
      .attr('transform', 'translate(' + widthMargin + ',' + (height - heightMargin - 325) + ') rotate(0)')
      .text('Setosa');

    var g = svg.selectAll("g")
      .data(dataset)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return ("translate(" + scaleLength(d.PetalLengthCm) + "," + 325 + ")")  //magic number to bring down dots
      })

    svg.selectAll("g")
      .data(dataset)
      .enter()
    g.append("circle")
      .attr('class', 'circle-a')
      .style("opacity", 0.7)
      .attr("r", 0)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail)
      .transition().duration(250)
      .attr("r", 4.5)

    svg.selectAll('circle.transition').remove();

    svg.selectAll(".circle-a")
      .transition().delay(function (d, i) { return i * 20; })
      .duration(1500)
      .attr("transform", function (d) {
        if (d.Species == 'Iris-virginica') {
          return ("translate(" + 0 + "," + 75 + ")");
        } else {
          if (d.Species == 'Iris-versicolor') {
            return ("translate(" + 0 + "," + 0 + ")");
          } else {
            if (d.Species == 'Iris-setosa') {
              return ("translate(" + 0 + "," + -75 + ")");
            }
          }
        }
      })
      .attr('fill', function (d) {
        if (d.Species == 'Iris-virginica') {
          console.log('Virginica detected')
          return 'orange';
        } else {
          if (d.Species == 'Iris-versicolor') {
            console.log('Vericolor detected')
            return 'red';
          } else {
            if (d.Species == 'Iris-setosa') {
              console.log('Setosa detected')
              return 'blue';
            }
          }
        }
      })
  });
}

//display chart
//var myChart411 = sec4_1_1(); @@JJ4 Commented out to roll with ST

function display_sec4_1_1(error, data) {
  sec4_1_1()
  if (error) {
    console.log(error);
  }
}
