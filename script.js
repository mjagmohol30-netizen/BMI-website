var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
var nameInput = document.getElementById("name");

let resultArea = document.querySelector(".comment");
let modal = document.getElementById("myModal");
let modalContent = document.querySelector(".modal-content");
let modalText = document.querySelector("#modalText");
let span = document.getElementsByClassName("close")[0];


let bmiHistory = [];


function calculate() {
  if (
    nameInput.value.trim() === "" ||
    height.value.trim() === "" ||
    weight.value.trim() === "" ||
    (male.checked == false && female.checked == false)
  ) {
    modal.style.display = "block";
    modalText.innerHTML = `All fields are required!`;
    return;
  }

  countBmi();
}




function countBmi() {
  let advice = "";
  let result = "";

  let h = Number(height.value);
  let w = Number(weight.value);

  let bmi = w / ((h / 100) * (h / 100));

  if (male.checked) {
    gender = "male";
  } else if (female.checked) {
    gender = "female";
  }

  
  if (bmi < 18.5) {
    result = "Underweight";
    advice =
      "You may need to gain weight by eating nutritious foods and increasing calorie intake with healthy meals, protein, healthy fats, and proper exercise.";
  } 
  else if (bmi >= 18.5 && bmi <= 24.9) {
    result = "Healthy";
    advice =
      "Great job! Maintain balanced nutrition, regular exercise, proper hydration, and good sleep.";
  } 
  else if (bmi >= 25 && bmi <= 29.9) {
    result = "Overweight";
    advice =
      "Focus on a calorie deficit, eat healthier foods, reduce sugar and fats, and increase physical activity.";
  } 
  else if (bmi >= 30) {
    result = "Obese";
    advice =
      "Adopt long-term lifestyle changes, eat balanced meals, exercise regularly, and consult a healthcare professional.";
  }

 
  resultArea.style.display = "block";
  document.querySelector(".comment").innerHTML = 
    `You are <span id="comment">${result}</span>`;

  document.querySelector("#result").innerHTML = bmi.toFixed(2);
  document.querySelector("#adviceText").innerHTML = advice;

  
  addToHistory(bmi, result);

 
  updateHistory();
}

/* HISTORY FUNCTIONS */


function addToHistory(bmi, result) {
  bmiHistory.push({
    name: nameInput.value,
    height: height.value,
    weight: weight.value,
    bmi: bmi.toFixed(2),
    category: result,
    date: new Date().toLocaleString()
  });

  
}


function updateHistory() {
  let historyText = "";

  for (let i = bmiHistory.length - 1; i >= 0; i--) {
    historyText += `
      <p>
        <strong>${bmiHistory[i].name}</strong><br>
        Height: ${bmiHistory[i].height} cm | Weight: ${bmiHistory[i].weight} kg<br>
        BMI# ${i + 1}: ${bmiHistory[i].bmi} (${bmiHistory[i].category})<br>
        <small>${bmiHistory[i].date}</small>
      </p><br>
    `;
  }

  document.querySelector("#historyText").innerHTML = historyText;
}



/* MODAL CLOSE EVENTS */

// Close button
span.onclick = function () {
  modal.style.display = "none";
};

// Click outside modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};