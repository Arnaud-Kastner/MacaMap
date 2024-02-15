var map;
var weatherInfoWindow;
var autocompleteService;
var suggestionList;
var marker;
var initMap;

function initMap() {
    console.log("initMap function appeler.");

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20, lng: 0 },
        zoom: 2
    });

    autocompleteService = new google.maps.places.AutocompleteService();
    suggestionList = document.getElementById('suggestion-list');

    map.addListener('click', function(event) {
        console.log("Click event on map detected.");

        clearMarker(); // Effacer le marqueur précédent
        placeMarkerAndZoom(event.latLng); // Placer un marqueur sur le point cliqué et zoomer sur cette zone
        getWeather(event.latLng.lat(), event.latLng.lng()); // Obtenir les prévisions météorologiques pour les coordonnées du point cliqué
    });
    console.log("Carte initialisée avec succès.");

    var capitals = [
        { name: "Paris", lat: 48.8566, lng: 2.3522 },
        { name: "London", lat: 51.5074, lng: -0.1278 },
        { name: "New York", lat: 40.7128, lng: -74.0060 },
        { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
        { name: "Berlin", lat: 52.5200, lng: 13.4050 },
        { name: "Moscow", lat: 55.7558, lng: 37.6173 },
        { name: "Beijing", lat: 39.9042, lng: 116.4074 },
        { name: "Cairo", lat: 30.0444, lng: 31.2357 },
        { name: "Brasília", lat: -15.8267, lng: -47.9218 },
        { name: "Rome", lat: 41.9028, lng: 12.4964 },
        { name: "Delhi", lat: 28.7041, lng: 77.1025 },
        { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
        { name: "Ottawa", lat: 45.4215, lng: -75.6972 },
        { name: "Canberra", lat: -35.2809, lng: 149.1300 },
        { name: "Madrid", lat: 40.4168, lng: -3.7038 },
        { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
        { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
        { name: "Ankara", lat: 39.9334, lng: 32.8597 },
        { name: "Lagos", lat: 6.5244, lng: 3.3792 },
        { name: "Sydney", lat: -33.8688, lng: 151.2093 },
        { name: "Brussels", lat: 50.8503, lng: 4.3517 },
        { name: "Dublin", lat: 53.3498, lng: -6.2603 },
        { name: "Athens", lat: 37.9838, lng: 23.7275 },
        { name: "Oslo", lat: 59.9139, lng: 10.7522 },
        { name: "Vienna", lat: 48.2082, lng: 16.3738 },
        { name: "Warsaw", lat: 52.2297, lng: 21.0122 },
        { name: "Helsinki", lat: 60.1695, lng: 24.9354 },
        { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
        { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
        { name: "Kuala Lumpur", lat: 3.1390, lng: 101.6869 },
        { name: "Santiago", lat: -33.4489, lng: -70.6693 }
    ];
    
    capitals.forEach(function(capital) {
        var marker = new google.maps.Marker({
            position: { lat: capital.lat, lng: capital.lng },
            map: map,
            title: capital.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#3498db',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
                scale: 8,
                labelOrigin: new google.maps.Point(0, -15)
            }
        });
    
        // Création de l'infobulle pour chaque capitale
        var infowindow = new google.maps.InfoWindow({
            content: '<div><strong>' + capital.name + '</strong></div><div>Température: ' + capital.temperature + ' °C</div>'
        
        });
    
        marker.addListener('click', function() {
            infowindow.open(map, marker);
            getWeather(capital.lat, capital.lng);
            map.setCenter(marker.getPosition()); // Centrer la carte sur la ville sélectionnée
            map.setZoom(10); // Ajuster le zoom de la carte
        });
    
        // Obtention des prévisions météorologiques pour chaque capitale
        getWeather(capital.lat, capital.lng);
    });
    

    // Sélectionner tous les boutons de recherche
    var searchButtons = document.querySelectorAll('.search-button');

    // Ajouter des écouteurs d'événements pour chaque bouton
    searchButtons.forEach(function(button) {
        // Animation lorsque le curseur survole le bouton
        button.addEventListener('mouseover', function() {
            button.style.backgroundColor = '#45a049';
        });

        // Animation lorsque le curseur quitte le bouton
        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = '#e74c3c';
        });

        // Animation lorsque le bouton est cliqué
        button.addEventListener('click', function() {
            button.style.backgroundColor = '#4CAF50';
            setTimeout(function() {
                button.style.backgroundColor = '#45a049';
            }, 200); // Animation pendant 200 millisecondes
        });
    });
}



function getSuggestions() {
    var input = document.getElementById('search-bar').value;
    if (input.trim() === '') {
        suggestionList.style.display = 'none';
        return;
    }

    autocompleteService.getPlacePredictions({ input: input }, function(predictions, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var suggestionsHTML = '';
            predictions.forEach(function(prediction) {
                suggestionsHTML += '<div class="suggestion-item" onclick="selectCity(\'' + prediction.description + '\')">' + prediction.description + '</div>';
            });
            suggestionList.innerHTML = suggestionsHTML;
            suggestionList.style.display = 'block';
        } else {
            suggestionList.style.display = 'none';
        }
    });
}

function selectCity(cityName) {
    console.log("Sélection de la ville :", cityName);
    document.getElementById('search-bar').value = cityName;
    suggestionList.style.display = 'none';
    clearMarker();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': cityName }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var position = results[0].geometry.location;
            placeMarkerAndZoom(position);
            getWeather(position.lat(), position.lng()); // Obtenir les prévisions météorologiques
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function clearMarker() {
    if (marker) {
        marker.setMap(null);
    }
}

function placeMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function placeMarkerAndZoom(location) {
    placeMarker(location);
    map.setCenter(location);
    map.setZoom(10);
}

 function getWeather(latitude, longitude, capital
) {
            var apiKey = 'ba95b1352e9467f155a0636c0fd4208c';
            var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&lang=fr';

            fetch(apiUrl)
            
                .then(response => response.json())
                .then(data => {
                    console.log('Réponse de l\'API OpenWeatherMap:', data);
                    
                    var cityName = data.city.name;
                    var forecasts = data.list;
                    
                     showWeatherForecasts(cityName, forecasts);
                })
                
                .catch(error => console.error('Erreur lors de la récupération des données météorologiques:', error));
        }
        


function showWeatherForecasts(cityName, forecasts) {
    var forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    var cityHeader = document.createElement('h2');
    cityHeader.textContent = 'Prévisions pour ' + cityName;
    forecastContainer.appendChild(cityHeader);

    forecasts.forEach(forecast => {
        var temperatureCelsius = forecast.main.temp - 273.15;
        var forecastDate = new Date(forecast.dt * 1000);
        var formattedDate = forecastDate.toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });

        var forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-item');
        forecastElement.innerHTML = `
            <p>${formattedDate}</p>
            <p>Météo: ${forecast.weather[0].description}</p>
            <p>Température: ${temperatureCelsius.toFixed(2)} °C</p>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather Icon" class="weather-icon">
        `;
        forecastContainer.appendChild(forecastElement);
    });

}



