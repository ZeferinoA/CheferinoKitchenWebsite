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

const weatherApiUrls = {
    Hermiston: "https://api.open-meteo.com/v1/forecast?latitude=45.8404&longitude=-119.2895&current=temperature_2m,weather_code&timezone=auto&temperature_unit=fahrenheit",
    Richland: "https://api.open-meteo.com/v1/forecast?latitude=46.2857&longitude=-119.2845&current=temperature_2m,weather_code&timezone=auto&temperature_unit=fahrenheit",
    Eugene:  "https://api.open-meteo.com/v1/forecast?latitude=44.0521&longitude=-123.0867&current=temperature_2m,weather_code&timezone=auto&temperature_unit=fahrenheit"
};
// Fetch and Display Weather and Time
function fetchWeatherAndTime(city) {
    const apiUrl = weatherApiUrls[city];
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const current = data.current;
            const temp = Math.round(current.temperature_2m);
            const weatherCode = data.weather_code;
            const timeZone = data.timezone;

            const localTime = new Date().toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', hour12: true, timeZone: timeZone
            });

            document.getElementById("time-display").textContent = "Local time is " + localTime
            const openclose = isBistroOpen(city, timeZone);

            document.getElementById("temperature").innerText = temp
            showImage("weather-icon", weatherCode, localTime);
            updatePatioStatus(temp, weatherCode, openclose);
        });
}

// Determine Patio Status
function updatePatioStatus(temp, weatherCode, openclose) {
    const patioElement = document.getElementById("patio-status");
    if (55 > temp || temp > 95 || weatherCode >= 55 || !openclose) {
        patioElement.textContent = "Patio is CLOSED!";
        patioElement.style.color = "red";
    } else {
        patioElement.textContent = "Patio is OPEN!";
        patioElement.style.color = "green";
    }
}

// Determine Day/Night Icon
function showImage(elementId, weatherCode, localTimeStr) {
    const [time, ampm] = localTimeStr.split(' ');
    const [hourStr] = time.split(':');
    let hour = parseInt(hourStr);  
    // Convert to 24 hours time

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    const isDayTime = hour >= 6 && hour < 18;

    let weatherType = "Clear"; // default
    if (weatherCode >= 45 && weatherCode <= 48) weatherType = "Fog";
    else if (weatherCode >= 51 && weatherCode <= 67) weatherType = "Rain";
    else if (weatherCode >= 71 && weatherCode <= 77) weatherType = "Snow";
    else if (weatherCode >= 95) weatherType = "Storm";

    const weatherImages = {
        Clear: isDayTime ? "clear-day.svg" : "clear-night.svg",
        Rain: isDayTime ? "rain-day.svg" : "rain-night.svg",
        Snow: isDayTime ? "snow-day.svg" : "snow-night.svg",
        Fog: isDayTime ? "fog-day.svg" : "fog-night.svg",
        Storm: isDayTime ? "storm-day.svg" : "storm-night.svg"
    };

    const img = document.getElementById(elementId);
    img.src = `images/weather/${weatherImages[weatherType]}`;
    img.alt = `${weatherType} (${isDayTime ? "Day" : "Night"})`;
}

const bistroHours = {
    Hermiston: {
        weekday: { open: "10:00", close: "20:00" },
        weekend: { open: "10:00", close: "22:00" }
    },
    Richland: {
        weekday: { open: "09:00", close: "21:00" },
        weekend: { open: "09:00", close: "23:00" }
    },
    Eugene: {
        weekday: { open: "09:00", close: "18:00" },
        weekend: { open: "09:00", close: "21:00" }
    }
};

function isBistroOpen(city, timeZone) {
    const now = new Date().toLocaleString("en-US", { timeZone });
    const localTime = new Date(now);
    const day = localTime.getDay(); // 0 = Sunday, 6 = Saturday
    const currentMinutes = localTime.getHours() * 60 + localTime.getMinutes();

    const isWeekend = day === 0 || day === 6;
    const hours = isWeekend ? bistroHours[city].weekend : bistroHours[city].weekday;

    const statusElement = document.getElementById("bistro-status");

    if (!hours) {
        statusElement.textContent = "Bistro is CLOSED (Today)";
        statusElement.style.color = "red";
        return false;
    }

    const [openH, openM] = hours.open.split(":").map(Number);
    const [closeH, closeM] = hours.close.split(":").map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    statusElement.textContent = isOpen ? "Bistro is OPEN!" : "Bistro is CLOSED!";
    statusElement.style.color = isOpen ? "green" : "red";

    return isOpen;
}
