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
  var mainColor = {"green": '#1E8B8B', 'lightgreen':"#00FFE0", 'darkblue':"#323D52", 'red':'#C70039', 'darkred':'#900C3F' }
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
    .attr('transform','translate('+(0)+','+(0)+')rotate(90)')

  var pies_layer = pieGroup.append('circle')
    .attr("class", "pieCircle")
    .attr("fill", 'none')
    // .attr("opacity", 0)
    .attr("stroke", 'lightgreen')
    .attr("stroke-width", 4)
    .attr("cx", 0).attr("cy", 0)
    .attr("r", radius)
    pies_layer
    .transition(transition_500)
    .delay(function(d, i){return i*duration_500})
    .attr("stroke", function(d, i){return i == i ? mainColor['darkblue'] : mainColor['lightgreen']})
  
  // text-fold
  var attribute = "fold"
    var text_fold = pieGroup.append("text")
    .text(function(d, i){return attribute + (i+1)})
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

//display chart
//var myChart411 = sec4_1_1(); @@JJ4 Commented out to roll with ST

function display_sec5_1_1(error, data) {
  sec5_1_1()
  if (error) {
    console.log(error);
  }
}
