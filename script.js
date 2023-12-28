const apiKey = "c90326a92c6e478b9f2866fce34e7823";

recipe = {
    fetchRecipe: function(query){
        fetch(
            "https://api.spoonacular.com/recipes/complexSearch?query="
            + query 
            + "&apiKey="
            +apiKey
        )
        .then((response) => response.json())
        .then((data) => {
            const recipeId = data.results[0].id;
            return recipeId;
        })
        .then((recipeId) => {
            let link = "https://api.spoonacular.com/recipes/" 
            + recipeId 
            + "/information?&apiKey=" 
            + apiKey;
            console.log(link);
            fetch(
                link
            )
            .then((response) => response.json())
            .then((data) => this.displayRecipe(data))
        })
    },
    displayRecipe: function(data) {
        const {title, sourceUrl, image, readyInMinutes, servings} = data;
        console.log(title, sourceUrl, image, readyInMinutes, servings);
        document.querySelector(".query").innerText = title;
        document.querySelector(".link").href = sourceUrl; 
        document.querySelector(".link").innerText = "Recipe"; 
        document.querySelector(".image").src = image;
        document.querySelector(".time").innerText = "Cook time: " + readyInMinutes + " mins";
        document.querySelector(".servings").innerText = servings + " servings";
        document.querySelector(".display").classList.remove("loading");
    },
    search: function() {
        this.fetchRecipe(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search-button").addEventListener("click", function() {
    recipe.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key === "Enter"){
        recipe.search();
    }
})