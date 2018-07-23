let flashMsgDiv = document.getElementById('flash-msg-div');
let updateProcessPrint = document.getElementById('update-tv-screen');
console.log('in the javascript');

// let updateBeerList = document.getElementById('edit-beerlist');
// // updateBeerList.addEventListener('submit', loadBeerList);
// updateBeerList.onsubmit = function(){loadBeerList};


if (updateProcessPrint != null) {
  updateProcessPrint.addEventListener('click', function(e){
    window.location.reload();
    screenRefresh();
    loadBeerlist();
    // loadTicker();
  });
}

// // loadTicker();
loadBeerlist();
// // screenRefresh();



//////////////////////////////////////////////////////
// START loadTicker()
/////////////////////////////////////////////////////
// function loadTicker(e) {
//   // console.log('testing function works');
//   const xhr = new XMLHttpRequest();
//   // console.log('READYSTATE1', xhr.readyState);
//   //Open
//   // xhr.open('POST', '/update', true);
//   xhr.open('POST', '/update', true);
//   // console.log('READYSTATE2', xhr.readyState);
//   // console.log('STATUS before onload', this.status);
//   // xhr.onload
//   xhr.onload = function(){
//     // console.log('READYSTATE3', xhr.readyState);
//     // console.log('STATUS after onload', this.status);
//     if (this.status === 200) {
//       // console.log(this.responseText);
//
//       let data = JSON.parse(this.responseText);
//       let data1721 = data.slice(16,21);
//       let tickerhtml = '';
//       let btsComingSoon = document.querySelector(".ticker");
//       tickerhtml += `<p class="p-bts-coming-soon bold-font txt-clr-ylw">
//       <span>Beer 'O the Month:</span>
//       <span class="card-img">${data1721[0].name}</span>
//       <span>Tapping Soon:
//         <span class="card-img-before">${data1721[1].name}</span>
//         <span class="card-img-before">${data1721[2].name}</span>
//         <span class="card-img-before">${data1721[3].name}</span>
//         <span class="card-img">${data1721[4].name}</span>
//       </span>
//       </p>`;
//       if (btsComingSoon != null) {
//         // tickerhtml = data1721[0].name;
//         // console.log(tickerhtml);
//         btsComingSoon.innerHTML = tickerhtml;
//       }
//
//     }
//   }
//
//   xhr.send();
//   setTimeout(loadTicker,250);
//   e.preventDefault();
// }
//////////////////////////////////////////////////////
// END loadTicker()
/////////////////////////////////////////////////////


//////////////////////////////////////////////////////
// START screenRefresh()
/////////////////////////////////////////////////////

