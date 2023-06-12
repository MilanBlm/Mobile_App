// Header toegevoegd aan bestand
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

// tabs
// Maak nieuwe instanties
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const list = MDCList.attachTo(document.querySelector('.mdc-list'));

// Stel de wrapFocus-eigenschap van de 'list' in op 'true'
list.wrapFocus = true;

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

// Zoek element classnaam en sla het op in de constante 
const hamburger = document.querySelector('.mdc-top-app-bar__navigation-icon');

// Zoek element classnaam en sla het op in de constante 
const close = document.querySelector('.mdc-list-item__closed');

// Voeg gebeurtenislistener toe aan 'hamburger' reageert op klikgebeurtenis
hamburger.addEventListener('click', () => {
    drawer.open = true;
});

const tabButtons = document.querySelectorAll('.mdc-tab-bar button');
tabButtons.forEach(button => {
  button.addEventListener('click', filterItemsByMemeCategory);
});

function filterItemsByMemeCategory() {
  const Meme = this.id.split('-')[0];
  console.log(Meme);

  const listItems = document.querySelectorAll('.my-masonry-image-list li');
  listItems.forEach(item => {
    if (item.getAttribute('data-category') === Meme) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}


//alle image-list op homepage krijgen een methode om de sheet voor de memes te openen 
const topBarMeme = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar-meme'));
const tabBarMeme = new MDCTabBar(document.querySelector('.mdc-tab-bar-meme'));

let memeImageListItems = document.querySelectorAll('.mdc-image-list__item');
memeImageListItems.forEach(memeImageListItem => {
  memeImageListItem.addEventListener('click', openMemeSheet);
});

function openMemeSheet() {
  openSheet('sheet-meme');
}

//als je op home druk worden deets gesloten
window.addEventListener('popstate', closeSheets);

function closeSheets() {
  let sheets = document.querySelectorAll('.sheet');
  sheets.forEach(sheet => {
    sheet.classList.remove('sheet-out-of-view');
    sheet.classList.remove('hidden');
  });
}

function openSheet(sheetID)
{
    //selecteer de juiste sheet op basis van id
    let sheet = document.getElementById(sheetID);

    //zorg dat de sheet geladen wordt voor de browser, maar door margin is deze nog niet in het zicht
    sheet.classList.remove('hidden');

    //even wachten zodat het element zeker zichtbaar is voor de browser (wel uit het zicht van de gebruiker) en geanimeerd kan worden 
    setTimeout(function(){ sheet.classList.remove('sheet-out-of-view'); }, 10);

    //als de homepage heel lang zou zijn kan je onder de sheet door scrollen, dat willen we als de sheet open is voorkomen (wel pas na animatie) 
    let mainContent = document.getElementById('main-content');
    if (mainContent) {
        setTimeout(function(){
            let maxHoogteMain = sheet.getElementsByTagName('main')[0].offsetHeight - 10; 
            mainContent.style.height = '' + maxHoogteMain + 'px';
            mainContent.style.overflowY = "hidden";
        }, 300);
    }

    //Pas de url aan zodat de pagina uiteindelijk ook gedeeld kan worden, maar refresh niet!
    let newURL = window.location.href + '?sheet=' + sheetID;
    history.pushState(null,null,newURL);
}

function closeSheets()
{
    //herstel de hoogte van de homepage weer naar oorspronkelijk formaat
    console.log("close");
    PageHeight();
    
    function PageHeight() {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.style.height = 'auto';
        mainContent.style.overflowY = 'auto';
      }
    }

    //Verwijder eerste alle sheets weer uit het zicht met een animatie
    let sheets = document.querySelectorAll('.sheet');
    sheets.forEach(hideSheet);

    function hideSheet(sheet) {
      sheet.classList.add('sheet-out-of-view');
      setTimeout(function() {
        sheet.classList.add('hidden');
      }, 310);
    }

    //URL weer aanpassen naar home voor de zekeheid 
    history.pushState(null, null, window.location.pathname);
}
//Open van de meme wanneer je de op click
function openMeme(src) {
  const titleElement = document.getElementById('title');
  titleElement.textContent = 'Meme';

  const memeImageElement = document.getElementById('meme-image');
  memeImageElement.src = src;
}

function openscreen(src) {
  let main = document.getElementById('main-meme');
  main.innerHTML = `<video autoplay width="100%" src="${src}"></video>`;
  var splitArray = src.split('/');
  var wordAfterSlash = splitArray[splitArray.length - 1];
  var wordBeforePoint = wordAfterSlash.split('.');
  var memeTitle = document.getElementById('title');
  memeTitle.innerHTML = wordBeforePoint[0];
  document.getElementById('meme-image').classList.add('hidden')
}