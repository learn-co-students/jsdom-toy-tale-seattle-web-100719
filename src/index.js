  let addToy = false
  let url = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const otherForm = document.querySelector('.add-toy-form')
  let toyDiv = document.getElementById("toy-collection")
  
  otherForm.addEventListener("submit", () => {addNewToy(event)})

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  fetch(url)
  .then(res=>res.json())
  .then(json=>{
    createToys(json)
  })

  function createToys(json){
    for(let i=0; i<json.length; i++){
      appendToyCard(json[i])
    }
  }

  function likeToy(toy){
    toy.likes++
    if(toy.likes>=10){
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "DELETE",
      })
      .then(res=>res.json())
      .then(json=>{
        alert(`${toy.name} has reached the sweet release`)
        let toyCard = document.getElementById(toy.image)
        toyCard.className = 'ded'
      })
    }
    else{
      let patchData = JSON.stringify(toy)
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: patchData
      })
  
      let likesOnPage = document.getElementById(toy.id)
      likesOnPage.innerText = `${parseInt(likesOnPage.innerText) + 1} request(s) for death` 
    }
  }

  function addNewToy(e){
    e.preventDefault()
    let postData = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.id){
        appendToyCard(json)
        let inputs = document.getElementsByClassName("input-text")
        inputs[0].value = ''
        inputs[1].value = ''
        console.log(inputs[0].value, "<--That is the value of the input")
      }
      else {
        alert("something fucked up")
      }
    })
  }

  function appendToyCard(toyInfo){
    let card = document.createElement('div')
    card.className = "card"
    card.id = toyInfo.image
    let h2 = document.createElement('h2')
    h2.innerText = toyInfo.name
    let img = document.createElement('img')
    img.className = "toy-avatar"
    img.src = toyInfo.image
    let p = document.createElement('p')
    p.innerText = `${toyInfo.likes} request(s) for death`
    p.id = toyInfo.id
    let btn = document.createElement('button')
    btn.className = 'like-btn'
    btn.innerText = "let me die"
    btn.addEventListener('click', () => likeToy(toyInfo))

    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(btn)
    toyDiv.appendChild(card)
  }

})
