document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });
    }


    /* =========================
       DATE
    ========================= */

    const dateInput = document.getElementById("date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }


    /* =========================
       CHOICE BUTTONS
    ========================= */

    let selectedTime = "";
    let selectedSession = "";
    let selectedPeople = "";
    let selectedPayment = "";


    function setupChoiceGroup(containerId, callback) {

        const container = document.getElementById(containerId);

        if (!container) return;

        const buttons = container.querySelectorAll(".choice-button");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                buttons.forEach(btn => {
                    btn.classList.remove("selected");
                });

                button.classList.add("selected");

                callback(button.dataset.value);
            });

        });
    }


    /* TIME */

    setupChoiceGroup("timeChoices", value => {

        selectedTime = value;

        const otherTime = document.getElementById("otherTime");

        if (value === "OTHER") {

            otherTime.classList.add("show");
            otherTime.required = true;

        } else {

            otherTime.classList.remove("show");
            otherTime.required = false;
            otherTime.value = "";

        }
    });


    /* SESSION TYPE */

    setupChoiceGroup("sessionChoices", value => {

        selectedSession = value;

        const otherEvent = document.getElementById("otherEvent");

        if (value === "OTHER EVENT") {

            otherEvent.classList.add("show");
            otherEvent.required = true;

        } else {

            otherEvent.classList.remove("show");
            otherEvent.required = false;
            otherEvent.value = "";

        }
    });


    /* PEOPLE */

    setupChoiceGroup("peopleChoices", value => {
        selectedPeople = value;
    });


    /* PAYMENT */

    setupChoiceGroup("paymentChoices", value => {
        selectedPayment = value;
    });


    /* =========================
       FORM
    ========================= */

    const bookingForm = document.getElementById("bookingForm");

    if (!bookingForm) return;


    bookingForm.addEventListener("submit", event => {

        event.preventDefault();


        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value;
        const location = document.getElementById("location").value.trim();

        const otherTimeInput = document.getElementById("otherTime");
        const otherEventInput = document.getElementById("otherEvent");


        /* VALIDATION */

        if (!fullName) {
            alert("Please enter your full name.");
            return;
        }

        if (!phone) {
            alert("Please enter your phone number.");
            return;
        }

        if (!date) {
            alert("Please select a date.");
            return;
        }

        if (!selectedTime) {
            alert("Please select a time.");
            return;
        }

        if (selectedTime === "OTHER" && !otherTimeInput.value.trim()) {
            alert("Please enter your preferred time.");
            return;
        }

        if (!location) {
            alert("Please enter the location.");
            return;
        }

        if (!selectedSession) {
            alert("Please select a session type.");
            return;
        }

        if (
            selectedSession === "OTHER EVENT" &&
            !otherEventInput.value.trim()
        ) {
            alert("Please describe your event.");
            return;
        }

        if (!selectedPeople) {
            alert("Please select the number of people.");
            return;
        }

        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }


        /* =========================
           FORMAT DATE
        ========================= */

        const selectedDate = new Date(date + "T12:00:00");

        const formattedDate = selectedDate.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


        /* =========================
           FINAL VALUES
        ========================= */

        const finalTime =
            selectedTime === "OTHER"
                ? otherTimeInput.value.trim()
                : selectedTime;

        const finalSession =
            selectedSession === "OTHER EVENT"
                ? `OTHER EVENT - ${otherEventInput.value.trim()}`
                : selectedSession;


        /* =========================
           WHATSAPP MESSAGE
        ========================= */

        const message =
`📸 CM CREATIVE SHOTS — NEW BOOKING

Full Name: ${fullName}
Phone Number: ${phone}
Location: ${location}
Date: ${formattedDate}
Time: ${finalTime}
Session Type: ${finalSession}
Number of People: ${selectedPeople}
Payment Method: ${selectedPayment}

I have read and agree to the CM Creative Shots booking policy.`;


        const whatsappNumber = "59995254792";

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        /* =========================
           OPEN WHATSAPP
        ========================= */

        window.open(whatsappURL, "_blank");

    });

});