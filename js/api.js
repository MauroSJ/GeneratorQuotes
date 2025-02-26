console.log('funncionando')
/*-----------SELECTOR DE ELEMENTOS-----------*/

let authorName = document.querySelector(".flex-container__box-author-name")
let textQuotes = document.querySelector(".flex-container__box-text-quotes")


/*-----------PETICION A API-----------*/

// const API_URL = "https://zenquotes.io/api/quotes/  el sevidor de la api no permite peticiones directas (es decir desde el navegador) por eso uso un proxy como intermediario.
// " 
const API_URL = "https://api.allorigins.win/get?url=https://zenquotes.io/api/random";


async function getQuotes(url) {
    try {
        const response = await fetch(url);
        console.log("Estado de la respuesta:", response.status);
        const datos = await response.json()
        console.log(datos);
        const arrayQuotes = JSON.parse(datos.contents)  //convierto la cadena devuelta en array
        console.log(arrayQuotes)
                                        
        const author = arrayQuotes[0].a
        const quotes = arrayQuotes[0].q

        authorName.textContent = `${author}`;
        textQuotes.textContent = `${quotes}`;

    } catch (error){
        console.log('Error de la peticion', error)
    }
}

// getQuotes(API_URL);



