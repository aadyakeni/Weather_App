let weather ={

    "apiKey": "ff6104d4c2a6c5fb7a855ec77312599e",

    fetchWeather: function (city) {

        //fetches api data for a given city
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&APPID=" 
        + this.apiKey
        )
        .then((response)=> response.json()) //converts response data to JSON format
        .then((data) => this.displayWeather(data)); //passes the data to the function
    },

    displayWeather: function(data){

        //extracts informmation from the data
        const{ name } = data;
        const{ icon, description } = data.weather[0];
        const{ temp, humidity } = data.main;
        const{ speed }= data.wind;

        //changes as per data recieved
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

        //removes loading from class "weather loading"
        document.querySelector(".weather").classList.remove("loading");

        //sets background to the image of the city entered
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search: function(){

        //passes the input inside searchbar to the function for weather
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

//search when search button is pressed
document.querySelector(".search button")
.addEventListener(("click"), function(){
    weather.search();
});

//search when enter is pressed
document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
});

