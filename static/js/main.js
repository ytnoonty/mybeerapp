let flashMsgDiv = document.getElementById('flash-msg-div');
let updateProcessPrint = document.getElementById('update-tv-screen');
let refreshed = false;
let refreshCount = 0;

let form = document.getElementById('edit_form');
let editList = document.getElementById('edit-beerlist');

// flash message dissapear after 2.5seconds
setTimeout(function(){
  flashMsgDiv.style.display = 'none';
  // flashMsgDiv.onload = updateScreens();
},2500);



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
let oldMovement = getMovement(infoTicker);
// let movement = getMovement(infoTicker);
// let duration = getDuration(infoTicker);

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
updateScreens();
movement = getMovement(infoTicker);
duration = getDuration(infoTicker);
if (divTicker != null) {
  animateTicker(divTicker, movement, duration);
}

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
  updateAllBeersEasyHttp();
  updateExample6();
  loadTicker();
  screenRefresh();
  setTimeout(updateScreens, 10000);
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
        htmlStuffBP += `<li id="" class='list-group-item'>${beer.id}.  <span class="larger-text txt-clr-grn">${beer.name}</span> - ${beer.style} - ${beer.abv}% ABV - ${beer.ibu} IBU - ${beer.location} - <span class="italic-font">${beer.brewery}</span></li>`;
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
        htmlStuffPP += `<li id="" class='list-group-item-pp list-group-item'>${beer.id}.  <span class="larger-text txt-clr-grn">${beer.name}</span> - <span class="bold-font italic-font">${beer.style}</span> - ${beer.abv}% ABV - ${beer.ibu} IBU - ${beer.location} - <span class="italic-font">${beer.brewery}</span></li>`;
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
// START EASY AJAX.JS updateExample6()
//////////////////////////////////////////////////////
function updateAllBeersEasyHttp() {
  const http = new easyHTTP;
  // Create POST
  http.postRecieve('/updateBeers', function(err, post) {
    // console.log('************NEW POST BEGIN postRecieve***************');
    if (err) {
      console.log(err);
    } else {
      updateAllBeers(post);
    }
  }); // END function http.postRecieve()
} // END FUNCTION updateExample6()
//////////////////////////////////////////////////////
// END EASY AJAX.JS updateExample6()
//////////////////////////////////////////////////////
///////////////////////////////////////////////
// START  updateAllBeers()
///////////////////////////////////////////////
function updateAllBeers(data) {
  // console.log("WHAT IS IN THE POST VAR: " + data);
  // console.log('**********NEW POST END OF NEW POST REQUEST**********');
  // console.log("NEW POST this.responseText: " + data);
    data = JSON.parse(data);
  // console.log('data: ' + data);
  // console.log('******************NEW POST  END OF PARSING JSON DATA *****************');
  // console.log('******************NEW POST  END OF DATA0116 *****************');
  // console.log('******************NEW POST  END postRecieve *****************');
  let bottleBeersEl = document.getElementById('bottle-beers-list');
  let bottleBeersHTML = '';
  data.forEach(function(beer){
    // console.log("beer.name: " + beer.name);
    // console.log("beer.Selection: " + beer.draft_bottle_selection);
    // console.log("");
    if (beer.draft_bottle_selection == 'Bottle' || beer.draft_bottle_selection == 'Both') {
      bottleBeersHTML += `
        <li class="list-group-item-bb list-group-item"><span class="larger-text txt-clr-grn">${beer.name}</span> - <span class="bold-font italic-font">${beer.style}</span> - ${beer.abv}% ABV - ${beer.ibu} IBU - ${beer.location} - <span class="italic-font">${beer.brewery}</span></li>
      `
    }
  });
  if (bottleBeersEl !== null) {
    // console.log(bottleBeersHTML);
    //USED FOR TESTING THE ajax update
    //uncomment next line below and reload browser or reboot pi
    // bottleBeersHTML += `<div></div>`;
    bottleBeersEl.innerHTML = bottleBeersHTML;
  }
  // console.log(bottleBeersHTML);
  ///////////////////////////////////////////////
  // END updateAllBeers()
  ///////////////////////////////////////////////
}
//////////////////////////////////////////////////////
// END AJAX UPDATE FOR DRAFTBOTTLE MENU
//////////////////////////////////////////////////////






