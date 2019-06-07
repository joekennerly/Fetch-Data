// Get data, 
fetch("http://localhost:8088/food")

  // convert to JSON, loop over array
  .then(response => response.json())
  .then(parsedFoods => {

    //loop over the array
    parsedFoods.forEach(foodObject => {

      // Now fetch the food from the Food API
      fetch(`https://world.openfoodfacts.org/api/v0/product/${foodObject.barcode}.json`)
      .then(response => response.json())
      .then(productInfo => {
        
        foodObject.ingredients = productInfo.product.ingredients
        
          // Produce HTML representation
          const foodAsHTML = foodString(foodObject)

          // Add representaiton to DOM
          addFoodToDom(foodAsHTML)
      })


    });

  });
// Food List Container
const foodList = document.querySelector(".foodList");

// Function that outputs a str of HTML
const foodString = food => {

  // Top Section 
  let foodLiteral = `
  <div class="foodItem">
    <h3>${food.name}</h3>
    <p>${food.category}</p>
    <p>${food.ethnicity}</p>
  `
  
  // Loop over array, concat each element
  food.ingredients.forEach(ingredient => {
    foodLiteral += `
      <ul>  
        <li>${ingredient.text}</li>
      </ul
    </div>
    `
  })

  // Return the full string to put in DOM
  return foodLiteral
};

// Adds a string of html to foodlist container
const addFoodToDom = (aString) => {
  foodList.innerHTML += aString
}