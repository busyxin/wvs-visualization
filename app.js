var blue_to_brown = d3.scale.linear()
  .domain([9, 50])
  .range(["steelblue", "brown"])
  .interpolate(d3.interpolateLab);

var color = function(d) { return blue_to_brown(d['economy (mpg)']); };

var parcoords = d3.parcoords()("#example")
  .color(color)
  .alpha(0.4);

// load csv file and create the chart
d3.csv('wavetest.csv', function(data) {
  parcoords
    .data(data)
    .hideAxis(["country"])
    .render()
    .brushMode("1D-axes");  // enable brushing

  // create data table, row hover highlighting
  var grid = d3.divgrid();
  d3.select("#grid")
    .datum(data.slice(0,10))
    .call(grid)
    .selectAll(".row")
    .on({
      "mouseover": function(d) { parcoords.highlight([d]) },
      "mouseout": parcoords.unhighlight
    });

  // update data table on brush event
  parcoords.on("brush", function(d) {
    d3.select("#grid")
      .datum(d.slice(0,10))
      .call(grid)
      .selectAll(".row")
      .on({
        "mouseover": function(d) { parcoords.highlight([d]) },
        "mouseout": parcoords.unhighlight
      });
  });
});