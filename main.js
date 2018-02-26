var render = function(csvFile, target, gridTarget) {

  var blue_to_brown = d3.scale.linear()
  .domain([5, 6, 7, 8])
  .range(["blue", "green", "orange", "red"])
  .interpolate(d3.interpolateLab);

  var color = function(d) { return blue_to_brown(d['Life Satisfaction']); };

  var parcoords = d3.parcoords()(target)
    .color(color)
    .alpha(0.4);

  d3.csv(csvFile, function(data) {
    parcoords
      .data(data)
      .hideAxis(["Country"])
      .render()
      .brushMode("1D-axes");

    var grid = d3.divgrid();
    d3.select(gridTarget)
      .datum(data)
      .call(grid)
      .selectAll(".row")
      .on({
        "mouseover": function(d) { parcoords.highlight([d]) },
        "mouseout": parcoords.unhighlight
      });

    // update data table on brush event
    parcoords.on("brush", function(d) {
      d3.select(gridTarget)
        .datum(d)
        .call(grid)
        .selectAll(".row")
        .on({
          "mouseover": function(d) { parcoords.highlight([d]) },
          "mouseout": parcoords.unhighlight
        });
    });
  });
}

render('wave2.csv', '#parcoord2', '#grid2');
render('wave3.csv', '#parcoord3', '#grid3');
render('wave4.csv', '#parcoord4', '#grid4');
render('wave5.csv', '#parcoord5', '#grid5');
render('wave6.csv', '#parcoord6', '#grid6');

$('#wave2').on('click', function() {
  $('.pure-menu-link').removeClass('pure-menu-link--selected');
  $(this).addClass('pure-menu-link--selected');
});

$('#wave3').on('click', function() {
  $('.pure-menu-link').removeClass('pure-menu-link--selected');
  $(this).addClass('pure-menu-link--selected');
});

$('#wave4').on('click', function() {
  $('.pure-menu-link').removeClass('pure-menu-link--selected');
  $(this).addClass('pure-menu-link--selected');
});

$('#wave5').on('click', function() {
  $('.pure-menu-link').removeClass('pure-menu-link--selected');
  $(this).addClass('pure-menu-link--selected');
});

$('#wave6').on('click', function() {
  $('.pure-menu-link').removeClass('pure-menu-link--selected');
  $(this).addClass('pure-menu-link--selected');
});
