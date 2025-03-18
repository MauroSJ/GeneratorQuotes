console.log('funncionando')
/*-----------SELECTOR DE ELEMENTOS-----------*/

let textQuotes = document.querySelector(".container__box-text-quotes")
let authorName = document.querySelector(".container__box-author-name")
const button = document.querySelector(".container-btn")


/*-----------PETICION A API-----------*/

// const API_URL = "https://zenquotes.io/api/quotes/  el sevidor de la api no permite peticiones directas (es decir desde el navegador) por eso uso un proxy como intermediario.
// " 
const API_URL = "https://api.allorigins.win/get?url=https://zenquotes.io/api/today";

async function getQuotes(url) {

    try {
        const response = await fetch(url);
        console.log("Estado de la respuesta:", response.status);
        const datos = await response.json()
        console.log(datos);
        const arrayQuotes = JSON.parse(datos.contents)  //convierto la cadena devuelta en array
        console.log(arrayQuotes)
                                        
        let author = arrayQuotes[0].a
        let quote = arrayQuotes[0].q

        //GUARDAR FRASE Y AUTOR EN LOCALSTORAGE
        let quotes = []

        let authorAndQuote = {
            author,
            quote
        }

        let quotesFromStorage = localStorage.getItem("quotes")
        quotesFromStorage = JSON.parse(quotesFromStorage)
        console.log(quotesFromStorage)

        if (quotesFromStorage == null){
            quotes.push(authorAndQuote)
            localStorage.setItem("quotes", JSON.stringify(quotes))
        }else if(quotesFromStorage.length == 0 && quotesFromStorage.length <= 5){
            quotes.push(authorAndQuote)
            localStorage.setItem("quotes", JSON.stringify(quotes))
        }





        //MUESTRO FRASE Y AUTOR EN PANTALLA
        textQuotes.textContent = `${quote}`;
        authorName.textContent = `${author}`;

    } catch (error){
        console.log('Error de la peticion', error)
    }
}


// getQuotes(API_URL)
button.addEventListener("click", ()=>{
    getQuotes(API_URL)
    console.log('ando')
})
