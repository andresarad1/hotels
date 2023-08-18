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
div_filter_grid.innerHTML = '<select name="filter-countries" id="filter-countries" class="icon-countries filter-icon"><option value="all">All countries</option><option value="Argentina">Argentina</option><option value="Brasil">Brasil</option><option value="Chile">Chile</option><option value="Uruguay">Uruguay</option></select><input type="date" name="date-from" id="date-from" class="icon-date-from filter-icon"><input type="date" name="date-to" id="date-to" class="icon-date-to filter-icon"><select name="filter-prices" id="filter-prices" class="icon-prices filter-icon"><option value="all">All prices</option><option value="1">$</option><option value="2">$$</option><option value="3">$$$</option><option value="4">$$$$</option></select><select name="filter-sizes" id="filter-sizes" class="icon-sizes filter-icon"><option value="all">All sizes</option><option value="size1">Small</option><option value="size2">Medium</option><option value="size3">Large</option></select><button class="filter-clear" id="filter-clear">Clear</button>'

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
// Event to load hotels
window.addEventListener("load", loadHotels)

// Variables to get filter elements
const filterPrices = document.getElementById("filter-prices");
const dateFromInput = document.getElementById('date-from')
const dateToInput = document.getElementById('date-to')
const buttonFilter = document.getElementById("filter-clear");
const filterSizes = document.getElementById('filter-sizes')
const filterCountries = document.getElementById('filter-countries')

// Create and append section 
const section = document.createElement('section');
section.className = 'card-container';
main.appendChild(section)

// Function to load cards
let json =[]

//Function to generate cards with the hotel information
function getHotels(json) {
  section.innerHTML ="";

  json.forEach((hotels) => {
    //create every article
    const article = document.createElement("article");
    article.className = "target-hotels-class";
    section.appendChild(article);

    //Create and insert images
    const imgHotels = document.createElement("img");
    imgHotels.className = "images-hotels";
    imgHotels.setAttribute("src", hotels.photo);
    imgHotels.setAttribute("alt", "image hotel");    
    article.appendChild(imgHotels);

    //Create and enter hotel names
    const nameHotel = document.createElement("h2");
    nameHotel.className = "names-hotels";
    nameHotel.innerText = hotels.name;
    article.appendChild(nameHotel);

    //Create and enter section
    const sectionChild = document.createElement("section");
    sectionChild.className = "container-info";
    article.appendChild(sectionChild);
    
    //Create and insert div for countries and prices
    const divArticle = document.createElement("div");
    divArticle.className = "container-countries-number";
    sectionChild.appendChild(divArticle);

    // Create and insert p for hotel descriptions
    const hotelDescription = document.createElement("p");
    hotelDescription.className = "hotel-descripcion";
    hotelDescription.innerText = hotels.description;
    sectionChild.appendChild(hotelDescription);

    //Create and insert div that will contain the flag img and the country text
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

    //Create and insert div that will contain the price and rooms.
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

    //Create and insert book it button!
    const buttonBookIt = document.createElement("button");
    buttonBookIt.className = "button-book-it";
    buttonBookIt.innerText = "Book it!";
    article.appendChild(buttonBookIt);

    //Create and insert the bottom of more information
    const buttonMore = document.createElement("button");
    buttonMore.className = "button-more";
    buttonMore.id = "button-more";
    buttonMore.innerText = "+";
    article.appendChild(buttonMore);
    
    //Test dynamic text
    p2.textContent = `All sizes hotels of all category prices, in ${filterCountries.value}. `
  });
  
  main.appendChild(section)
}

// Get hotels from API
async function loadHotels(){
  const response = await getHotel();
  json = await response.json();
  getHotels(json);
}

// Function to generate sign ($) per number
function generatecharacterprice(numero) {
  return "$".repeat(numero);
}

// Create constant to return inputs to initial values
const initialValues = {
    filterPrices: filterPrices.value,
    dateFromInput: dateFromInput.value,
    dateToInput: dateToInput.value,
    filterSizes: filterSizes.value,
    filterCountries: filterCountries.value

};

//Function to apply filters
function applyFilters(){  

  //Create constants to identify selected option
  const getValuePrices = parseInt(filterPrices.value)
  const getValueCountry = filterCountries.value;
  const getValueSize = filterSizes.value;
  const dateFrom = new Date(dateFromInput.value).getTime();
  const dateTo = new Date(dateToInput.value).getTime();
  
  //Constant defining the filters to be applied
  const filterHotels = json.filter((hotel)=> {
    let country = true;
    if(getValueCountry !== "all"){
       country = hotel.country === getValueCountry;
    }

    let prices =true;
    if(!!getValuePrices ){
      prices =hotel.price === getValuePrices;
    }

    let size = true;
    if(getValueSize === "size1"){
      size = hotel.rooms < 10;
    }else if (getValueSize === "size2") {
      size = hotel.rooms >= 10 && hotel.rooms <= 20;
    }else if(getValueSize === "size3"){
      size = hotel.rooms > 20;
    }

    let date = true;
    if (dateFrom && dateTo) {

      // Constants to calculate the difference between the selected days and those of the API
      const differenceTimeHotel = Math.ceil(Math.abs(hotel.availabilityTo - hotel.availabilityFrom));
      const differenceTimeSelected = Math.ceil(Math.abs(dateTo - dateFrom));
      date = differenceTimeSelected  <= differenceTimeHotel ;      
    }

    return country && prices && size && date
  
  })
  getHotels(filterHotels)
}

//Filter by country
filterCountries.addEventListener("change", applyFilters)

//Filter by price
filterPrices.addEventListener("change", applyFilters)

//Filter by room size
filterSizes.addEventListener("change", applyFilters)

//Filter by available time
dateFromInput.addEventListener("change", applyFilters)
dateToInput.addEventListener("change", applyFilters)


//Restart by clicking on the button
buttonFilter.addEventListener("click", async () => {
  filterPrices.value = initialValues.filterPrices;
  dateFromInput.value = initialValues.dateFromInput;
  dateToInput.value = initialValues.dateToInput;
  filterCountries.value = initialValues.filterCountries;
  filterSizes.value = initialValues.filterSizes
  section.innerHTML = "";
    await loadHotels();
});