function createTemperatureGrid(map, forecasts) {
    var gridSize = 10;
    var gridWidth = 360 / gridSize;
    var gridHeight = 180 / gridSize;

    var temperatureGrid = [];
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var sumTemperature = 0;
            var count = 0;
            var minTemperature = Number.MAX_VALUE;
            var maxTemperature = Number.MIN_VALUE;
            for (var k = 0; k < forecasts.length; k++) {
                var forecast = forecasts[k];
                if (forecast.coord) {
                    var lat = forecast.coord.lat;
                    var lon = forecast.coord.lon;
                    if (lat >= -90 + gridHeight * i && lat < -90 + gridHeight * (i + 1) &&
                        lon >= -180 + gridWidth * j && lon < -180 + gridWidth * (j + 1)) {
                        sumTemperature += forecast.main.temp;
                        count++;
                        minTemperature = Math.min(minTemperature, forecast.main.temp);
                        maxTemperature = Math.max(maxTemperature, forecast.main.temp);
                    }
                }
            }
            var averageTemperature = sumTemperature / count;
            temperatureGrid.push({
                lat: -90 + gridHeight * i + gridHeight / 2,
                lng: -180 + gridWidth * j + gridWidth / 2,
                temperature: averageTemperature,
                minTemperature: minTemperature,
                maxTemperature: maxTemperature
            });
        }
    }

    temperatureGrid.forEach(function(grid) {
        var color = getColorForTemperature(grid.temperature);
        var rectangle = new google.maps.Rectangle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0,
            map: map,
            bounds: {
                north: grid.lat + gridHeight / 2,
                south: grid.lat - gridHeight / 2,
                east: grid.lng + gridWidth / 2,
                west: grid.lng - gridWidth / 2
            }
        });
    });
}


// Supprimez la fonction temperatureGrid à l'intérieur de createTemperatureGrid

// Correction de la balise de fermeture de la fonction createTemperatureGrid


function getColorForTemperature(temperature) {
    // Définir les plages de température et leurs couleurs correspondantes
    if (temperature < 10) {
        return 'blue'; // Températures basses
    } else if (temperature < 20) {
        return 'green'; // Températures moyennes
    } else {
        return 'red'; // Températures élevées
    }
}

// Ajout d'un écouteur d'événements input pour la barre de recherche
document.getElementById('search-bar').addEventListener('input', getSuggestions);

// Fonction pour rechercher une ville lorsque le bouton est cliqué
function searchCity() {
    var cityName = document.getElementById('search-bar').value;
    if (cityName.trim() !== '') {
        selectCity(cityName);
    }
}
