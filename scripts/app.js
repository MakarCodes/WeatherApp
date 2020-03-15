const form = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const dayNight = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

form.addEventListener('submit', e=> {
    e.preventDefault();
    const city = form.city.value.trim();
    form.reset();
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    
    // return {
    //     cityDetails : cityDetails,
    //     weather : weather
    // }
    return { cityDetails, weather };
}



const updateUI = (data) => {

    const cityDetails = data.cityDetails;
    const weather = data.weather;

    // const { cityDetails, weather } = data;

    console.log(cityDetails, weather);

    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    let time = weather.IsDayTime? 'img/day.svg' : 'img/night.svg';
    dayNight.setAttribute('src', time);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    
}
