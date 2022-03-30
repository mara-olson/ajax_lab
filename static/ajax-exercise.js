"use strict";

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  evt.preventDefault();

  fetch("/fortune")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#fortune-text").innerHTML = data;
    });
}

document
  .querySelector("#get-fortune-button")
  .addEventListener("click", showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = "/weather.json";
  const zipcode = document.querySelector("#zipcode-field").value;
  const queryString = new URLSearchParams({ zipcode: zipcode }).toString();
  const newUrl = `${url}?${queryString}`;

  fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#weather-info").innerHTML = data["forecast"];
    });

  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector("#weather-form").addEventListener("submit", showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector("#qty-field").value,
    melon: document.querySelector('[name="melon_type"]').innerText,
  };
  // NOTE: Follow up on extracting melon_type because it's currently showing None

  fetch("/order-melons.json", {
    method: "POST",
    body: JSON.stringify(formInputs),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#order-status").innerHTML = data["msg"];
      console.log(response);
      console.log(data);
    });

  // NOTE: Follow up on response is not defined

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector("#order-form").addEventListener("submit", orderMelons);
