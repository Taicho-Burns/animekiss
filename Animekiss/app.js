const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})



// script.js
 
// Get the modal and search button elements
const searchModal = document.getElementById('searchModal');
const searchBtn = document.getElementById('searchBtn');
const closeBtn = document.getElementById('closeBtn');
const searchInput = document.getElementById('searchInput');
const searchSubmit = document.getElementById('searchSubmit');
 
// When the search button is clicked, show the modal
searchBtn.onclick = function() {
searchModal.style.display = "block";
}
 
// When the close button is clicked, close the modal
closeBtn.onclick = function() {
searchModal.style.display = "none";
}
 
// When clicking anywhere outside the modal, close it
window.onclick = function(event) {
    if (event.target == searchModal) {
searchModal.style.display = "none";
    }
}
 


// app.js
// Get references to the modal, dialog, and other elements
const animeDescription = document.getElementById('anime-desc');
const animeButtons = document.querySelectorAll('.anime-button');
const descriptionDialog = document.getElementById('description');
const animeDesc = document.getElementById('anime-desc');

// Event listener for each anime button to show description
animeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const animeKey = this.dataset.anime; // Get the anime name from data-anime attribute
        fetchAnimeData(animeKey); // Fetch data from Jikan API
        descriptionDialog.showModal(); // Open the description dialog
    });
});

// Function to fetch data from Jikan API
async function fetchAnimeData(query) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=1`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const anime = data.data[0];  // Get the first result from the search
            const description = anime.synopsis;
            const genre = anime.genres.map(g => g.name).join(', ');
            const japaneseTitle = anime.title_japanese;
            const englishTitle = anime.title_english || 'N/A';  // Default to 'N/A' if no English title is available
            const imageUrl = anime.images.jpg.image_url;
            const startYear = anime.year || 'N/A';  // Default to 'N/A' if no year is available

            // Display the fetched data in the anime description inside the dialog
            animeDesc.innerHTML = `
                <h2>${englishTitle}</h2>
                <h3>Japanese Title: ${japaneseTitle}</h3>
                <p><strong>Genre:</strong> ${genre}</p>
                <p><strong>Production Year:</strong> ${startYear}</p>
                <p><strong>Description:</strong> ${description}</p>
                <img src="${imageUrl}" alt="${englishTitle} Image" />
            `;
        } else {
            animeDesc.innerHTML = `<p>No results found for "${query}".</p>`;
        }
    } catch (error) {
        animeDesc.innerHTML = `<p>Failed to fetch data. Please try again later.</p>`;
        console.error("Error fetching data:", error);
    }
}

// When the search button is clicked
searchSubmit.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchAnimeData(query);  // Fetch data from Jikan API
        searchModal.style.display = "none"; // Close the modal after search
        descriptionDialog.showModal(); // Open the description dialog
    } else {
        alert("Please enter an anime name.");
    }
});

// Close the search modal when the close button is clicked
closeBtn.addEventListener('click', () => {
    searchModal.style.display = "none";
});

// Optional: Close dialog when clicking outside the dialog
descriptionDialog.addEventListener('click', (event) => {
    if (event.target === descriptionDialog) {
        descriptionDialog.close(); // Close the dialog if clicked outside
    }
});









// // Get references to the modal, dialog, and other elements
// const animeDescription = document.getElementById('anime-desc');
// const animeButtons = document.querySelectorAll('.anime-button');
// const descriptionDialog = document.getElementById('description');
// const animeDesc = document.getElementById('anime-desc');

// Event listener for each anime button to show description
animeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const animeKey = this.dataset.anime; // Get the anime name from data-anime attribute
        const selectedAnime = animeData[animeKey]; // Retrieve the corresponding anime data
        
        // Update the description section
        animeDescription.innerHTML = `
            <h2>${selectedAnime.title}</h2>
            <p><strong>Genre:</strong> ${selectedAnime.genre}</p>
            <p><strong>Description:</strong> ${selectedAnime.description}</p>
        `;
    });
});

// Function to fetch data from Jikan API
async function fetchAnimeData(query) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=1`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const anime = data.data[0];  // Get the first result from the search
            const description = anime.synopsis;
            const genre = anime.genres.map(g => g.name).join(', ');
            const japaneseTitle = anime.title_japanese;
            const englishTitle = anime.title_english || 'N/A';  // Default to 'N/A' if no English title is available
            const imageUrl = anime.images.jpg.image_url;
            const startYear = anime.year || 'N/A';  // Default to 'N/A' if no year is available

            // Display the fetched data in the anime description inside the dialog
            animeDesc.innerHTML = `
                <h2>${englishTitle}</h2>
                <h3>Japanese Title: ${japaneseTitle}</h3>
                <p><strong>Genre:</strong> ${genre}</p>
                <p><strong>Production Year:</strong> ${startYear}</p>
                <p><strong>Description:</strong> ${description}</p>
                <img src="${imageUrl}" alt="${englishTitle} Image" />
            `;
        } else {
            animeDesc.innerHTML = `<p>No results found for "${query}".</p>`;
        }
    } catch (error) {
        animeDesc.innerHTML = `<p>Failed to fetch data. Please try again later.</p>`;
        console.error("Error fetching data:", error);
    }
}

