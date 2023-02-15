


export let converrt = () => {
    const placename = "New York";
    const apiKey = "e8002b39f75948ec9b3c46becc847f20";
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(placename)}&key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const lat = data.results[0].geometry.lat;
        const lng = data.results[0].geometry.lng;
        console.log(`The latitude of ${placename} is ${lat} and the longitude is ${lng}`);
        return lat
      })
      .catch(error => console.error(error));
    }
 converrt()
