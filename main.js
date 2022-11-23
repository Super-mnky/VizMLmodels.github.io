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
  '#sec4_3', //sec4_3_1
  '#sec5_1', //sec5_1_1
  '#sec6_1', //sec6_1_1
  '#sec7_1', //sec7_1_1
  '#sec8',
]

var viz_fns = [
  sec1, 
  sec2_1_1, sec2_1_2, sec2_2_1,
  sec3_1_1, 
  sec4_1_1, sec4_2_1,
  sec4_3_1,
  sec5_1_1,
  sec6_1_1,
  sec7_1_1, 
  sec8
]

var viz_loaded = [
  false, false, false, false, false, false,
  false, false, false, false, false, false
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
function sec2_2_1(){
  d3.csv('iris.csv').then((data) => display_sec2_2_1(null, data));
  // setup the buttons.
  setupButtons();
}
function sec3(){
}
// function sec4_1_1(){
// }
// function sec4_2_1(){
// }
// function sec5_1_1(){
// }
function sec6_1_1(){
 d3.csv('iris.csv').then((data) => display_sec6_1_1(null, data));
}
function sec7_1_1(){
  d3.csv('iris.csv').then((data) => display_sec7_1_1(null, data));
}
function sec8(){
}