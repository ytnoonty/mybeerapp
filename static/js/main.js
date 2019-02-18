// Init ScreenUpdater
const screen = new ScreenUpdater;

let flashMsgDiv = document.getElementById('flash-msg-div');
let updateProcessPrint = document.getElementById('update-tv-screen');
let refreshed = false;
let refreshCount = 0;

let form = document.getElementById('edit_form');
let editList = document.getElementById('edit-beerlist');

let editWinelistForm = document.getElementById('edit-winelist-form');
let editWinelistBtn = document.getElementById('edit-winelist-btn');

// flash message dissapear after 2.5seconds
setTimeout(() => {
  flashMsgDiv.style.display = 'none';
}, 2500);

if (editWinelistBtn != null) {
  editWinelistBtn.addEventListener("click", function(e) {
    editWinelistForm.submit();
  });
}

// adds click to refresh on the shamrocks jacks logo on beer_tv_screen
if (updateProcessPrint != null) {
  updateProcessPrint.addEventListener('click', function(e){
    window.location.reload();
    updateScreens();
    // moveTheStuff();
  });
}
let divTicker = document.querySelector(".ticker");
let infoTicker = document.querySelectorAll(".info");
// let movement = getMovement(infoTicker);
// let duration = getDuration(infoTicker);
let oldMovement = 0;

if (editList != null) {
  editList.addEventListener("click", function(e) {
    form.submit();
    // e.preventDefault();
  });
  // updateScreens();
}


// if (divTicker) {
//   animateTicker(divTicker, movement, duration);
// }

// moveTheStuff();
// getMovement();
// getDuration();
updateExample6();
updateScreens();
function updateScreens() {
  movement = getMovement(infoTicker);
  duration = getDuration(infoTicker);
  // console.log("oldMovement: " + oldMovement);
  // console.log("oldMovement: " + oldMovement + "   movement: " + movement)
  if (oldMovement != movement) {
    oldMovement = movement;
    // console.log("oldMovement in the IF: " + oldMovement);
    if (divTicker != null) {
      animateTicker(divTicker, movement, duration);
    }
  }
  // console.log("*************UPDATING SCREENS*************");
  loadBeerlist();
  updateProccess_print();
  updateBottleBeers();
  updateOnTapCurrent();
  updateOnTapNext();
  updateExample6();
  loadTicker();
  screenRefresh();
  setTimeout(updateScreens, 2000);
}

//////////////////////////////////////////////////////
// START screenRefresh()
//////////////////////////////////////////////////////
function screenRefresh() {
  // console.log("***********Screen Refresh************")
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let min = currentTime.getMinutes();
  let sec = currentTime.getSeconds();
  let millSec = currentTime.getMilliseconds();
  if ((sec > 48 && sec < 60)){
    refreshed = true;
    // console.log("hour: " + hour + "  min: " + min + "  sec: " + sec + "     refreshed: " + refreshed);
  }
  if ((hour == 2 || hour == 11 || hour == 14 || hour == 23) && min == 1 && (sec >= 0 && sec < 12) && refreshed == true) {
    refreshCount++;
    refreshed = !refreshed;
    window.location.reload();
  }
}
//////////////////////////////////////////////////////
// END screenRefresh()
//////////////////////////////////////////////////////



