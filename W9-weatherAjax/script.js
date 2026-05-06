function getWeather() {
    const cityInput = document.getElementById('cityInput').value.toUpperCase().trim();
    const resultDiv = document.getElementById('result');
    const errorMsg = document.getElementById('errorMsg');

    const weatherData = {
        "PUNE": { "temp": 28, "hum": 60, "cond": "Clear Sky" },
        "MUMBAI": { "temp": 32, "hum": 80, "cond": "Humid" },
        "DELHI": { "temp": 35, "hum": 40, "cond": "Sunny" }
    };

    const jsonString = JSON.stringify(weatherData);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(jsonString);

    const xhr = new XMLHttpRequest();

    xhr.open('GET', dataUri, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response[cityInput]) {
                const city = response[cityInput];

                document.getElementById('resCity').innerText = cityInput;
                document.getElementById('resTemp').innerText = city.temp;
                document.getElementById('resHum').innerText = city.hum;
                document.getElementById('resCond').innerText = city.cond;

                resultDiv.style.display = "block";
                errorMsg.style.display = "none";
            } else {
                resultDiv.style.display = "none";
                errorMsg.style.display = "block";
            }
        }
    };

    xhr.send();
}