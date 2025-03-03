console.log('funncionando')

// const API_URL = "https://zenquotes.io/api/quotes/  el sevidor de la api no permite peticiones directas (es decir desde el navegador) por eso uso un proxy como intermediario.
// " 
const API_URL = "https://api.allorigins.win/get?url=https://zenquotes.io/api/random";
const button = document.querySelector(".container-btn")

async function getQuotes(url) {
    try {
        const response = await fetch(url);
        console.log("Estado de la respuesta:", response.status);
        const datos = await response.json()
        console.log(datos);
        const arrayQuotes = JSON.parse(datos.contents)  //convierto la cadena devuelta en array
        console.log(arrayQuotes[0].q)
    } catch (error){
        console.log('Error de la peticion', error)
    }
}



button.addEventListener("click", ()=>{
    getQuotes(API_URL)
})