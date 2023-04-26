let charactersUrl = "https://www.moogleapi.com/api/v1/characters";
let gamesUrl = "https://www.moogleapi.com/api/v1/games";
let buttonsSection = document.getElementById('buttonsContainer')
let missingImage = "https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=6&m=1288129985&s=170667a&w=0&h=xCdaKox_lJDBu1HJy-_TSUrotisDUcsziOF13uAckwg="
let gameDescription = document.getElementById('gameInfo')

// console.log(buttons);

// GAMES's endpoint fetch --------------------------------//
let dataGames = [];
async function getGameData() {

     let reponse = await fetch(gamesUrl)
     //   console.log(reponse);
     dataGames = await reponse.json()
     console.log(dataGames);
     let dataGamesWithId = dataGames.map( (object, indice) => {
          object.id = (indice ++) +1
          return object
     } )
     console.log(dataGamesWithId);
     return dataGames
     // .catch(error => console.error(error))

}
getGameData()

// CHARACTER's endpoint fetch --------------------------------//
fetch(charactersUrl)
     .then(response => response.json())
     .then(data => {
          // console.log(data);
          let arrayOrigin = [...new Set(data.map(element => element.origin))]
          ordenaArray (arrayOrigin)

          let arraysByGame = arrayOrigin.map(elementA => data.filter(elementB => elementB.origin == elementA))
          // console.log(arraysByGame);
          createButtons(arrayOrigin, buttonsSection)
          let buttons = document.querySelectorAll('button')
          filterByGame(buttons, data, dataGames)

     })
     .catch(error => console.error(error))

function ordenaArray (array){
     let ffBe = array.splice(1,1)
     let ffIX = array.splice(4,1)
     console.log(ffIX[0]);
     console.log(ffBe[0]);
     console.log(array);
     array.push("Final Fantasy BE")
     array.splice(8,0,ffIX)
     console.log(array);
     return array
}


// First fetch functions ---------------------------------------------------------------//
function filterByGame(buttonNodeList, originalArray, gamesArray) {
     buttonNodeList.forEach(element => {
          element.addEventListener('click', (e) => {
               let arrayFilteredByOrigin = originalArray.filter(object => object.origin == e.target.value)
               let gameSagaOfCharacter = gamesArray.filter( object => object.id == e.target.id )
               console.log(gameSagaOfCharacter);
               console.log(arrayFilteredByOrigin);
               printCards(arrayFilteredByOrigin)
               createGameSection (gameSagaOfCharacter, gameDescription)
          })
     })
}

function createButtons(array, htmlElementId) {
     array.forEach((element, indice) => {
          htmlElementId.innerHTML +=
               `
          <button value="${element}" id="${(indice++) +1}" class="btn btn-primary btn-sm">${element}</button>
          `
     })
}

function createGameSection (array, htmlElementId){
     console.log(array);
     htmlElementId.innerHTML = "";
     let auxiliardiv = document.createElement('div')
     auxiliardiv.classList.add('d-flex', 'justify-content-center')
     array.forEach( element => {
          auxiliardiv.innerHTML = 
          `
          <div class="card mb-3 w-75">
               <img class="w-50 d-flex align-self-center m-5" src="${element.picture}" class="card-img-top" alt="...">
               <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
               </div>
          </div>
          `
     })
     htmlElementId.appendChild(auxiliardiv)
}

let cardsSection = document.getElementById('cardsContainer')
function printCards(array) {
     cardsSection.innerHTML = ""
     let auxiliardiv = document.createElement('div')
     auxiliardiv.classList.add('d-flex', 'justify-content-center', 'flex-wrap', 'gap-3', 'm-5')
     let fragment = document.createDocumentFragment()
     array.forEach(element => {
          let description = (element.description) == null ? "No description avaiable" : element.description || (element.description).length > 250 ? (element.description).slice(0, 250) : element.description
          // console.log(description);
          auxiliardiv.innerHTML +=
               `
          <div class="card" style="width: 22rem;">
          <img style="height: 18rem;" src="${!element.pictures[0] ? missingImage : element.pictures[0].url}" class="card-img-top object-fit-scale" alt="...">
          <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${description.length < 250 ? description : description + ' <a href="#">...ver mas</a>'}</p>
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