//////////////////////////////////////////////////////
// START loadBeerlist()
//////////////////////////////////////////////////////
function loadBeerlist(e) {
  // console.log('*************TESTING loadBeerlist*************');
  const xhr = new XMLHttpRequest();
  // console.log('READYSTATE1', xhr.readyState);
  // Open
  xhr.open('POST', '/update', true);
  // console.log('READYSTATE2', xhr.readyState);
  // console.log('STATUS before onload', this.status);
  // xhr.onload
  xhr.onload = function() {
    // console.log('READYSTATE-3', xhr.readyState);
    // console.log('STATUS after onload: ', this.status);
    if (this.status === 200) {
      // console.log(this.responseText);
      let data = JSON.parse(this.responseText);
      let data0116 = data.slice(0,16);
      let data1722 = data.slice(16,22);
      let data0108 = data.slice(0,8);
      let data0816 = data.slice(8,16);
      ///////////////////////////////////////////////
      // START BEERS_PRINT.HTML UPDATE
      ///////////////////////////////////////////////
      let beerListDivBP = document.getElementsByClassName('beer-list-div-bp');
      // console.log(beerListDiv);
      let htmlStuffBP = '';
      htmlStuffBP += `<ul id="" class='list-group-flush'>`;
      data0116.forEach(function(beer){
        htmlStuffBP += `<li id="" class='list-group-item'>${beer.id_dropdown}.  <span class="larger-text txt-clr-grn">${beer.name}</span> - ${beer.style} - ${beer.abv}% ABV - ${beer.ibu} IBU - ${beer.location} - <span class="italic-font">${beer.brewery}</span></li>`;
      });
      htmlStuffBP += `</ul>`;
      if (beerListDivBP[0] !== undefined) {
        beerListDivBP[0].innerHTML = htmlStuffBP;
      }
      let monthPBP = document.getElementsByClassName('month-p-bp');
      if (monthPBP[0] !== undefined) {
        monthPBP[0].innerHTML = `<span class="mx-3 larger-text txt-clr-grn">${data1722[0].name}</span>`;
      }
      let comingsoonPBP = document.getElementById('comingsoon-p-bp');
      if (comingsoonPBP !== null) {
        comingsoonPBP.innerHTML = `
        <span class="mx-4 larger-text txt-clr-grn">${data1722[1].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1722[2].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1722[3].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1722[4].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1722[5].name}</span>
        `;
      }
      ///////////////////////////////////////////////
      // END BEERS_PRINT.HTML UPDATE
      ///////////////////////////////////////////////
    }
  }
  xhr.send();
  // e.preventDefault();
}
//////////////////////////////////////////////////////
// END loadBeerlist()
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// START updateProccess_print(e) UPDATE
//////////////////////////////////////////////////////
function updateProccess_print(e) {
  // console.log('*************TESTING updateProccess_print*************');
  const xhr = new XMLHttpRequest();
  // console.log('READYSTATE1', xhr.readyState);
  // Open
  xhr.open('POST', '/update', true);
  // console.log('READYSTATE2', xhr.readyState);
  // console.log('STATUS before onload', this.status);
  // xhr.onload
  xhr.onload = function() {
    // console.log('READYSTATE-3', xhr.readyState);
    // console.log('STATUS after onload: ', this.status);
    if (this.status === 200) {
      // console.log(this.responseText);
      let data = JSON.parse(this.responseText);
      let data0116 = data.slice(0,16);
      let data1722 = data.slice(16,22);
      let data0108 = data.slice(0,8);
      let data0816 = data.slice(8,16);
      ///////////////////////////////////////////////
      // START proccess_print.html UPDATE
      ///////////////////////////////////////////////
      let beerListDivPP = document.getElementsByClassName('beer-list-div-pp');
      // beerListDivPP[0].innerHTML = "";
      // console.log(beerListDivPP[0]);
      let htmlStuffPP = '';
      htmlStuffPP += `<ul id="" class='beer-list-loop-pp list-group-flush'>`;
      data0116.forEach(function(beer){
        htmlStuffPP += `<li id="" class='list-group-item-pp list-group-item'>${beer.id_dropdown}.  <span class="larger-text txt-clr-grn">${beer.name}</span> - <span class="bold-font italic-font">${beer.style}</span> - ${beer.abv}% ABV - ${beer.ibu} IBU - ${beer.location} - <span class="italic-font">${beer.brewery}</span></li>`;
      });
      htmlStuffPP += `</ul>`;
      if (beerListDivPP[0] !== undefined) {
        beerListDivPP[0].innerHTML = htmlStuffPP;
      }
      let monthPPP = document.getElementsByClassName('month-p-pp');
      if (monthPPP[0] !== undefined) {
        monthPPP[0].innerHTML = `<span class="mx-3 larger-text txt-clr-grn">${data1722[0].name}</span> - <span class="bold-font italic-font">${data1722[0].style}</span>`;
      }
      let comingsoonPPP = document.getElementById('comingsoon-p-pp');
      if (comingsoonPPP !== null) {
        // console.log(comingsoonPPP);
        comingsoonPPP.innerHTML = `
        <span class="mx-4 larger-text txt-clr-grn">${data1722[1].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1722[2].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1722[3].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1722[4].name}</span>
        `;
        // comingsoonPPP.innerHTML = "";
      }
      ///////////////////////////////////////////////
      // END proccess_print.html UPDATE
      ///////////////////////////////////////////////
    }
  }
  xhr.send();
  // e.preventDefault();
}
//////////////////////////////////////////////////////
// END updateProccess_print(e) UPDATE
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// START updateBottleBeers(e) UPDATE
//////////////////////////////////////////////////////
function updateBottleBeers(e) {
  // console.log('*************TESTING updateBottleBeers*************');
  const xhr = new XMLHttpRequest();
  // Open
  xhr.open('POST', '/_bottle_beers', true);
  xhr.onload = function() {
    if (this.status === 200) {
      // console.log(this.responseText);
      let data = JSON.parse(this.responseText);
      ///////////////////////////////////////////////
      // START bottle_beers.html UPDATE
      ///////////////////////////////////////////////
      let beerListDivBB = document.getElementsByClassName('beer-list-div-bb');
      let htmlStuffBB = '';
      htmlStuffBB += `<ul id="bottle-beers-list" class='beer-list-loop-pp list-group-flush'>`;
      data.forEach(function(beer){
        let draftBottleSelection = beer.draft_bottle_selection;
        let dbs = draftBottleSelection.split(' ');
        let inBottleList = false;
        dbs = dbs.map(function(item){
          if (item === 'Bottle' || item === 'Can') {
            inBottleList = true;
          }
        });
        if (inBottleList) {

          htmlStuffBB += `<li id="" class='list-group-item-bb list-group-item'>${beer.id}.
          <span class="larger-text txt-clr-grn">${beer.name}</span>
          - <span>${draftBottleSelection}</span>
          - <span class="bold-font italic-font">${beer.style}</span>
          - ${beer.abv}% ABV - ${beer.ibu} IBU - ${beer.location}
          <span>${draftBottleSelection}</span>
          - <span class="italic-font">${beer.brewery}</span></li>`;
        }
      });
      htmlStuffBB += `</ul>`;
      if (beerListDivBB[0] !== undefined) {
        beerListDivBB[0].innerHTML = htmlStuffBB;
      }
      ///////////////////////////////////////////////
      // END bottle_beers.html UPDATE
      ///////////////////////////////////////////////
    }
  }
  xhr.send();
  // e.preventDefault();
}
//////////////////////////////////////////////////////
// END updateBottleBeers(e) UPDATE
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// START EASY AJAX.JS updateOnTapCurrent()
//////////////////////////////////////////////////////
function updateOnTapCurrent() {
  const http = new easyHTTP;
  // Create POST
  http.postRecieve('/update', function(err, post) {
    // console.log('****************updateTappingNext*****************')
    if (err) {
      console.log(err);
    } else {
      tappingCurrent(post);
    }
  });
}
function tappingCurrent(data) {
  data = JSON.parse(data);
  data = data.slice(0,16);
  let tapCurrentTr = document.querySelectorAll(".currentBeer");
  let x = 0;
  let trInnerHTML = "";
  if (tapCurrentTr !== null) {
    data.forEach(function(beer){
      trInnerHTML = `${beer.brewery} ${beer.name}`;
      if (tapCurrentTr[x] != undefined) {
        tapCurrentTr[x].innerHTML = trInnerHTML;
      }
      x++;
    });
  }
}
//////////////////////////////////////////////////////
// END EASY AJAX.JS updateOnTapCurrent()
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// START EASY AJAX.JS updateOnTapNext()
//////////////////////////////////////////////////////
function updateOnTapNext() {
  const http = new easyHTTP;
  // Create POST
  http.postRecieve('/updateTappingNext', function(err, post) {
    // console.log('****************updateTappingNext*****************')
    if (err) {
      console.log(err);
    } else {
      tappingNext(post);
    }
  });
}
function tappingNext(data) {
  data = JSON.parse(data);
  let tapNextTr = document.querySelectorAll(".nextBeer");
  let x = 0;
  let trInnerHTML = "";
  data.forEach(function(beer){
    trInnerHTML = `${beer.brewery} ${beer.name}`;
    if (tapNextTr[x] != undefined) {
      tapNextTr[x].innerHTML = trInnerHTML;
    }
    x++;
  });
}
//////////////////////////////////////////////////////
// END EASY AJAX.JS updateOnTapNext()
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// START AJAX updateExample6()
//////////////////////////////////////////////////////
function updateExample6() {
    const http = new easyHTTP;
    // Create POST
    http.postRecieve('/_screen_display', function(err, post) {
      // console.log('************NEW POST BEGIN postRecieve***************');
      if (err) {
        console.log(err);
      } else {
        let data = post;
        let beers = JSON.parse(data).beers;
        let events = JSON.parse(data).events;
        let templates = JSON.parse(data).userSettings.templates;
        let settings = JSON.parse(data).userSettings;
        // console.log(settings);

        if (templates == '2 Columns, Names') {
          // console.log("2 Columns, Names");
          updateDisplayScreen(beers, events, settings);
          // console.log(beers);
        } else if (templates == '2 Columns, Artist Time') {
          updateDisplayScreenArtistTime(beers, events, settings);
        } else if (templates == '2 Columns, Names, ABV') {
          // console.log('2 Columns, Names, ABV');
          twoColNameAbv(beers, settings);
          // console.log(beers);
        } else if (templates == '2 Columns, Names, ABV, IBU'){
          // console.log('2 Columns, Names, ABV, IBU');
          exampleSix(beers, settings);
          // console.log(beers);
        } else {
          exampleSix(beers, settings);
          // console.log(beers);
        }
      }
    }); // END function http.postRecieve()
//////////////////////////////////////////////////////
// END AJAX updateExample6()
//////////////////////////////////////////////////////

  // console.log('UPDATE EXAMPLE 6')
//???????????????????????????????????????????????????
// BEGIN ASYNC AWAIT
//???????????????????????????????????????????????????
  // screen.screenUpdate()
  // .then(data => {
  //   // console.log(data.result);
  //   // console.log(data.result.userSettings.templates);
  //   if (data.result.userSettings.templates == '2 Columns, Names') {
  //     console.log("2 Columns, Names");
  //     beers = data.result.beers;
  //     events = data.result.events;
  //     // console.log(beers);
  //     // console.log(events);
  //     updateDisplayScreen(beers, events);
  //     console.log(beers);
  //   } else if (data.result.userSettings.templates == '2 Columns, Names, ABV') {
  //     console.log('2 Columns, Names, ABV');
  //     twoColNameAbv(beers);
  //     console.log(beers);
  //   } else if (data.result.userSettings.templates == '2 Columns, Names, ABV, IBU'){
  //     console.log('2 Columns, Names, ABV, IBU');
  //     exampleSix(beers);
  //     console.log(beers);
  //   } else {
  //     exampleSix(beers);
  //     console.log(beers);
  //   }
  // });
//???????????????????????????????????????????????????
// END ASYNC AWAIT
//???????????????????????????????????????????????????
} // END FUNCTION updateExample6()

