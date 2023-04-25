let charactersUrl = "https://www.moogleapi.com/api/v1/characters";
let gamesUrl = "https://www.moogleapi.com/api/v1/games";
let buttonsSection = document.getElementById('buttonsContainer')
let missingImage = "https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=6&m=1288129985&s=170667a&w=0&h=xCdaKox_lJDBu1HJy-_TSUrotisDUcsziOF13uAckwg="
let gameDescription = document.getElementById('gameInfo')

// console.log(buttons);

let dataGames = [];
async function getGameData(){

    let reponse = await fetch(gamesUrl)
//     console.log(reponse);
     dataGames = await reponse.json()
     console.log(dataGames);

     return dataGames
     // .catch(error => console.error(error))

}
getGameData()

// Character's endpoint fetch --------------------------------//
fetch(charactersUrl)
.then(response => response.json())
.then(data => {
     // console.log(data);
     let arrayOrigin = [...new Set(data.map( element => element.origin))]
     // console.log(arrayOrigin);
     let arraysByGame = arrayOrigin.map( elementA => data.filter( elementB => elementB.origin == elementA ))
     // console.log(arraysByGame);
     createButtons(arrayOrigin, buttonsSection)
     let buttons = document.querySelectorAll('button')
     filterByGame ( buttons , data)

})
.catch(error => console.error(error))

// Character's endpoint fetch --------------------------------//





// First fetch functions ---------------------------------------------------------------//
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
          <button value="${element}" class="btn btn-primary btn-sm">${element}</button>
          `
     } )
}

let cardsSection = document.getElementById('cardsContainer')
function printCards(array){
     cardsSection.innerHTML = ""
     let auxiliardiv = document.createElement('div')
     auxiliardiv.classList.add('d-flex', 'justify-content-center', 'flex-wrap', 'gap-3', 'm-5')
     let fragment = document.createDocumentFragment()
     array.forEach( element => {
          let description = (element.description) == null ? "No description avaiable" : element.description || (element.description).length > 250 ? (element.description).slice(0, 250) : element.description
          // console.log(description);
          auxiliardiv.innerHTML += 
          `
          <div class="card" style="width: 22rem;">
          <img style="height: 18rem;" src="${ !element.pictures[0] ? missingImage : element.pictures[0].url }" class="card-img-top object-fit-scale" alt="...">
          <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${ description.length < 250 ? description : description + ' <a href="#">...ver mas</a>' }</p>
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item">Job: ${element.job}</li>
          <li class="list-group-item">Age: ${element.age}</li>
          <li class="list-group-item">Race: ${element.race}</li>
          </ul>
          <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
          </div>
          </div>
          `
     })
     console.log([fragment]);
     fragment.appendChild(auxiliardiv)
     cardsSection.appendChild(fragment)
}
