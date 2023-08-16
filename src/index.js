import { getHotel } from "./hotels.js"


// Creating element within head
// css
const css = document.createElement('link')
css.rel = "stylesheet"
css.href = "./css/style.css"
const head = document.head
head.appendChild(css)

// Google fonts
const font_google_api = document.createElement('link')
font_google_api.rel = "preconnect";
font_google_api.href = "https://fonts.googleapis.com"
head.appendChild(font_google_api)

const font_gstatic_api = document.createElement('link')
font_gstatic_api.rel = "preconnect";
font_gstatic_api.href = "https://fonts.gstatic.com"
head.appendChild(font_gstatic_api)

const fonts_import = document.createElement('link')
fonts_import.rel = "stylesheet";
fonts_import.href = "https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pacifico&family=Roboto&display=swap"
head.appendChild(fonts_import)

// Creating elements within body
// header
const header = document.createElement('header')
const body = document.body
body.appendChild(header)

// h1
const h1 = document.createElement('h1')
h1.textContent = 'Book it!'
header.appendChild(h1)

// header container
const div_header = document.createElement('div')
div_header.id = 'header'
div_header.className = "header"
header.appendChild(div_header)

// main container
const div_filter_container = document.createElement('div')
div_filter_container.className = "filter-container"
div_header.appendChild(div_filter_container)

// grid container
const div_filter_grid = document.createElement('div')
div_filter_grid.className = "filter-grid"
div_filter_container.appendChild(div_filter_grid)

// filters content
div_filter_grid.innerHTML = '<select name="filter-countries" id="filter-countries" class="icon-countries filter-icon"><option value="all">All countries</option><option value="Argentina">Argentina</option><option value="Brasil">Brasil</option><option value="Chile">Chile</option><option value="Uruguay">Uruguay</option></select><input type="date" name="date-from" id="date-from" class="icon-date-from filter-icon"><input type="date" name="date-to" id="date-to" class="icon-date-to filter-icon"><select name="filter-prices" id="filter-prices" class="icon-prices filter-icon"><option value="all">All prices</option><option value="price1">$</option><option value="price2">$$</option><option value="3">$$$</option><option value="4">$$$$</option></select><select name="filter-sizes" id="filter-sizes" class="icon-sizes filter-icon"><option value="all">All sizes</option><option value="size1">Small</option><option value="size2">Medium</option><option value="size3">Large</option></select><button class="filter-clear" id="filter-clear">Clear</button>'

//  p 
const p1 = document.createElement('p')
p1.className = 'first-p'
p1.textContent = 'We have found for you...'
header.appendChild(p1)

const p2 = document.createElement('p')
p2.className = 'second-p'
p2.textContent = 'All sizes hotels of all category prices, in all countries.'
header.appendChild(p2)

const main = document.createElement('main')
main.className= 'Main'
body.appendChild(main)

// FETCH
const section = document.createElement('section');
section.className = 'card-container';
main.appendChild(section)
const response = await getHotel();
const json = await response.json();
console.log(json);

function generatecharacterprice(numero) {
  return "$".repeat(numero);
}


async function getHotels(json) {
  json.forEach((hotels) => {
    //select trgets hotels
    const article = document.createElement("article");
    article.className = "target-hotels-class";
    section.appendChild(article);

    //Crear e introducir imagnes
    const imgHotels = document.createElement("img");
    imgHotels.className = "images-hotels";
    imgHotels.setAttribute("src", hotels.photo);
    imgHotels.setAttribute("alt", "image hotel");    
    article.appendChild(imgHotels);

    //Crear e introducir nombre de hoteles
    const nameHotel = document.createElement("h2");
    nameHotel.className = "names-hotels";
    nameHotel.innerText = hotels.name;
    article.appendChild(nameHotel);

    //crear e introducir section
    const sectionChild = document.createElement("section");
    sectionChild.className = "container-info";
    article.appendChild(sectionChild);
    
    //crear e insertar div que tenga section y el button
    const divArticle = document.createElement("div");
    divArticle.className = "container-countries-number";
    sectionChild.appendChild(divArticle);

    const hotelDescription = document.createElement("p");
    hotelDescription.className = "hotel-descripcion";
    hotelDescription.innerText = hotels.description;
    sectionChild.appendChild(hotelDescription);

    //crear e introducir div que va a contener la img bandera y el pais texto
    const divFlag = document.createElement("div");
    divFlag.className = "container-div-flag";
    const nameCountry = document.createElement("p");
    nameCountry.className ="country-name"
    nameCountry.innerText = hotels.country;
    const imgFlag= document.createElement("img");
    imgFlag.className = "image-flag"
    imgFlag.setAttribute("src", `./assets/${hotels.country}.png`);
    divFlag.appendChild(imgFlag);
    divFlag.appendChild(nameCountry);
    divArticle.appendChild(divFlag);

    //crear e introducir div qe va a contener el precio y las habitaciones
    const divPrice = document.createElement("div");
    divPrice.className = "container-div-price";
    const rooms = document.createElement("p");
    rooms.className = "q-rooms"
    rooms.innerText = `${hotels.rooms} rooms -`;
    const roomPrices = document.createElement("p");
    roomPrices.className ="room-prices"
    roomPrices.innerText = generatecharacterprice(hotels.price);

    divPrice.appendChild(rooms);
    divPrice.appendChild(roomPrices);
    divArticle.appendChild(divPrice);

    //crear e insertar boton book it!
    const buttonBookIt = document.createElement("button");
    buttonBookIt.className = "button-book-it";
    buttonBookIt.innerText = "Book it!";
    article.appendChild(buttonBookIt);

    const buttonMore = document.createElement("button");
    buttonMore.className = "button-more";
    buttonMore.id = "button-more";
    buttonMore.innerText = "+";
    article.appendChild(buttonMore);
  });
}

