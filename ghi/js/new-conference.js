window.addEventListener('DOMContentLoaded', async () => {
    let locationUrl = "http://localhost:8000/api/locations/";
    let locationResponse = await fetch(locationUrl);
    if (locationResponse.ok) {
        let data = await locationResponse.json();

        const selectTag = document.getElementById('location');
        for (let l of data.locations) {
            const option = document.createElement("option");
            option.value = l.id;

            option.innerHTML = l.name;


            selectTag.appendChild(option);
        }
    }

    const formTag = document.getElementById("create-conference-form");
    formTag.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const conferenceUrl = "http://localhost:8000/api/conferences/";
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newConference = await response.json();
        }
    });
});