function updateDisplayScreenArtistTime(data, eventData, settings) {
  // console.log(settings);
  let data0116 = data.slice(0,16);
  let data1722 = data.slice(16,22);
  let data0108 = data.slice(0,8);
  let data0816 = data.slice(8,16);
  let example6 = document.getElementById('example6');
  let example6HTML = '';
  // console.log(eventData);
  example6HTML = `
  <div class="row mt-3">
    <div class="col-lg">
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          data0108.forEach(function(beer){
            example6HTML += `
            <li class="cardvs">
              <table class="beer-screen-table">
                <tr class="beer-screen-tr">
                  <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
                </tr>
                <tr class="left-spacer beer-screen-tr font-sml">
                  <td class=" w-third">${beer.style}</td>
                  <td class="w-fifth"><span class="font-xxsml"></span> ${beer.abv}<span class="font-xsml">%</span></td>
                  <td class="italic-font  w-third">${beer.brewery}</td>
                </tr>
              </table>
            </li>`
          });
  example6HTML += `
        </ul>
      </div>
    </div>
    <div class="col-lg">
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">
            <li class="cardvs backgrounds">
              <table>
                <tr>
                  <h1 class="text-center italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="events-heading">EVENTS OF THE DAY</span></h1>
                </tr>
                <tr class="beer-screen-tr event-details">
                  <h3 class="text-center bold-font">March ${new Date().getDate()}th ${new Date().getFullYear()}</h3>
                </tr>
              </table>
            </li>
        </ul>
      </div>
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          eventData.forEach(function(event){
            let etoe = event.time_of_event;
            etoe = etoe.split(':');
            let etoeHour = parseInt(etoe[0]);
            let etoeMin = parseInt(etoe[1]);
            if (etoeHour > 0 && etoeHour < 13) {
              console.log(`${etoeHour}:${etoeMin} AM`);
            } else {
              etoeHour -= 12;
              console.log(`${etoeHour}:${etoeMin} PM`);
            }

            example6HTML += `
            <li class="cardvs backgrounds">
              <table>
                <tr>
                  <td><h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="event-artist">${event.artist}</span></h1></td>
                  <td><h1 class="italic-font bold-font left-spacer no-btm-margin><span class="event-details">${event.time_of_event}</span></h1></td>
                </tr>
              </table>
            </li>`
          });
  example6HTML += `
        </ul>
      </div>
    </div>
  </div>`;
  if (example6 !== null) {
    example6HTML += `<div></div>`;
    example6.innerHTML = example6HTML;
    let backgrounds = document.querySelectorAll('.backgrounds');
    // console.log(backgrounds);
    let eventsHeading = document.querySelector('.events-heading');
    let eventArtist = document.querySelectorAll('.event-artist');
    let eventDetails = document.querySelectorAll('.event-details');
    eventsHeading.style.color = `${settings.font_color}`;
    eventArtist.forEach(eArtist => {
      eArtist.style.color = `${settings.font_color}`;
      eArtist.style.fontSize = `${settings.nameFontSize.font_sizes}`;
    });
    eventDetails.forEach(eventDetail => {
      eventDetail.style.fontSize = `${settings.abvIbuFontSize.font_sizes}`;
    });
    backgrounds.forEach(background => {
      background.style.backgroundImage = `linear-gradient(to bottom, #333, ${settings.background_color})`;
    });
  }
  ///////////////////////////////////////////////
  // END  UPDATE
  ///////////////////////////////////////////////
}


