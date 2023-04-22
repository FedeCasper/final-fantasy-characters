let url = "https://www.moogleapi.com/api/v1/characters"
let cardsSection = document.getElementById('cardContainer')


fetch(url)
.then(response => response.json())
.then(data => {
     console.log(data);
     let arrayOrigin = [...new Set(data.map( element => element.origin))]
     let arraysByGame = arrayOrigin.map( elementA => data.filter( elementB => elementB.origin == elementA ))
     console.log(arraysByGame);

     function createButton (){
          arrayOrigin.forEach( element => {
               cardsSection.innerHTML += 
               `
               <button type="button" class="btn btn-primary btn-sm">${element}</button>
               `

          } )

     }
     createButton()

function printCards(){
     for( array of arraysByGame){
          for(object of array){
               console.log(object);
          }
     }
}


})