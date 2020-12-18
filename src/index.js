let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  function fetchToys(){
    return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => {
      //console.log(data)
      //arr = Object.keys(data)
      //addToys(data)
      data.forEach(addToys)
    
    })
  }
  
  let toyDiv = document.querySelector("#toy-collection")
  
  function addToys(toy){
    //toys.forEach(toy =>{
  
    let div = document.createElement("div")
    div.classList.add("card")
    div.dataset.id = toy.id 
   
    let h2 = document.createElement("h2")
    h2.textContent = toy.name 
  
    let img = document.createElement("img")
    img.classList.add("toy-avatar")
    img.src = toy.image
  
    let p = document.createElement("p")
    p.textContent = `${toy.likes} Likes`
  
    let button = document.createElement("button")
    button.classList.add("like-btn")
    button.textContent = "Like"
  
  
    div.append(h2, img, p, button )
    toyDiv.append(div)
  
    //})
  
  }
  
  // SUBMIT FORM 
  
  let newForm = document.querySelector("form.add-toy-form")
  
  newForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    
  
    const newToy = {
      name: evt.target.name.value, //what is this grabbing? by ID or name 
      image: evt.target.image.value,
      likes: 0,
    }
  
  
  fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success:", data)

        addToys(data)

        newForm.reset()
      })
  
  
  
  })
  
  
  
  
  // event delegation - LIKES 
  
  const toyCollectionDiv = document.querySelector("#toy-collection")
  toyCollectionDiv.addEventListener("click", function(evt){
    if (evt.target.matches(".like-btn")){
      const cardDiv = evt.target.closest(".card")
      const id = cardDiv.dataset.id 
      const p = cardDiv.querySelector("p")
      const newLikes = parseInt(p.textContent) + 1
    
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({likes: newLikes})
      })
      .then(response => response.json())
      .then(object => {
        p.textContent = `${object.likes} Likes`
  
      })
  
    }
  })
  

fetchToys()

  
});





// add div.dataset.id = toy.id on creation of card 
// you can do dataset.waffles => data-waffles: 2


