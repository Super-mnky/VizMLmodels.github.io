// Scrolling Mechanism:
var current_viz = 0
var viz_ids = [
  '#viz_1_1',
  '#viz_1_2',
  '#viz_1_3', 
  '#viz_1_3',
  '#viz_1_4',
  '#viz_1_5',
]

var viz_fns = [
  viz11, viz12, viz13a, viz13b, viz15, viz16
]

var viz_loaded = [
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
function viz11(){

  var lengthScale = d3.scaleLinear()
  .domain([4,8]).range([heightMargin, height-heightMargin]);

  var widthScale = d3.scaleLinear()
  .domain([1.8,4.5]).range([height-heightMargin, heightMargin]);

  function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
  }

  function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
  }

  d3.csv('iris.csv').then(function(dataset) {
    //console.table(dataset)
    var svg = d3.select('#viz_1_1').append('svg')
    .attr('width', width)
    .attr('height', height)

    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
    return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
    })

    svg.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+widthMargin+","+(height-heightMargin)+")")
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

    svg.append('g').attr('class', 'y axis')
    .attr("transform", "translate("+(widthMargin+heightMargin)+",0)")
    .call(d3.axisLeft(widthScale));

    svg.append('text')
      .attr('class', 'label')
      .attr('transform','translate('+((width-widthMargin)/2 - 20)+','+(height-(heightMargin/3))+')')
      .text('Sepal Length');

    svg.append('text')
      .attr('class', 'label')
      .attr('transform','translate('+widthMargin+','+(height - heightMargin)/2+') rotate(90)')
      .text('Sepal Width');

    d3.selectAll('#b2')
    .on('click', function(d){
        // Remove the currently selected classname from that element
          var circles = svg.selectAll("g")
          .data(dataset)
          .enter()
          g.append("circle")
          .attr("r", 3.5)
          .attr('fill', function(d) {
            if (d.Species == 'Iris-virginica') {
              return 'orange';
            } else {
            if (d.Species == 'Iris-versicolor') {
              return 'red';
            } else {
            if (d.Species == 'Iris-setosa') {
              return 'blue';
            }}}})});

    d3.selectAll('#b1')
    .on('click', function(){
        // Remove the currently selected classname from that element
      var circles = svg.selectAll("g")
          .data(dataset)
          .enter()
          g.append("circle")
          .attr("r", 3.5)
          .attr('fill','black')


    });
  });
}

function viz12(){

  var lengthScale = d3.scaleLinear()
  .domain([4,8]).range([heightMargin, height-heightMargin]);

  var widthScale = d3.scaleLinear()
  .domain([1.8,4.5]).range([height-heightMargin, heightMargin]);

  function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
  }

  function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
  }

  d3.csv('iris.csv').then(function(dataset) {
    //console.table(dataset)
    var svg = d3.select('#viz_1_2').append('svg')
    .attr('width', width)
    .attr('height', height)


    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
    return ("translate(" + scaleLength(d.SepalLengthCm) + "," + 325 + ")")  //magic number to bring down dots
    //return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
    })

    var circles = svg.selectAll("g")
          .data(dataset)
          .enter()
          g.append("circle")
          .attr("r", 3.5)
          .attr('fill', function(d) {
            if (d.Species == 'Iris-virginica') {
              return 'orange';
            } else {
            if (d.Species == 'Iris-versicolor') {
              return 'red';
            } else {
            if (d.Species == 'Iris-setosa') {
              return 'blue';
            }}}})

    svg.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+widthMargin+","+(height-heightMargin)+")")
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

    svg.append('text')
      .attr('class', 'label')
      .attr('id', 'sepal_length_label')
      .attr('transform','translate('+((width-widthMargin)/2 - 20)+','+(height-(heightMargin/3))+')')
      .text('Click Me');



    d3.selectAll('#sepal_length_label')
    .on('click', function(d){
        // Remove the currently selected classname from that element
      console.log("Clicked the animation button")

      svg.selectAll("g")
          .data(dataset)
          .enter()
      svg.selectAll("circle")
          .transition()
          .duration(750)
          .attr("transform", function(d) {
            if (d.Species == 'Iris-virginica') {
              return ("translate(" + 0 + "," + 75 + ")");
            } else {
            if (d.Species == 'Iris-versicolor') {
              return ("translate(" + 0 + "," + 0 + ")");
            } else {
            if (d.Species == 'Iris-setosa') {
              return ("translate(" + 0 + "," + -75 + ")");
            }}}
          })
    });


  });
}

