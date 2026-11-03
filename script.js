
const planets = [
  { name: "Mercury", emoji: "🌑", fact: "The smallest planet and the closest to the Sun.", detail: "A year on Mercury lasts just 88 Earth days." },
  { name: "Venus", emoji: "🟡", fact: "The hottest planet in our solar system.", detail: "Its thick atmosphere traps heat, making its surface extremely hot." },
  { name: "Earth", emoji: "🌍", fact: "Our home planet, known for its liquid water.", detail: "Earth is the only planet currently known to support life." },
  { name: "Mars", emoji: "🔴", fact: "The Red Planet, famous for its rusty colour.", detail: "Scientists study Mars to learn whether it may once have supported life." },
  { name: "Jupiter", emoji: "🟠", fact: "The largest planet in our solar system.", detail: "Jupiter has a giant storm called the Great Red Spot." },
  { name: "Saturn", emoji: "🪐", fact: "A gas giant famous for its beautiful rings.", detail: "Saturn's rings are made mostly of ice and rocky pieces." },
  { name: "Uranus", emoji: "🔵", fact: "An ice giant that rotates on its side.", detail: "Uranus has an extreme tilt compared with most planets." },
  { name: "Neptune", emoji: "🔷", fact: "A distant, cold and windy ice giant.", detail: "Neptune takes about 165 Earth years to orbit the Sun." }
];

const grid = document.getElementById("planetGrid");
const info = document.getElementById("planetInfo");

planets.forEach(planet => {
  const card = document.createElement("button");
  card.className = "planet-card";
  card.innerHTML = `
    <div class="emoji">${planet.emoji}</div>
    <h3>${planet.name}</h3>
    <p>${planet.fact}</p>
  `;
  card.addEventListener("click", () => {
    info.innerHTML = `
      <h3>${planet.emoji} ${planet.name}</h3>
      <p>${planet.detail}</p>
      <button class="main-btn" onclick="savePlanet('${planet.name}')">♡ Save Discovery</button>
    `;
  });
  grid.appendChild(card);
});

let favourites = JSON.parse(localStorage.getItem("nexoraFavourites") || "[]");

function savePlanet(name) {
  if (!favourites.includes(name)) {
    favourites.push(name);
    localStorage.setItem("nexoraFavourites", JSON.stringify(favourites));
  }
  showFavourites();
}

function removePlanet(name) {
  favourites = favourites.filter(item => item !== name);
  localStorage.setItem("nexoraFavourites", JSON.stringify(favourites));
  showFavourites();
}

function showFavourites() {
  const list = document.getElementById("favouritesList");
  if (favourites.length === 0) {
    list.textContent = "No favourites saved yet.";
    return;
  }

  list.innerHTML = favourites.map(name => `
    <div class="favourite-item">
      <span>✦ ${name}</span>
      <button onclick="removePlanet('${name}')">Remove</button>
    </div>
  `).join("");
}

showFavourites();

// Space quiz
const questions = [
  { q: "Which planet is known as the Red Planet?", a: ["Venus", "Mars", "Jupiter", "Neptune"], correct: "Mars" },
  { q: "Which is the largest planet?", a: ["Earth", "Saturn", "Jupiter", "Mercury"], correct: "Jupiter" },
  { q: "Which planet has famous rings?", a: ["Mars", "Venus", "Saturn", "Earth"], correct: "Saturn" },
  { q: "What is the name of our galaxy?", a: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"], correct: "Milky Way" },
  { q: "Which star is closest to Earth?", a: ["Sirius", "Polaris", "The Sun", "Vega"], correct: "The Sun" }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question");
const answers = document.getElementById("answers");
const result = document.getElementById("quizResult");
const nextBtn = document.getElementById("nextBtn");

function showQuestion() {
  const item = questions[currentQuestion];
  questionText.textContent = item.q;
  answers.innerHTML = "";
  result.textContent = "";
  nextBtn.hidden = true;

  item.a.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(answer));
    answers.appendChild(button);
  });
}

function checkAnswer(answer) {
  const correct = questions[currentQuestion].correct;
  const buttons = answers.querySelectorAll("button");

  buttons.forEach(button => {
    button.disabled = true;
    if (button.textContent === correct) {
      button.style.borderColor = "#7ee6b1";
    }
  });

  if (answer === correct) {
    score++;
    result.textContent = "✦ Correct! Great discovery.";
  } else {
    result.textContent = `Not quite! The correct answer is ${correct}.`;
  }

  nextBtn.hidden = false;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "See Results" : "Next Question →";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    questionText.textContent = "Mission Completed!";
    answers.innerHTML = "";
    result.textContent = `You scored ${score} out of ${questions.length}! 🚀`;
    nextBtn.textContent = "Play Again";
    nextBtn.onclick = () => {
      currentQuestion = 0;
      score = 0;
      nextBtn.onclick = null;
      showQuestion();
    };
  }
});

showQuestion();
                
