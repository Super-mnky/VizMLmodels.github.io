// _8_Feature selection
function sec8_1_1(loaded){
    var svg;
    if (loaded){
      svg = d3.select("#sec8_1").select("svg")
    } else {
      svg = d3.select("#sec8_1")
      .append('svg')
      .attr('width', w_width)
      .attr('height', w_height);
      // svg = svg.append('g').attr("class", "iris")
      // .attr('transform', function(d, i) {return 'translate('+ ((w_width/2)-(width/2)) +','+((w_height/2.2)-(height/2)) +')'})
    }

    svg = svg.append('g').attr("class", "iris-2")
    .attr('transform', function(d, i) {return 'translate('+ ((w_width/2)-(width/2)) +','+((w_height/2.2)-(height/2)) +')'})

    // .attr('transform', function(d, i) {return 'translate('+ (w_width/8) +',0)'})
  
    // var svg = d3.select('#sec8_1').append('svg')
    // .attr('width', w_width)
    // .attr('height', w_height)
  
    var radius = 30;
    var count = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    var pieData = {a:20,b:80}
    // var dots = svg.selectAll('g').data(count)
    var pieArea = svg.append('g')
    
    var pieX = width/3;
    var pieY = height/4;
    var padding = 0;
    var acc = 0.3;
    var accX_base = (pieX/2)+(radius*4)
  
    var margin_s = 5;
  
    //color
    // var mainColor = {"darkgreen": '#379237', 'lightgreen':"#00FFE0", 'darkblue':"#323D52", 'red':'#C70039', 'darkred':'#900C3F', 'lightred':"#FF5733", 'yellow':"#FFC300"}

    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(pieData)
      .range([mainColor['yellow'], mainColor['darkgreen']])
  
    // //time
    // var duration_2500 = 2500    
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
      .attr('transform', function(d, i) {return 'translate('+col(i)+','+row(i)+')'})
      .attr('class', 'pies')

    function row(i){
        var k = Math.floor(i/5);
        return radius*k*2
    }
    function col(i){
        var k = Math.floor(i/5) + 1;
        // console.log(k, i)
        var m = 0
        if (i > 4 && i < 15){m = (2*radius*(i-(k*k)-1)) }
        else if (i > 15){m = (2*radius*(i-(k*k)+1))}
        else if (i < 5){m = (2*i*radius)}
        return m
    }

    var colors = ['#00FFE0', '#3DB2FF', '#00C2FF', '#00FFE0', '#3DB2FF', '#0075FF', 
    '#00C2FF', '#0075FF', '#00C2FF', '#00C2FF', '#BDFF00', '#00FFE0', '#3DB2FF', 
    '#00C2FF', '#00FFE0', '#3DB2FF', '#0075FF', '#00C2FF', '#00C2FF', '#BDFF00']

    var pies = pieGroup.append('circle')
    .attr("class", "pieCircle")
    .attr("fill", function(d, i){return getColor(d, i)})
    .attr("stroke", mainColor['darkblue'])
    .attr("stroke-width", 4)
    .attr("cx", 0).attr("cy", 0)
    .attr("r", radius)

    function getColor(d, i){
      return colors[i] 
      // return '#3DB2FF'
    }

  
    var pies_layer = pieGroup.append('circle')
    .attr("class", "pieCircle")
    .attr("fill", 'none')
    // .attr("opacity", 0)
    .attr("stroke", mainColor['yellow'])
    .attr("stroke-width", 4)
    .attr("cx", 0).attr("cy", 0)
    .attr("r", radius)
   
    // text-fold
    var attribute = "fold"
      var text_fold = pieGroup.append("text")
      .text(function(d, i){return i < 5 ? attribute + (i+1) : ""})
      .attr('class', 'axis-txt text-sm')
      .attr('transform','translate('+(-radius/1.8)+','+(-radius*1.5)+')')
  
    // 4 datalines 
    var dataLines = pieGroup.append("line")
      .attr("stroke", mainColor['darkblue'])
      .style("stroke-dasharray", ("3, 3"))
      .style("stroke-width", 1)
      .attr("x1", 0).attr("y1", pieY*1.3)
      .attr("x2", function(d, i){return x2(d, i, radius)})
      .attr("y2",  function(d, i){return y2(i)})
   
    // acc line  
    var accLine = pieArea.append("line")
      .attr("stroke", '#323D52')
      .style("stroke-width", 1)
      .attr("x1", radius*2+radius*2).attr("y1", (pieY*2))
      .attr("x2", radius*2+radius*2).attr("y2", (pieY*2))

    function x2(d, i, radius){
        var x;
        if(i == 0){x = radius*(i+4)}
        else if(i == 1){x = radius*(i+1)}
        else if(i == 2){x = 0}
        else if(i == 3){x = -radius*(i-1)}
        else if(i == 4){x = -radius*(i)}
        else if(i > 5){x=0}
        return x
      }

      function y2(i){
        return i > 5 ? pieY*1.3 : pieY*1.3+1.7*radius
      }

    // model-rect
    var multiply_rect = 1.81
    var outerRect = pieArea.append("rect")
      .attr("style", "fill:white")
      .attr("stroke", '#323D52')
      .style("stroke-width", "2px")
      .attr("x", -radius).attr("y", -radius)
      .attr("rx", radius).attr("ry", radius)										
      .attr("width", radius*10).attr("height", radius*2)
      .attr('transform','translate('+0+','+pieY*multiply_rect+')')
  
    var innnerRect = pieArea.append("rect")
      .attr("style", "fill:#323D52")
      .attr("stroke", '#323D52')
      .style("stroke-width", "2px")
      .attr("x", -radius).attr("y", -radius)
      .attr("rx", radius).attr("ry", radius)								
      .attr("width", radius*2).attr("height", radius*2)
      .attr('transform','translate('+0+','+pieY*multiply_rect+')')

    // acc x axis
    var multiply_axis = 2.3
    var lengthScale_acc = d3.scaleLinear()
      .domain([0,1]).range([heightMargin*4.8, height-heightMargin]);
  
      pieArea.append('g').attr('class', 'x axis')
      .attr('transform','translate('+(-pieX*1.37)+','+pieY*multiply_axis+')')
      .call(d3.axisBottom(lengthScale_acc).tickFormat(function(d){return d;}));
  
    // acc dot on x axis
    var accAxis = pieArea.append('circle')
      .attr("fill", mainColor['blue'])
      // .attr("stroke", '#323D52')
      .attr("cx", 0).attr("cy", 0).attr("r", 0)
      .attr('transform','translate(0,'+pieY*multiply_axis+')')
  
    // text-labels-left
    var yAxisTxts = ["Data", "Model", "Accuracy"]
    var features = ["Petal Width", "Petal Length", "Sepal Width", "Sepal Length"]
    var accValues = ["96% : LR"]
    var text_fold1 = pieArea.append("text")
      .text(yAxisTxts[0])
      .attr('class', 'axis-txt text-sm')
      .attr("x", 0).attr("y", 0)	
      .attr('transform','translate('+(-pieX/1.9)+','+((pieY-98)) +')rotate(90)')

    var text_fold2 = pieArea.append("text")
      .text(yAxisTxts[1])
      .attr('class', 'axis-txt text-sm')
      .attr("x", 0).attr("y", 0)	
      .attr('transform','translate('+(-pieX/1.9)+','+((pieY*1.7))+')rotate(90)')
  
    var text_fold3 = pieArea.append("text")
      .text(yAxisTxts[2])
      .attr('class', 'axis-txt text-sm')
      .attr("x", 0).attr("y", 0)	
      .attr('transform','translate('+(-pieX/1.9)+','+((pieY*2.15))+')rotate(90)')

    // text outline-rect
    var text_fold1_rect = pieArea.append("rect")
      .attr("fill", "none")
      .attr("stroke", '#323D52')
      .style("stroke-dasharray", "2px")
      .attr("x", 0).attr("y", 0)						
      .attr("width", radius*8.7)
      .attr("height", radius)
      .attr('transform','translate('+ ((-pieX/2)-radius/1.7) +','+((pieY+50))+')rotate(270)')
  
    var text_fold2_rect = pieArea.append("rect")
      .attr("fill", "none")
      .attr("stroke", '#323D52')
      .style("stroke-dasharray", "2px")
      .attr("x", 0).attr("y", 0)						
      .attr("width", radius*2.5)
      .attr("height", radius)
      .attr('transform','translate('+ ((-pieX/2)-radius/1.7) +','+((pieY+170))+')rotate(270)')
  
    var text_fold3_rect = pieArea.append("rect")
      .attr("fill", "none")
      .attr("stroke", '#323D52')
      .style("stroke-dasharray", "2px")
      .attr("x", 0).attr("y", 0)						
      .attr("width", radius*2.5)
      .attr("height", radius)
      .attr('transform','translate('+ ((-pieX/2)-radius/1.7) +','+((pieY+250))+')rotate(270)')

    for (i = 0; i < features.length; i++) {
      pieArea.append('text').attr('class', 'featuretxt text-sm')
        .attr('fill','black').attr('opacity','1')
        .attr('transform', 'translate('+ pieX*1.26 +','+ (i*62) +')')
        .text(features[i])
    }
    // acc line & text
    /*
    var accLine_result = pieArea.append("line")
      .attr("stroke", mainColor['blue'])
      .style("stroke-width", 0)
      .attr("x1", accX_base+acc).attr("y1", ((pieY*2)+(radius*2))-margin_s)
      .attr("x2", accX_base+acc).attr("y2", ((pieY*2)+(radius*3))-margin_s)*/
       
    var text_acc = pieArea.append("text")
      .text(accValues[0])
      .attr('class', 'acc-txt text-sm')
      .attr("x", 0).attr("y", 0)
      .attr("opacity", 0)
      .attr("stroke-dasharray", "2px")
      .attr('transform','translate('+ (accX_base+acc-margin_s)+','+((pieY*2)+(radius*3))+')rotate(-270)')

  // //legend
  //   var legend = pieArea.append("g")
  //   .attr("x", 0).attr("y", 0)
  //   .attr('transform','translate('+((pieX/2)-radius/1.3)+','+(-pieY/2)+')')
    
  //   var legned_rect1 = legend.append("rect")
  //   .attr("x", 0).attr("y", 0).attr("width", 10).attr("height", 10).attr("fill", mainColor["red"])
  //   var legned_rect2 = legend.append("rect")
  //   .attr("x", 45).attr("y", 0).attr("width", 10).attr("height", 10).attr("fill", mainColor["yellow"]) 
  //   var legend_text1 = legend.append("text")
  //   .text("Data").attr('class', 'acc-txt text-sm text-bold').attr("x", -34).attr("y", 10)
  //   var legend_text2 = legend.append("text")
  //   .text("80%").attr('class', 'acc-txt text-sm').attr("x", 15).attr("y", 10)
  //   var legend_text3 = legend.append("text")
  //   .text("20%").attr('class', 'acc-txt text-sm').attr("x", 60).attr("y", 10)
  
  //checkboxs
    var checked = ["0","1","2","3"];
    var numOfFold = 0
    var isChecked = true;
    //var acc_data = ["1.6797", "1.6914"];
    // Where the values go: 1111, 1110, 1101, ... like a truth table
    // SepalLengthCm,SepalWidthCm,PetalLengthCm,PetalWidthCm
    var acc_data = ['0.960',
    '0.940',
    '0.940',
    '0.773',
    '0.973',
    '0.933',
    '0.927',
    '0.687',
    '0.967',
    '0.947',
    '0.967',
    '0.520',
    '0.960',
    '0.953',
    '0.960',
    '0.000']

    // changeUIPos()
    const elem = document.getElementById('feature_UI');
    elem.style.position = "absolute";
    elem.style.marginLeft = ((w_width/2)-(width*0.375)) +'px';
    elem.style.marginTop = ((w_height/2)-(height/2.1)) +'px';
    
    d3.selectAll(".age_box").on('change', function() {
        if (this.checked) {
          checked.push(this.value)
        } else {
          var v = this.value
          checked = checked.filter(function(element) {
            return element !== v;
          });
        }

        /*if (this.value == 4){ reset() }
        if(this.checked) {
          console.log('You checked the checkbox:');
          console.log(this.value);  
          checked.push(this.value)
          isChecked = true;
        } else {
          var v = this.value
          if (v < 4) {
            console.log('You unchecked the checkbox:');
            console.log(this.value);  
            this.checked = true;
          }
          checked = checked.filter((element) => element !== this.value);
          isChecked = false;
        }
        console.log(checked)*/
      });

    // function updateNumber(){
    //     text_fold.text(numOfFold+"_folds")
    // }

    d3.select("#feature_apply").on("click", function() {

      console.log(checked)

      reset()
      updateAll()
      updatePie()
      updateLine()
    }) 

    function updatePie(){
      pies
      .transition(transition_2000)
      .attr('transform','translate('+(0)+','+(0)+')rotate(90)')

      pies_layer
      .transition(transition_250)
      .delay(function(d, i){return i*duration_250/10})
      .attr("stroke", function(d, i){return checked.includes(Math.floor(i/5)+'') ? mainColor['darkblue'] : mainColor['yellow']})  
    }

    function updateLine(){
      dataLines
      .attr("stroke-dashoffset", 400)
      .attr("stroke-dasharray", 4)
      .attr("stroke", mainColor['darkblue'])
      .style("stroke-width", 1)
    }

    function reset(){
      pies
      .transition(transition_2000)
      .attr('transform','translate('+(0)+','+(0)+')rotate(270)')
        
      pies_layer
      .attr("stroke", function(d, i){return i==i ? mainColor['yellow'] : mainColor['darkblue']})
     
      innnerRect
      .attr("width", radius*2).attr("height", radius*2)

      accLine
      .attr("opacity", 0)
      .attr("stroke-dashoffset", 400)
      .attr("stroke-dasharray", 1)
     
      //accAxis
      //.attr("r", 0)
      /*
      accLine_result
      .attr("opacity", 0)
      .style("stroke-width", 0)
      .attr("stroke-dasharray", "2px")
      */

      text_acc
      .attr("opacity", 0)
    }

    function updateAll(){
      dataLines
      .attr("stroke-dashoffset", 400)
      // .attr("stroke-dashoffset", 0)
      .attr("stroke-dasharray", 4)
      .attr("stroke", mainColor['darkblue'])
      .style("stroke-width", 1)
      .transition(transition_500)
      .delay(function(d, i){return i*duration_250/10})
      .style("stroke-width", 2)
      .attr("stroke", mainColor["lightred"])
      .attr("stroke-dashoffset", 0)
    
      innnerRect
      .transition(transition_2500)
      .delay(function(d, i){return duration_500*2})
      .attr("width", radius*10)

      var idx = 15 - checked.reduce(function (acc, x) { acc += 2**(+x); return acc}, 0)
      console.log(idx)
      
      var x_dist = lengthScale_acc(+(acc_data[idx])) + (-pieX * 1.37)
      console.log(x_dist)
  
      accLine
      .attr("stroke-dashoffset", 400)
      .attr("stroke-dasharray", 4)
      .attr("x1", radius*2+radius*2).attr("y1", (pieY*2))
      .transition(transition_250)
      .delay(function(d, i){return duration_500*2})
      .attr("opacity", 1)
      .attr("x2", x_dist).attr("y2", (pieY * multiply_axis))
      .attr("stroke", mainColor['blue'])
      .attr("stroke-dashoffset", 0)

      accAxis
      .transition(transition_500)
      .delay(function(d, i){return duration_500*2})
      .attr("transform","translate(" + x_dist + ","+ (pieY * multiply_axis) +")")
      .attr("r", 5)
      /*
      accLine_result
      .transition(transition_500)
      .delay(function(d, i){return duration_500*2})
      .attr("opacity", 1)
      .style("stroke-width", 1)
      .attr("stroke-dasharray", "2px")
      */
      var RMSE;
      if (isChecked){RMSE = 0} else {RMSE = 1}

      text_acc
      .attr("fill", mainColor['darkblue'])
      .transition(transition_500)
      .text(+(acc_data[idx])*100 + '%')
      .attr("transform","translate(" + x_dist + ","+ (pieY * multiply_axis + radius) +")rotate(90)")
      .delay(function (d, i) { return duration_1000 })
      .attr("opacity", 1)
    }

  }//end of func


//display chart
// var myChart611 = sec8_1_1();

function display_sec8_1_1(error, data) {
    if (error) {
      console.log(error);
    }
}