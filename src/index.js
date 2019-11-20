let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
   const addBtn = document.querySelector('#new-toy-btn');
   const toyForm = document.querySelector('.container');
   const toyInput = document.querySelector('.add-toy-form');

   addBtn.addEventListener('click', () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
         toyForm.style.display = 'block';
      } else {
         toyForm.style.display = 'none';
      }
   });
   toyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let newToy = {
         name: e.target.name.value,
         image: e.target.image.value,
         likes: 0,
      };
      fetch('http://localhost:3000/toys', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify({
            name: newToy.name,
            image: newToy.image,
            likes: newToy.likes,
         }),
      });
      buildToyNode(newToy);
      toyInput.name.value = ' ';
      toyInput.image.value = ' ';
   });
});

function fetchToys() {
   fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(json => {
         json.forEach(function(toy) {
            const toyData = getToy(toy);
            buildToyNode(toyData);
         });
      });
}

fetchToys();

function getToy(toy) {
   const hashy = {};
   hashy.name = toy.name;
   hashy.image = toy.image;
   hashy.likes = toy.likes;
   hashy.id = toy.id;
   return hashy;
}

function buildToyNode(toy) {
   const toyCollect = document.querySelector('#toy-collection');
   const card = document.createElement('div');
   card.classList.add('card');
   toyCollect.appendChild(card);
   const name = document.createElement('h2');
   name.textContent = toy.name;
   card.appendChild(name);
   const image = document.createElement('img');
   image.src = toy.image;
   image.classList.add('toy-avatar');
   card.appendChild(image);
   const paragraph = document.createElement('p');
   paragraph.textContent = `${toy.likes} Likes`;
   card.appendChild(paragraph);
   const button = document.createElement('button');
   button.classList.add('like-btn');
   button.textContent = 'Like';
   card.appendChild(button);
   button.addEventListener('click', function() {
      let toyLikes = ++toy.likes;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify({
            likes: toyLikes,
         }),
      });
      paragraph.textContent = `${toyLikes} Likes`;
   });
}