function screenRefresh(){
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let min = currentTime.getMinutes();
  let sec = currentTime.getSeconds();
  let millSec = currentTime.getMilliseconds();
  // console.log('hour is: ' + hour);
  // console.log('min is: ' + min);
  // console.log('sec is: ' + sec);
  // console.log('millSec is: ' + millSec);
  // if ((hour == 6 || hour == 10 || hour == 14 || hour == 16 || hour == 18 || hour == 20 || hour == 22 || hour == 24) && min == 1 && sec == 1 && millSec < 250){
  // if (min == 1 && (sec == 1 || sec == 31) && millSec < 250){
  if (min == 1 && sec == 1 && millSec < 250){
  // if ((sec == 1 || sec == 31) && millSec < 250){
    window.location.reload();
    // console.log('in the new function and minutes is: ' + min);
    // console.log('sec is: ' + sec);
    // console.log('millSec is: ' + millSec);
    // console.log('************************SCREEN UPDATED*******************');
  }
}
//////////////////////////////////////////////////////
// END screenRefresh()
/////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// START loadBeerlist()
/////////////////////////////////////////////////////
function loadBeerlist(e) {
  console.log('testing function works');

  const xhr = new XMLHttpRequest();
  // console.log('READYSTATE1', xhr.readyState);

  //Open
  // xhr.open('POST', '/update', true);
  xhr.open('POST', '/update', true);
  // console.log('READYSTATE2', xhr.readyState);

  // console.log('STATUS before onload', this.status);
  // xhr.onload
  xhr.onload = function(){
    // console.log('READYSTATE3', xhr.readyState);
    // console.log('STATUS after onload', this.status);
    if (this.status === 200) {
      // console.log(this.responseText);
      // let ul = document.createElement('ul');
      //use this as a reference
      // ul.setAttribute("id", "this-is-the-id");
      // ul.classList.add = 'list-group-flush';
      let data = JSON.parse(this.responseText);
      let data0116 = data.slice(0,16);
      let data1721 = data.slice(16,21);
      let data0108 = data.slice(0,8);
      let data0816 = data.slice(8,16);

////////////////////////////////////////////////////////////
// START BEERS_PRINT.HTML UPDATE
////////////////////////////////////////////////////////////
      let beerListDivBP = document.getElementsByClassName('beer-list-div-bp');
      // beerListDivBP[0].innerHTML = "";
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
        monthPBP[0].innerHTML = `<span class="mx-3 larger-text txt-clr-grn">${data1721[0].name}</span>`;
      }

      let comingsoonPBP = document.getElementById('comingsoon-p-bp');
      if (comingsoonPBP !== null) {
        comingsoonPBP.innerHTML = `
        <span class="mx-4 larger-text txt-clr-grn">${data1721[1].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1721[2].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1721[3].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1721[4].name}</span>
        `;
      }
////////////////////////////////////////////////////////////
// END BEERS_PRINT.HTML UPDATE
// /////////////////////////////////////////////

/////////////////////////////////////////////////////////////
// START PROCCESS_PRINT.HTML UPDATE
/////////////////////////////////////////////////////////////
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
        monthPPP[0].innerHTML = `<span class="mx-3 larger-text txt-clr-grn">${data1721[0].name}</span> - <span class="bold-font italic-font">${data1721[0].style}</span>`;
      }

      let comingsoonPPP = document.getElementById('comingsoon-p-pp');
      console.log(comingsoonPPP);
      if (comingsoonPPP !== null) {
        comingsoonPPP.innerHTML = `
        <span class="mx-4 larger-text txt-clr-grn">${data1721[1].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1721[2].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1721[3].name}</span>
        <span class="mx-4 larger-text txt-clr-grn">${data1721[4].name}</span>
        `;
        // comingsoonPPP.innerHTML = "";
      }

/////////////////////////////////////////////////////////////
// END PROCCESS_PRINT.HTML UPDATE
////////////////////////////////////////////////


// /////////////////////////////////////////////
// // first example table element beers.html
// /////////////////////////////////////////////
// let htmlTable = '';
// htmlTable = `<tr>
// <th></th>
// <th>Beer</th>
// <th>Style</th>
// <th>ABV</th>
// <th>IBU</th>
// <th>Brewery</th>
// <th>Location</th>
// <th>Description</th>
// </tr>`;
//
// data0116.forEach(function(beer){
//   htmlTable += `<tr>
//     <td>${beer.id}.</td>
//     <td>${beer.name}</td>
//     <td>${beer.style}</td>
//     <td>${beer.abv}%</td>
//     <td>${beer.ibu}</td>
//     <td>${beer.brewery}</td>
//     <td>${beer.location}</td>
//     <td>${beer.description}</td>
//   </tr>
//   `;
// });
// htmlTable += `</table>`;
// let table = document.getElementById('beers-table');
// if (table !== null) {
//   table.innerHTML = htmlTable;
// }
// /////////////////////////////////////////////
// // END first example table element beers.html
// /////////////////////////////////////////////

// /////////////////////////////////////////////
// // second example left column
// /////////////////////////////////////////////
// let example2 = document.getElementById('example2');
// let example2HTML = '';
//
// example2HTML = `<div class="row">
//   <div class="col-lg">
//     <div class="list-group">`;
// data0108.forEach(function(beer){
//   example2HTML += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
//           <div class="d-flex w-100 justify-content-between">
//             <h5 class="mb-1">${beer.id}. ${beer.name}</h5>`;
//             // <small>${beer.abv}% ABV ${beer.ibu} IBU</small>
//   example2HTML += `<small>${beer.abv}% ABV</small>
//           </div>
//           <p class="mb-1">${beer.brewery}</p>`;
//           // <p class="mb-1">${beer.brewery} ${beer.location}</p>
//           // <small>${beer.description}</small>
//   example2HTML += `</a>`;
// });
// example2HTML += `</div>
//   </div>`;
//
// // second example right column
// example2HTML += `<div class="col-lg">
//     <div class="list-group">`;
// data0816.forEach(function(beer){
//   example2HTML += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
//           <div class="d-flex w-100 justify-content-between">
//           <h5 class="mb-1">${beer.id}. ${beer.name}</h5>`;
//           // <small>${beer.abv}% ABV ${beer.ibu} IBU</small>
//   example2HTML += `<small>${beer.abv}% ABV</small>
//         </div>
//           <p class="mb-1">${beer.brewery}</p>`;
//           // <p class="mb-1">${beer.brewery} ${beer.location}</p>
//           // <small>${beer.description}</small>
//   example2HTML += `</a>`;
// });
// example2HTML += `</div>
//   </div>`;
// if (example2 !== null) {
//   example2.innerHTML = example2HTML;
// }
// /////////////////////////////////////////////
// // END SECOND EXAMPLE
// /////////////////////////////////////////////


// ////////////////////////////////////////////////////////
// // THIRD EXAMPLE
// /////////////////////////////////////////////
// let example3 = document.getElementById('example3');
// let example3HTML = '';
//
// example3HTML = `
// <div class="row">
//   <div class="col-lg">
//     <div class="list-group">
//       <ul class="list-group-flush container-fluid">`;
//         data0108.forEach(function(beer){
//           example3HTML += `
//           <li class="list-group-item row"><h4 class="col-sm">${beer.id}.  ${beer.name}<span class="ml-5"><small>${beer.abv}% ABV</small></span></h4><div class="mx-auto"><span class="col-sm">${beer.brewery}</span><span class="col-sm">${beer.brewery}</span><span class="col-sm">${beer.brewery}</span></div></li>`
//           // <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4><br>${beer.abv}% ABV ${beer.ibu} IBU <br>${beer.brewery} ${beer.location} ${beer.description}</li>
//         });
// example3HTML += `
//       </ul>
//     </div>
//   </div>
//   <div class="col-lg">
//     <div class="list-group">
//       <ul class="list-group-flush">`;
//       data0816.forEach(function(beer){
//         example3HTML += `
//           <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4>${beer.brewery}<br>${beer.abv}% ABV</li>`
//           // <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4><br>${beer.abv}% ABV ${beer.ibu} IBU <br>${beer.brewery} ${beer.location} ${beer.description}</li>
//         });
// example3HTML += `
//       </ul>
//     </div>
//   </div>
// </div>`;
// if (example3 !== null) {
//   example3.innerHTML = example3HTML;
// }
//
//
// example3HTML = `
// <div class="row">
//   <div class="col-lg">
//     <div class="list-group">
//       <ul class="list-group-flush">`;
//         data0108.forEach(function(beer){
//           example3HTML += `
//           <li class="list-group-item"><h4>${beer.id}.  ${beer.name}<span class="ml-5"><small>${beer.abv}% ABV</small></span></h4>${beer.brewery}</li>`
//           // <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4><br>${beer.abv}% ABV ${beer.ibu} IBU <br>${beer.brewery} ${beer.location} ${beer.description}</li>
//         });
// example3HTML += `
//       </ul>
//     </div>
//   </div>
//   <div class="col-lg">
//     <div class="list-group">
//       <ul class="list-group-flush">`;
//       data0816.forEach(function(beer){
//         example3HTML += `
//           <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4>${beer.brewery}<br>${beer.abv}% ABV</li>`
//           // <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4><br>${beer.abv}% ABV ${beer.ibu} IBU <br>${beer.brewery} ${beer.location} ${beer.description}</li>
//         });
// example3HTML += `
//       </ul>
//     </div>
//   </div>
// </div>`;
// if (example3 !== null) {
//   example3.innerHTML = example3HTML;
// }

// ///////////////////////////////////////////////////////
// // END EXAMPLE3
// ///////////////////////////////////////////////////////

//
// // FOURTH EXAMPLE
// let example4 = document.getElementById('example4');
// let example4HTML = '';
//
// example4HTML = `<ul class="list-group-flush">`;
//         data0116.forEach(function(beer){
//           example4HTML += `<li class="list-group-item"><a href="${beer.website}" target="_blank">${beer.id}.  ${beer.name}</a> ${beer.abv}% ABV ${beer.ibu} IBU ${beer.location} ${beer.description}</li>`
//         });
// example4HTML += `</ul>`;
// if (example4 !== null) {
//   example4.innerHTML = example4HTML;
// }
//
// ///////////////////////////////////////////////////////
// // END EXAMPLE4
// ///////////////////////////////////////////////////////


/////////////////////////////////////
// example6
/////////////////////////////////////
let example6 = document.getElementById('example6');
let example6HTML = '';
example6HTML = `
<div class="row">
  <div class="col-lg">
    <div class="list-group">
      <ul class="list-group-flush list-group-bts">`;
      //USED FOR TESTING THE ajax update
      //uncomment line below and reload browser or reboot pi
      // example6HTML += `<div></div>`;
        data0108.forEach(function(beer){
          example6HTML += `
          <li class="cardvs">
            <table>
              <tr>
                <h1 class="italic-font bold-font txt-clr-ylw left-spacer no-btm-margin"><span class="">${beer.name}</span></h1>
              </tr>
              <tr class="font-med left-spacer beer-screen-tr">
                <td class="bold-font w-third">${beer.style}</td>
                <td class="w-forth">ABV ${beer.abv}%</td>
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
              <tr class="font-med left-spacer beer-screen-tr">
                <td class="bold-font w-third">${beer.style}</td>
                <td class="w-forth">ABV ${beer.abv}%</td>
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
  example6.innerHTML = example6HTML;
}
/////////////////////////////////////
// END example6
/////////////////////////////////////

/////////////////////////////////////////////
// BEGIN Ticker
/////////////////////////////////////////////

let tickerhtml = '';
let beer1 = document.querySelector(".info1");
tickerhtml = `${data1721[0].name}`;
if (beer1 != null) {
  beer1.innerHTML = tickerhtml;
}
let beer2 = document.querySelector(".info2");
tickerhtml = `${data1721[1].name}`;
if (beer2 != null) {
  beer2.innerHTML = tickerhtml;
}
let beer3 = document.querySelector(".info3");
tickerhtml = `${data1721[2].name}`;
if (beer3 != null) {
  beer3.innerHTML = tickerhtml;
}
let beer4 = document.querySelector(".info4");
tickerhtml = `${data1721[3].name}`;
if (beer4 != null) {
  beer4.innerHTML = tickerhtml;
}
let beer5 = document.querySelector(".info5");
tickerhtml = `${data1721[4].name}`;
if (beer5 != null) {
  beer5.innerHTML = tickerhtml;
}

// let tickerhtml = '';
// let btsComingSoon = document.querySelector(".ticker");
// tickerhtml += `<p class="p-bts-coming-soon">
// <span class="txt-clr-grn-shdw">Beer 'O the Month:</span>
// <span class="card-img bold-font italic-font txt-clr-ylw">${data1721[0].name}</span>
// <span class="txt-clr-grn-shdw">Tapping Soon:
//   <span class="card-img-before bold-font italic-font txt-clr-ylw">${data1721[1].name}</span>
//   <span class="card-img-before bold-font italic-font txt-clr-ylw">${data1721[2].name}</span>
//   <span class="card-img-before bold-font italic-font txt-clr-ylw">${data1721[3].name}</span>
//   <span class="card-img bold-font italic-font txt-clr-ylw">${data1721[4].name}</span>
// </span>
// </p>`;
// if (btsComingSoon != null) {
//   // console.log(tickerhtml);
//   btsComingSoon.innerHTML = tickerhtml;
// }
/////////////////////////////////////////////
// END Ticker
/////////////////////////////////////////////

/////////////////////////////////////////////
/////////////////////////////////////////////

    }
  }

  xhr.send();
  console.log('BEFORE REFRESH');
  // setTimeout(screenRefresh(),5000);
  screenRefresh();
  console.log('AFTER REFRESH')
  // loadTicker();
  setTimeout(function(){
    flashMsgDiv.style.display = 'none';
  },2500);

  setTimeout(loadBeerlist,10000);

  e.preventDefault();

}

