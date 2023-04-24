let url = "https://www.moogleapi.com/api/v1/characters"
let buttonsSection = document.getElementById('buttonsContainer')

fetch(url)
.then(response => response.json())
.then(data => {
     console.log(data);
     let arrayOrigin = [...new Set(data.map( element => element.origin))]
     console.log(arrayOrigin);
     let arraysByGame = arrayOrigin.map( elementA => data.filter( elementB => elementB.origin == elementA ))
     console.log(arraysByGame);

     createButtons(arrayOrigin, buttonsSection)

     let buttons = document.querySelectorAll('button')
     let arrayFilterByGame = filterByGame ( buttons , data)

})

function filterByGame ( buttonNodeList, originalArray ){
     buttonNodeList.forEach( element => {
          element.addEventListener('click', (e) => {
               let arrayFilteredByOrigin = originalArray.filter( object => object.origin == e.target.value) 
               console.log(arrayFilteredByOrigin);
               printCards(arrayFilteredByOrigin)
          } )
     })
}

function createButtons (array, htmlElementId){
     array.forEach( element => {
          htmlElementId.innerHTML += 
          `
          <button type="button" value="${element}" class="btn btn-primary btn-sm">${element}</button>
          `
     } )
}

function printCards(array){
     let cardsSection = document.getElementById('cardsContainer')
     console.log(cardsSection);
     let fragment = document.createDocumentFragment()

     array.forEach( element => {
          console.log("object");
          fragment.innerHTML += 
          `
          <div class="card" style="width: 18rem;">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
          </ul>
          <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
          </div>
          </div>
          `
     })
     cardsSection.appendChild(fragment)
}