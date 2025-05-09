document.getElementById("searchBtn").addEventListener("click", function () {
    const countryName = document.getElementById("searchInput").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous result
  
    if (countryName === "") {
      alert("Please enter a country name.");
      return;
    }
  
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Country not found");
        return res.json();
      })
      .then((data) => {
        data.forEach((country) => {
          const currencyName = Object.values(country.currencies)[0].name;
          const currencySymbol = Object.values(country.currencies)[0].symbol;
          const languages = Object.values(country.languages).join(", ");
  
          const card = `
            <div class="country-card">
              <h2>${country.name.common}</h2>
              <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />
              <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
              <p><strong>Currency:</strong> ${currencyName} (${currencySymbol})</p>
              <p><strong>Region:</strong> ${country.region}</p>
              <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p><strong>Languages:</strong> ${languages}</p>
            </div>
          `;
          resultDiv.innerHTML += card;
        });
      })
      .catch((error) => {
        resultDiv.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
      });
  });
  