// // _5_kfold

// function sec5_1_1(){
//   var svg = d3.select('#sec5_1').append('svg')
//   .attr('width', width)
//   .attr('height', height)

//   var radius = 30;
//   var count = [1,2,3,4,5];
//   var pieData = {a:20,b:80}
//   var dots = svg.selectAll('g').data(count)
//   var pieArea = svg.append('g')

//   var pieX = width/3;
//   var pieY = height/4.5;
//   var padding = 40;
//   var acc = 0.3;

//   const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);

//   // set the color scale
//   var color = d3.scaleOrdinal()
//     .domain(pieData)
//     .range(["#00FFE0", "#1E8B8B", "#323D52"])
  
//   // pieArea position 
//   pieArea
//   .attr('transform', function(d, i) {return 'translate('+pieX+','+(pieY+padding)+')'})

//   // pie charts container
//   var pieGroup = pieArea.selectAll('g')
//     .data(count)
//     .enter()
//     .append('g')
//     .attr('transform', function(d, i) {return 'translate('+(((2*i*radius)))+','+0+')'})
//     .attr('class', 'pies')

//   // pie charts   
//   var pie = d3.pie()
//     .value(function(d) {return d.value; })
//   var data_ready = pie(d3.entries(pieData))
  
//   var pies = pieGroup.selectAll('.pie')
//     .data(data_ready)
//     .enter()
//     .append('g')
//     .attr('class', 'arc')
//     .append('path')
//     .attr('d', d3.arc()
//       .innerRadius(0)
//       .outerRadius(radius)
//     )
//     .attr('fill', function(d){ return(color(d.data.key)) })
//     .attr("stroke", '#323D52')
//     .style("stroke-width", "0px")
//     .style("opacity", 1)

//   // text-fold
//   var attribute = "fold"
//     var text_fold = pieGroup.append("text")
//     .text(function(d, i){return attribute + (5-i)})
//     .attr('class', 'axis-txt')
//     .attr('transform','translate('+(-radius/1.8)+','+(-radius*2)+')')

//   // 4 datalines 
//   var dataLines = pieGroup.append("line")
//     .attr("stroke", '#323D52')
//     .style("stroke-width", function(d, i){return (i == 3) ? 3:1})
//     .style("stroke-dasharray", ("3, 3"))
//     .attr("x1", 0)
//     .attr("y1", radius)
//     .attr("x2", function(d, i){return posi(d, i, radius)})
//     .transition(transitionPath)
//     .attr("y2", pieY-radius)
   
//   // acc line  
//   var accuracyLine = pieArea.append("line")
//     .attr("stroke", '#323D52')
//     .style("stroke-width", 3)
//     .style("stroke-dasharray", ("3, 3"))
//     .attr("x1", radius*2)
//     .attr("y1", pieY-radius)
//     .attr("x2", (pieX/2+(radius*4)))
//     .attr("y2", pieY*2+acc)
     
//   function posi(d, i, radius){
//       var x;
//       if(i == 0){x = radius*(i+4)}
//       else if(i == 1){x = radius*(i+1)}
//       else if(i == 2){x = 0}
//       else if(i == 3){x = -radius*(i-1)}
//       else if(i == 4){x = -radius*(i)}
//       return x
//     }

//   // model-rect
//   var outerRect = pieArea.append("rect")
//     .attr("style", "fill:white")
//     .attr("stroke", '#323D52')
//     .style("stroke-width", "2px")
//     .attr("x", -radius)
//     .attr("y", -radius)
//     .attr("rx", radius)	
//     .attr("ry", radius)								
//     .attr("width", radius*10)
//     .attr("height", radius*2)
//     .attr('transform','translate('+0+','+pieY+')')

//   var innnerRect = pieArea.append("rect")
//     .attr("style", "fill:#323D52")
//     .attr("stroke", '#323D52')
//     .style("stroke-width", "2px")
//     .attr("x", -radius)
//     .attr("y", -radius)
//     .attr("rx", radius)	
//     .attr("ry", radius)								
//     .attr("width", radius*8)
//     .attr("height", radius*2)
//     .attr('transform','translate('+0+','+pieY+')')

//   // acc x axis  
//   var lengthScale_acc = d3.scaleLinear()
//     .domain([0,1]).range([heightMargin*4.8, height-heightMargin]);

//     pieArea.append('g').attr('class', 'x axis')
//     .attr('transform','translate('+(-pieX*1.37)+','+pieY*2+')')
//     .call(d3.axisBottom(lengthScale_acc).tickFormat(function(d){return d;}));

//   // acc dot on x axis   
//   var accAxis = pieArea.append('circle')
//     .attr("style", "fill:#323D52")
//     .attr("stroke", '#323D52')
//     .attr("cx", 0)
//     .attr("cy", 0)
//     .attr("r", 5)
//     .attr('transform','translate('+(pieX/2+(radius*4)+acc)+','+pieY*2+')')

//   // text-labels-left   
//   var yAxisTxt = ["Data", "Model", "Accuracy"]
//   var text_fold1 = pieArea.append("text")
//     .text(yAxisTxt[0])
//     .attr('class', 'axis-txt')
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr('transform','translate('+(-pieX/2)+','+((pieY/3)-radius)+')rotate(270)')

//   var text_fold2 = pieArea.append("text")
//     .text(yAxisTxt[1])
//     .attr('class', 'axis-txt')
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr('transform','translate('+(-pieX/2)+','+((pieY*1.35)-radius)+')rotate(270)')

//   var text_fold3 = pieArea.append("text")
//     .text(yAxisTxt[2])
//     .attr('class', 'axis-txt')
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr('transform','translate('+(-pieX/2)+','+((pieY*2.5)-radius)+')rotate(270)')

//   var text_title = pieArea.append("text")
//     .text("K-fold validation")
//     .attr('class', 'title-txt')
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr('transform','translate('+((-pieX/2)-10)+','+(-pieY/1.3)+')')}

//   //display chart
//   var myChart = sec5_1_1();
//   function display_sec5_1_1(error, data) {
//       if (error) {
//         console.log(error);
//       }
//     // myChart('#sec4', data);
//   }