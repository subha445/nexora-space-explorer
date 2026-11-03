
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

// NEXORA NASA Space Gallery

async function loadNasaImages(searchTerm = "galaxy") {
  const gallery = document.getElementById("nasaGalleryGrid");
  const status = document.getElementById("galleryStatus");

  gallery.innerHTML = "";
  status.textContent = "Searching NASA's image collection...";

  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchTerm)}&media_type=image&page_size=12`
    );

    if (!response.ok) {
      throw new Error("NASA image service is unavailable.");
    }

    const data = await response.json();
    const items = data.collection.items || [];

    const photos = items.filter(item =>
      item.links && item.links.some(link => link.rel === "preview")
    );

    if (photos.length === 0) {
      status.textContent = "No photographs found. Try another category.";
      return;
    }

    status.textContent = `Showing ${photos.length} NASA photographs about ${searchTerm}.`;

    photos.forEach(item => {
      const details = item.data[0];
      const image = item.links.find(link => link.rel === "preview");

      const card = document.createElement("article");
      card.className = "nasa-photo-card";

      const photo = document.createElement("img");
      photo.src = image.href;
      photo.alt = details.title || "NASA space photograph";
      photo.loading = "lazy";

      const title = document.createElement("h3");
      title.textContent = details.title || "Space discovery";

      const description = document.createElement("p");
      description.textContent =
        (details.description || "A photograph from NASA's image collection.")
        .slice(0, 150) + "...";

      const link = document.createElement("a");
      link.href = `https://images.nasa.gov/details/${encodeURIComponent(details.nasa_id)}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View NASA details ↗";

      const linkArea = document.createElement("p");
      linkArea.appendChild(link);

      card.append(photo, title, description, linkArea);
      gallery.appendChild(card);
    });

  } catch (error) {
    status.textContent =
      "NASA images could not load right now. Please check your internet connection and try again.";
  }
}

// Load the first gallery automatically
loadNasaImages("galaxy");
// NEXORA Planet Weight Calculator

function calculatePlanetWeight() {
  const input = document.getElementById("earthWeight");
  const results = document.getElementById("weightResults");

  const earthWeight = Number(input.value);

  if (!input.value || !Number.isFinite(earthWeight) || earthWeight <= 0) {
    results.innerHTML = "<p>Please enter a valid weight!</p>";
    return;
  }

  const planets = [
    { name: "Mercury", gravity: 0.38, emoji: "☿️" },
    { name: "Venus", gravity: 0.91, emoji: "♀️" },
    { name: "Earth", gravity: 1, emoji: "🌍" },
    { name: "Mars", gravity: 0.38, emoji: "🔴" },
    { name: "Jupiter", gravity: 2.34, emoji: "🪐" },
    { name: "Saturn", gravity: 1.06, emoji: "🪐" },
    { name: "Uranus", gravity: 0.92, emoji: "🔵" },
    { name: "Neptune", gravity: 1.19, emoji: "🌊" },
    { name: "Moon", gravity: 0.166, emoji: "🌙" }
  ];

  results.innerHTML = "";

  planets.forEach(planet => {
    const calculatedWeight = (earthWeight * planet.gravity).toFixed(2);

    const card = document.createElement("div");
    card.className = "weight-card";

    const heading = document.createElement("h3");
    heading.textContent = `${planet.emoji} ${planet.name}`;

    const value = document.createElement("p");
    value.textContent = `${calculatedWeight} kg`;

    card.append(heading, value);
    results.appendChild(card);
  });
}



                
