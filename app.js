document.addEventListener('DOMContentLoaded', function() {
    generatePokemonAndRecipe();
});

function generatePokemonAndRecipe() {
    fetchPokemon().then(fetchRandomRecipe); // Ensure fetchPokemon completes before fetchRandomRecipe
}

function fetchPokemon() {
    const pokemonId = Math.floor(Math.random() * 80) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    return fetch(url)  // Added return here
        .then(response => response.json())
        .then(pokemon => {
            const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);
            document.getElementById('pokemonName').textContent = capitalizedPokemonName;
            document.getElementById('pokemonImage').src = pokemon.sprites.front_default;
            return capitalizedPokemonName; // Returning this for use in the next fetch call
        })
        .catch(error => console.error('Error fetching Pokémon:', error));
}

function fetchRandomRecipe(pokemonName) {
    const apiKey = 'your_spoonacular_api_key';
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${'0ee7d707f26841648dcb27ccc2085947'}&number=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const recipe = data.recipes[0];
            document.getElementById('recipeTitle').textContent = recipe.title;
            document.getElementById('recipeImage').src = recipe.image;
            document.getElementById('recipeInfo').querySelector('h2').textContent = `${pokemonName}'s Recipe`;  // Update recipe title
            const ingredientsList = document.getElementById('recipeIngredients');
            ingredientsList.innerHTML = ''; // Clear previous ingredients

            recipe.extendedIngredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient.original;
                ingredientsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching recipe:', error));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
