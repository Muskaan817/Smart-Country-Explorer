let allCities = [];
const container = document.getElementById("citiesContainer");
const title = document.getElementById("title");

const params = new URLSearchParams(window.location.search);
const countryName = params.get("country");

title.innerText = `Cities in ${countryName}`;

fetch("https://countriesnow.space/api/v0.1/countries/cities", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ country: countryName })
})
.then(res => res.json())
.then(data => {
  allCities = data.data;
  displayCities(allCities);
})
.catch(err => console.log(err));

function getCityFavorites() {
  return JSON.parse(localStorage.getItem("cityFavorites")) || [];
}

function toggleCityFavorite(city) {
  let favs = getCityFavorites();

  const exists = favs.find(c => c.title === city.title);

  if (exists) {
    favs = favs.filter(c => c.title !== city.title);
  } else {
    favs.push(city);
  }

  localStorage.setItem("cityFavorites", JSON.stringify(favs));
}

function updateCityFavIcon(btn, cityName) {
  const favs = getCityFavorites();
  const isFav = favs.find(c => c.title === cityName);

  btn.textContent = isFav ? "❤️" : "🤍";
}


function displayCities(cities) {
  container.innerHTML = "";

  const citiesToShow =
    cities.length > 40
      ? cities.sort(() => 0.5 - Math.random()).slice(0, 40)
      : cities;

  citiesToShow.forEach(city => {
    getCityDetails(city);
  });
}

function getCityDetails(city) {
  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`)
    .then(res => res.json())
    .then(data => {

      const card = document.createElement("div");
      card.classList.add("card");

      const image = data.thumbnail?.source || "https://placehold.co/300x200?text=No+Image";

      card.innerHTML = `

        <img src="${image}" alt="city">
        <h3>${data.title}</h3>
        <p>${data.extract?.slice(0, 120) || "No description"}...</p>
      `;

    
      card.addEventListener("click", () => {
        const query = encodeURIComponent(data.title);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
      });

      container.appendChild(card);
    })
    .catch(() => console.log("Error fetching city"));
}

const searchInput = document.getElementById("citySearch");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allCities.filter(city =>
    city.toLowerCase().includes(value)
  );

  displayCities(filtered);
});

function goBack() {
  window.location.href = "index.html";
}

function showFavorites() {
  const favs = getFavorites();
  displayCountries(favs);
}

const toggle = document.getElementById("themeToggle");


if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});