function viz13a(){
  var svg = d3.select("#viz_1_3")
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

async function viz13b(){
  var svg = d3.select("#viz_1_3")
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

function viz15(){
  var svg = d3.select('#viz_1_4').append('svg')
  .attr('width', width)
  .attr('height', height)

  var radius = 30;
  var count = [1,2,3,4,5];
  var pieData = {a:20,b:80}
  var dots = svg.selectAll('g').data(count)
  var pieArea = svg.append('g')

  pieCharts(pieArea, radius, count, pieData)
}

function pieCharts(pieArea, radius, count, pieData){

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(pieData)
    .range(["#00FFE0", "#1E8B8B", "#323D52"])

  var pieGroup = pieArea.selectAll('g')
    .data(count)
    .enter()
    .append('g')
    .attr('transform', function(d, i) {return 'translate('+(((width-widthMargin)/3)-2*radius*i)+','+((height-heightMargin)/8)+')'})
    .attr('class', 'pies')

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
    .attr('transform','translate('+(((width/2-widthMargin))-2*radius)+','+((height-heightMargin)/5)+')')
  
  var attribute = "fold"
    var text_fold = pieGroup.append("text")
    .text(function(d, i){return attribute + (5-i)})
    .attr('class', 'axis-txt')
    .attr('transform','translate('+(((width/2-widthMargin))-2.7*radius)+','+(((height-heightMargin)/5)-2*radius)+')')

  var dataLines = pieGroup.append("line")
    .attr("stroke", '#323D52')
    .style("stroke-width", function(d, i){return (i == 3) ? 3:1})
    .style("stroke-dasharray", ("3, 3"))
    .attr("x1", 0)
    .attr("y1", radius)
    .attr("x2", function(d, i){return posi(d, i, radius)})
    .attr("y2", 145)
    .attr('transform','translate('+(((width/2-widthMargin))-2*radius)+','+(((height-heightMargin)/5))+')')
   
  var acc = radius*4
  var accuracyLine = pieArea.append("line")
    .attr("stroke", '#323D52')
    .style("stroke-width", 3)
    .style("stroke-dasharray", ("3, 3"))
    .attr("x1", 0)
    .attr("y1", radius)
    .attr("x2", acc)
    .attr("y2", 145)
    .attr('transform','translate('+(((width/2-widthMargin))+radius)+','+((height-heightMargin)/1.6)+')')
     
  function posi(d, i, radius){
      var x;
      if(i == 0){x = -radius*(i+4)}
      else if(i == 1){x = -radius*(i+1)}
      else if(i == 2){x = 0}
      else if(i == 3){x = radius*(i-1)}
      else if(i == 4){x = radius*(i)}
      return x
    }

  var outerRect = pieArea.append("rect")
    .attr("style", "fill:white")
    .attr("stroke", '#323D52')
    .style("stroke-width", "2px")
    .attr("x", 100)
    .attr("y", 100)
    .attr("rx", radius)	
    .attr("ry", radius)								
    .attr("width", radius*10)
    .attr("height", radius*2)
    .attr('transform','translate('+(((width-widthMargin)/2)-7.2*radius)+','+((height/2.2-heightMargin))+')')

  var innnerRect = pieArea.append("rect")
    .attr("style", "fill:#323D52")
    .attr("stroke", '#323D52')
    .style("stroke-width", "2px")
    .attr("x", 100)
    .attr("y", 100)
    .attr("rx", radius)	
    .attr("ry", radius)								
    .attr("width", radius*8)
    .attr("height", radius*2)
    .attr('transform','translate('+(((width-widthMargin)/2)-7.2*radius)+','+((height/2.2-heightMargin))+')')

    var lengthScale_acc = d3.scaleLinear()
    .domain([0,1]).range([heightMargin*4.6, height-heightMargin]);

    pieArea.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+widthMargin*(-3)+","+(height/1.12-heightMargin)+")")
    .call(d3.axisBottom(lengthScale_acc).tickFormat(function(d){return d;}));

    var accAxis = pieArea.append('circle')
    .attr("style", "fill:#323D52")
    .attr("stroke", '#323D52')
    .attr("cx", 0)	
    .attr("cy", 0)	
    .attr("r", 5)
    .attr("transform", "translate("+(((width/2+132)))+","+(height/1.12-heightMargin)+")")

    var yAxisTxt = ["Data", "Model", "Accuracy"]
    var text_fold1 = pieArea.append("text")
    .text(yAxisTxt[0])
    .attr('class', 'axis-txt')
    .attr("x", 0)
    .attr("y", 0)
    .attr('transform','translate('+(((width/6-widthMargin))+radius)+','+((height-heightMargin)/2.9)+')rotate(270)');
   
    var text_fold2 = pieArea.append("text")
    .text(yAxisTxt[1])
    .attr('class', 'axis-txt')
    .attr("x", 0)
    .attr("y", 0)
    .attr('transform','translate('+(((width/6-widthMargin))+radius)+','+((height-heightMargin)/1.51)+')rotate(270)');
   
    var text_fold3 = pieArea.append("text")
    .text(yAxisTxt[2])
    .attr('class', 'axis-txt')
    .attr("x", 0)
    .attr("y", 0)
    .attr('transform','translate('+(((width/6-widthMargin))+radius)+','+((height-heightMargin)/1.07)+')rotate(270)');
   
    var text_title = pieArea.append("text")
    .text("K-fold validation")
    .attr('class', 'title-txt')
    .attr("x", 0)
    .attr("y", 0)
    .attr('transform','translate('+(((width/7-widthMargin))+radius)+','+((height/4.3-heightMargin))+')');
}

function viz16(){
  // Load the data.
  d3.csv('iris.csv').then((data) =>
    display(null, data)
  );

  // setup the buttons.
  setupButtons();
}