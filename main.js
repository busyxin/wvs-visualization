var blue_to_brown = d3.scale.linear()
.domain([5, 6, 7, 8])
.range(["blue", "green", "orange", "red"])
.interpolate(d3.interpolateLab);

var color = function(d) { return blue_to_brown(d['Life Satisfaction']); };

var render = function(csvFile, target, gridTarget, mapTarget) {

  var parcoords = d3.parcoords()(target)
    .color(color)
    .alpha(0.4);

  d3.csv(csvFile, function(data) {
    parcoords
      .data(data)
      .hideAxis(["Country"])
      .render()
      .reorderable()
      .brushMode("1D-axes");

    var grid = d3.divgrid();

    var clicked = false;

    d3.select(gridTarget)
      .datum(data)
      .call(grid)
      .selectAll(".row")
      .on({
        "click": function(d) { 
          console.log(d)
          if (!clicked) {
            parcoords.highlight([d]);
            clicked = true;
          } else {
            parcoords.unhighlight([d]);
            clicked = false;
          }
        },
        "mouseover": function(d) { parcoords.highlight([d]) },
        "mouseout": parcoords.unhighlight,
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

    var mapData = {}

    for (var key in data) {
      var countryCode = countries[data[key]['Country']];
      mapData[countryCode] = data[key];
      mapData[countryCode].fillKey = 'LOW' 
    }

    var map = new Datamap({
      element: document.getElementById(mapTarget),
      fills: {
          HIGH: '#afafaf',
          LOW: '#123456',
          MEDIUM: 'blue',
          UNKNOWN: 'rgb(0,0,0)',
          defaultFill: '#EDEDED'
      },
      data: mapData,
      geographyConfig: {
          popupTemplate: function(geo, data) {
            if (!data) return
            return `<div class="hoverinfo">
                      <strong>${geo.properties.name}</strong>
                      <ul>
                        <li>Children: ${data['Children']}</li>
                        <li>Education: ${data['Education']}</li>
                        <li>Family: ${data['Family']}</li>
                        <li>Life Satisfaction: ${data['Life Satisfaction']}</li>
                        <li>Nationalism: ${data['Nationalism']}</li>
                        <li>Politics: ${data['Politics']}</li>
                        <li>Religion: ${data['Religion']}</li>
                        <li>Work: ${data['Work']}</li>
                      </ul>
                    </div>`;
          }
      }
  });

  $('#' + mapTarget).on('mouseenter mouseleave','.datamaps-subunit', function() {
    var countryCode = $(this).attr('class').slice(17,20);
    if (!mapData[countryCode]) return

    var data = mapData[countryCode];
    $(this).closest('.wave-block').find('.grid .row .cell:contains(' + data.Country + ')').click().parent().toggleClass('indigo');
  });
});
}

render('wave2.csv', '#parcoord2', '#grid2', 'map2');
render('wave3.csv', '#parcoord3', '#grid3', 'map3');
render('wave4.csv', '#parcoord4', '#grid4', 'map4');
render('wave5.csv', '#parcoord5', '#grid5', 'map5');
render('wave6.csv', '#parcoord6', '#grid6', 'map6');

var currentWave = 2;

$('.change-wave').on('click', function() {
  var nextWave = $(this).attr('data-wave');
  var $nextEl = $('#wave' + nextWave);
  var $nextBlock = $('#wave' + nextWave + '-block');

  $('.wave:visible').fadeOut(300, function() {    
    $nextEl.delay(300).fadeIn(300);
  });

  $('.wave-block:visible').fadeOut(300, function() {    
    $nextBlock.delay(300).fadeIn(300);
  });
  currentWave = nextWave;
})

window.sr = ScrollReveal();
sr.reveal('#wave2-block .panel', { duration: 2000 }, 350);

setTimeout(function() {
  $(".wave-block:not(#wave2-block)").hide();  
}, 300)