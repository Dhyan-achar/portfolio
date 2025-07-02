


// JavaScript for JOBNEST Website

// Responsive navbar toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

menuToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// swiper
var swiper = new Swiper(".mySwiper",
    {
        loop:true,
        autoplay:{
             delay:2500,
             disableOnInteraction: false,
        },
        slidesPerView:1,
        spaceBetween:10,
        pagination: {
            el:".swiper-pagination",
            clickable:true,
        },
        breakpoints:{
            640:{
                slidesPerView:2,
                spaceBetween:20,
            },
            768:{
                slidesPerView:3,
                spaceBetween:40,
            },
            1024:{
                slidesPerView:3,
                spaceBetween:50,
            }
        }
            
    });

// Search button (basic functionality)
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        alert(`You searched for "${query}"`);
        // You can implement search/filter logic here
    } else {
        alert("Please enter a job title or field to search!");
    }
});

// Filter selection (dynamic adding to chosen filters)
const filterSelects = document.querySelectorAll('.filter-select');
const filterChosen = document.querySelector('.filter-choosen');

filterSelects.forEach(select => {
    select.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value && !isDefaultOption(value)) {
            const chosenCard = document.createElement('div');
            chosenCard.classList.add('choosen-card');
            chosenCard.innerHTML = `${value} <i class="fas fa-times-circle"></i>`;

            filterChosen.appendChild(chosenCard);

            // Remove chosen filter
            chosenCard.querySelector('i').addEventListener('click', () => {
                filterChosen.removeChild(chosenCard);
            });
        }
    });
});

// Helper to skip default options
function isDefaultOption(value) {
    const defaultOptions = ["JOB LEVEL", "JOB FUNCTION", "EMPLOYEMENT TYPE", "LOCATION", "EDUCATION"];
    return defaultOptions.includes(value.toUpperCase());
}

// Load More Jobs
const loadMoreButton = document.querySelector('.job-more');
const jobCards = document.querySelectorAll('.job-card');
let currentItems = 3; // How many jobs to show initially

function showMoreItems() {
    for (let i = currentItems; i < currentItems + 3; i++) {
        if (jobCards[i]) {
            jobCards[i].style.display = 'flex';
        }
    }
    currentItems += 3;

    if (currentItems >= jobCards.length) {
        loadMoreButton.style.display = 'none';
    }
}

jobCards.forEach((card, index) => {
    if (index >= currentItems) {
        card.style.display = 'none';
    }
});

loadMoreButton.addEventListener('click', showMoreItems);



// Wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const jobCards = document.querySelectorAll('.job-card');

    function searchJobs() {
        const query = searchInput.value.toLowerCase().trim();
        
        jobCards.forEach(card => {
            const jobTitle = card.querySelector('.job-detail h4').innerText.toLowerCase();
            
            if (jobTitle.includes(query) || query === "") {
                card.style.display = "flex"; // Show the card
            } else {
                card.style.display = "none";  // Hide the card
            }
        });
    }

    // When the search button is clicked
    searchButton.addEventListener('click', searchJobs);

    // Also allow search when the user presses Enter key
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            searchJobs();
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const jobCards = document.querySelectorAll('.job-detail');

    jobCards.forEach(card => {
        card.addEventListener('click', function() {
            const jobTitle = card.getAttribute('h4');
            const encodedTitle = encodeURIComponent(jobTitle);
            window.location.href = `apply.html?job=${encodedTitle}`;
        });
    });
});


// JavaScript to handle the testimonial button click
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.ask-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const position = this.getAttribute('data-position');

            // Redirect to the 'ask-testimonial.html' page with parameters
            window.location.href = `ask-testimonial.html?name=${encodeURIComponent(name)}&position=${encodeURIComponent(position)}`;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const askButtons = document.querySelectorAll('.ask-button');

    askButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const role = button.getAttribute('data-position');

            // Build query parameters to pass to the new page
            const params = new URLSearchParams({
                name: name,
                role: role
            });

            // Open the query page with parameters
            window.location.href = `testimonial.html?${params.toString()}`;
        });
    });
});



// Get query params
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const role = params.get('role');

// DOM elements
document.addEventListener("DOMContentLoaded", function () {
    const suggestionsEl = document.getElementById('suggestions');
    const questionsList = document.getElementById('suggested-questions');
    const questionInput = document.getElementById('question-input');
    const submitBtn = document.getElementById('submit-btn');

    // Assume these variables are defined elsewhere or add default values for testing
    const name = "Alex"; // Replace with actual logic or variable
    const role = "Engineer"; // Replace with actual logic or variable

    // Set header message
    if (suggestionsEl) {
        suggestionsEl.innerText = `You're asking a question to ${name}, a ${role}.`;
    }

    // Suggested questions based on role
    const suggestions = {
        "Student": [
            "What helped you stay motivated during your studies?",
            "What challenges did you face and how did you overcome them?",
            "Do you recommend any specific resources?"
        ],
        "Engineer": [
            "What technologies do you use daily?",
            "What advice would you give someone starting in your field?",
            "What project are you most proud of?"
        ],
        "Mentor": [
            "How do you guide your mentees?",
            "What do you look for in a good mentee?",
            "How can I benefit most from mentorship?"
        ]
    };

    // Populate suggested questions if the role is valid and elements exist
    if (questionsList && suggestions[role]) {
        suggestions[role].forEach(question => {
            const li = document.createElement('li');
            li.innerText = question;
            questionsList.appendChild(li);
        });
    }
});


// Load suggested questions
const roleSuggestions = suggestions[role];
if (roleSuggestions) {
    roleSuggestions.forEach(question => {
        const li = document.createElement('li');
        li.textContent = question;
        questionsList.appendChild(li);

        // Optional: autofill textarea when suggestion is clicked
        li.addEventListener('click', () => {
            questionInput.value = question;
        });
    });
}

// Submit button click event
submitBtn.addEventListener('click', () => {
    const question = questionInput.value.trim();

    if (!question) {
        alert("Please enter a question before submitting.");
        return;
    }

    alert(`Your question to ${name} has been submitted!`);

    // Clear the input field
    questionInput.value = '';
});
















