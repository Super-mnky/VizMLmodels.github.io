//bubble
async function sec2_2_1_transition(loaded){
  var svg;
  if (loaded){
    svg = d3.select("#sec2_2").select("svg")
  } else {
    svg = d3.select("#sec2_2")
    .append('svg')
    .attr('width', w_width)
    .attr('height', w_height);
    visContainer = svg.append('g').attr("class", "iris")
    .attr('transform', function(d, i) {return 'translate('+ (w_width/2) +','+(w_height/2.2) +')'})
  }

  var radius = 400;
  var size = 5.1 
  var size1 = 3.3
    
  // versicolor: 
  visContainer.append('ellipse')
      .attr('fill','none').attr('rx','70').attr('ry','58').attr('cx','250').attr('cy','0')
      .attr('stroke', mainColor['yellow']).attr('stroke-dasharray','4')
      .attr('stroke-width','1')
      .transition().duration(duration_500)
      .attr('stroke',mainColor['red']).attr('stroke-dasharray','0').attr('fill',mainColor['red'])
      .attr('rx','0').attr('ry','0')
      .attr('cx',0).attr('cy',0)

  // visContainer.append('text').attr('class','label').attr('fill','black')
  //   .text('versicolor').attr('transform','translate(285,225)').attr('opacity','1')
  //   .transition().duration(1000)
  //   .attr('opacity','0')

  // visContainer.append('line').attr('class','sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '0')
  //   .attr('x1', '325').attr('x2', '325')
  //   .attr('y1','360').attr('y2', '260')
  //   .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('y1', '300').attr('y2','300').attr('stroke','red')

  // visContainer.append('line').attr('class','sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '0')
  //   .attr('x1', '355').attr('x2', '285')
  //   .attr('y1','290').attr('y2', '290')
  //   .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('x1', '320').attr('x2','320').attr('stroke','red')

  // // Setosa:
  // visContainer.append('line').attr('class','sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '160').attr('x2', '160')
  //   .attr('y1','350').attr('y2', '270')
  //   .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('y1', '310').attr('y2','310').attr('stroke','blue')

  // visContainer.append('line').attr('class','sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '200').attr('x2', '120')
  //   .attr('y1','310').attr('y2', '310')
  //   .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('x1', '160').attr('x2','160').attr('stroke','blue')

  visContainer.append('ellipse')
    .attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','-250').attr('cy','0')
    .attr('stroke',mainColor['yellow']).attr('stroke-dasharray','4')
    .attr('stroke-width','1')
    .transition().duration(duration_500)
    .attr('fill',mainColor['blue']).attr('stroke',mainColor['blue']).attr('stroke-dasharray','0')
    .attr('rx','0').attr('ry','0')
    .attr('cx',0).attr('cy',0)
    
  //   visContainer.append('text').attr('class','label').attr('fill','black')
  //   .text('setosa').attr('transform','translate(135,225)').attr('opacity','1')
  //   .transition().duration(1000).attr('opacity','0')

  // // Virginica:
  // visContainer.append('line').attr('class','sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '500').attr('x2', '500')
  //   .attr('y1','365').attr('y2', '255')
  //   .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('y1', '320').attr('y2','320').attr('stroke','orange')

  //   visContainer.append('line').attr('class','sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '540').attr('x2', '460')
  //   .attr('y1','310').attr('y2', '310')
  //   .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('x1', '500').attr('x2','500').attr('stroke','orange')

    visContainer.append('ellipse').attr('fill','white')
    .attr('fill', mainColor['yellow'])
    .attr('rx',radius*0.2).attr('ry', radius*0.2).attr('cx',0).attr('cy',0)
    .attr('stroke',mainColor['darkblue']).attr('stroke-dasharray','4')
    .transition().duration(duration_500)
    .attr('fill',mainColor['yellow']).attr('stroke',mainColor['yellow']).attr('stroke-dasharray','0')
    .attr('rx','0').attr('ry','0')
    .attr('cx',0).attr('cy',0)
      
  //   visContainer.append('text').attr('class','label').attr('fill','black')
  //   .text('virginica').attr('transform','translate(470,225)').attr('opacity','1')
  //   .transition().duration(1000).attr('opacity','0')

  // await delay(1500);

    // visContainer.selectAll("ellipse").transition().duration(250).attr('opacity','0')
    // visContainer.selectAll("line").transition().duration(250).attr('opacity','0')
}