// When the search button is clicked
searchSubmit.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchAnimeData(query);  // Fetch data from Jikan API
        searchModal.style.display = "none"; // Close the modal after search
        descriptionDialog.showModal(); // Open the description dialog
    } else {
        alert("Please enter an anime name.");
    }
});

// Close the search modal when the close button is clicked
closeBtn.addEventListener('click', () => {
    searchModal.style.display = "none";
});

// Optional: Close dialog when clicking outside the dialog
descriptionDialog.addEventListener('click', (event) => {
    if (event.target === descriptionDialog) {
        descriptionDialog.close(); // Close the dialog if clicked outside
    }
});








//for the anime quiz button
// Get the button by ID
const quizButton = document.getElementById("startQuizButton");
const quizContainer = document.getElementById("quizContainer");
const nextButton = document.getElementById("nextButton");
let currentQuestionIndex = 0;
let quizQuestions = [];
// Add an event listener to start the quiz when clicked
quizButton.addEventListener("click", () => {
  quizContainer.style.display = "block"; // Show quiz container
  loadQuestions(); // Load quiz questions from the database
});

// Function to fetch questions from your backend
async function loadQuestions() {
  try {
    const response = await fetch('get_questions.php'); // Fetch questions from your backend PHP script
    console.log(response);
    const data = await response.json();
    quizQuestions = data; // Store questions in the variable
    loadQuestion(); // Load the first question
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

// Function to load a question and its choices
function loadQuestion() {
    console.log(currentQuestionIndex);
    console.log(quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const questionElement = document.getElementById("question");
        const answerChoices = document.getElementById("answerChoices");
        answerChoices.innerHTML = ""; // Clear previous answers

        questionElement.innerText = question.question;
        
        // Create answer buttons dynamically
        for (let i = 1; i <= 4; i++) {
        const button = document.createElement("button");
        button.innerText = question[`answer${i}`];
        button.addEventListener("click", () => checkAnswer(question[`answer${i}`], question.correct_answer));
        answerChoices.appendChild(button);
        }

        nextButton.style.display = "none"; // Hide "Next" button initially
    } else {
        alert("You've completed the quiz!");
        quizContainer.style.display = "none"; // Hide quiz when completed
    }
}

// Function to check if the selected answer is correct
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    alert("Correct!");
  } else {
    alert("Wrong! Try again.");
  }

  currentQuestionIndex++;
  nextButton.style.display = "block"; // Show "Next" button after answering
}

// Function to go to the next question
function nextQuestion() {
  loadQuestions(); // Load the next question
}




