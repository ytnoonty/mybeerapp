class UI {
  constructor() {
    this.searchresults = document.getElementById('searchresults');
  }

  // Show profile in ui
  showBeerList(beer) {
    let output = '';
    output += `
      <table class="table table-striped">
        <tr>
          <th>Beer Id</th>
          <th>Name</th>
          <th>Style</th>
          <th>ABV</th>
          <th>IBU</th>
          <th>Brewery</th>
          <th>Location</th>
          <th>Website</th>
          <th>Description</th>
          <th></th>
          <th></th>
        </tr>`;
      beer.response.beers.items.forEach(function(beer) {
        output += `
          <tr class="beer-tr">
            <td>${beer.beer.bid}</td>
            <td>${beer.beer.beer_name}</span></td>
            <td>${beer.beer.beer_style}</td>
            <td>${beer.beer.beer_abv}</td>
            <td>${beer.beer.beer_ibu}</td>
            <td>${beer.brewery.brewery_name}</td>
            <td>${beer.brewery.location.brewery_city}, ${beer.brewery.location.brewery_state} - ${beer.brewery.country_name}</td>
            <td>${beer.brewery.contact.url}</td>
            <td>${beer.beer.beer_description}</td>
            <td></td>
            <td></td>
          </tr>
        `;
      });
    output += `
      </table>
      `;

    this.searchresults.innerHTML = output;
  }

  showBeerCandidate(beer) {
    let selectedBeer = beer.response.beer;
    let output = '';
    output += `
      <table class="table table-striped">
        <tr>
          <th>Beer Id</th>
          <th>Name</th>
          <th>Style</th>
          <th>ABV</th>
          <th>IBU</th>
          <th>Brewery</th>
          <th>Location</th>
          <th>Website</th>
          <th>Description</th>
          <th>Draft/Bottle</th>
          <th></th>
          <th></th>
        </tr>`;
    output += `
        <tr>
          <td id="beer_id">${selectedBeer.bid}</td>
          <td id="beer_name">${selectedBeer.beer_name}</td>
          <td id="beer_style">${selectedBeer.beer_style}</td>
          <td id="beer_abv">${selectedBeer.beer_abv}</td>
          <td id="beer_ibu">${selectedBeer.beer_ibu}</td>
          <td id="brewery_name">${selectedBeer.brewery.brewery_name}</td>
          <td id="brewery_location">${selectedBeer.brewery.location.brewery_city}, ${selectedBeer.brewery.location.brewery_state}, ${selectedBeer.brewery.country_name}</td>
          <td id="brewery_url">${selectedBeer.brewery.contact.url}</td>
          <td id="beer_description">${selectedBeer.beer_description}</td>
          <td>
            <div>
              <input class="bottle-draft" type="radio" id="draft"
                     name="beer" value="Draft" checked="true" />
              <label for="draft">Draft</label>
            </div>
            <div>
                <input class="bottle-draft" type="radio" id="bottle"
                       name="beer" value="Bottle" />
                <label for="bottle">Bottle</label>
            </div>
            <div>
                <input class="bottle-draft" type="radio" id="both"
                       name="beer" value="Both" />
                <label for="both">Both</label>
            </div>
          </td>
          <td><a href="#" class="btn btn-success add-beer-to-db" type="">Add Beer</a></td>
          <td><a href="#" class="btn btn-danger btn-cancel">Cancel</a></td>
        </tr>
    `;
    output += `
      </table>
      `;
    this.searchresults.innerHTML = output;
  }

  showAddedBeer(beer) {
    let selectedBeer = JSON.parse(beer);
    console.log(selectedBeer);
    let output = '';
    output += `
      <table class="table table-striped">
        <tr>
          <th>Beer Id</th>
          <th>Name</th>
          <th>Style</th>
          <th>ABV</th>
          <th>IBU</th>
          <th>Brewery</th>
          <th>Location</th>
          <th>Website</th>
          <th>Description</th>
          <th>Draft/Bottle</th>
          <th></th>
          <th></th>
        </tr>`;
    output += `
        <tr>
          <td id="beer_id">${selectedBeer.id}</td>
          <td id="beer_name">${selectedBeer.name}</td>
          <td id="beer_style">${selectedBeer.style}</td>
          <td id="beer_abv">${selectedBeer.abv} %</td>
          <td id="beer_ibu">${selectedBeer.ibu}</td>
          <td id="brewery_name">${selectedBeer.brewery}</td>
          <td id="brewery_location">${selectedBeer.location}</td>
          <td id="brewery_url">${selectedBeer.website}</td>
          <td id="beer_description">${selectedBeer.description}</td>
        </tr>
    `;
    output += `
      </table>
      `;
    this.searchresults.innerHTML = output;
  }

}
