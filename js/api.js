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

        //VERIFICAMOS SI EL LOCAL STORAGE CONTIENE MENOS DE 5 FRASES

        let quotesFromStorage = localStorage.getItem("quotes")
        quotesFromStorage = JSON.parse(quotesFromStorage)
        console.log(quotesFromStorage)

        if (quotesFromStorage == null || quotesFromStorage.length < 5 ){

            //LLAMADO DE API PARA OBTENER UNA NUEVA FRASE
            const response = await fetch(url);
            console.log("Estado de la respuesta:", response.status);
            const datos = await response.json()
            console.log(datos);
            const arrayQuotes = JSON.parse(datos.contents)  //convierto la cadena devuelta en array
            console.log(arrayQuotes)
                          
            let author = arrayQuotes[0].a
            let quote = arrayQuotes[0].q

            //GUARDAR FRASE Y AUTOR EN LOCALSTORAGE
            const quotes = JSON.parse(localStorage.getItem("quotes")) || []

            let authorAndQuote = {
                author,
                quote
            }
            
            //BUSCO SI EXISTE UNA FRASE IGUAL EN LOCAL STORAGE
            const exist = quotes.some((element)=>element.quote === authorAndQuote.quote 
            )

            if(exist){
                console.log("Existen dos frases iguales")
            }   else{
                quotes.push(authorAndQuote)
                localStorage.setItem("quotes" , JSON.stringify(quotes))
            }


            //MUESTRO FRASE Y AUTOR EN PANTALLA
            textQuotes.textContent = `${quote}`;
            authorName.textContent = `${author}`;

        }else if(quotesFromStorage.length = 5){
            let randomQuotes = JSON.parse(localStorage.getItem("quotes")); 
            randomQuotes = randomQuotes[Math.floor(Math.random()* randomQuotes.length)];
            
            
            textQuotes.textContent = randomQuotes.quote
            authorName.textContent = randomQuotes.author;
        }

        

    } catch (error){
        console.log('Error de la peticion', error)
    }
}


// getQuotes(API_URL)
button.addEventListener("click", ()=>{
    getQuotes(API_URL)
    console.log('ando')
})