/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {
  // Constants for sizing
  var width = w_width;
  var height = w_height;

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('gates_tooltip', 240);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  var center = { x: width / 2, y: height / 2 };

  var yearCenters = {
    'Iris-setosa': { x: width / 3, y: height / 2 },
    'Iris-versicolor': { x: width / 2, y: height / 2 },
    'Iris-virginica': { x: 2 * width / 3, y: height / 2 }
  };

  // X locations of the year titles.
  var yearsTitleX = {
    'Iris-setosa': 200,
    'Iris-versicolor': width / 2 - 20,
    'Iris-virginica': width - 250
  };

  var trainCenters = {
    'Train': { x: width / 3, y: height / 2 },
    'Test': { x: width / 2, y: height / 2 },
    'Validation': { x: 2 * width / 3, y: height / 2 }
  };

  var trainTitleX = {
    'Train 60%': 200,
    'Validation 20%': width / 2 + 20,
    'Test 20%': width - 250
  };

  // @v4 strength to apply to the position forces
  var forceStrength = 0.03;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];
  var container;

 
  // Charge function that is called for each node.
  // As part of the ManyBody force.
  // This is what creates the repulsion between nodes.
  //
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  //
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  //
  // Charge is negative because we want nodes to repel.
  // @v4 Before the charge was a stand-alone attribute
  //  of the force layout. Now we can use it as a separate force!
  function charge(d) {
    return -Math.pow(d.radius, 2.0) * forceStrength;
  }

  // Here we create a force layout and
  // @v4 We create a force simulation now and
  //  add forces to it.
  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);

  // @v4 Force starts up automatically,
  //  which we don't want as there aren't any nodes yet.
  simulation.stop();

  // Nice looking colors - no reason to buck the trend
  // @v4 scales now have a flattened naming scheme
  var fillColor = d3.scaleOrdinal()
    .domain(['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'])
    .range([mainColor['blue'], mainColor['red'], mainColor['yellow']]);


  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
    var maxAmount = d3.max(rawData, function (d) { return +d.SepalLengthCm; });
    var minAmount = d3.min(rawData, function (d) { return +d.SepalLengthCm; });

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
    var radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([5, 25])
      .domain([minAmount, maxAmount]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    var myNodes = rawData.map(function (d) {
      return {
        id: d.Id,
        radius: radiusScale(+d.SepalLengthCm),
        value: +d.SepalLengthCm,
        valueX: +d.SepalWidthCm,
        petalL: +d.PetalLengthCm,
        petalW: +d.PetalWidthCm,
        group: d.Species,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector).select('svg')
    /*  .append('svg')
      .attr('width', width)
      .attr('height', height);*/

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });
    
    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    // @v4 Selections are immutable, so lets capture the
    //  enter selection to apply our transtition to below.
    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.group); })
      .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    // @v4 Merge the original empty selection and the enter selection
    bubbles = bubbles.merge(bubblesE);

    // Fancy transition to make bubbles appear, ending with the
    // correct radius
    bubbles.transition()
      .duration(duration_500)
      .attr('r', function (d) { return d.radius; })

    // Set the simulation's nodes to our newly created nodes array.
    // @v4 Once we set the nodes, the simulation will start running automatically!
    simulation.nodes(nodes);

    // Set initial layout to single group.
    groupBubbles();
  };

  /*
   * Callback function that is called after every tick of the
   * force simulation.
   * Here we do the acutal repositioning of the SVG circles
   * based on the current x and y values of their bound node data.
   * These x and y values are modified by the force simulation.
   */
  function ticked() {
    bubbles
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y-80; })
  }

  /*
   * Provides a x value for each node to be used with the split by year
   * x force.
   */
  function nodeYearPos(d) {
    return yearCenters[d.group].x;
  }

  /*
   * Provides a x value for each node to be used with the split by year
   * x force.
   */
    function nodeTrainPos(d) {
      var c = +d.id % 10
      var group = 'Train'
      if (c < 6){
        group = 'Train'
      } else if (c < 8){
        group = 'Test'
      } else {
        group = 'Validation'
      }
      console.log(d)
      return trainCenters[group].x;
    }
  

  /*
   * Sets visualization in "single group mode".
   * The year labels are hidden and the force layout
   * tick function is set to move all nodes to the
   * center of the visualization.
   */
  function groupBubbles() {
    hideYearTitles();
    hideTrainTitles();

    // @v4 Reset the 'x' force to draw the bubbles to the center.
    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }


  /*
   * Sets visualization in "split by year mode".
   * The year labels are shown and the force layout
   * tick function is set to move nodes to the
   * yearCenter of their data's year.
   */
  function splitBubbles() {
    showYearTitles();

    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearPos));

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function splitBubblesTrain() {
    showTrainTitles();

    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeTrainPos));

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  /*
   * Hides Year title displays.
   */
  function hideTrainTitles() {
    svg.selectAll('.train').remove();
  }

    /*
   * Hides Year title displays.
   */
    function hideYearTitles() {
      svg.selectAll('.year').remove();
    }
  
  
  /*
   * Shows Year title displays.
   */
  function showTrainTitles() {
    hideYearTitles();
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(trainTitleX);
    var years = svg.selectAll('.train')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'train')
      .attr('x', function (d) { return trainTitleX[d]; })
      .attr('y', 70)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }


  /*
   * Shows Year title displays.
   */
  function showYearTitles() {
    hideTrainTitles();
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(yearsTitleX);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('x', function (d) { return yearsTitleX[d]; })
      .attr('y', 70)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', mainColor['darkblue']);

    var content = '<span class="name">Sepal Length: </span><span class="value">' +
                  addCommas(d.value) +
                  'cm</span><br/>' +
                  '<span class="name">Sepal Width: </span><span class="value">' +
                  addCommas(d.valueX) +
                  'cm</span><br/>' +
                  '<span class="name">Petal Length: </span><span class="value">' +
                  addCommas(d.petalL) +
                  'cm</span><br/>' +
                  '<span class="name">Petal Width: </span><span class="value">' +
                  addCommas(d.petalW) +
                  'cm</span><br/>' +
                  '<span class="name">Species: </span><span class="value">' +
                  d.group +
                  '</span>';

    tooltip.showTooltip(content, d3.event);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker());

    tooltip.hideTooltip();
  }

  /*
   * Externally accessible function (this is attached to the
   * returned chart function). Allows the visualization to toggle
   * between "single group" and "split by year" modes.
   *
   * displayName is expected to be a string and either 'year' or 'all'.
   */
  chart.toggleDisplay = function (displayName) {
    if (displayName === 'year') {
      splitBubbles();
    } else if (displayName == 'train') {
      splitBubblesTrain();
    } else {
      groupBubbles();
    }
  };


  // return the chart function from closure.
  return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display_sec2_2_1(error, data) {
  if (error) {
    console.log(error);
  }

  myBubbleChart('#sec2_2', data);
}

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}