//////////////////////////////////////////////////////
// END loadBeerlist()
/////////////////////////////////////////////////////












// function loadScreenlist(e) {
//   // console.log('testing function works');
//
//   const xhr = new XMLHttpRequest();
//   // console.log('READYSTATE1', xhr.readyState);
//
//   //Open
//   xhr.open('POST', '/update', true);
//   // console.log('READYSTATE2', xhr.readyState);
//   // console.log('STATUS before onload', this.status);
//   xhr.onload = function(){
//     // console.log('READYSTATE3', xhr.readyState);
//     // console.log('STATUS after onload', this.status);
//     if (this.status === 200) {
//       // console.log(this.responseText);
//
//       let data = JSON.parse(this.responseText);
//       let data0108 = data.slice(0,8);
//       let data0816 = data.slice(8,16);
//       let data0116 = data.slice(0,16);
//
//       let htmlStuff = `${data0108[0].id}. ${data0108[0].name}`;
//
//       // first example table element
//       let htmlTable = '';
//       htmlTable = `<tr>
//       <th></th>
//       <th>Beer</th>
//       <th>Style</th>
//       <th>ABV</th>
//       <th>IBU</th>
//       <th>Brewery</th>
//       <th>Location</th>
//       <th>Description</th>
//       </tr>`;
//
//       data0116.forEach(function(beer){
//         htmlTable += `<tr>
//           <td>${beer.id}.</td>
//           <td>${beer.name}</td>
//           <td>${beer.style}</td>
//           <td>${beer.abv}%</td>
//           <td>${beer.ibu}</td>
//           <td>${beer.brewery}</td>
//           <td>${beer.location}</td>
//           <td>${beer.description}</td>
//         </tr>
//         `;
//       });
//       htmlTable += `</table>`;
//       let table = document.querySelector('.table');
//       if (table !== null) {
//         table.innerHTML = htmlTable;
//       }
//
//
//
//
//       // second example left column
//       let example2 = document.getElementById('example2');
//       let example2HTML = '';
//
//       example2HTML = `<div class="row">
//         <div class="col-sm">
//           <div class="list-group">`;
//       data0108.forEach(function(beer){
//         example2HTML += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
//                 <div class="d-flex w-100 justify-content-between">
//                   <h5 class="mb-1">${beer.id}. ${beer.name}</h5>
//                   <small>${beer.abv}% ABV ${beer.ibu} IBU</small>
//                 </div>
//                 <p class="mb-1">${beer.brewery} ${beer.location}</p>
//                 <small>${beer.description}</small>
//               </a>`;
//       });
//       example2HTML += `</div>
//         </div>`;
//
//       // second example right column
//       example2HTML += `<div class="col-sm">
//           <div class="list-group">`;
//       data0816.forEach(function(beer){
//         example2HTML += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
//                 <div class="d-flex w-100 justify-content-between">
//                   <h5 class="mb-1">${beer.id}. ${beer.name}</h5>
//                   <small>${beer.abv}% ABV ${beer.ibu} IBU</small>
//                 </div>
//                 <p class="mb-1">${beer.brewery} ${beer.location}</p>
//                 <small>${beer.description}</small>
//               </a>`;
//       });
//       example2HTML += `</div>
//         </div>`;
//       if (example2 !== null) {
//         example2.innerHTML = example2HTML;
//       }
//
//       // THIRD EXAMPLE
//       let example3 = document.getElementById('example3');
//       let example3HTML = '';
//
//       example3HTML = `
//       <div class="row">
//         <div class="col-sm">
//           <div class="list-group">
//             <ul class="list-group-flush">`;
//               data0108.forEach(function(beer){
//                 example3HTML += `
//                 <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4><br>${beer.abv}% ABV ${beer.ibu} IBU <br>${beer.brewery} ${beer.location} ${beer.description}</li>`
//               });
//       example3HTML += `
//             </ul>
//           </div>
//         </div>
//         <div class="col-sm">
//           <div class="list-group">
//             <ul class="list-group-flush">`;
//             data0816.forEach(function(beer){
//               example3HTML += `
//                 <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4><br>${beer.abv}% ABV ${beer.ibu} IBU <br>${beer.brewery} ${beer.location} ${beer.description}</li>`
//               });
//       example3HTML += `
//             </ul>
//           </div>
//         </div>
//       </div>`;
//       if (example3 !== null) {
//         example3.innerHTML = example3HTML;
//       }
//
//       // FOURTH EXAMPLE
//       let example4 = document.getElementById('example4');
//       let example4HTML = '';
//
//       example4HTML = `<ul class="list-group-flush">`;
//               data0116.forEach(function(beer){
//                 example4HTML += `<li class="list-group-item"><a href="${beer.website}" target="_blank">${beer.id}.  ${beer.name}</a> ${beer.abv}% ABV ${beer.ibu} IBU ${beer.location} ${beer.description}</li>`
//               });
//       example4HTML += `</ul>`;
//       if (example4 !== null) {
//         example4.innerHTML = example4HTML;
//       }
//
//
//
//     }
//   }
//
//   xhr.send();
//   setTimeout(loadScreenlist,1000);
//   e.preventDefault();
// }
