// Add this in weather-time.js to handle location changes
document.querySelectorAll('input[name="city"]').forEach(radio => {
radio.addEventListener("change", updateCityInfo);
});

function updateCityInfo() {
    // The id of the radio button is the city name
    const selectedCity = document.querySelector('input[name="city"]:checked').id;

    // TODO: Call the function to update the map image and address based on the selected city
    updateMap(selectedCity);

    // TODO: Call the function to update business hours for the selected city
    updateHours(selectedCity);

    // TODO: Fetch and display weather and time information for the selected city
    fetchWeatherAndTime(selectedCity);
}

function updateMap(city) {
    const mapImages = {
        Hermiston: "images/map-city1.jpg",
        Richland: "images/map-city2.jpg",
        Eugene: "images/map-city3.jpg"
    };

    const mapLinks = {
        Hermiston: "https://www.google.com/maps/d/u/0/edit?mid=1klpLBO_-Ng9AeMC1Q1AOxE70Ry-Gp_U&usp=sharing",
        Richland: "https://www.google.com/maps/d/u/0/edit?mid=1NH9fJ-8xdwLGMycAq4Cq7CvaCz3xplE&usp=sharing",
        Eugene: "https://www.google.com/maps/d/u/0/edit?mid=1zKc023gvbEQYTQiGjYF12jcE3S-ZhmA&usp=sharing"
        // TODO: Add additional cities using the same format as city1
    };

    const addresses = {
        Hermiston: "405 N 1st St unit 105, Hermiston, OR 97838",
        Richland: "1026 Lee Blvd, Richland, WA 99352",
        Eugene: "398 E 11th Ave, Eugene, OR 97401"
    };

    // TODO: Update the map image source, alt text, map link, and address label
    document.getElementById("map-image").src = mapImages[city];
    document.getElementById("map-image").alt = `Map of ${city}`;
    document.getElementById("map-link").href = mapLinks[city];
    document.getElementById("map-address").innerText = addresses[city];
}

function updateHours(city) {
    const weekdayHours = {
        Hermiston: "Monday - Friday: 10 AM - 8 PM",
        Richland: "Monday - Friday: 9 AM - 9 PM",
        Eugene: "Monday - Friday: 9 AM - 6 PM"
    }

    const weekendHours = {
        Hermiston: "Saturday - Sunday:  10 AM - 10 PM",
        Richland: "Saturday - Sunday: 9 AM - 11 PM",
        Eugene: "Saturday - Sunday:  9 AM - 9 PM"
    }

    document.getElementById("weekday-hours").innerText = weekdayHours[city];
    document.getElementById("weekend-hours").innerText = weekendHours[city];
}

function fetchWeatherAndTime(city) {
  console.log("Fetching weather and time for:", city);
  // Placeholder: can update weather DOM elements here
}
