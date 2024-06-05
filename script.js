document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00060.warnings_wa.xml')
        .then(response => response.json())
        .then(data => {
            const feedContent = document.getElementById('feedContent');
            if (data && data.items) {
                data.items.forEach(item => {
                    // Check if the item contains weather information
                    if (item.title.includes('Marine Wind Warning Summary')) {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('item');

                        const title = document.createElement('div');
                        title.classList.add('item-title');
                        title.textContent = item.title;
                        itemDiv.appendChild(title);

                        // Extract temperature and wind speed from description
                        const description = document.createElement('div');
                        description.classList.add('item-description');
                        const weatherInfo = extractWeatherInfo(item.description);
                        description.innerHTML = `Temperature: ${weatherInfo.temperature} | Wind Speed: ${weatherInfo.windSpeed}`;
                        itemDiv.appendChild(description);

                        feedContent.appendChild(itemDiv);
                    }
                });
            } else {
                feedContent.innerHTML = 'Error loading feed.';
            }
        })
        .catch(error => {
            console.error('Error fetching RSS feed:', error);
            document.getElementById('feedContent').innerHTML = 'Error loading feed.';
        });
});

// Function to extract temperature and wind speed from the description
function extractWeatherInfo(description) {
    const tempRegex = /Temperature:\s+(\d+)\s+°C/;
    const windRegex = /Wind Speed:\s+(\d+)\s+km\/h/;

    const temperatureMatch = description.match(tempRegex);
    const windSpeedMatch = description.match(windRegex);

    return {
        temperature: temperatureMatch ? temperatureMatch[1] + '°C' : 'N/A',
        windSpeed: windSpeedMatch ? windSpeedMatch[1] + ' km/h' : 'N/A'
    };
}