//////////////////////////////////////////////////////
// START EASY AJAX.JS updateExample6()
//////////////////////////////////////////////////////
function updateExample6() {
  const http = new easyHTTP;

  // Create POST
  http.postRecieve('/update', function(err, post) {
    // console.log('************NEW POST BEGIN postRecieve***************');
    if (err) {
      console.log(err);
    } else {
      exampleSix(post);
    }
  }); // END function http.postRecieve()
} // END FUNCTION updateExample6()
//////////////////////////////////////////////////////
// END EASY AJAX.JS updateExample6()
//////////////////////////////////////////////////////
function exampleSix(data) {
  // console.log("WHAT IS IN THE POST VAR: " + data);
  // console.log('**********NEW POST END OF NEW POST REQUEST**********');
  // console.log("NEW POST this.responseText: " + data);
    data = JSON.parse(data);
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
  <div class="row">
    <div class="col-lg">
      <div class="list-group">
        <ul class="list-group-flush list-group-bts">`;
          data0108.forEach(function(beer){
            example6HTML += `
            <li class="cardvs">
              <table>
                <tr>
                  <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
                </tr>
                <tr class="left-spacer beer-screen-tr">
                  <td class="bold-font w-third">${beer.style}</td>
                  <td class="w-fifth">ABV ${beer.abv}%</td>
                  <td class="italic-font bold-font w-third">${beer.brewery}</td>
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
                <tr class="left-spacer beer-screen-tr">
                  <td class="bold-font w-third">${beer.style}</td>
                  <td class="w-fifth">ABV ${beer.abv}%</td>
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




// //////////////////////////////////////////////////////
// // START updateExample6()
// //////////////////////////////////////////////////////
// function updateExample6(e) {
//   console.log('*************TESTING updateExample6*************');
//   const xhr = new XMLHttpRequest();
//   console.log('READYSTATE1', xhr.readyState);
//   // Open
//   xhr.open('POST', '/update', true);
//   console.log('READYSTATE2', xhr.readyState);
//   console.log('STATUS before onload', this.status);
//   // xhr.onload
//   xhr.onload = function() {
//     console.log('READYSTATE-3', xhr.readyState);
//     console.log('STATUS after onload: ', this.status);
//     if (this.status === 200) {
//       console.log("this.responseText: " + this.responseText);
//       let data = JSON.parse(this.responseText);
//       let data0116 = data.slice(0,16);
//       let data1722 = data.slice(16,22);
//       let data0108 = data.slice(0,8);
//       let data0816 = data.slice(8,16);
//       // console.log("data0116: " + data0116);
//       ///////////////////////////////////////////////
//       // START  UPDATE
//       ///////////////////////////////////////////////
//       let example6 = document.getElementById('example6');
//       let example6HTML = '';
//       example6HTML = `
//       <div class="row">
//         <div class="col-lg">
//           <div class="list-group">
//             <ul class="list-group-flush list-group-bts">`;
//             //USED FOR TESTING THE ajax update
//             //uncomment line below and reload browser or reboot pi
//             // example6HTML += `<div></div>`;
//               data0108.forEach(function(beer){
//                 example6HTML += `
//                 <li class="cardvs">
//                   <table>
//                     <tr>
//                       <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
//                     </tr>
//                     <tr class="left-spacer beer-screen-tr">
//                       <td class="bold-font w-third">${beer.style}</td>
//                       <td class="w-forth">ABV ${beer.abv}%</td>
//                       <td class="italic-font bold-font w-third">${beer.brewery}</td>
//                     </tr>
//                   </table>
//                 </li>`
//               });
//       example6HTML += `
//             </ul>
//           </div>
//         </div>
//         <div class="col-lg">
//           <div class="list-group">
//             <ul class="list-group-flush list-group-bts">`;
//               data0816.forEach(function(beer){
//                 example6HTML += `
//                 <li class="cardvs">
//                   <table>
//                     <tr>
//                       <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
//                     </tr>
//                     <tr class="left-spacer beer-screen-tr">
//                       <td class="bold-font w-third">${beer.style}</td>
//                       <td class="w-forth">ABV ${beer.abv}%</td>
//                       <td class="italic-font bold-font w-third">${beer.brewery}</td>
//                     </tr>
//                   </table>
//                 </li>`
//               });
//       example6HTML += `
//             </ul>
//           </div>
//         </div>
//       </div>`;
//       if (example6 !== null) {
//         // console.log(example6HTML);
//         example6.innerHTML = example6HTML;
//       }
//       // console.log(example6HTML);
//       ///////////////////////////////////////////////
//       // END  UPDATE
//       ///////////////////////////////////////////////
//     }
//   }
//   xhr.send();
//   console.log("end of example6 function.")
//   // e.preventDefault();
// }
// //////////////////////////////////////////////////////
// // END updateExample6()
// //////////////////////////////////////////////////////


// //////////////////////////////////////////////////////
// // START
// //////////////////////////////////////////////////////
// function (e) {
//   console.log('testing function works');
//   const xhr = new XMLHttpRequest();
//   // console.log('READYSTATE1', xhr.readyState);
//   // Open
//   xhr.open('POST', '/update', true);
//   // console.log('READYSTATE2', xhr.readyState);
//   // console.log('STATUS before onload', this.status);
//   // xhr.onload
//   xhr.onload = function() {
//     // console.log('READYSTATE-3', xhr.readyState);
//     // console.log('STATUS after onload: ', this.status);
//     if (this.status === 200) {
//       // console.log(this.responseText);
//       let data = JSON.parse(this.responseText);
//       let data0116 = data.slice(0,16);
//       let data1722 = data.slice(16,22);
//       let data0108 = data.slice(0,8);
//       let data0816 = data.slice(8,16);
//
//       ///////////////////////////////////////////////
//       // START  UPDATE
//       ///////////////////////////////////////////////
//
//       ///////////////////////////////////////////////
//       // END  UPDATE
//       ///////////////////////////////////////////////
//     }
//   }
//   xhr.send();
//   e.preventDefault();
// }
// //////////////////////////////////////////////////////
// // END
// //////////////////////////////////////////////////////
//


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
