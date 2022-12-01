// Scrolling Mechanism:
var prev_viz = 0
var viz_ids = [
  '#sec1',
  '#sec2_1', //2_1_1
  '#sec2_1_1', //2_1_2
  '#sec2_2', //2_2_1
  '#sec3', 
  '#sec3',
  '#sec3',
  '#sec3',
  '#sec4_1', //sec4_1_1
  '#sec4_2', //sec4_2_1
  '#sec4_3', //sec4_3_1
  '#sec4_6', //sec4_6_1
  // '#sec5_1', //sec5_1_1
  '#sec6_1', //sec6_1_1
  '#sec7_1', //sec7_1_1
  '#sec8_1', //sec8_1_1
  '#sec9'
]

var viz_fns = [
  sec1_1, 
  sec2_1_1, sec2_1_1_1, sec2_2_1,
  sec3_1_1, sec3_2_1, sec3_2_2, sec3_2_3, 
  sec4_1_1, sec4_2_1,
  sec4_3_1,
  sec4_6_1,
  // sec5_1_1,
  sec6_1_1,
  sec7_1_1, 
  sec8_1_1,
  sec9
]


var viz_loaded = [
  false, false, false, false, false, 
  true, true, true, true, false, 
  false, false, false, false, false, false, false
]

var sidebar = [
  null,
  '#b1', '#b1', '#b1',
  '#b2', '#b2', '#b2', '#b2',
  '#b3', '#b3', '#b3', '#b3',
  '#b4',
  '#b5',
  '#b6',
  null
]

function colorSidebar(i){
  if (i == 0 || i == 16){
    d3.select(sidebar[prev_viz]).style("color", '#323D52')
  } else {
    d3.select(sidebar[prev_viz]).style("color", '#323D52')
    d3.select(sidebar[i]).style("color", '#3DB2FF')
  }
}

d3.graphScroll()
    .graph(d3.selectAll('#graph'))
    .container(d3.select('#main'))
    .sections(d3.selectAll('#sections > div'))
    .on('active', function (i) {
        console.log("At section " + i);
        updateViz(i)
    })

function updateViz(i) {
  d3.select(viz_ids[prev_viz]).style('display', 'none')
  d3.select(viz_ids[i]).style('display','block')

  if (viz_loaded[i] && (viz_ids[i] != viz_ids[prev_viz])) {
    d3.select(viz_ids[i]).selectAll("svg").remove()
    viz_loaded[i] = false;
  } 

  viz_fns[i](viz_loaded[i])
  viz_loaded[i] = true;

  colorSidebar(i);

  prev_viz = i

  /*
  if (!viz_loaded[i]){
    viz_fns[i]();
    viz_loaded[i] = true;
  }
  */
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

async function sec2_2_1(){
  // Transition code:
  sec2_2_1_transition();
  await delay(500);

  d3.csv('iris.csv').then((data) => display_sec2_2_1(null, data));
  // setup the buttons.
  setupButtons();
}

function sec3(){
}

function sec9(){
}

// function sec4_1_1(){
// }
// function sec4_2_1(){
// }
// function sec5_1_1(){
// }
/*
function sec6_1_1(){
 d3.csv('iris.csv').then((data) => display_sec6_1_1(null, data));
}
function sec7_1_1(){
  d3.csv('iris.csv').then((data) => display_sec7_1_1(null, data));
}
function sec8(){
}*/