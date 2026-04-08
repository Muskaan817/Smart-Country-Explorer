let container = document.getElementById("countriesContainer");
let loader = document.getElementById("loader");
let searchInput = document.getElementById("country");
let regionFilter = document.getElementById("region");
let sortPopulation = document.getElementById("sortPopulation");
let sortArea = document.getElementById("sortArea");
let ans = [];

fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,languages,area")
.then(res => res.json())
.then(data => {
    ans = data;

    loader.style.display = "none";  
    container.style.display = "grid";

    displayCountries(ans);
})
.catch((err) => {
    console.log(err);
    loader.innerText = "Failed to get data!🥲";
});


function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function toggleFavorite(country) {
  let favs = getFavorites();

  const exists = favs.find(c => c?.name?.common === country.name.common);

  if (exists) {
    favs = favs.filter(c => c?.name?.common !== country.name.common);
  } else {
    favs.push(country);
  }

  localStorage.setItem("favorites", JSON.stringify(favs));
}

function updateFavIcon(btn, countryName) {
  const favs = getFavorites();
  const isFav = favs.find(c => c?.name?.common === countryName);

  btn.textContent = isFav ? "❤️" : "🤍";
}


function displayCountries(data) {
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<h2>No countries found!</h2>";
    return;
  }

  data.forEach(country => {
    if (!country || !country.name) return;

    const card = document.createElement("div");
    card.classList.add("card");

    const languages = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";

    card.innerHTML = `
      <img src="${country.flags?.png || ""}">
      <h3>${country.name.common}</h3>
      <p>Population: ${country.population?.toLocaleString() || "N/A"}</p>
      <p>Region: ${country.region || "N/A"}</p>
      <p>Capital: ${country.capital?.[0] || "N/A"}</p>
      <p>Languages: ${languages}</p>
      <p>Area: ${country.area?.toLocaleString() || "N/A"} km²</p>

      <button class="fav-btn">🤍</button>
    `;

    const favBtn = card.querySelector(".fav-btn");

    updateFavIcon(favBtn, country.name.common);

    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(country);
      updateFavIcon(favBtn, country.name.common);
    });

    card.addEventListener("click", () => {
      window.location.href = `index2.html?country=${country.name.common}`;
    });

    container.appendChild(card);
  });
}


searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);
sortPopulation.addEventListener("change", filterCountries);

function filterCountries() {
  let result = [...ans];

  const searchValue = searchInput.value.toLowerCase();
  result = result.filter(c =>
    c.name.common.toLowerCase().includes(searchValue)
  );

  if (regionFilter.value) {
    result = result.filter(c =>
      c.region === regionFilter.value
    );
  }

  if (sortPopulation.value === "asc") {
    result.sort((a, b) => a.population - b.population);
  } else if (sortPopulation.value === "desc") {
    result.sort((a, b) => b.population - a.population);
  }

  displayCountries(result);
}


function showFavorites() {
  const favs = getFavorites();

  if (favs.length === 0) {
    container.innerHTML = "<h2>No favorites yet ❤️</h2>";
    return;
  }

  displayCountries(favs);
}

function goBack() {
  window.location.href = "index.html";
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

function showAll() {
  displayCountries(ans);
}