document.addEventListener("DOMContentLoaded", () => {
    const visitorMessage = document.querySelector(".visitor-message");
    const now = Date.now(); // Current date in milliseconds
    const lastVisit = localStorage.getItem("lastVisit"); // Retrieve last visit from localStorage

    if (!lastVisit) {
        // First visit
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const daysDifference = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24)); // Difference in days

        if (daysDifference < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitorMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitorMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Update the last visit date in localStorage
    localStorage.setItem("lastVisit", now.toString());
});