function updateDisplayScreen(data, eventData, settings) {
  // console.log(settings);
  let data0116 = data.slice(0,16);
  let data1722 = data.slice(16,22);
  let data0108 = data.slice(0,8);
  let data0816 = data.slice(8,16);
  let example6 = document.getElementById('example6');
  let example6HTML = '';
  // console.log(eventData);
  example6HTML = `
  <div class="row mt-3">
    <div class="col-lg">
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          data0108.forEach(function(beer){
            example6HTML += `
            <li class="cardvs">
              <table class="beer-screen-table">
                <tr class="beer-screen-tr">
                  <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
                </tr>
                <tr class="left-spacer beer-screen-tr font-sml">
                  <td class=" w-third">${beer.style}</td>
                  <td class="w-fifth"><span class="font-xxsml"></span> ${beer.abv}<span class="font-xsml">%</span></td>
                  <td class="italic-font  w-third">${beer.brewery}</td>
                </tr>
              </table>
            </li>`
          });
  example6HTML += `
        </ul>
      </div>
    </div>
    <div class="col-lg">




      <div class="list-group">
        <ul class="list-group-flush list-group-bts">
            <li class="cardvs backgrounds">
              <table>
                <tr>
                  <h1 class="text-center italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="events-heading">EVENTS OF THE DAY</span></h1>
                </tr>
                <tr class="beer-screen-tr event-details">
                  <h3 class="text-center bold-font">March ${new Date().getDate()}th ${new Date().getFullYear()}</h3>
                </tr>
              </table>
            </li>
        </ul>
      </div>


      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          eventData.forEach(function(event){
            example6HTML += `
            <li class="cardvs backgrounds">
              <table>
                <tr>
                  <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="event-artist">${event.artist}</span></h1>
                </tr>
                <tr class="left-spacer beer-screen-tr font-sml event-details">
                  <td class="bold-font w-third">${event.location}</td>
                  <td class="italic-font bold-font w-third">${event.time_of_event}</td>
                  <td class="w-fifth mr-"><span class="font-xxsml"></span> ${event.date_of_event}<span class="font-xsml"></span></td>
                </tr>
              </table>
            </li>`
          });
  example6HTML += `
        </ul>
      </div>
    </div>
  </div>`;
  if (example6 !== null) {
    example6HTML += `<div></div>`;
    example6.innerHTML = example6HTML;
    let backgrounds = document.querySelectorAll('.backgrounds');
    // console.log(backgrounds);
    let eventsHeading = document.querySelector('.events-heading');
    let eventArtist = document.querySelectorAll('.event-artist');
    let eventDetails = document.querySelectorAll('.event-details');
    eventsHeading.style.color = `${settings.font_color}`;
    eventArtist.forEach(eArtist => {
      eArtist.style.color = `${settings.font_color}`;
      eArtist.style.fontSize = `${settings.nameFontSize.font_sizes}`;
    });
    eventDetails.forEach(eventDetail => {
      eventDetail.style.fontSize = `${settings.abvIbuFontSize.font_sizes}`;
    });
    backgrounds.forEach(background => {
      background.style.backgroundImage = `linear-gradient(to bottom, #333, ${settings.background_color})`;
    });
  }
  ///////////////////////////////////////////////
  // END  UPDATE
  ///////////////////////////////////////////////
}
//////////////////////////////////////////////////////
// END ASYNC AWAIT updateExample6()
//////////////////////////////////////////////////////



