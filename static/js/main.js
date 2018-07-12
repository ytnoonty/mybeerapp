let flashMsgDiv = document.getElementById('flash-msg-div');
loadBeerlist();
// loadScreenlist();


function loadBeerlist(e) {
  // console.log('testing function works');

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

      let beerListDiv = document.getElementById('beer-list-div');
      let ul = document.createElement('ul');
      //use this as a reference
      ul.setAttribute("id", "this-is-the-id");
      ul.classList.add = 'list-group-flush';

      let data = JSON.parse(this.responseText);
      let data0116 = data.slice(0,16);
      let data1721 = data.slice(16,21);

      let data0108 = data.slice(0,8);
      let data0816 = data.slice(8,16);



      // let htmlStuff = `${data0116[0].id}. ${data0116[0].name}`;
      // if (beerListDiv !== null) {
      //   beerListDiv.innerHTML = htmlStuff;
      // }

      htmlStuff = '';

      htmlStuff += `<ul class='list-group-flush'>`;

      data0116.forEach(function(beer){
        let li = document.createElement('li');
        li.className = 'list-group-item';
        let a = document.createElement('a');

        htmlStuff += `<li class='list-group-item'>${beer.id}.  <a href='${beer.website}' target='${beer.website}'>${beer.name}</a> - ${beer.abv}% ABV - ${beer.ibu} IBU - ${beer.location} - ${beer.brewery} - ${beer.description}</li>`;

        // console.log(beer.id);
        // console.log(beer.name);
      });
      htmlStuff += `</ul>`;
      // ul.innerHTML = htmlStuff;
      if (beerListDiv !== null) {
        beerListDiv.innerHTML = htmlStuff;
      }

      let monthP = document.getElementById('month-p');
      // console.log(document.getElementById('month-p'));
      if (monthP !== null) {
        monthP.innerHTML = `<span class="mx-3">${data1721[0].name}</span>`;
      }

      let comingsoonP = document.getElementById('comingsoon-p');
      // console.log(document.getElementById('comingsoon-p'));
      if (comingsoonP !== null) {
        comingsoonP.innerHTML = `<span class="mx-4">${data1721[1].name}</span>
        <span class="mx-4">${data1721[2].name}</span>
        <span class="mx-4">${data1721[3].name}</span>
        <span class="mx-4">${data1721[4].name}</span>`;
      }

/////////////////////////////////////////////
/////////////////////////////////////////////

// first example table element
let htmlTable = '';
htmlTable = `<tr>
<th></th>
<th>Beer</th>
<th>Style</th>
<th>ABV</th>
<th>IBU</th>
<th>Brewery</th>
<th>Location</th>
<th>Description</th>
</tr>`;

data0116.forEach(function(beer){
  htmlTable += `<tr>
    <td>${beer.id}.</td>
    <td>${beer.name}</td>
    <td>${beer.style}</td>
    <td>${beer.abv}%</td>
    <td>${beer.ibu}</td>
    <td>${beer.brewery}</td>
    <td>${beer.location}</td>
    <td>${beer.description}</td>
  </tr>
  `;
});
htmlTable += `</table>`;
let table = document.getElementById('beers-table');
if (table !== null) {
  table.innerHTML = htmlTable;
}




// second example left column
let example2 = document.getElementById('example2');
let example2HTML = '';

example2HTML = `<div class="row">
  <div class="col-sm">
    <div class="list-group">`;
data0108.forEach(function(beer){
  example2HTML += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${beer.id}. ${beer.name}</h5>
            <small>${beer.abv}% ABV ${beer.ibu} IBU</small>
          </div>
          <p class="mb-1">${beer.brewery} ${beer.location}</p>
          <small>${beer.description}</small>
        </a>`;
});
example2HTML += `</div>
  </div>`;

// second example right column
example2HTML += `<div class="col-sm">
    <div class="list-group">`;
data0816.forEach(function(beer){
  example2HTML += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${beer.id}. ${beer.name}</h5>
            <small>${beer.abv}% ABV ${beer.ibu} IBU</small>
          </div>
          <p class="mb-1">${beer.brewery} ${beer.location}</p>
          <small>${beer.description}</small>
        </a>`;
});
example2HTML += `</div>
  </div>`;
if (example2 !== null) {
  example2.innerHTML = example2HTML;
}

// THIRD EXAMPLE
let example3 = document.getElementById('example3');
let example3HTML = '';

example3HTML = `
<div class="row">
  <div class="col-sm">
    <div class="list-group">
      <ul class="list-group-flush">`;
        data0108.forEach(function(beer){
          example3HTML += `
          <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4><br>${beer.abv}% ABV ${beer.ibu} IBU <br>${beer.brewery} ${beer.location} ${beer.description}</li>`
        });
example3HTML += `
      </ul>
    </div>
  </div>
  <div class="col-sm">
    <div class="list-group">
      <ul class="list-group-flush">`;
      data0816.forEach(function(beer){
        example3HTML += `
          <li class="list-group-item"><h4>${beer.id}.  ${beer.name}</h4><br>${beer.abv}% ABV ${beer.ibu} IBU <br>${beer.brewery} ${beer.location} ${beer.description}</li>`
        });
example3HTML += `
      </ul>
    </div>
  </div>
</div>`;
if (example3 !== null) {
  example3.innerHTML = example3HTML;
}

// FOURTH EXAMPLE
let example4 = document.getElementById('example4');
let example4HTML = '';

example4HTML = `<ul class="list-group-flush">`;
        data0116.forEach(function(beer){
          example4HTML += `<li class="list-group-item"><a href="${beer.website}" target="_blank">${beer.id}.  ${beer.name}</a> ${beer.abv}% ABV ${beer.ibu} IBU ${beer.location} ${beer.description}</li>`
        });
example4HTML += `</ul>`;
if (example4 !== null) {
  example4.innerHTML = example4HTML;
}
/////////////////////////////////////////////
/////////////////////////////////////////////

    }
  }

  xhr.send();
  setTimeout(loadBeerlist,1000);
  // setTimeout(loadScreenlist,1000);


  // console.log(flashMsgDiv);

  setTimeout(function(){
    flashMsgDiv.style.display = 'none';
  },2500);
  e.preventDefault();
}












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
