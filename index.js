
// API Key
const API_KEY = "168771779c71f3d64106d8a88376808a";

// Tab Switching 
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const searchForm = document.querySelector("[data-searchForm]");
const userInfoContainer = document.querySelector(".userInfoContainer");
const grantAccessContainer = document.querySelector(
    ".grantLocationContainer"
);
const loadingContainer = document.querySelector('.loadingContainer');

const notFound = document.querySelector('.errorContainer');
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');

let currentTab = userTab;
currentTab.classList.add("currentTab");
getFromSessionStorage();
// console.log(userTab);
// console.log(searchTab);

function switchTab(newTab) {
    notFound.classList.remove("active");
    // check if newTab is already selected or not 
    if (currentTab != newTab) {
        currentTab.classList.remove("currentTab");
        currentTab = newTab;
        currentTab.classList.add("currentTab");

        // Check which TAb is Selected - search / your

        // If Search Form not contains active class then add  [Search Weather]
        if (!searchForm.classList.contains("active")) {
            searchForm.classList.add("active");
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
        }
        // Your Weather
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage();
        }
    }
}

userTab.addEventListener('click', () => {
    switchTab(userTab);
});

searchTab.addEventListener('click', () => {
    switchTab(searchTab);
});


function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("userCoordinates");
    // console.log(localCoordinates);

    // Local Coordinates Not present - Grant Access Container
    if (!localCoordinates) {
        grantAccessContainer.classList.add('active');
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchWeatherInfo(coordinates);
    }
}

async function fetchWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // Remove Active Class from the Grant access Container
    grantAccessContainer.classList.remove('active');

    // loading 
    loadingContainer.classList.add('active');

    // try - catch Block
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
        if (!data.sys) {
            throw data;
        }
        loadingContainer.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingContainer.classList.remove('active');
        notFound.classList.add('active');
        errorImage.style.display = 'none';
        errorText.innerText = `Error: ${err?.message}`;
        errorBtn.style.display = 'block';
        errorBtn.addEventListener("click", fetchWeatherInfo);
    }
}

