fetch('url')
.then (response => resp.json())
.then (json => {
    // add to functions, console.log, etc.
    json.results.forEach 
})

fetch('url', {
    method: 'POST'
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        // dog: 'Byron' 

        // example for dancer lab

        feedback: { // this is because we have nested data in strong params
            dancer_id: id,
            content: feedback
          }
        })
      })
      .then(resp => resp.json())
      .then(json => console.log(json))
      .catch(console.log)
        
    })
}) 

// steps to 