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

//display chart
var myChart = sec5_1_1();

function display_sec5_1_1(error, data) {
    if (error) {
      console.log(error);
    }
    // myChart('#sec4', data);
  }
  