//////////////////////////////////////////////////////
// START EASY AJAX.JS updateExample6()
//////////////////////////////////////////////////////

// function updateExample6() {
//   const http = new easyHTTP;
//
//   // Create POST
//   http.postRecieve('/update', function(err, post) {
//     // console.log('************NEW POST BEGIN postRecieve***************');
//     if (err) {
//       console.log(err);
//     } else {
//       exampleSix(post);
//     }
//   }); // END function http.postRecieve()
// } // END FUNCTION updateExample6()

//////////////////////////////////////////////////////
// END EASY AJAX.JS updateExample6()
//////////////////////////////////////////////////////
function exampleSix(data, settings) {
  // console.log("WHAT IS IN THE POST VAR: " + data);
  // console.log('**********NEW POST END OF NEW POST REQUEST**********');
  // console.log("NEW POST this.responseText: " + data);
    // data = JSON.parse(data);
  // console.log('data: ' + data);
  // console.log('******************NEW POST  END OF PARSING JSON DATA *****************');
    let data0116 = data.slice(0,16);
    let data1722 = data.slice(16,22);
    let data0108 = data.slice(0,8);
    let data0816 = data.slice(8,16);
  // console.log("data0116: " + data0116);
  // console.log('data0116[0]: ' + data0116[0].name, data0116[0].style);
  // console.log('data0116[1]: ' + data0116[1].name, data0116[1].style);
  // console.log('******************NEW POST  END OF DATA0116 *****************');
  // console.log('******************NEW POST  END postRecieve *****************');
  ///////////////////////////////////////////////
  // START  UPDATE
  ///////////////////////////////////////////////
  let example6 = document.getElementById('example6');
  let example6HTML = '';
  example6HTML = `
  <div class="row mt-3">
    <div class="col-lg">
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          data0108.forEach(function(beer){
            example6HTML += `
            <li class="cardvs">
              <table class="beer-screen-table">
                <tr class="beer-screen-tr">
                  <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
                </tr>
                <tr class="left-spacer beer-screen-tr font-sml">
                  <td class=" w-third">${beer.style}</td>
                  <td class="w-fifth"><span class="font-xxsml"></span> ${beer.abv}<span class="font-xsml">%</span></td>
                  <td class="italic-font  w-third">${beer.brewery}</td>
                </tr>
              </table>
            </li>`
          });
  example6HTML += `
        </ul>
      </div>
    </div>
    <div class="col-lg">
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          data0816.forEach(function(beer){
            example6HTML += `
            <li class="cardvs">
              <table>
                <tr>
                  <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
                </tr>
                <tr class="left-spacer beer-screen-tr font-sml">
                  <td class="bold-font w-third">${beer.style}</td>
                  <td class="w-fifth"><span class="font-xxsml"></span> ${beer.abv}<span class="font-xsml">%</span></td>
                  <td class="italic-font bold-font w-third">${beer.brewery}</td>
                </tr>
              </table>
            </li>`
          });
  example6HTML += `
        </ul>
      </div>
    </div>
  </div>`;
  if (example6 !== null) {
    // console.log(example6HTML);
    //USED FOR TESTING THE ajax update
    //uncomment line below and reload browser or reboot pi
    example6HTML += `<div></div>`;
    example6.innerHTML = example6HTML;
  }
  // console.log(example6HTML);
  ///////////////////////////////////////////////
  // END  UPDATE
  ///////////////////////////////////////////////
}

