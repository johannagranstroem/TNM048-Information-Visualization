/**
 *
    Author: Emilie Ho, Johanna Granström, Ronja Faltin
    Date: Feb 25, 2019
    TNM048 Project - Visual Information of pub-g map and deaths in relative to time 
    Main js file
 *
*/
//Passing data to the function
var world_map, points


d3.csv("./data/REALLY_BIG_DATASET2.csv", function (data) {

    // Handle data 
    dataSmall  = new handleData(data);

    //Working with the map
    gMap = new gameMap(dataSmall);
});