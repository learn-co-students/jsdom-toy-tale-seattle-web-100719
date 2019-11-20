let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  getJSON();
  toyForm.addEventListener("submit", addToyToCollection);
});

function getJSON() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => extractJson(json));
}

function extractJson(json) {
  let hash = {};
  let toys = json;
  if(toys.length > 1){
    toys.forEach(toy => {
      hash["name"] = toy.name;
      hash["image"] = toy.image;
      hash["likes"] = toy.likes;
      hash["id"] = toy.id
      renderToy(hash);
    });
  }else{
    hash["name"] = toys.name;
    hash["image"] = toys.image;
    hash["likes"] = toys.likes;
    hash["id"] = toys.id
    renderToy(hash);
  }
  
}

function renderToy(hash) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = hash.id;
  // console.log(card.id);
  const name = document.createElement("h2");
  name.innerText = hash.name;
  const image = document.createElement("img");
  image.src = hash.image;
  image.className = "toy-avatar";
  const likes = document.createElement("p");
  likes.innerText = hash.likes;
  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like <3";
  // console.log(hash);
  button.addEventListener("click", function(e) {
    console.log(e)
    updateLikes(e);
  });
  const toyCollection = document.getElementById("toy-collection");
  toyCollection.appendChild(card);
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(button);
}

function addToyToCollection(e){
  e.preventDefault();
  let name = e.target[0].value
  let image = e.target[1].value
  
  let formData = {
    name: name,
    image: image,
    likes: 0
  };
   
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
   
  fetch("http://localhost:3000/toys", configObj)
  .then(res => res.json())
  .then(json => extractJson(json));
}

function updateLikes(e){
  let id = e.path[1].id;
  const toy = document.getElementById(id);
  
  const likes = toy.querySelector("p").innerText;
  // console.log(likes)
  
  let likeCount = parseInt(likes) + 1;

  let formData = {
    likes: likeCount,
    id: id
  };
   
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
   
  toy.querySelector("p").innerText = likeCount;

  fetch("http://localhost:3000/toys/"+id, configObj)
  
}