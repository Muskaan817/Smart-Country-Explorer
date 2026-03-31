let container = document.getElementById("countriesContainer");
let loader = document.getElementById("loader");
let searchInput=document.getElementById("country");
let regionFilter=document.getElementById("region");
let sortPopulation=document.getElementById("sortPopulation");
let ans=[]

fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,languages")
.then(res=>res.json())
.then(data=>{
    ans=data;
    loader.style.display="none"
    displayCountries(data)
})
.catch(()=>{
    loader.innerText="Failed to get data!🥲"
})

function displayCountries(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<h2>No countries found!</h2>";
    return;
  }

  data.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("card");

    const languages = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";

    card.innerHTML = `
      <img src="${country.flags.png}" alt="flag">
      <h3>${country.name.common}</h3>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      <p><strong>Languages:</strong> ${languages}</p>
    `;

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