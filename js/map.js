/**
 *
    Author: Emilie Ho, Johanna Granström, Ronja Faltin
    Date: March 12, 2019
    TNM048 Project - Visual Information of pub-g map and deaths in relative to time 
    js file to handle the map
 *
*/

function gameMap(dataSmall) {
    var leafletMap = L.map('mapid', {minZoom: 10, maxZoom: 15}, {crs: L.CRS.Simple}); // Add increase we want to change map size

    var imageBounds = [[0,0],[1,1]];
    var image = L.imageOverlay('./maps/miramar.jpg', imageBounds).addTo(leafletMap); //Add jpg map as leafletmap

    var svgMap = d3.select(leafletMap.getPanes().overlayPane).append("svg");
    var g = svgMap.append("g").attr("class", "leaflet-zoom-hide");

    leafletMap.fitBounds(imageBounds); //Set map range
    leafletMap.setMaxBounds(imageBounds); //Fixed panning view

    //Create extended LayerGroup for all markers
    var greenMarkers = L.featureGroup().addTo(leafletMap).on("click", onClick);
    var redMarkers = L.featureGroup().addTo(leafletMap).on("click", onClick);
    var blueMarkers = L.featureGroup().addTo(leafletMap).on("click", onClick);
    var yellowMarkers = L.featureGroup().addTo(leafletMap).on("click", onClick);

    var timeInfo;
    var maxTime = 0;
	
// Check max time for all data
/*     for(var j = 0; j < dataSmall.length; j++ ){

        if(maxTime < dataSmall[j].time){
            maxTime = dataSmall[j].time;
        }
    }
 */
 
    var slider = document.getElementById('slider'); 

    noUiSlider.create(slider, {
        start: [0, 300],
        tooltips: [true, true],
        connect: true,
        range: {
            'min': 0,
            'max': 300
        }
    });

    // Handle values	
    document.getElementById('slider-value').addEventListener('click', function () {
        alert(slider.noUiSlider.get());
    });

    slider.noUiSlider.on('update', function (values, handle) {

        blueMarkers.clearLayers();
        yellowMarkers.clearLayers();
        greenMarkers.clearLayers();
        redMarkers.clearLayers();
    
    // Get the container element
    var btnContainer = document.getElementById("butttons");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("btn");
					
        for(var i =0; i < 1999; i++)
        {           
            //Informaiton from dataset about the selected marker
            timeInfo = dataSmall[i].time;
            posX = dataSmall[i].victim_position_x;
            posY = dataSmall[i].victim_position_y;
            killedBy = dataSmall[i].killed_by;
            victimPlacement = dataSmall[i].victim_placement;
           
            var points = L.latLng([ dataSmall[i].victim_position_y, dataSmall[i].victim_position_x]); 

            if( dataSmall[i].time >= values[0] && dataSmall[i].time <= values[1]){

                if(dataSmall[i].match_id == dataSmall[1500].match_id)
                {
                    var game1Green =  L.circle(points,{ color: 'green', fillColor: '#0e9100', fillOpacity: 0.2, radius: 1200, weight: 1 }).addTo(greenMarkers);
                    game1Green.timeInfo = timeInfo;
                    game1Green.killedBy = killedBy;
                    game1Green.victimPlacement = victimPlacement;
                    var toggle = false;

                    btns[0].addEventListener("click", function(){

						if(toggle) 
						{
							leafletMap.addLayer(greenMarkers);
						}
						else
						{
							leafletMap.removeLayer(greenMarkers);
						}
						toggle = !toggle;
					});
                }

                if(dataSmall[i].match_id == dataSmall[600].match_id)
                {
                    var game2Red =  L.circle(points,{ color: 'red', fillColor: '#ff0000', fillOpacity: 0.2, radius: 1200, weight: 1 }).addTo(redMarkers);
                    game2Red.timeInfo = timeInfo;
                    game2Red.killedBy = killedBy;
                    game2Red.victimPlacement = victimPlacement;
                    var toggle = false;

                    btns[1].addEventListener("click", function(){
						
						if(toggle) 
						{
							leafletMap.addLayer(redMarkers);
						}
						else
						{
							leafletMap.removeLayer(redMarkers);
						}
						toggle = !toggle;
					});
                }

                if(dataSmall[i].match_id == dataSmall[400].match_id)
                {
                    var game3Blue =  L.circle(points,{ color: 'blue', fillColor: '#2d70ff', fillOpacity: 0.2, radius: 1200, weight: 1 }).addTo(blueMarkers);
                    
                    game3Blue.timeInfo = timeInfo;
                    game3Blue.killedBy = killedBy;
                    game3Blue.victimPlacement = victimPlacement;
                    var toggle = false;

                btns[2].addEventListener("click", function(){
					
						if(toggle) 
						{
							leafletMap.addLayer(blueMarkers);
						}
						else
						{
							leafletMap.removeLayer(blueMarkers);
						}
						toggle = !toggle;
					});
                }

                if(dataSmall[i].match_id == dataSmall[800].match_id)
                {
                    var game4Yellow =  L.circle(points,{ color: 'yellow', fillColor: '#ffee00', fillOpacity: 0.2, radius: 1200, weight: 1 }).addTo(yellowMarkers);

                    game4Yellow.timeInfo = timeInfo;
                    game4Yellow.killedBy = killedBy;
                    game4Yellow.victimPlacement = victimPlacement;
                    var toggle = false;

                    btns[3].addEventListener("click", function(){
					
						if(toggle) 
						{
							leafletMap.addLayer(yellowMarkers);
						}
						else
						{
							leafletMap.removeLayer(yellowMarkers);
						}
						toggle = !toggle;
					});
                }
            }
		}
	});
	
    function onClick(event) {
        //Defining  tooltip for clicked marker
        var tooltip = d3.select("#tooltip");

        var clickedMarkerTime = event.layer.timeInfo;
        var clickedMarkerKilledBy = event.layer.killedBy;
        var clickedMarkerVictimPlacement = event.layer.victimPlacement;

        tooltip.select("#timeDeath").text("Survived for: " + clickedMarkerTime + " seconds");
        tooltip.select("#killed_by").text("Killed by: " + clickedMarkerKilledBy);
        tooltip.select("#victim_placement").text("Placement: " + clickedMarkerVictimPlacement);
    } 

};

