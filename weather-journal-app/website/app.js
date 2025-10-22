/* Jubran Khoury */

// API Key, from the website
const apiKey = "271807cd8e57c45182ded3509731e6f8&units=imperial";

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeather(apiKey, zip).then((data) => {
    postData("/add", {
      date: newDate,
      temp: data.main.temp,
      feel: feelings,
    }).then(updateUI);
  });
}

/* Function to GET Web API Data*/
const getWeather = async (apiKey, zip) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`
  );
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    const temperatureInFahrenheit = allData.temp; // read the temperature in fehrinheit
    const tempatureInCelsius = ((temperatureInFahrenheit - 32) * 5) / 9; // convert it to celisuis by the equation

    document.getElementById("temp").innerHTML =
      Math.round(tempatureInCelsius) + " Celsius";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
