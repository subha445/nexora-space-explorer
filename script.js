
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

// NEXORA Interactive Solar System

const spaceFacts = {
  Mercury: "The smallest planet. It is closest to the Sun and has a very short year.",
  Venus: "The hottest planet in our solar system, with a thick atmosphere.",
  Earth: "Our home planet! It has liquid water on its surface and supports life.",
  Mars: "The Red Planet. Scientists are exploring it to understand its history.",
  Jupiter: "The largest planet in our solar system. It has a giant storm called the Great Red Spot.",
  Saturn: "A gas giant famous for its spectacular rings made mostly of ice and rock.",
  Uranus: "An ice giant that rotates almost on its side.",
  Neptune: "A distant ice giant known for its powerful winds."
};

document.querySelectorAll(".orbit-planet").forEach(planet => {
  planet.addEventListener("click", () => {
    const name = planet.dataset.planet;
    document.getElementById("spaceInfo").innerHTML = `
      <h3>🪐 ${name}</h3>
      <p>${spaceFacts[name]}</p>
      <button class="main-btn" onclick="savePlanet('${name}')">
        ♡ Save Discovery
      </button>
    `;
  });
});

// NEXORA Galaxy Explorer

const galaxyFacts = {
  andromeda: {
    title: "🌌 Andromeda Galaxy",
    fact: "Andromeda is the nearest major galaxy to the Milky Way. It is approximately 2.5 million light-years away and contains a huge number of stars."
  },
  milkyway: {
    title: "✨ Milky Way",
    fact: "Our home galaxy is a barred spiral galaxy. The Solar System is located in one of its spiral arms."
  },
  orion: {
    title: "🌠 Orion Nebula",
    fact: "The Orion Nebula is a star-forming region about 1,300 light-years away. New stars are born inside its clouds of gas and dust."
  },
  blackhole: {
    title: "🕳️ Black Holes",
    fact: "A black hole is a region of space where gravity is so strong that nothing, not even light, can escape from within its event horizon."
  }
};

function exploreGalaxy(name) {
  const galaxy = galaxyFacts[name];

  document.getElementById("galaxyInfo").innerHTML = `
    <h3>${galaxy.title}</h3>
    <p>${galaxy.fact}</p>
  `;

  document.getElementById("galaxyInfo").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


                
