let pop = document.getElementById("pop-map");
let modal = document.getElementById("mapModal");
let mapIframe = document.getElementById("map-iframe");
let searchInput = document.getElementById("search-input");
let shopTable = document.getElementById("shop-table");
let globalMapUrl = `https://www.google.com/maps/d/embed?mid=1DcacdB1MmrzvJShISrzFUobtTcJUu4o&ehbc=2E312F`;
let shopData = [
  {
    name: "SEI Mangaldan",
    location: "Mangaldan, Pangasinan",
    contact: "0951951228",
    coordinates: { lat: 16.06501, lng: 120.40119 },
  },
  {
    name: "SEI Japan",
    location: "Niigata, Japan",
    contact: "",
    coordinates: { lat: 37.51783, lng: 138.92697 },
  },
  {
    name: "SEI Manila",
    location: "Manila, Philippines",
    contact: "0951951223",
    coordinates: { lat: 14.59951, lng: 120.98421 },
  },
];

function displayShopData(data) {
  let tableBody = shopTable.querySelector("tbody");
  tableBody.innerHTML = "";
  data.forEach((shop) => {
    let row = `<tr data-location="${shop.location}">
                        <td class="branch-text">${shop.name}</td>
                        <td>${shop.location}</td>
                        <td>${shop.contact}</td>
                    </tr>`;
    tableBody.innerHTML += row;
  });
}

function updateMap(lat, lng) {
  let mapUrl = `https://www.google.com/maps/d/u/0/embed?mid=1DcacdB1MmrzvJShISrzFUobtTcJUu4o&ehbc=2E312F&ll=${lat},${lng}&z=10`;
  mapIframe.src = mapUrl;
}

function filterShopData(searchValue) {
  return shopData.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchValue) ||
      shop.location.toLowerCase().includes(searchValue),
  );
}

function initializeModal() {
  displayShopData(shopData);
  mapIframe.src = globalMapUrl;
}

pop.addEventListener("click", () => {
  modal.style.display = "block";
  initializeModal();
});

searchInput.addEventListener("input", () => {
  let searchValue = searchInput.value.toLowerCase();
  let filteredData = filterShopData(searchValue);
  displayShopData(filteredData);
});

shopTable.addEventListener("click", (event) => {
  let target = event.target.closest("tr");
  if (target) {
    let location = target.getAttribute("data-location");
    if (location)
      switch (location) {
        case "Mangaldan, Pangasinan":
          updateMap(16.06501, 120.40119);
          break;
        case "Niigata, Japan":
          updateMap(37.51783, 138.92697);
          break;
        case "Manila, Philippines":
          updateMap(14.59951, 120.98421);
          break;
        default:
          mapIframe.src = globalMapUrl;
          break;
      }
  }
});

//close the modal
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