function twoColNameAbv (data, settings) {
  // console.log("WHAT IS IN THE POST VAR: " + data);
  // console.log('**********NEW POST END OF NEW POST REQUEST**********');
  // console.log("NEW POST this.responseText: " + data);
    // data = JSON.parse(data);
  // console.log('data: ' + data);
  // console.log('******************NEW POST  END OF PARSING JSON DATA *****************');
    let data0116 = data.slice(0,16);
    let data1722 = data.slice(16,22);
    let data0108 = data.slice(0,8);
    let data0816 = data.slice(8,16);
  // console.log("data0116: " + data0116);
  // console.log('data0116[0]: ' + data0116[0].name, data0116[0].style);
  // console.log('data0116[1]: ' + data0116[1].name, data0116[1].style);
  // console.log('******************NEW POST  END OF DATA0116 *****************');
  // console.log('******************NEW POST  END postRecieve *****************');
  ///////////////////////////////////////////////
  // START  UPDATE
  ///////////////////////////////////////////////
  let example6 = document.getElementById('example6');
  let example6HTML = '';
  example6HTML = `
  <div class="row mt-3">
    <div class="col-lg">
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          data0108.forEach(function(beer){
            example6HTML += `
            <li class="cardvs">
              <table class="beer-screen-table">
                <tr class="beer-screen-tr">
                  <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
                </tr>
                <tr class="left-spacer beer-screen-tr font-sml">
                  <td class=" w-third">${beer.style}</td>
                  <td class="w-fifth"><span class="font-xxsml"></span> ${beer.abv}<span class="font-xsml">%</span></td>

                </tr>
              </table>
            </li>`
          });
  example6HTML += `
        </ul>
      </div>
    </div>
    <div class="col-lg">
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          data0816.forEach(function(beer){
            example6HTML += `
            <li class="cardvs">
              <table>
                <tr>
                  <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
                </tr>
                <tr class="left-spacer beer-screen-tr font-sml">
                  <td class="bold-font w-third">${beer.style}</td>
                  <td class="w-fifth"><span class="font-xxsml"></span> ${beer.abv}<span class="font-xsml">%</span></td>

                </tr>
              </table>
            </li>`
          });
  example6HTML += `
        </ul>
      </div>
    </div>
  </div>`;
  if (example6 !== null) {
    // console.log(example6HTML);
    //USED FOR TESTING THE ajax update
    //uncomment line below and reload browser or reboot pi
    example6HTML += `<div></div>`;
    example6.innerHTML = example6HTML;
  }
  // console.log(example6HTML);
  ///////////////////////////////////////////////
  // END  UPDATE
  ///////////////////////////////////////////////
}







