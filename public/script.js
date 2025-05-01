const quotes = [
    "🌟 Stay sweet, keep going. 🍬",
    "🍭 Every level gets easier with practice.",
    "✨ You’re sugar, spice, and everything nice—especially when you try.",
    "🍬 Bit by bit, even the hardest candy melts.",
    "🌈 Don’t rush the journey. Enjoy the flavor.",
    "💖 You’re doing sweet, keep it up!",
    "🌀 Life’s a gumball machine—colorful and full of surprises.",
    "🧁 Sometimes the best power-up is a break.",
    "🍓 Even lollipops take time to get to the center.",
    "🎮 You’ve got the magic—just press start.",
    "🩷 Mistakes are just sprinkles in the recipe of growth.",
    "🌸 When in doubt, add more sparkle (and maybe candy).",
    "⭐ Keep leveling up—your story’s just getting started.",
    "💫 Press play, and let your sweetness shine.",
    "🍒 Your courage is the secret ingredient.",
    "🩷 You’re the main character—make it a sweet one."
];

document.addEventListener('DOMContentLoaded', () => {

    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.getElementById('nav-links');

    // Controlla se gli elementi esistono prima di aggiungere l'event listener
    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', () => {
            // Attiva/disattiva la classe 'is-open' sulla lista dei link
            navLinks.classList.toggle('is-open');

            // Opzionale: Attiva/disattiva la classe 'is-active' sul bottone per l'animazione X
            hamburgerButton.classList.toggle('is-active');

            // Opzionale: Aggiorna l'attributo aria-expanded per l'accessibilità
            const isOpen = navLinks.classList.contains('is-open');
            hamburgerButton.setAttribute('aria-expanded', isOpen);
        });
    } else {
        console.error("Elemento hamburger o nav links non trovato!");
    }

    const quoteText = document.getElementById("quote-text");
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = randomQuote;

});
