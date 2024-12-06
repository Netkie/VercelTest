document.getElementById("goButton").addEventListener("click", fetchHolidays);

async function fetchHolidays() {
    const apiKey = "QInPXR+QKyCK4Me3VSlhiQ==RlzTTJT0XWRc2TKD";
    const year = new Date().getFullYear();

    try {
        const israelResponse = await fetch(`https://api.api-ninjas.com/v1/holidays?country=IL&year=${year}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        
        const usaResponse = await fetch(`https://api.api-ninjas.com/v1/holidays?country=US&year=${year}`, {
            headers: { 'X-Api-Key': apiKey }
        });

        if (!israelResponse.ok || !usaResponse.ok) {
            throw new Error("Failed to fetch holidays");
        }

        const israelHolidays = await israelResponse.json();
        const usaHolidays = await usaResponse.json();

        displayHolidays(israelHolidays, "israelList");
        displayHolidays(usaHolidays, "usaList");

    } catch (error) {
        console.error(error);
    }
}

function displayHolidays(holidays, listId) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = ""; // Clear previous entries

    holidays.slice(0, 10).forEach(holiday => {
        const listItem = document.createElement("li");
        listItem.textContent = `${holiday.date} - ${holiday.name}`;
        listElement.appendChild(listItem);
    });
}