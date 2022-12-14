// _4_model comparison

function sec431_to_461(loaded){
  var svg;
  var bin;
  if (loaded){
    svg = d3.select('#sec4_6').select('svg').select("g.iris")
  } else {
    svg = d3.select('#sec4_6').append('svg')
    .attr('width', w_width)
    .attr('height', w_height)

    svg = svg.append('g').attr("class", "iris")
    .attr('transform', function(d, i) {return 'translate('+ (w_width/2) +','+(w_height/2.2) +')'})

    // svg = svg.append('g').attr("class", "visCon")
    // .attr('transform', function(d, i) {return 'translate('+ (0) +','+(0) +')'})
  }

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

    g.append("circle")
        .attr("r", 3.5)
        .attr("stroke", mainColor['darkblue'])
        .attr('fill', function (d) { return color(d.Species); })
        .transition().duration(1000)
        .attr("r","30")
        .attr("fill",mainColor['yellow'])
        .attr("transform",function (d) { return "translate("+(6 - scaleLength(d.SepalLengthCm))+","+
        (-(height/4) - scaleWidth(d.SepalWidthCm))+")"})
})

}

async function sec4_6_1(loaded){
  sec431_to_461(loaded);
  svg = d3.select('#sec4_6').select('svg')

  svg = svg.append('g').attr("class", "iris-2")
  .attr('transform', function(d, i) {return 'translate('+ ((w_width/2)-(width/2)) +','+((w_height/2.2)-(height/2)) +')'})

  // .attr('transform', function(d, i) {return 'translate('+ (w_width/8) +',0)'})
  const elem = document.getElementById('modelselect_UI');
  elem.style.position = "absolute";
  elem.style.marginLeft = -1000 +'px';
  await delay(1000);
//   var svg = d3.select('#sec4_6').append('svg')
//   .attr('width', w_width)
//   .attr('height', w_height)

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
  // var mainColor = {"green": '#1E8B8B', 'lightgreen':"#00FFE0", 'darkblue':"#323D52", 'red':'#C70039', 'darkred':'#900C3F' }
  // var color = d3.scaleOrdinal()
  //   .domain(pieData)
  //   .range(["#00FFE0", "#1E8B8B", "#323D52"])

  // //time
  // var duration_2500 = 2000    
  // var duration_2000 = 2000
  // var duration_500 = 500
  // var duration_250 = 250

  // // transition
  // const transition_2500 = d3.transition().ease(d3.easeSin).duration(duration_2500);
  // const transition_2000 = d3.transition().ease(d3.easeSin).duration(duration_2000);
  // const transition_500 = d3.transition().ease(d3.easeSin).duration(duration_500);
  // const transition_250 = d3.transition().ease(d3.easeSin).duration(duration_250);
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
  
  var pies = pieGroup.append('circle')
    .attr("class", "pieCircle")
    .attr("fill", function(d, i){return i < 2 ? "none" : mainColor['darkblue']})
    .attr("cx", 0).attr("cy", 0)
    .attr("r","0")
    .transition(transition_500)
    .attr("r", radius)

  var pies_layer = pieGroup.append('circle')
    .attr("class", "pieCircle")
    .attr("fill", 'none')
    // .attr("opacity", 0)
    // .attr("stroke", 'lightgreen')
    // .attr("stroke-width", 4)
    .attr("stroke", mainColor['yellow'])
    .attr("stroke-width", function(d, i){return i < 2 ? "1px" : "4px"})
    .style("stroke-dasharray", function(d, i){return i < 2 ? ("3, 3") : 0 })
    .attr("cx", 0).attr("cy", 0)
    .attr("r", radius)
    .attr("stroke", function(d, i){return i > 1 ? mainColor['yellow'] : mainColor['darkblue']})
    pies_layer
    .transition(transition_250)
    .delay(function(d, i){return i*duration_500})
    .attr("stroke", function(d, i){return i > 1 && i == i ? mainColor['red'] : mainColor['darkblue']})
  
  // text-fold
  var attribute = "20%"
    var text_fold = pieGroup.append("text")
    .text(function(d, i){return attribute})
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
    .delay(function(d, i){return i*duration_250})
    .style("stroke-width", function(d, i){return (i == i && i > 1) ? 2:1})
    .attr("stroke", function(d, i){return (i == i && i > 1) ? mainColor['red']:mainColor['darkblue']})
    .attr("stroke-dashoffset", function(d, i){return (i == i && i > 1) ? 0:400})
 
  // acc x axis  
  var lengthScale_acc = d3.scaleLinear()
  .domain([0,1]).range([heightMargin*4.8, height-heightMargin]);

  var x_dist = lengthScale_acc(0.96) + (-pieX * 1.37)
  console.log(x_dist)
   
  // acc line  
  var accLine = pieArea.append("line")
    .attr("stroke", '#323D52')
    .style("stroke-width", 0)
    .attr("x1", radius*2).attr("y1", pieY-radius)
    .attr("x2", x_dist).attr("y2", pieY*2+acc)
    
  accLine
    .attr("stroke-dashoffset", 400)
    .attr("stroke-dasharray", 4)
    .transition(transition_800)
    .delay(function(d, i){return duration_1500})
    .style("stroke-width", 2)
    .attr("stroke", mainColor['red'])
    .attr("stroke-dashoffset", 0)
    .attr('opacity', 1) // removed temporarily

     
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

    innnerRect
    .transition(transition_2500)
    .delay(function (d, i) { return duration_1500 })
    .attr("width", radius * 10)
  
  pieArea.append('g').attr('class', 'x axis')
    .attr('transform','translate('+(-pieX*1.37)+','+pieY*2+')')
    .call(d3.axisBottom(lengthScale_acc).tickFormat(function(d){return d;}));


  // acc dot on x axis
  var accAxis = pieArea.append('circle')
    .attr("fill", mainColor['darkblue'])
    // .attr("stroke", '#323D52')
    .attr("cx", 0).attr("cy", 0).attr("r", 0)
    .attr('transform','translate('+x_dist+','+pieY*2+')')
    .transition(transition_500)
    .delay(function(d, i){return duration_2000})
    .attr("r", 5)
    .attr('opacity', 1) // removed temporarily

  // text-labels-left   
  var yAxisTxts = ["Data", "Model", "Accuracy"]
  var accValues = ["96%: Logistic Regression", "95%: KNN, K=1", "97%: KNN, K=5"] // temporarily removed

  var text_fold1 = pieArea.append("text")
  .text(yAxisTxts[0])
  .attr('class', 'axis-txt text-sm')
  .attr("x", 0).attr("y", 0)	
  .attr('transform','translate('+(-pieX/1.9)+','+((-pieY/4.5)) +')rotate(90)')

var text_fold2 = pieArea.append("text")
  .text(yAxisTxts[1])
  .attr('class', 'axis-txt text-sm')
  .attr("x", 0).attr("y", 0)	
  .attr('transform','translate('+(-pieX/1.9)+','+((pieY*1.1)-radius)+')rotate(90)')

var text_fold3 = pieArea.append("text")
  .text(yAxisTxts[2])
  .attr('class', 'axis-txt text-sm')
  .attr("x", 0).attr("y", 0)	
  .attr('transform','translate('+(-pieX/1.9)+','+((pieY*2.14)-radius)+')rotate(90)')

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
 
  var text_model = pieArea.append("text")
    .attr("fill", mainColor['darkblue'])
    .text('R.L.')
    .attr('class', 'axis-txt text-md')
    .attr("x", 0).attr("y", 0)	
    .attr('transform','translate('+(-pieX/3)+','+((pieY*1.1)-radius*0.9)+')rotate(90)')
     

  // var text_title = pieArea.append("text")
  //   .text("Model comparison")
  //   .attr('class', 'title-txt text-md')
  //   .attr("x", 0).attr("y", 0)
  //   .attr('transform','translate('+((-pieX/2)-18)+','+(-pieY/1.3)+')')

  /* acc line & text
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
    .attr("stroke", mainColor['darkblue'])
    .attr("stroke-dashoffset", 0)
    .attr('opacity', 1) // removed temporarily
    */
   
  var text_acc_LR = pieArea.append("text")
    .text(accValues[0])
    .attr('class', 'acc-txt text-sm')
    .attr("x", 0).attr("y", 0)
    .attr("opacity", 0)
    .attr('transform','translate('+ (x_dist-margin_s)+','+((pieY*2)+(radius))+')rotate(-315)')
    .transition(transition_500)
    .delay(function(d, i){return duration_2500})
    .attr("opacity", 1)
  
  // var text_acc_K10 = pieArea.append("text")
  //   .text(accValues[0])
  //   .attr('class', 'acc-txt text-sm')
  //   .attr("x", 0).attr("y", 0)
  //   .attr("opacity", 0)
  //   .attr('transform','translate('+ (accX_base+acc-margin_s)+','+((pieY*2)+(radius*2))+')rotate(-270)')
  //   .transition(transition_500)
  //   .delay(function(d, i){return duration_2500})
  //   .attr("opacity", 1)
  /*
  var text_acc_k20 = pieArea.append("text")
    .text(accValues[0])
    .attr('class', 'acc-txt text-sm')
    .attr("x", 0).attr("y", 0)
    .attr("opacity", 0)
    .attr('transform','translate('+ (accX_base+acc-margin_s)+','+((pieY*2)+(radius*2))+')rotate(-270)')
    .transition(transition_500)
    .delay(function(d, i){return duration_2500})
    .attr("opacity", 1) */
  
    await delay(4000);
    reset()
    await delay(1000);
    redo()
    k10()
    await delay(4000);
    reset()
    await delay(1000);
    redo()
    k20()
    await delay(4000);
    reset()

    function reset(){
      pies_layer
      // .transition(transition_800)
      // .delay(function(d, i){return duration_1000})
      .attr("fill", function(d, i){return i < 2 ? 'white' : mainColor['darkblue']})  
      .attr("stroke", function(d, i){return i > 1 ? mainColor['yellow'] : mainColor['darkblue']})

      dataLines
      // .transition(transition_500)
      // .delay(function(d, i){return i*duration_250})
      .style("stroke-width", 1)
      .attr("stroke", mainColor['darkblue'])
      .attr("stroke-dashoffset", 400)
  
      innnerRect
      // .transition(transition_2500)
      // .delay(function (d, i) { return duration_1500 })
      .attr("width", radius * 2)

      accLine
      .style("stroke-width", 1)
      .attr("stroke", mainColor['darkblue'])
      .attr("stroke-dashoffset", 400)
      .attr('opacity', 1) // removed temporarily
    }

    function redo(){
      pies_layer
      .transition(transition_250)
      .delay(function(d, i){return i*duration_500})
      .attr("stroke", function(d, i){return i > 1 && i == i ? mainColor['red'] : mainColor['darkblue']})

      dataLines
      // .attr("stroke-dashoffset", 400)
      // .attr("stroke-dasharray", 4)
      .transition(transition_500)
      .delay(function(d, i){return i*duration_250})
      .style("stroke-width", function(d, i){return (i == i && i > 1) ? 2:1})
      .attr("stroke", function(d, i){return (i == i && i > 1) ? mainColor['red']:mainColor['darkblue']})
      .attr("stroke-dashoffset", function(d, i){return (i == i && i > 1) ? 0:400})

      innnerRect
      .transition(transition_2000)
      .delay(function (d, i) { return duration_1500})
      .attr("width", radius * 10)

      accLine
      .transition(transition_800)
      .delay(function(d, i){return duration_1500})
      .style("stroke-width", 2)
      .attr("stroke", mainColor['red'])
      .attr("stroke-dashoffset", 0)
      .attr('opacity', 1) // removed temporarily

      // accLine_result
      // .transition(transition_800)
      // .delay(function(d, i){return duration_1500})
      // .style("stroke-width", 2)
      // .attr("stroke", mainColor['red'])
      // .attr("stroke-dashoffset", 0)
      // .attr('opacity', 1) // removed temporarily
    }

    function k10(){
      var text_acc_K10 = pieArea.append("text")
      .text(accValues[1])
      .attr('class', 'acc-txt text-sm')
      .attr("x", 0).attr("y", 0)
      .attr("opacity", 0)
      .attr('transform','translate('+ (x_dist-(margin_s*5))+','+((pieY*2)+(radius))+')rotate(-315)')
      .transition(transition_500)
      .delay(function(d, i){return duration_2500})
      .attr("opacity", 1)

      text_model.text('KNN, K=1')
      .attr('transform','translate('+(-pieX/3)+','+((pieY*1.1)-radius*2)+')rotate(90)')

      // accLine_result
      // .attr("stroke-dashoffset", 400)
      // .attr("stroke-dasharray", 4)
      // .transition(transition_250)
      // .delay(function(d, i){return duration_2000})
      // .style("stroke-width", 1)
      // .attr("stroke", mainColor['red'])
      // .attr("stroke-dashoffset", 0)
      // .attr('opacity', 1) // removed temporarily
    }

    function k20(){
      var text_acc_K10 = pieArea.append("text")
      .text(accValues[2])
      .attr('class', 'acc-txt text-sm')
      .attr("x", 0).attr("y", 0)
      .attr("opacity", 0)
      .attr('transform','translate('+ (x_dist+(margin_s*3))+','+((pieY*2)+(radius))+')rotate(-315)')
      .transition(transition_500)
      .delay(function(d, i){return duration_2500})
      .attr("opacity", 1)

      text_model.text('KNN, K=5')
      .attr('transform','translate('+(-pieX/3)+','+((pieY*1.1)-radius*2)+')rotate(90)')

      // accLine_result
      // .attr("stroke-dashoffset", 400)
      // .attr("stroke-dasharray", 4)
      // .transition(transition_250)
      // .delay(function(d, i){return duration_2000})
      // .style("stroke-width", 1)
      // .attr("stroke", mainColor['red'])
      // .attr("stroke-dashoffset", 0)
      // .attr('opacity', 1) // removed temporarily
    }

   



}//end of func

//display chart
//var myChart411 = sec4_1_1(); @@JJ4 Commented out to roll with ST

function display_sec4_6_1(error, data) {
  sec4_6_1()
  if (error) {
    console.log(error);
  }
}