// Render Weather On UI
function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector('[data-cityName]');
    const countryFlag = document.querySelector('[data-countryFlag]');
    const description = document.querySelector('[data-weatherDesc]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windspeed = document.querySelector('[data-windspeed]');
    const humidity = document.querySelector('[data-humidity]');
    const clouds = document.querySelector('[data-clouds]');

    cityName.innerText = weatherInfo?.name;
    countryFlag.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    description.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity.toFixed(2)} %`;
    clouds.innerText = `${weatherInfo?.clouds?.all.toFixed(2)} %`;
}

const grantAccessButton = document.querySelector('[data-grantAccess]');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        grantAccessButton.style.display = 'none';
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
    sessionStorage.setItem("userCoordinates", JSON.stringify(userCoordinates));
    fetchWeatherInfo(userCoordinates);
}

grantAccessButton.addEventListener('click', getLocation);


// Search for weather
const searchInput = document.querySelector('[data-searchInput]');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value === "") {
        return;
    }
    // console.log(searchInput.value);
    fetchSearchWeatherInfo(searchInput.value);
    searchInput.value = "";
});


async function fetchSearchWeatherInfo(city) {
    loadingContainer.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    notFound.classList.remove("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
        if (!data.sys) {
            throw data;
        }
        loadingContainer.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingContainer.classList.remove('active');
        userInfoContainer.classList.remove('active');
        notFound.classList.add('active');
        errorText.innerText = `${err?.message}`;
        errorBtn.style.display = "none";
    }
}






























//SELF WRITTEN CODE

// //fetching tabs
// const userTab = document.querySelector("[data-userWeather]");
// const searchTab = document.querySelector("[data-searchWeather]");
// const userContainer = document.querySelector(".weather-container");

// //fetching containers
// const grantAccessContainer = document.querySelector(".grant-location-container");
// const searchForm = document.querySelector("[ data-searchForm]");
// const loadingScreen = document.querySelector(".loading-container");
// const userInfoContainer = document.querySelector(".user-info-container");

// //initially variables need ???

// //by-default,App will open in user tab
// let currentTab = userTab;
// const API_KEY = "4c9e1af95eb59801259a74f87870f770";
// currentTab.classList.add("current-tab");
// getfromSessionStorage();

// //ek kaam pending h?

// //switchTab function
// function switchTab(clickedTab){
//     if( clickedTab != currentTab) {
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");

//         if( !searchForm.classList.contains("active") ) {
//             //kya search form vala container is invisible, if yes then ake it visible
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }
//         else{
//             //pehle search tab pe tha, ab your weather tab visible karn ahai
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//              //ab me your weather tab me a gya hun, toh weather bhi display karna pdega, so lets check 
//             //local storage first for coordinates, if we have save them there!!
//             getfromSessionStorage();
//         }
//     }
// }

// //applying event handler on both tabs

// userTab.addEventListener( "click", () => {
//     //pass clicked tab as input parameter
//     switchTab(userTab)
// });

// searchTab.addEventListener( "click", () => {
//     //pass clicked tab as input parameter
//     switchTab(searchTab)
// });

// //check if coordinates are present in the session storage
// function getFromSessionStorage() {
//     const localCoordinates = sessionStorage.getItem("user-coordinates");
//     if(!localCoordinates){
//         //agar local coordinates nahi mile toh
//         grantAccessContainer.classList.add("active");
//     }
//     else{
//         //if coordinates are present, use them
//         const coordinates = JSON.parse(localCoordinates); 
//         fetchUserWeatherInfo(coordinates);
//     }

// }


//  async function fetchUserWeatherInfo( coordinates ) {
//     const {lat, lon} = coordinates;
    
//     //make grant location container invisible
//     grantAccessContainer.classList.remove("active");
//     //make loader visible
//     loadingScreen.classList.add("active");
    
//     //calling API
//     try{
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//         const data = await response.json();
        
//         //loading screen ko invisible karenge
//         loadingScreen.classList.remove("active");
//         //weather screen ko display karenge
//         userInfoContainer.classList.add("active");
//         //renderfunction which will put the data in userInfoConatainer
//         renderWeatherInfo(data);
//     }

//     catch(err){
//         loadingScreen.classList.remove("active")
//         //HW
//     }
// }

// function renderWeatherInfo(weatherInfo) {
//     //firstly, we have to fetch the elements

//     const cityName = document.querySelector("[data-cityName]")
//     const countryIcon = document.querySelector("[data-countryIcon]")
//     const desc = document.querySelector("[data-weatherDesc]")
//     const weatherIcon = document.querySelector("[data-weatherIcon]")
//     const temp = document.querySelector("[data-temp]")
//     const windspeed = document.querySelector("[data-windspeed]")
//     const humidity = document.querySelector("[data-humidity]")
//     const cloudiness = document.querySelector("[data-cloudiness]")

//     //fetch values from weatherInfo object & put it in UI elements
//     cityName.innerText = weatherInfo?.name;
//     countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//     desc.innerText = weatherInfo?.weather?.[0]?.description;
//     weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//     temp.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;
//     windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
//     humidity.innerText = `${weatherInfo?.main?.humidity.toFixed(2)} %`;
//     cloudiness.innerText = `${weatherInfo?.clouds?.all.toFixed(2)} %`;
    
// }

// //function for getting current location of user 

// function getLocation() {
//     if( navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         alert("No geolocation support available !!")
//     }
// }

// function showPosition(position) {

//     const userCoordinates = {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude,
//     }

//     sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
//     fetchUserWeatherInfo(userCoordinates);


// }


// const grantAccessButton = document.querySelector("[data-grantAccess]");
// grantAccessButton.addEventListener("click", getLocation);

// let searchInput = document.querySelector("[data-searchInput]")
// searchForm.addEventListener( "submit" , (e) => {
//     e.preventDefault();
//     let cityName = searchInput.value;

//     if( cityName === "") 
//     return;
//     else
//     //non-empty
//     fetchSearchWeatherInfo( cityName);
// });

// async function fetchSearchWeatherInfo(city) {
//     loadingScreen.classList.add("active");
//     userInfoContainer.classList.remove("active");
//     grantAccessContainer.classList.remove("active");

//     // calling API:

//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//         const data = await response.json();

//         //remove loader
//         loadingScreen.classList.remove("active");
//         //activate user-info-container
//         userInfoContainer.classList.add("active");
//         //showing changes on the UI
//         renderWeatherInfo(data);
//     }
//     catch(err) {

//     }
// }

