// Scrolling Mechanism:
var current_viz = 0
var viz_ids = [
  '#sec1',
  '#sec2_1', //2_1_1
  '#sec2_1', //2_1_2
  '#sec2_2', //2_2_1
  '#sec3',
  '#sec4_1', //sec4_1_1
  '#sec4_2', //sec4_2_1
  '#sec5_1', //sec5_1_1
  '#sec6',
  '#sec7',
  '#sec8',
]

var viz_fns = [
  sec1, 
  sec2_1_1, sec2_1_2, sec2_2_1,
  sec3, 
  sec4_1_1, sec4_2_1,
  sec5_1_1,
  sec6, 
  sec7, 
  sec8
]

var viz_loaded = [
  false, false, false, false, false, 
  false, false, false, false, false,
]

d3.graphScroll()
    .graph(d3.selectAll('#graph'))
    .container(d3.select('#main'))
    .sections(d3.selectAll('#sections > div'))
    .on('active', function (i) {
        console.log("At section " + i);
        updateViz(i)
    })

function updateViz(i) {
  d3.select(viz_ids[current_viz]).style('display', 'none')
  d3.select(viz_ids[i]).style('display','block')
  current_viz = i
  if (!viz_loaded[i]){
    viz_fns[i]();
    viz_loaded[i] = true;
  }
}

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}

// Getting the data via promise so you can work through irises as well to get the data

var irises = {}

Promise.all([
  d3.csv('iris.csv', function (row) {
    /*var node = {
        id: +row['Id'], sepalLength: +row['SepalLengthCm'],
        sepalWidth: +row['SepalWidthCm'],petalLength: +row['PetalLengthCm'],
        petalWidth: +row['PetalWidthCm'],species: +row['Species'],
    };
    irises[node-id] = node;

    return node;*/
    irises[+row['Id']] = {sepalLength: +row['SepalLengthCm'],
    sepalWidth: +row['SepalWidthCm'],petalLength: +row['PetalLengthCm'],
    petalWidth: +row['PetalWidthCm'],species: row['Species']}
  }), 
])

/* Visualizations: */

var width = 680
var widthMargin = 20
var height = 640
var heightMargin = 60

// Display for viz 1.1
function sec1(){
}

//from here: @Kaitlyn Yang: Can you put them in a seperate .js file? I tried but it seems not working well
function sec2_1_1(){
  var svg = d3.select("#sec2_1")
  .append('svg')
  .attr('width', width)
  .attr('height', height)  

  var defs = svg.append('defs')

  defs.append('marker').attr('id','startarrow').attr('orient','auto').attr('markerHeight', '4')
      .attr('refY', '2').attr('refX', '0').attr('markerWidth','4').attr('markerUnits','strokeWidth')
      .append('polygon').attr('fill','white').attr('points', '4 0, 4 4, 0 2')

  defs.append('marker').attr('id','endarrow').attr('orient','auto').attr('markerHeight', '4')
      .attr('refY', '2').attr('refX', '0').attr('markerWidth','4').attr('markerUnits','strokeWidth')
      .append('polygon').attr('fill','white').attr('points', '0 0, 4 2, 0 4')

  var img = svg.append('image')
   .attr('href', 'static/versicolor-photo.jpg')
   .attr('height', '50%')
   .attr('width', '50%')
   .attr('transform', 'translate(170,120)')

  const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);
  var sepallaxis = svg.append('line').attr('class','sepal')
    .attr('stroke', 'white').attr('stroke-width', '2')
    //.attr('stroke-dashoffset', '5').attr('stroke-dasharray', '4')
    .attr('x1', '325').attr('x2', '325')
    .attr('y1','260').attr('y2', '260')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition(transitionPath)
    .attr('y1', '360')

  var sepalwaxis = svg.append('line').attr('class','sepal')
    .attr('stroke', 'white').attr('stroke-width', '2')
    .attr('x1', '285').attr('x2', '285')
    .attr('y1','290').attr('y2', '290')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition(transitionPath)
    .attr('x1', '355')

  svg.append('text').attr('class','label').attr('fill','white')
  .attr('transform', 'translate(300,375)').text('Sepal').attr('opacity','0')
  .transition(transitionPath)
  .attr('opacity','1')

  var petallaxis = svg.append('line').attr('class','petal')
  .attr('stroke', 'white').attr('stroke-width', '2')
  .attr('x1', '335').attr('x2', '335')
  .attr('y1','155').attr('y2', '155')
  .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
  .transition(transitionPath)
  .attr('y2', '240')

  var petalwaxis = svg.append('line').attr('class','petal')
    .attr('stroke', 'white').attr('stroke-width', '2')
    .attr('x1', '320').attr('x2', '320')
    .attr('y1','190').attr('y2', '190')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition(transitionPath)
    .attr('x1', '353')

  svg.append('text').attr('class','label').attr('fill','white')
  .attr('transform', 'translate(360,180)').text('Petal').attr('opacity','0')
  .transition(transitionPath)
  .attr('opacity','1')
}


