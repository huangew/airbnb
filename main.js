console.log("Hello world");

function MainModule(listingID = '.listing-grid') {
  const me = {};
  const listingFile = "./airbnb_sf_listings_500.json";
  const listingGrid = document.querySelector(listingID);

  //Gets airbnb listings from json file
  async function loadData() {
      
      const result = await fetch(listingFile);
      const listing = await result.json();
      me.renderListing(listing.slice(0,50));
  }

  //Create Listing Element
  function createListingElement(listing) {
    return `<article class="listing">
            <h3 class="list-name" data-id="${listing.id}">${listing.name}</h3>

            <img
              src=${listing.picture_url}
              alt="Thumbnail of living room with couch"
            />
            <div class="price">${listing.price}</div>
            <div class="host">Host: ${listing.host_name}</div>
            
            <div class="description">
              ${listing.description}
            </div>
          </article>
          `;

  }

  function renderListing(listings) {
    listingGrid.innerHTML = "";
    listingGrid.innerHTML = listings.map(createListingElement).join("\n");
  }
  me.renderListing = renderListing;
  me.loadData = loadData;
  return me;
}


const main = MainModule();

main.loadData();