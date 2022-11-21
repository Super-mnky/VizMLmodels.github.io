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
  '#sec6_1', //sec6_1_1
  '#sec7',
  '#sec8',
]

var viz_fns = [
  sec1, 
  sec2_1_1, sec2_1_2, sec2_2_1,
  sec3, 
  sec4_1_1, sec4_2_1,
  sec5_1_1,
  sec6_1_1,
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


// function sec5_1_1(){
//   d3.csv('iris.csv').then((data) => display_sec5_1_1(null, data));
// }

// _5_kfold
function sec5_1_1(){
  var svg = d3.select('#sec5_1').append('svg')
  .attr('width', width)
  .attr('height', height)

  var radius = 30;
  var count = [1,2,3,4,5];
  var pieData = {a:20,b:80}
  var dots = svg.selectAll('g').data(count)
  var pieArea = svg.append('g')

  var pieX = width/3;
  var pieY = height/4;
  var padding = 0;
  var acc = 0.3;
  var accX_base = (pieX/2)+(radius*4)

  var margin_s = 5;

  // set the color scale
  var mainColor = {"green": '#1E8B8B', 'lightgreen':"#00FFE0", 'darkblue':"#323D52", 'red':'red' }
  var color = d3.scaleOrdinal()
    .domain(pieData)
    .range(["#00FFE0", "#1E8B8B", "#323D52"])

  //time
  var duration_2500 = 2000    
  var duration_2000 = 2000
  var duration_500 = 500
  var duration_250 = 250

  // transition
  const transition_2500 = d3.transition().ease(d3.easeSin).duration(duration_2500);
  const transition_2000 = d3.transition().ease(d3.easeSin).duration(duration_2000);
  const transition_500 = d3.transition().ease(d3.easeSin).duration(duration_500);
  const transition_250 = d3.transition().ease(d3.easeSin).duration(duration_250);

  // pieArea position 
  pieArea
  .attr('transform', function(d, i) {return 'translate('+pieX+','+(pieY+padding)+')'})

  // pie charts container
  var pieGroup = pieArea.selectAll('g')
    .data(count)
    .enter()
    .append('g')
    .attr('transform', function(d, i) {return 'translate('+(((2*i*radius)))+','+0+')'})
    .attr('class', 'pies')

  // pie charts   
  var pie = d3.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(pieData))
  
  var pies = pieGroup.selectAll('.pie')
    .data(data_ready)
    .enter()
    .append('g')
    .attr('class', 'arc')
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", '#323D52')
    .style("stroke-width", "0px")
    .style("opacity", 1)
    .attr('transform','translate('+(0)+','+(0)+')rotate(270)')
    .transition(transition_2000)
    // .delay(function(d, i){return i*1000})
    .attr('transform','translate('+(0)+','+(0)+')rotate(90)')

  // text-fold
  var attribute = "fold"
    var text_fold = pieGroup.append("text")
    .text(function(d, i){return attribute + (5-i)})
    .attr('class', 'axis-txt text-sm')
    .attr('transform','translate('+(-radius/1.8)+','+(-radius*1.5)+')')

  // 4 datalines 
  var dataLines = pieGroup.append("line")
    .attr("stroke", '#323D52')
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", 1)
    .attr("x1", 0).attr("y1", radius)
    .attr("x2", function(d, i){return posi(d, i, radius)}).attr("y2", pieY-radius)
    dataLines
    .attr("stroke-dashoffset", 400)
    .attr("stroke-dasharray", 4)
    .transition(transition_500)
    .delay(function(d, i){return i*duration_500})
    .style("stroke-width", function(d, i){return (i == i) ? 2:1})
    .attr("stroke", mainColor["green"])
    .attr("stroke-dashoffset", 0)
 
   
  // acc line  
  var accLine = pieArea.append("line")
    .attr("stroke", '#323D52')
    .style("stroke-width", 0)
    .attr("x1", radius*2).attr("y1", pieY-radius)
    .attr("x2", accX_base).attr("y2", pieY*2+acc)
    accLine
    .attr("stroke-dashoffset", 400)
    .attr("stroke-dasharray", 4)
    .transition(transition_250)
    .delay(function(d, i){return duration_2000})
    .style("stroke-width", 2)
    .attr("stroke", mainColor['red'])
    .attr("stroke-dashoffset", 0)
     
  function posi(d, i, radius){
      var x;
      if(i == 0){x = radius*(i+4)}
      else if(i == 1){x = radius*(i+1)}
      else if(i == 2){x = 0}
      else if(i == 3){x = -radius*(i-1)}
      else if(i == 4){x = -radius*(i)}
      return x
    }
  // model-rect
  var outerRect = pieArea.append("rect")
    .attr("style", "fill:white")
    .attr("stroke", '#323D52')
    .style("stroke-width", "2px")
    .attr("x", -radius).attr("y", -radius)
    .attr("rx", radius).attr("ry", radius)										
    .attr("width", radius*10).attr("height", radius*2)
    .attr('transform','translate('+0+','+pieY+')')

  var innnerRect = pieArea.append("rect")
    .attr("style", "fill:#323D52")
    .attr("stroke", '#323D52')
    .style("stroke-width", "2px")
    .attr("x", -radius).attr("y", -radius)
    .attr("rx", radius).attr("ry", radius)								
    .attr("width", radius*2).attr("height", radius*2)
    .attr('transform','translate('+0+','+pieY+')')
    .transition(transition_2500)
    .attr("width", radius*10)

  // acc x axis  
  var lengthScale_acc = d3.scaleLinear()
    .domain([0,1]).range([heightMargin*4.8, height-heightMargin]);

    pieArea.append('g').attr('class', 'x axis')
    .attr('transform','translate('+(-pieX*1.37)+','+pieY*2+')')
    .call(d3.axisBottom(lengthScale_acc).tickFormat(function(d){return d;}));

  // acc dot on x axis   
  var accAxis = pieArea.append('circle')
    .attr("fill", mainColor['red'])
    // .attr("stroke", '#323D52')
    .attr("cx", 0).attr("cy", 0).attr("r", 0)
    .attr('transform','translate('+(pieX/2+(radius*4)+acc)+','+pieY*2+')')
    .transition(transition_500)
    .delay(function(d, i){return duration_2500})
    .attr("r", 5)

  // text-labels-left   
  var yAxisTxts = ["Data", "Model", "Accuracy"]
  var accValues = ["96% : LR"]
  var text_fold1 = pieArea.append("text")
    .text(yAxisTxts[0])
    .attr('class', 'axis-txt text-sm')
    .attr("x", 0).attr("y", 0)	
    .attr('transform','translate('+(-pieX/2)+','+((-pieY/40)) +')rotate(270)')

  var text_fold2 = pieArea.append("text")
    .text(yAxisTxts[1])
    .attr('class', 'axis-txt text-sm')
    .attr("x", 0).attr("y", 0)	
    .attr('transform','translate('+(-pieX/2)+','+((pieY*1.35)-radius)+')rotate(270)')

  var text_fold3 = pieArea.append("text")
    .text(yAxisTxts[2])
    .attr('class', 'axis-txt text-sm')
    .attr("x", 0).attr("y", 0)	
    .attr('transform','translate('+(-pieX/2)+','+((pieY*2.5)-radius)+')rotate(270)')

  var text_fold1_rect = pieArea.append("rect")
    .attr("fill", "none")
    .attr("stroke", '#323D52')
    .style("stroke-dasharray", "2px")
    .attr("x", 0).attr("y", 0)						
    .attr("width", radius*3.5)
    .attr("height", radius)
    .attr('transform','translate('+ ((-pieX/2)-radius/1.7) +','+((pieY/5.2))+')rotate(270)')

  var text_fold2_rect = pieArea.append("rect")
    .attr("fill", "none")
    .attr("stroke", '#323D52')
    .style("stroke-dasharray", "2px")
    .attr("x", 0).attr("y", 0)						
    .attr("width", radius*2.5)
    .attr("height", radius)
    .attr('transform','translate('+ ((-pieX/2)-radius/1.7) +','+((pieY/0.785))+')rotate(270)')

  var text_fold3_rect = pieArea.append("rect")
    .attr("fill", "none")
    .attr("stroke", '#323D52')
    .style("stroke-dasharray", "2px")
    .attr("x", 0).attr("y", 0)						
    .attr("width", radius*3)
    .attr("height", radius)
    .attr('transform','translate('+ ((-pieX/2)-radius/1.7) +','+((pieY*2.41))+')rotate(270)')

  var text_title = pieArea.append("text")
    .text("K-fold validation")
    .attr('class', 'title-txt text-md')
    .attr("x", 0).attr("y", 0)
    .attr('transform','translate('+((-pieX/2)-18)+','+(-pieY/1.3)+')')

  // acc line & text
  var accLine_result = pieArea.append("line")
    .attr("stroke", '#323D52')
    .style("stroke-width", 0)
    .attr("x1", accX_base+acc).attr("y1", pieY*2)
    .attr("x2", accX_base+acc).attr("y2", ((pieY*2)+(radius*2))-margin_s)
    accLine_result
    .attr("stroke-dashoffset", 400)
    .attr("stroke-dasharray", 4)
    .transition(transition_250)
    .delay(function(d, i){return duration_2000})
    .style("stroke-width", 1)
    .attr("stroke", mainColor['red'])
    .attr("stroke-dashoffset", 0)
     
  var text_acc = pieArea.append("text")
    .text(accValues[0])
    .attr('class', 'acc-txt text-sm')
    .attr("x", 0).attr("y", 0)
    .attr("opacity", 0)
    .attr('transform','translate('+ (accX_base+acc-margin_s)+','+((pieY*2)+(radius*2))+')rotate(-270)')
    .transition(transition_500)
    .delay(function(d, i){return duration_2500})
    .attr("opacity", 1)
  
//legend
  var legend = pieArea.append("g")
  .attr("x", 0).attr("y", 0)
  .attr('transform','translate('+((pieX/2)-radius/1.3)+','+(-pieY/2)+')')
  
  var legned_rect1 = legend.append("rect")
  .attr("x", 0).attr("y", 0).attr("width", 10).attr("height", 10).attr("fill", mainColor["green"])
  var legned_rect2 = legend.append("rect")
  .attr("x", 45).attr("y", 0).attr("width", 10).attr("height", 10).attr("fill", mainColor["lightgreen"])
  var legend_text1 = legend.append("text")
  .text("Data").attr('class', 'acc-txt text-sm text-bold').attr("x", -34).attr("y", 10)
  var legend_text2 = legend.append("text")
  .text("80%").attr('class', 'acc-txt text-sm').attr("x", 15).attr("y", 10)
  var legend_text3 = legend.append("text")
  .text("20%").attr('class', 'acc-txt text-sm').attr("x", 60).attr("y", 10)

}//end of func

function sec6_1_1(){
 d3.csv('iris.csv').then((data) => display_sec6_1_1(null, data));

}

function sec7(){
}

function sec8(){
}
