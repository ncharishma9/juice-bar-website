let motive = '';
let allergens = [];
let selectedIngredients = [];
let extras = [];
let cupSize = '';

// Page transitions
function goToPage2() {
    motive = document.getElementById("motive").value;
    if (motive) {
        document.getElementById("page1").style.display = 'none';
        document.getElementById("page2").style.display = 'block';
    }
}

function goToPage3() {
    allergens = [];
    if (document.getElementById("nut-allergy").checked) allergens.push("Nuts");
    if (document.getElementById("gluten-allergy").checked) allergens.push("Gluten");
    if (document.getElementById("dairy-allergy").checked) allergens.push("Dairy");

    suggestFruitsAndVeggies();
    
    document.getElementById("page2").style.display = 'none';
    document.getElementById("page3").style.display = 'block';
}

function suggestFruitsAndVeggies() {
    let suggestions = [];
    
    if (motive.toLowerCase().includes("energy")) {
        suggestions = ["Spinach", "Apple", "Banana", "Carrot"];
    } else if (motive.toLowerCase().includes("detox")) {
        suggestions = ["Beetroot", "Cucumber", "Lemon", "Ginger"];
    }
    
    // Filter out allergens
    suggestions = suggestions.filter(item => !allergens.includes(item));
    
    const selectElement = document.getElementById("fruit-veggie");
    selectElement.innerHTML = '';
    suggestions.forEach(item => {
        let option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}

function goToPage4() {
    selectedIngredients = Array.from(document.getElementById("fruit-veggie").selectedOptions).map(option => option.value);
    
    document.getElementById("page3").style.display = 'none';
    document.getElementById("page4").style.display = 'block';
}

function goToPage5() {
    extras = [];
    if (document.getElementById("pepper").checked) extras.push("Pepper");
    if (document.getElementById("chia-seeds").checked) extras.push("Chia Seeds");
    if (document.getElementById("honey").checked) extras.push("Honey");
    
    document.getElementById("page4").style.display = 'none';
    document.getElementById("page5").style.display = 'block';
}

function showSummary() {
    cupSize = document.getElementById("cup-size").value;

    let juiceImage = "path/to/juice-image.png"; // Placeholder image
    document.getElementById("juice-image").innerHTML = `<img src="${juiceImage}" alt="Your custom juice" />`;

    let nutritionInfo = calculateNutrition(selectedIngredients, cupSize, extras);

    let summaryText = `You chose a ${cupSize} juice with the following ingredients: ${selectedIngredients.join(", ")}.<br>Extras: ${extras.join(", ")}.<br>Your custom juice is designed to achieve your goal of: ${motive}.`;
    document.getElementById("summary-text").innerHTML = summaryText;
    document.getElementById("nutrition-info").innerHTML = `Calories: ${nutritionInfo.calories} | Protein: ${nutritionInfo.protein}g | Fats: ${nutritionInfo.fats}g`;

    document.getElementById("page5").style.display = 'none';
    document.getElementById("summary").style.display = 'block';
}

function calculateNutrition(ingredients, size, extras) {
    let calories = ingredients.length * 50 + (size === 'large' ? 100 : 50);
    let protein = ingredients.length * 1 + (extras.includes("Chia Seeds") ? 3 : 0);
    let fats = extras.includes("Pepper") ? 1 : 0;

    return { calories, protein, fats };
}

function showThankYou() {
    document.getElementById("thank-you").style.display = 'block';
    document.getElementById("summary").style.display = 'none';
}
