const width =   6000;
const height =  1800;

var D3projection = d3.geo.mercator()
        .center([-5, 60])                
        .scale(5000) ;

  var SVGpath = d3.geo.path().projection(D3projection);



  //Function to draw the map
function drawMap(data)
{

  
  var svg = d3.select("svg")
  .attr('height', height)
  .attr('width', width)
 

    // Draw the map
    svg.append("g")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
      .attr("fill", "grey")
      .attr("d", d3.geo.path()
          .projection(D3projection)
      )
    .style("stroke", "none")

    
  //After drawing the map then load the data for the ireland map
    loadIrelandMapData();
}


//Draw the Ireland Map function

function drawIrelandMap(data)
{
  var svg = d3.select("svg")
  .attr('height', height)
  .attr('width', width)



       // Draw the map
       svg.append("g")
       .selectAll("path")
       .data(data.features)
       .enter()
       .append("path")
         .attr("fill", "grey")
         .attr("d", d3.geo.path()
             .projection(D3projection)
         )
       .style("stroke", "none")

      //Load Circle data
       loadData();
}

  //The function that draws the circles.
function draw (dataset)
{
  var svg = d3.select("svg")
  .attr('height', height)
  .attr('width', width)
  



  var parentVar = svg.selectAll(null)
        .data(dataset)
        .enter()
        .append("g");
        
        

          
  //Draw the circles
    parentVar.append("circle")
    .attr("cx", d=>D3projection([d.lng,d.lat])[0])
    .attr("cy", d=>D3projection([d.lng,d.lat])[1])
    .attr("r", 5)
    .style('fill', "red")

  //Draw the text at the appropriate circles
    parentVar.append("text")
    .attr("x", d=>D3projection([d.lng,d.lat])[0])
    .attr("y", d=>D3projection([d.lng,d.lat])[1])
    .attr("fill","purple")
    .style("font-size","25px")
    .text(function(d)
    {
      return d.Town;
    });   
}

//The function that loads the data for the circles
function loadData()
{
  
  //Load the data for the circles. If there is an error then say so, if not send the data to the draw function.
  d3.json("http://34.38.72.236/Circles/Towns/50",function(error,data)
  {
    if (error){
      console.log(error)
   }else{
      draw(data);
      }

  });

}


//This function loads the north ireland map
function loadIrelandMapData()
{
  d3.json("NIrelandMap.json",function(error,data)
  {
    if (error){
      console.log(error)
   }else{
      drawIrelandMap(data);
      }

  });
}

//Load the data for the map
function loadMapData()
{
  d3.json("lad.json",function(error,data)
  {
    if (error){
      console.log(error)
   }else{
      drawMap(data);
      }

  });
 

}


//Function to update the circles when the button is clicked
function updateCircleData()
{
  removeCircles();
  removeText();
  loadData();
}

//Function to remove the circles currently on the map
function removeCircles()
{
  var svg = d3.select("svg")
  .attr('height', height)
  .attr('width', width)
  .selectAll("circle").remove();
}
//Function to remove the text currently on the map
function removeText()
{
  var svg = d3.select("svg")
  .attr('height', height)
  .attr('width', width)
  .selectAll("text").remove();
}

//When the window is opened load the map.
window.onload = loadMapData;




