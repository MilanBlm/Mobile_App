// Header toegevoegd aan bestand
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

// tabs
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

// Navigation Drawer
// const listEl = drawerEl.querySelector('.mdc-list');
// const list = new MDCList(listEl);
// list.wrapFocus = true;

// const drawerEl = document.querySelector('.mdc-drawer');
// const drawer = new MDCDrawer(drawerEl);

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

const hamburger = document.querySelector('.mdc-top-app-bar__navigation-icon');
const close = document.querySelector('.mdc-list-item__closed');

hamburger.addEventListener('click', () => {
    drawer.open = true;
});

// close.addEventListener('click', () => {
//     drawer.open = false;
// });

listEl.addEventListener('click', (event) => {
  mainContentEl.querySelector('input, button').focus();
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});

// document.querySelector('.mdc-tab-bar button').onclick = function() {
//     const category = this.id.split('-')[0];
//     console.log(category);
//     const listItems = document.querySelectorAll('.my-masonry-image-list li');
//     listItems.forEach(item => {
//       if (item.getAttribute('data-category') === category) {
//         item.classList.remove('hidden');
//       } else {
//         item.classList.add('hidden');
//       }
//     });
//   }

const tabButtons = document.querySelectorAll('.mdc-tab-bar button');
tabButtons.forEach(button => {
  button.onclick = function() {
    const category = this.id.split('-')[0];
    console.log(category);
    const listItems = document.querySelectorAll('.my-masonry-image-list li');
    listItems.forEach(item => {
      if (item.getAttribute('data-category') === category) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }
});

function filterByCategory(event) {
    const category = event.target.id.split('-')[0];
    console.log(event.target);
    const listItems = document.querySelectorAll('.my-masonry-image-list li');
    listItems.forEach(item => {
      if (item.getAttribute('data-category') === category) {
        console.log(item.getAttribute('data-category'));
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

/*Sheet Meme*/
const topAppBarMeme = new MDCTopAppBar (document.querySelector('.mdc-top-app-bar-meme')); 
const tabBarBottomMeme = new MDCTabBar(document.querySelector('.mdc-tab-bar-meme'));
//alle image-list items op homepage krijgen een methode om de sheet voor de memes te openen 
let imageListItems = document.querySelectorAll('.mdc-image-list__item');
imageListItems.forEach(imageListItem => {
    imageListItem.addEventListener('click', function(){ openSheet('sheet-meme') });    
});

//als iemand op vorige drukt (naar home) worden deets gesloten
window.addEventListener('popstate', function(){
    closeSheets();
});

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
    console.log("close");
    //herstel de hoogte van de homepage weer naar oorspronkelijk formaat
    let mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.height = 'auto'; 
        mainContent.style.overflowY = 'auto';
    }
    //Verwijder eerste "alle" sheets weer uit het zicht met een animatie en daarna ook niet meer weergeven in browser let sheets = document.querySelectorAll('.sheet');
    let sheets = document.querySelectorAll('.sheet');
    sheets.forEach(sheet => {
        sheet.classList.add('sheet-out-of-view');
        setTimeout(function(){ sheet.classList.add('hidden'); }, 310);
    });

    //URL weer aanpassen naar home voor de zekeheid 
    history.pushState(null, null, window.location.pathname);
}

function openMeme(src) {
  document.getElementById('title').append('Meme')
  document.getElementById('meme-image').src = src

}
