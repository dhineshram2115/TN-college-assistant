function Calculate() {
    let resultBox = document.getElementById("finalresult");
    
    resultBox.textContent = "";
    resultBox.style.color = "initial"; 

    let mathsInput = document.getElementById("maths").value;
    let physicsInput = document.getElementById("physics").value;
    let chemistryInput = document.getElementById("chemistry").value;

    let maths = Number(mathsInput);
    let physics = Number(physicsInput);
    let chemistry = Number(chemistryInput);

    if (isNaN(maths) || isNaN(physics) || isNaN(chemistry)) {
        resultBox.textContent = "⚠️ Error: Marks must be valid numbers, not alphabets!";
        resultBox.style.color = "rgb(250, 0, 0)";
        return;
    }

    if (maths < 0 || physics < 0 || chemistry < 0) {
        resultBox.textContent = "⚠️ Error: Marks cannot be negative numbers!";
        resultBox.style.color = "rgb(250, 0, 0)";
        return;
    }

    if (maths > 100 || physics > 100 || chemistry > 100) {
        resultBox.textContent = "⚠️ Error: Marks cannot exceed 100 per subject.";
        resultBox.style.color = "rgb(250, 0, 0)";
        return;
    }

    let Cuttoff = maths + (physics / 2) + (chemistry / 2);

    resultBox.textContent = "Your Cut-off: " + Cuttoff.toFixed(2) + " / 200";
    resultBox.style.color = "rgb(38, 0, 255)";
}