//////////////////////////////////////////////////////
// START loadTicker()
//////////////////////////////////////////////////////
function loadTicker() {
  // console.log('*************TESTING loadTicker*************');
  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/update', true);
  xhr.onload = function() {

    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      let data1722 = data.slice(16,22);
      let tickerhtml = '';

      let beer1 = document.querySelector(".info1");
      tickerhtml = `${data1722[0].name}`;
      if (beer1 != null) {
        beer1.innerHTML = tickerhtml;
        let width = beer1.offsetWidth;
        // console.log("info1 width: " + width);
      }
      let beer2 = document.querySelector(".info2");
      tickerhtml = `${data1722[1].name}`;
      if (beer2 != null) {
        beer2.innerHTML = tickerhtml;
        let width = beer2.offsetWidth;
        // console.log("info2 width: " + width);
      }
      let beer3 = document.querySelector(".info3");
      tickerhtml = `${data1722[2].name}`;
      if (beer3 != null) {
        beer3.innerHTML = tickerhtml;
        let width = beer3.offsetWidth;
        // console.log("info3 width: " + width);
      }
      let beer4 = document.querySelector(".info4");
      tickerhtml = `${data1722[3].name}`;
      if (beer4 != null) {
        beer4.innerHTML = tickerhtml;
        let width = beer4.offsetWidth;
        // console.log("info4 width: " + width);
      }
      let beer5 = document.querySelector(".info5");
      tickerhtml = `${data1722[4].name}`;
      if (beer5 != null) {
        beer5.innerHTML = tickerhtml;
        let width = beer5.offsetWidth;
        // console.log("info5 width: " + width);
      }
      let beer6 = document.querySelector(".info6");
      tickerhtml = `${data1722[5].description}`;
      if (beer6 != null) {
        beer6.innerHTML = tickerhtml;
        let width = beer6.offsetWidth;
        // console.log("info6 width: " + width);
      }
    }
  }
  xhr.send();
  // e.preventDefault();
}
//////////////////////////////////////////////////////
// END loadTicker()
//////////////////////////////////////////////////////
