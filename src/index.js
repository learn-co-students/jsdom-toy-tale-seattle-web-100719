let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const addToyForm = document.querySelector('.add-toy-form') 
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

   fetch('http://localhost:3000/toys')
   .then (response => response.json())
    .then (json => {
      json.forEach(toy => {
        // console.log("inside fetch")
        let toyData = extractDataFromJson(toy)
        createCard(toyData)
      });
    })

    // this will make data from json readable and available to other functions
    function extractDataFromJson(toy) {
      hash = {}
        hash['name'] = toy.name;
        hash['image'] = toy.image;
        hash['likes'] = toy.likes;
      return hash;
    }

    // create card that will show toy info (name, img, likes, button)
    function createCard(toyCard) {
      // console.log("inside create card")
      // create individual card for each toy
      let toyCollection = document.querySelector('#toy-collection');
      let card = document.createElement('div');
      card.className = "card";
      toyCollection.appendChild(card);

      // add name to card
      let toyName = document.createElement("h2");
      toyName.innerHTML = toyCard.name;
      card.appendChild(toyName); 

      // add image to card
      let toyImage = document.createElement("img");
      toyImage.src = toyCard.image; 
      toyImage.className = "toy-avatar";
      card.appendChild(toyImage); 

      // add likes in p tag
      let toyLikes = document.createElement("p");
      toyLikes.innerHTML = toyCard.likes;
      card.appendChild(toyLikes);

      // add button tag with class like 
      let toyButton = document.createElement("button");
      toyButton.className = "like-btn";
      toyButton.innerHTML = "Like";
      card.appendChild(toyButton);

      // add event listener for when user clicks it
      toyButton.addEventListener('click', function(e) {
        toyCard.likes += 1;
        toyLikes.innerHTML = toyCard.likes; 
      })
    }

    // collect input data from user, and construct a toy object

    addToyForm.addEventListener("submit", (e) => {createToy(e)})

    // POST request to obtain data from user
    // saves the new toy to the API

    function createToy(event) {
      event.preventDefault(); 
      let newToy = {};
      newToy['name'] = event.target.name.value
      newToy['image'] = event.target.image.value
      newToy['likes'] = 0
      createCard(newToy); 

      fetch('url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          name: event.target[0].value,
          image: event.target[1].value,
          likes: 0
        })
      })
    }

})







// fetch("http://localhost:3000/toys", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({
//           'name': newtoy.name,
//           'image': newtoy.image,
//           'likes': 0, 
//         })
//       });