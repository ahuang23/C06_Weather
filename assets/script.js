var searchBtn = $(".searchBtn");
var apiKey = "c646add209f126468ceedc408033b791";
var searchInput = $(".citiesInput")


//Local Storage Key
var storeKey = 0;

// Start function for Search Button
searchBtn.click(function() {
    var searchInput = $(".citiesInput").val();
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey + "&units=imperial";
 
    if (!searchInput) {
        return;

// Calls API using City as parameter and stores input value        
    }else {fetch (currentUrl)
        .then (function (response){
            return response.json();
        }).then(function (data) {
            console.log(data)

        localStorage.setItem(storeKey, data.name);
        var cityName = $(".list-group");
        cityName.append("<li>" + data.name + "</li>");
        storeKey++;
       

// Adds City and Date to the Card Body
    var currentData = $(".currentData").append("<div>").addClass("card-body");
    currentData.empty();
    var currentName = currentData.addClass("<p>");
    var timeUTC = new Date(data.dt * 1000);
    currentName.append(data.name + " "+  timeUTC.toLocaleDateString("en-US"));
   
    var lat = data.coord.lat;
    var lon = data.coord.lon;

// Calls OneCall API using LAT and LON from previous API call
    var oneCall = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";   

    fetch (oneCall)
    .then (function (response) {
        return response.json();
    }).then(function (data){
        console.log(data);

// Populates weather data for Current category         
        var currentTemp = data.current.temp;
        var humidity = data.current.humidity;
        var windSpeed = data.current.wind_speed;
        var uvIndex = data.current.uvi;
    
        currentName.append("<br>" + `<img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">` + "<br>" + "Tempurature: " + currentTemp + "<br>" + "Humidity: " + humidity + "<br>" + "Wind Speed: " + windSpeed + "<br>" + "UV Index: " + "<span class='highlight'>" + uvIndex + "</span"); 


// Sets color based on UV Index value 
var highlight = $('.highlight');       
        if (uvIndex < 3) {
            highlight.css("background-color", "green");
        } else if (uvIndex < 6) {
            highlight.css("background-color", "yellow");
        } else if (uvIndex > 6) {
            highlight.css("background-color", "red");
        }

// Return 5 day forecast       
        var day = [1, 2, 3, 4, 5]
        var fiveDay = $(".fiveDay");
        var fiveDayCard = $(".fiveDay").addClass("fiveDayCard");
        fiveDayCard.empty();

        day.forEach(function(i){
            var fiveDayUTC = new Date(data.daily[i].dt * 1000);
            fiveDayUTC = fiveDayUTC.toLocaleDateString("en-US");

            fiveDayCard.append("<p>" + fiveDayUTC + "<br>" + `<img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">` + "<br>" + "Temperature: " + data.daily[i].temp.day + "<br>" + "Humidity: " + data.daily[i].humidity + "<br>" + "Wind Speed: " + data.daily[i].wind_speed);
         })
         

    })

})

}})

// Retrieves from localstorage and adds to the cities list
for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".list-group");
    cityName.append("<li>" + city + "</li>");
}

    cityName.click(function(e){
    var element = e.target;
    if (element.matches("li")) {
    console.log(element);
    var returned = element.innerHTML;
    searchInput.text(returned);
    }
})