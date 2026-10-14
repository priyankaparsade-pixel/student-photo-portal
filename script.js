const photoInput = document.getElementById("eventPhotos");
const eventForm = document.getElementById("eventForm");

const previewContainer = document.createElement("div");

previewContainer.id = "photoPreview";

photoInput.parentElement.appendChild(previewContainer);


// PHOTO PREVIEW
photoInput.addEventListener("change", function () {

    previewContainer.innerHTML = "";

    const files = photoInput.files;

    for (let i = 0; i < files.length; i++) {

        const image = document.createElement("img");

        image.src = URL.createObjectURL(files[i]);

        image.width = 150;

        image.style.margin = "10px";

        image.style.borderRadius = "8px";

        previewContainer.appendChild(image);
    }

});


// ADD EVENT
eventForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const eventName =
        document.getElementById("eventName").value;

    const eventDate =
        document.getElementById("eventDate").value;

    const eventDescription =
        document.getElementById("eventDescription").value;


    const files = photoInput.files;

    const photoPromises = [];


    for (let i = 0; i < files.length; i++) {

        photoPromises.push(

            new Promise(function (resolve) {

                const reader = new FileReader();

                reader.onload = function () {

                    resolve(reader.result);

                };

                reader.readAsDataURL(files[i]);

            })

        );

    }


    Promise.all(photoPromises).then(function (photos) {


        const newEvent = {

            id: Date.now(),

            name: eventName,

            date: eventDate,

            description: eventDescription,

            photos: photos

        };


        // GET OLD EVENTS

        let events =
            JSON.parse(
                localStorage.getItem("schoolEvents")
            ) || [];


        // ADD NEW EVENT

        events.push(newEvent);


        // SAVE ALL EVENTS

        localStorage.setItem(
            "schoolEvents",
            JSON.stringify(events)
        );


        alert("Event added successfully!");


        eventForm.reset();

        previewContainer.innerHTML = "";

    });

});