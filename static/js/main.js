
// document.getElementById('edit-beerlist').addEventListener('click', loadBeerlist);
// document.getElementById('update-print-page').addEventListener('click', loadBeerlist);
loadBeerlist();


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


      let htmlStuff = `${data0116[0].id}. ${data0116[0].name}`;
      beerListDiv.innerHTML = htmlStuff;

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
      beerListDiv.innerHTML = htmlStuff;

      let monthP = document.getElementById('month-p');
      // console.log(document.getElementById('month-p'));
      monthP.innerHTML = `<span class="mx-3">${data1721[0].name}</span>`;

      let comingsoonP = document.getElementById('comingsoon-p');
      // console.log(document.getElementById('comingsoon-p'));
      comingsoonP.innerHTML = `<span class="mx-4">${data1721[1].name}</span>
      <span class="mx-4">${data1721[2].name}</span>
      <span class="mx-4">${data1721[3].name}</span>
      <span class="mx-4">${data1721[4].name}</span>`;

    }
  }

  xhr.send();
  setTimeout(loadBeerlist,1000);
  e.preventDefault();
}
