const goose = document.getElementById("goose")
const owl = document.getElementById("owl")
const eagle = document.getElementById("eagle")
const swan = document.getElementById("swan")

function chooseCharacter(selectedCharacter){
    
    console.log(selectedCharacter.getAttribute("src"))
    
    sessionStorage.setItem("character", selectedCharacter)
}

function chooseCharacter (selectedCharacter) {
    // (A) VARIABLES TO PASS
    let character = selectedCharacter
  
    // (B) URL PARAMETERS
    let params = new URLSearchParams();
    params.append("character", character);
  
    // (C) GO!
    let url = "1b-query.html?" + params.toString();
    location.href = url;

}