document.getElementById("juice-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the motive
    let motive = document.getElementById("motive").value;

    // Get the allergies (checkboxes)
    let allergies = [];
    document.querySelectorAll('input[name="allergy"]:checked').forEach(function(checkbox) {
        allergies.push(checkbox.value);
    });

    // Get selected ingredients
    let selectedIngredients = Array.from(document.getElementById("fruit-veggie").selectedOptions).map(option => option.value);

    // Get size
    let size = document.getElementById("size").value;

    // Display the summary
    let summaryText = `You are making a juice for the goal of: ${motive}.<br>Your selected ingredients are: ${selectedIngredients.join(", ")}.<br>Allergies to avoid: ${allergies.length > 0 ? allergies.join(", ") : "None"}.<br>Your selected size is: ${size}.`;
    document.getElementById("summary-text").innerHTML = summaryText;
});
