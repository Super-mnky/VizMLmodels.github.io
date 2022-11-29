// _6_parameta
function sec6_1_1(loaded){
    var svg;
    if (loaded){
      svg = d3.select('#sec6_1').select('svg')
    } else {
      svg = d3.select('#sec6_1').append('svg')
      .attr('width', w_width)
      .attr('height', w_height)  
    }

    svg = svg.append('g').attr("class", "iris-2")
    .attr('transform', function(d, i) {return 'translate('+ ((w_width/2)-(width/2)) +','+((w_height/2.2)-(height/2)) +')'})
  
    var radius = 30;
    var count = [1,2,3,4,5];
    var pieData = {a:20,b:80}
    // var dots = svg.selectAll('g').data(count)
    var pieArea = svg.append('g')
  
    var pieX = width/3;
    var pieY = height/4;
    var padding = 0;
    var acc = 0.3;
    var accX_base = (pieX/2)+(radius*4)
  
    var margin_s = 5;
    var numOfFold = 1;
  
    // //color
    // var mainColor = {"darkgreen": '#379237', 'lightgreen':"#00FFE0", 'darkblue':"#323D52", 'red':'#C70039', 'darkred':'#900C3F', 'lightred':"#FF5733", 'yellow':"#FFC300"}

    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(pieData)
      .range([mainColor['yellow'], mainColor['red']])

    // left titles  
    // var title_data = ["Data Preparation", "Classifiers Selection", "Model Comparison", "K-folds Validation", "Model Selection", "Feature Selection"]
    
    // var title_con = svg.append('g')
    // .attr('transform','translate('+(-100)+','+(0)+')rotate(180)')

    // var text_titles = title_con.selectAll('g')
    // .data(title_data)
    // .enter()
    // .append("g")
    // .append("text")
    // .text(function(d, i){return title_data[i]})
    // .attr('class', 'text-sm')
    // .attr("x", 0).attr("y", 0)	
    // .attr('transform', function(d, i) {return 'translate('+(0)+','+(i*130)+')rotate(270)'})

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
      .style("opacity", 1)
      // .attr('transform','translate('+(0)+','+(0)+')rotate(270)')
      // .transition(transition_2000)
      // .attr('transform','translate('+(0)+','+(0)+')rotate(90)')

    var pies_layer = pieGroup.append('circle')
      .attr("class", "pieCircle")
      .attr("fill", 'white')
      // .attr("opacity", 0)
      // .attr("stroke", mainColor['red'])
      // .style("stroke-dasharray", ("3, 3"))
      // .attr("stroke-width", 1)
      .attr("cx", 0).attr("cy", 0)
      .attr("r", radius)
      .style("fill", function(d, i){return i == 0 ? "none" : "white"})
      .style("stroke-width", function(d, i){return i == 0 ? 4 : 1})
      .style("stroke-dasharray", function(d, i){return i == 0 ? ("0, 0") : ("3, 3")})
      .style("stroke", function(d, i){return i < numOfFold ? mainColor['red'] : mainColor['darkblue']})

      // pies_layer
      // .transition(transition_500)
      // .delay(function(d, i){return i*duration_500})
      // .attr("stroke", function(d, i){return i == i ? mainColor['darkblue'] : mainColor['lightgreen']})
      
      // var pies_layer = pieGroup.append('circle')
      //   .attr("class", "pieCircle")
      //   .attr("fill", 'none')
      //   // .attr("opacity", 0)
      //   .attr("stroke", 'lightgreen')
      //   .attr("stroke-width", 4)
      //   .attr("cx", 0).attr("cy", 0)
      //   .attr("r", radius)
      //   pies_layer
      //   .transition(transition_500)
      //   .delay(function(d, i){return i*duration_500})
      //   .attr("stroke", function(d, i){return i == i ? mainColor['darkblue'] : mainColor['lightgreen']})
      
    // text-fold
    var attribute = "fold"
      var text_fold = pieGroup.append("text")
      .text(function(d, i){return attribute + (i+1)})
      .attr('class', 'axis-txt text-sm')
      .attr('transform','translate('+(-radius/1.8)+','+(-radius*1.5)+')')
  
    // 4 datalines 
    var dataLines = pieGroup.append("line")
      .style("stroke", mainColor['darkblue'])
      .style("stroke-dasharray", ("3, 3"))
      .style("stroke-width", 1)
      .attr("x1", 0).attr("y1", radius)
      .attr("x2", function(d, i){return posi(d, i, radius)}).attr("y2", pieY-radius)
      // dataLines
      // .attr("stroke-dashoffset", 400)
      // .attr("stroke-dasharray", 4)
      // .transition(transition_500)
      // .delay(function(d, i){return i*duration_500})
      // .style("stroke-width", function(d, i){return (i == i) ? 2:1})
      // .attr("stroke", mainColor["lightred"])
      // .attr("stroke-dashoffset", 0)
   
    // acc line  
    var accLine = pieArea.append("line")
      .style("stroke", mainColor['darkblue'])
      .style("stroke-width", 0)
      .attr("x1", radius*2).attr("y1", pieY-radius)
      .attr("x2", accX_base).attr("y2", pieY*2+acc)
      // accLine
      // .attr("stroke-dashoffset", 400)
      // .attr("stroke-dasharray", 4)
      // .transition(transition_250)
      // .delay(function(d, i){return duration_2000})
      // .style("stroke-width", 2)
      // .attr("stroke", mainColor['darkgreen'])
      // .attr("stroke-dashoffset", 0)
       
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
      // innnerRect
      // .transition(transition_2500)
      // .attr("width", radius*10)
  
    // acc x axis  
    var lengthScale_acc = d3.scaleLinear()
      .domain([0,1]).range([heightMargin*4.8, height-heightMargin]);
  
      pieArea.append('g').attr('class', 'x axis')
      .attr('transform','translate('+(-pieX*1.37)+','+pieY*2+')')
      .call(d3.axisBottom(lengthScale_acc).tickFormat(function(d){return d;}));
  
    // acc dot on x axis   
    var accAxis = pieArea.append('circle')
      .attr("fill", mainColor['blue'])
      // .attr("stroke", '#323D52')
      .attr("cx", 0).attr("cy", 0).attr("r", 0)
      .attr('transform','translate('+(pieX/2+(radius*4)+acc)+','+pieY*2+')')
  
    // text-labels-left   
    var yAxisTxts = ["Data", "Model", "Accuracy"]
    var accValues = ["96% : LR"]
    var text_fold1 = pieArea.append("text")
      .text(yAxisTxts[0])
      .attr('class', 'axis-txt text-sm')
      .attr("x", 0).attr("y", 0)	
      .attr('transform','translate('+(-pieX/1.9)+','+((-pieY/5)) +')rotate(90)')
  
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

    // text outline-rect
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
  
    // var text_title = pieArea.append("text")
    //   .text("Parameter Tuning")
    //   .attr('class', 'title-txt text-md')
    //   .attr("x", 0).attr("y", 0)
    //   .attr('transform','translate('+((-pieX/2)-18)+','+(-pieY/1.3)+')')
  
    // acc line & text
    var accLine_result = pieArea.append("line")
      .style("stroke", mainColor['blue'])
      .style("stroke-width", 0)
      .attr("x1", accX_base+acc).attr("y1", pieY*2)
      .attr("x2", accX_base+acc).attr("y2", ((pieY*2)+(radius*2))-margin_s)
      // accLine_result
      // .transition(transition_500)
      // .delay(function(d, i){return duration_2500})
      // .attr("opacity", 1)
       
    var text_acc = pieArea.append("text")
      .text(accValues[0])
      .attr('class', 'acc-txt text-sm')
      .attr("x", 0).attr("y", 0)
      .attr("opacity", 0)
      .attr("stroke-dasharray", "2px")
      .attr('transform','translate('+ (accX_base+acc-margin_s)+','+((pieY*2)+(radius*2))+')rotate(-270)')
      // text_acc
      // .transition(transition_500)
      // .delay(function(d, i){return duration_2500})
      // .attr("opacity", 1)

  //legend
    var legend = pieArea.append("g")
    .attr("x", 0).attr("y", 0)
    .attr('transform','translate('+((pieX/2)-radius/1.3)+','+(-pieY/2)+')')
    
    var legned_rect1 = legend.append("rect")
    .attr("x", 0).attr("y", 0).attr("width", 10).attr("height", 10).attr("fill", mainColor["red"])
    var legned_rect2 = legend.append("rect")
    .attr("x", 45).attr("y", 0).attr("width", 10).attr("height", 10).attr("fill", mainColor["yellow"]) 
    var legend_text1 = legend.append("text")
    .text("Data").attr('class', 'acc-txt text-sm text-bold').attr("x", -34).attr("y", 10)
    var legend_text2 = legend.append("text")
    .text("80%").attr('class', 'acc-txt text-sm').attr("x", 15).attr("y", 10)
    var legend_text3 = legend.append("text")
    .text("20%").attr('class', 'acc-txt text-sm').attr("x", 60).attr("y", 10)
  
  //checkboxs and acc data
    var data = ["fold1", "fold2", "fold3", "fold4", "fold5"]
    var acc_data = ["0.95123", "0.95236", "0.96121", "0.962642", "0.952334"]

  // changeUIPos()
    const elem = document.getElementById('fold_UI');
    elem.style.position = "absolute";
    elem.style.marginLeft = ((w_width/2)+(width/3.4)) +'px';
    elem.style.marginTop = ((w_height/2)-(height/3.5)) +'px';
  
  //dropdown
    d3.select("#fold_dropdown")
      .on("change",function(d){
        var selected = d3.select(this).property("value")
        console.log( selected );
        numOfFold = selected;
        // updateNumber()
        updatePie()
        updateLine()
        reset()
    })

    d3.select("#fold_apply").on("click", function() {
      updateAll()
    }) 
  
    // function updateNumber(){
    //     text_fold.text(numOfFold+"_folds")
    // }

    function updatePie(){
      pies_layer
      .style("fill", function(d, i){return i < numOfFold ? "none" : "white"})
      
      innnerRect
      .attr("width", radius*2).attr("height", radius*2)

      pies
      .transition(transition_800)
      .attr('transform','translate('+(0)+','+(0)+')rotate(270)')
    }

    function updateLine(){
      dataLines
      .attr("stroke-dashoffset", 0)
      .attr("stroke-dasharray", 4)
      .style("stroke", mainColor['darkblue'])
      .style("stroke-width", 1)
    }

    function reset(){
      console.log(numOfFold)
      pies_layer
      .style("stroke-width", function(d, i){return (i < numOfFold) ? 4 : 1})
      // .attr("stroke", function(d, i){return i == i ? mainColor['darkblue'] : mainColor['lightgreen']})
      .style("stroke-dasharray", function(d, i){return (i < numOfFold) ? ("0, 0") : ("3, 3")})
      .style("stroke", function(d, i){return (i < numOfFold) ? mainColor['red'] : mainColor['darkblue']})

      accLine
      // .attr("opacity", 0)
      .attr("stroke-dashoffset", 4)
      .attr("stroke-dasharray", 1)
      // .style("stroke", mainColor['darkblue'])
     
      accAxis
      .attr("r", 0)

      accLine_result
      .attr("opacity", 0)
      .style("stroke-width", 0)
      .attr("stroke-dasharray", "2px")
      
      text_acc
      .attr("opacity", 0)
    }

    function updateAll(){
      dataLines
      .attr("stroke-dashoffset", function(d, i){return (i < numOfFold) ? 400 : 0})
      // .attr("stroke-dashoffset", 0)
      .attr("stroke-dasharray", 4)
      .attr("stroke", mainColor['darkblue'])
      .style("stroke-width", 1)
      .transition(transition_500)
      .delay(function(d, i){return i*duration_500})
      .style("stroke-width", function(d, i){return (i < numOfFold) ? 2:1})
      // .style("stroke", function(d, i){return (i < numOfFold) ? mainColor["red"] : mainColor['darkblue']})
      .attr("stroke-dashoffset", function(d, i){return (i < numOfFold) ? 4 : 0})
    
      innnerRect
      .transition(transition_2500)
      .delay(function(d, i){return duration_2000})
      .attr("width", radius*10)

      accLine
      .attr("stroke-dashoffset", 400)
      .attr("stroke-dasharray", 4)
      .transition(transition_250)
      .delay(function(d, i){return duration_2000})
      .attr("opacity", 1)
      .style("stroke-width", 2)
      .style("stroke", mainColor['blue'])
      .attr("stroke-dashoffset", 0)

      accAxis
      .transition(transition_500)
      .delay(function(d, i){return duration_2500})
      .attr("r", 5)

      accLine_result
      .transition(transition_500)
      .delay(function(d, i){return duration_2500})
      .attr("opacity", 1)
      .style("stroke-width", 1)
      .attr("stroke-dasharray", "2px")
      
      text_acc
      .transition(transition_500)
      .text(function(d, i){return acc_data[i]})
      .attr("fill", mainColor['blue'])
      .delay(function(d, i){return duration_2500})
      .attr("opacity", 1)

      pies
      .attr('transform','translate('+(0)+','+(0)+')rotate(270)')
      .transition(transition_2000)
      .attr('transform','translate('+(0)+','+(0)+')rotate(90)')

      pies_layer
      .transition(transition_500)
      .delay(function(d, i){return i*duration_500})
      .style("stroke", function(d, i){return i == i ? mainColor['darkblue'] : mainColor['red']})
     
    }
  }//end of func

  // function changeUIPos() {
  //   const elem = document.getElementById('fold_UI');
  //   elem.style.width = w_width/2;
  // }
//display chart
// var myChart611 = sec6_1_1();

function display_sec6_1_1(error, data) {
    if (error) {
      console.log(error);
    }
}