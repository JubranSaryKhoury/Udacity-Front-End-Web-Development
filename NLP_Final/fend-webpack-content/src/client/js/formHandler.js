const { isValidUrl } = require("./urlChecker");

function handleSubmit(event) {
  event.preventDefault();

  let formText = document.getElementById("name").value;

  if (!formText) {
    alert("Input cannot be blank!");
    return;
  }

  // Check if the input is a valid URL
  if (!isValidUrl(formText)) {
    alert("Invalid URL format!");
    return;
  }

  fetch("http://localhost:8080/api", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: formText }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => {
      if (res && res.polarity && res.subjectivity && res.text) {
        document.getElementById("results").innerHTML = `
            Polarity: ${res.polarity}<br>
            Subjectivity: ${res.subjectivity}<br>
            Text: ${res.text}
          `;
      } else {
        document.getElementById("results").innerHTML =
          "Unexpected response format";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("results").innerHTML =
        "An error occurred. Please try again.";
    });
}

module.exports = { handleSubmit };