async function sec2_1_2(){
  var svg = d3.select("#sec2_1")
  .select('svg')

  const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);
  
  svg.select('image').attr('opacity',1).transition(transitionPath).attr('opacity', 0)
  svg.select('defs').selectAll('marker').selectAll('polygon').transition(transitionPath).attr('fill','black')
  svg.selectAll('line.sepal').transition(transitionPath).attr('stroke','black')
  svg.selectAll('line.petal').transition(transitionPath).attr('stroke','white')
  svg.selectAll('line.petal').remove()
  svg.selectAll('text.label').remove()

  await delay(500);

  svg.selectAll('line')

  svg.append('ellipse').attr('fill','none').attr('rx','400').attr('ry','400').attr('cx','320').attr('cy','310')
      .attr('stroke','black').attr('stroke-dasharray','4')
      .transition().duration(1000).attr('rx','50').attr('ry','70')

  svg.append('text').attr('class','label').attr('fill','black')
    .text('versicolor').attr('transform','translate(285,225)').attr('opacity','0')
    .transition().duration(1000).attr('opacity','1')

  await delay(1500);

  // Setosa:
  svg.append('line').attr('class','sepal')
    .attr('stroke', 'black').attr('stroke-width', '2')
    .attr('x1', '325').attr('x2', '325')
    .attr('y1','350').attr('y2', '270')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition().duration(2000)
    .attr('x1', '160').attr('x2','160')

  svg.append('line').attr('class','sepal')
    .attr('stroke', 'black').attr('stroke-width', '2')
    .attr('x1', '355').attr('x2', '285')
    .attr('y1','290').attr('y2', '290')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition().duration(2000)
    .attr('x1', '200').attr('x2','120')
    .attr('y2','310').attr('y1','310')

  svg.append('ellipse').attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','320').attr('cy','310')
    .attr('stroke','black').attr('stroke-dasharray','4')
    .transition().duration(2000)
    .attr('rx','50').attr('ry','50').attr('cx','160')
    
  svg.append('text').attr('class','label').attr('fill','black')
    .text('setosa').attr('transform','translate(135,225)').attr('opacity','0')
    .transition().duration(1000).attr('opacity','1')

  // Virginica:
  svg.append('line').attr('class','sepal')
    .attr('stroke', 'black').attr('stroke-width', '2')
    .attr('x1', '325').attr('x2', '325')
    .attr('y1','365').attr('y2', '255')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition().duration(2000)
    .attr('x1', '500').attr('x2','500')

  svg.append('line').attr('class','sepal')
    .attr('stroke', 'black').attr('stroke-width', '2')
    .attr('x1', '355').attr('x2', '285')
    .attr('y1','290').attr('y2', '290')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition().duration(2000)
    .attr('x1', '540').attr('x2','460')
    .attr('y2','310').attr('y1','310')

  svg.append('ellipse').attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','320').attr('cy','310')
    .attr('stroke','black').attr('stroke-dasharray','4')
    .transition().duration(2000)
    .attr('rx','50').attr('ry','70').attr('cx','500')
    
  svg.append('text').attr('class','label').attr('fill','black')
    .text('virginica').attr('transform','translate(470,225)').attr('opacity','0')
    .transition().duration(1000).attr('opacity','1')

}
//untill here: @Kaitlyn Yang: Can you put them in a seperate .js file? I tried but it seems not working well

function sec2_2_1(){
  d3.csv('iris.csv').then((data) => display_sec2_2_1(null, data));
  // setup the buttons.
  setupButtons();
}

function sec3(){
}

function sec4_1_1(){
  d3.csv('iris.csv').then((data) => display_sec4_1_1(null, data) );
}

function sec4_2_1(){
  d3.csv('iris.csv').then((data) => display_sec4_2_1(null, data) );
}


function sec5_1_1(){
  d3.csv('iris.csv').then((data) => display_sec5_1_1(null, data));
}

function sec6(){
}

function sec7(){
}

function sec8(){
}
