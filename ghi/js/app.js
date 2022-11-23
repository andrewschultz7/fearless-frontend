window.addEventListener('DOMContentLoaded', async () => {
    function createCard(title, description, pictureUrl) {
        return `

    <div class = "col-6 col-md-4">
        <div class = "w-100">
            <div class="shadow p-3 mb-5 bg-body rounded">
                <div class="card">

                    <img src=${pictureUrl} class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                </div>
            </div>
        </div>
    </div>



        `;
    }



    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Figure out what to do when the response is bad
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const html = createCard(name, description, pictureUrl);
                    const column = document.querySelector('.row');
                    column.innerHTML += html;
                }
            }

        }
    } catch (e) {
        console.error(e)
    }

});
