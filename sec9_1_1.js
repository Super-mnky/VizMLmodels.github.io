// _8_Feature selection
function sec9_1_1(loaded){
    var svg;
    if (loaded){
      svg = d3.select("#sec9_1").select("svg")
    } else {
      svg = d3.select("#sec9_1")
      .append('svg')
      .attr('width', w_width)
      .attr('height', w_height);
      // svg = svg.append('g').attr("class", "iris")
      // .attr('transform', function(d, i) {return 'translate('+ ((w_width/2)-(width/2)) +','+((w_height/2.2)-(height/2)) +')'})
    }
  }//end of func

function display_sec9_1_1(error, data) {
    if (error) {
      console.log(error);
    }
}