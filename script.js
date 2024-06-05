document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00060.warnings_wa.xml')
        .then(response => response.json())
        .then(data => {
            const feedContent = document.getElementById('feedContent');
            if (data && data.items) {
                data.items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');

                    const title = document.createElement('div');
                    title.classList.add('item-title');
                    title.textContent = item.title;
                    itemDiv.appendChild(title);

                    const description = document.createElement('div');
                    description.classList.add('item-description');
                    description.innerHTML = item.description;
                    itemDiv.appendChild(description);

                    feedContent.appendChild(itemDiv);
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
