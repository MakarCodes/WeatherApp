const key = 'BQBcOqMcqZTFrQRNmeJkLTAGPbZQOdOm';

const getCity = async function (city){

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    console.log('data1', data);
    return data[0];
}

const getWeather = async function (id){
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`

    const response = await fetch(base + query);
    const data = await response.json();
    console.log('data', data);
    return data[0];
}

