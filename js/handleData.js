/**
 *
    Author: Emilie Ho, Johanna Granström, Ronja Faltin
    Date: Feb 25, 2019
    TNM048 Project - Visual Information of pub-g map and deaths in relative to time 
    js file to handle and make data smaller 
 *
*/

function handleData(data) {

	var playerData = [];
	var normData = [];

	var dataTime = [];
	var dataPosx = [];
	var dataPosy = [];

	var normPosx = [];
	var normPosy = [];

	//Create a function to normalize position coordinates from range 0,800000 cm to 0,1
	var myScale = d3.scaleLinear().domain([0, 800000]).range([0,1]);

    for (var i = 0; i < data.length; i++) {
        playerData.push({ time: data[i].time, victim_position_x: data[i].victim_position_x, victim_position_y: data[i].victim_position_y, killed_by: data[i].killed_by, match_id: data[i].match_id, victim_placement: data[i].victim_placement});
		
		// Convert from string to integers with the base of 10
		dataTime.push(parseInt(data[i].time, 10));
		dataPosx.push(parseInt(data[i].victim_position_x, 10));
		dataPosy.push(parseInt(data[i].victim_position_y, 10));

		// Normalize x and y pos
		normPosx.push(myScale(dataPosx[i]));
		normPosy.push(myScale(dataPosy[i]));

		normData.push({time: dataTime[i], victim_position_x: normPosx[i], victim_position_y: normPosy[i], killed_by: data[i].killed_by, match_id: data[i].match_id, victim_placement: data[i].victim_placement });
	}
	return normData;
};