getHotels(json);


//function filterPrices
const filterPrices = document.getElementById("filter-prices");
const dateFromInput = document.getElementById('date-from')
const dateToInput = document.getElementById('date-to')
const buttonFilter = document.getElementById("filter-clear");
const filterSizes = document.getElementById('filter-sizes')
const filterCountries = document.getElementById('filter-countries')

const initialValues = {
    filterPrices: filterPrices.value,
    dateFromInput: dateFromInput.value,
    dateToInput: dateToInput.value,
    filterSizes: filterSizes.value,
    filterCountries: filterCountries.value

};

filterPrices.addEventListener("change", () => {
  let getValue = filterPrices.value;
  let filtervalue= getValue[getValue.length -1]
  let consultDate = json;

  if (getValue != "all") {

    consultDate = json.filter((hotels) => hotels.price == filtervalue);
  }
  section.innerHTML = "";
  getHotels(consultDate);

});

filterCountries.addEventListener("change", () => {
    let getValue = filterCountries.value;
    let consultDate = json;
  
    if (getValue != "all") {
  
      consultDate = json.filter((hotels) => hotels.country == getValue);
    }
    section.innerHTML = "";
    getHotels(consultDate);
  
  });

let daysFrom

function dayTo(to){
    let seg = 1000
    let min = 60 * seg
    let hours = 60 * min
    let day = 24 * hours
    let daysTo = to/day
    return daysTo
}
function dayFrom(from){
    let seg = 1000
    let min = 60 * seg
    let hours = 60 * min
    let day = 24 * hours
    let daysFrom = from/day
    return daysFrom;
}
// function daysAvailable(to, from) {   
//     let diffToFrom = to -from
//     console.log(diffToFrom);
//     return diffToFrom
// }

// dateFromInput.addEventListener("change", () => {
//     const dateFrom = new Date(dateFromInput.value).getTime()
//     const daysfrom =  dayFrom(dateFrom) 
//     console.log(daysfrom);
   
// })
// dateToInput.addEventListener('change',()=> {
//     const dateTo = new Date(dateToInput.value).getTime()
//     const daysto = dayTo(dateTo)
//     console.log(daysto);
    
// })

// let retadias = daysfrom - daysto

// console.log(retadias);

//funcion para eliminar filtros



dateFromInput.addEventListener("change", () => {
    const dateFrom = new Date(dateFromInput.value).getTime();
    daysFrom = dayFrom(dateFrom);
    calculateDifference();
});

let daysTo; // Variable para almacenar el valor de dayTo

dateToInput.addEventListener('change', () => {
    const dateTo = new Date(dateToInput.value).getTime();
    daysTo = dayTo(dateTo);
    calculateDifference();
});

function calculateDifference() {
    if (typeof daysFrom !== 'undefined' && typeof daysTo !== 'undefined') {
        const differenceInDays = daysTo - daysFrom;
        console.log("Diferencia en días:", differenceInDays);
    }
}



buttonFilter.addEventListener("click", () => {
  filterPrices.value = initialValues.filterPrices;
  dateFromInput.value = initialValues.dateFromInput;
  dateToInput.value = initialValues.dateToInput;
  filterCountries.value = initialValues.filterCountries;
  filterSizes.value = initialValues.filterSizes
  section.innerHTML = "";
  getHotels(json);
});

