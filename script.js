const colleges = [
    {
        name: "College of Engineering, Guindy",
        code: "1",
        cutoff: 199.5,
        location: "Chennai"
    },
    {
        name: "Madras Institute of Technology",
        code: "4",
        cutoff: 198.0,
        location: "Chennai"
    },
    {
        name: "SSN College of Engineering",
        code: "1319",
        cutoff: 193.0,
        location: "Chengalpattu"
    },
    {
        name: "Coimbatore Institute of Technology",
        code: "2006",
        cutoff: 191.0,
        location: "Coimbatore"
    },
    {
        name: "Government College of Technology",
        code: "2007",
        cutoff: 187.0,
        location: "Coimbatore"
    },
    {
        name: "Thiagarajar College of Engineering",
        code: "5006",
        cutoff: 185.0,
        location: "Madurai"
    },
    {
        name: "Sri Krishna College of Engineering and Technology",
        code: "2710",
        cutoff: 178.0,
        location: "Coimbatore"
    },
    {
        name: "Kumaraguru College of Technology",
        code: "2610",
        cutoff: 170.0,
        location: "Coimbatore"
    },
    {
        name: "Rajalakshmi Engineering College",
        code: "1219",
        cutoff: 160.0,
        location: "Chennai"
    },
    {
        name: "Government College of Engineering, Salem",
        code: "2615",
        cutoff: 145.0,
        location: "Salem"
    },
    {
        name: "PSG Institute of Technology and Applied Research",
        code: "2377",
        cutoff: 180.0,
        location: "Coimbatore"
    },
    {
        name: "Bannari Amman Institute of Technology",
        code: "2702",
        cutoff: 170.0,
        location: "Sathyamangalam"
    },
    {
        name: "Hindusthan College of Engineering and Technology",
        code: "2708",
        cutoff: 160.0,
        location: "Coimbatore"
    },
    {
        name: "Kongu Engineering College",
        code: "2711",
        cutoff: 175.0,
        location: "Perundurai"
    },
    {
        name: "Panimalar Engineering College",
        code: "1210",
        cutoff: 155.0,
        location: "Chennai"
    },
    {
        name: "Saveetha Engineering College",
        code: "1216",
        cutoff: 155.0,
        location: "Chennai"
    },
    {
        name: "Easwari Engineering College",
        code: "1304",
        cutoff: 160.0,
        location: "Chennai"
    },
    {
        name: "University College of Engineering, Villupuram",
        code: "1013",
        cutoff: 140.0,
        location: "Villupuram"
    },
    {
        name: "University College of Engineering, Tindivanam",
        code: "1014",
        cutoff: 135.0,
        location: "Tindivanam"
    },
    {
        name: "University College of Engineering, Arni",
        code: "1015",
        cutoff: 135.0,
        location: "Arni"
    },
    {
        name: "University VOC College of Engineering",
        code: "4024",
        cutoff: 140.0,
        location: "Thoothukudi"
    }
];

const form = document.getElementById("myform");
const results = document.getElementById("results");
const resultBox = document.getElementById("finalresult");
const collegeResults = document.getElementById("college-results");
const resetButton = document.getElementById("reset");


// Calculate cutoff and display nearby colleges
function calculateCutoff() {

    const maths = Number(document.getElementById("maths").value);
    const physics = Number(document.getElementById("physics").value);
    const chemistry = Number(document.getElementById("chemistry").value);

    // Clear previous results
    resultBox.textContent = "";
    collegeResults.innerHTML = "";
    results.hidden = false;

    // Validate marks
    if (
        !Number.isFinite(maths) ||
        !Number.isFinite(physics) ||
        !Number.isFinite(chemistry)
    ) {
        showError("Error: Marks must be valid numbers.");
        return;
    }

    if (maths < 0 || physics < 0 || chemistry < 0) {
        showError("Error: Marks cannot be negative.");
        return;
    }

    if (maths > 100 || physics > 100 || chemistry > 100) {
        showError("Error: Marks cannot exceed 100 per subject.");
        return;
    }


    // TNEA cutoff calculation
    // Mathematics = 100 marks
    // Physics = 50 marks
    // Chemistry = 50 marks

    const cutoff = maths + (physics / 2) + (chemistry / 2);

    resultBox.textContent =
        `Your cut-off: ${cutoff.toFixed(2)} / 200`;

    resultBox.style.color = "rgb(38, 0, 255)";


    // Find colleges within ±10 of the student's cutoff
    const eligibleColleges = colleges.filter(
        (college) => Math.abs(college.cutoff - cutoff) <= 10
    );


    displayCollegeResults(eligibleColleges, cutoff);
}


// Display error message
function showError(message) {

    resultBox.textContent = message;
    resultBox.style.color = "rgb(250, 0, 0)";
    results.hidden = false;
}


// Display matching colleges
function displayCollegeResults(eligibleColleges, cutoff) {

    const heading = document.createElement("h3");

    if (eligibleColleges.length > 0) {
        heading.textContent =
            "Colleges near your cut-off (±10)";
    } else {
        heading.textContent =
            "No colleges found within ±10 of your cut-off";
    }

    collegeResults.appendChild(heading);


    if (eligibleColleges.length > 0) {

        const list = document.createElement("div");
        list.className = "college-list";


        // Sort colleges by how close they are to the student's cutoff
        eligibleColleges.sort(
            (a, b) =>
                Math.abs(a.cutoff - cutoff) -
                Math.abs(b.cutoff - cutoff)
        );


        eligibleColleges.forEach((college) => {

            const item = document.createElement("article");
            item.className = "college-item";


            const collegeName = document.createElement("strong");
            collegeName.textContent = college.name;


            const collegeDetails = document.createElement("span");
            collegeDetails.textContent =
                `TNEA code: ${college.code} | ${college.location}`;


            const referenceCutoff = document.createElement("small");
            referenceCutoff.textContent =
                `Reference cut-off: ${college.cutoff.toFixed(2)}`;


            item.appendChild(collegeName);
            item.appendChild(collegeDetails);
            item.appendChild(referenceCutoff);

            list.appendChild(item);
        });


        collegeResults.appendChild(list);
    }


    addResultNote();
}


// Add disclaimer and official links
function addResultNote() {

    const note = document.createElement("p");
    note.className = "result-note";


    note.append(
        "College cutoffs shown are rough sample estimates, not official eligibility predictions. ",
        "Actual cutoffs vary by branch, community, year and counselling round. ",
        "Verify college codes and current options on the "
    );


    const officialLink = document.createElement("a");

    officialLink.href = "https://www.tneaonline.org/";
    officialLink.textContent = "official TNEA portal";
    officialLink.target = "_blank";
    officialLink.rel = "noopener noreferrer";


    note.append(officialLink);


    note.append(
        ". College names and codes were cross-checked against the "
    );


    const listLink = document.createElement("a");

    listLink.href =
        "https://www.collegedekho.com/articles/list-of-tnea-participating-colleges/";

    listLink.textContent =
        "2025 participating-college list";

    listLink.target = "_blank";
    listLink.rel = "noopener noreferrer";


    note.append(listLink);
    note.append(".");


    collegeResults.appendChild(note);
}


// Handle form submission
form.addEventListener("submit", function (event) {

    event.preventDefault();

    calculateCutoff();
});


// Handle reset
resetButton.addEventListener("click", function () {

    results.hidden = true;

    resultBox.textContent = "";
    collegeResults.innerHTML = "";

    resultBox.style.color = "initial";
});