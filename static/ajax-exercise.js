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
}

document.querySelector("#weather-form").addEventListener("submit", showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector("#qty-field").value,
    melon_type: document.querySelector('[name="melon_type"]').innerText,
  };

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

      const order_status_class =
        document.querySelector("#order-status").classList;

      if (order_status_class.contains("order-error")) {
        order_status_class.remove("order-error");
      }

      if (data["code"] === "ERROR") {
        order_status_class.add("order-error");
      }
    });
}
document.querySelector("#order-form").addEventListener("submit", orderMelons);

function getDogImage(evt) {
  evt.preventDefault();
  const url = "https://dog.ceo/api/breeds/image/random";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document
        .querySelector("#dog-image")
        .insertAdjacentHTML("beforeend", `<br><img src=${data["message"]}>`);
    });
}

document.querySelector("#get-dog-image").addEventListener("click", getDogImage);
