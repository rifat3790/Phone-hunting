let lastSearchText = ''; // Store the last search term

const loadPhone = async (searchText, isShowAll) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  const showAllContainer = document.getElementById("show-all-container");

  // Clear the phone container before adding new cards
  phoneContainer.textContent = '';

  // Check if there are more than 12 phones
  if (phones.length > 12 && !isShowAll) {
    // Display the "Show All" button
    showAllContainer.classList.remove('hidden');
  } else {
    // Hide the "Show All" button
    showAllContainer.classList.add('hidden');
  }

  // Display only the first 12 phones if not showing all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `<figure class="px-10 pt-10">
                      <img
                        src="${phone.image}"
                        alt="Phone"
                        class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>${phone.slug}</p>
                      <h2 class="card-title">$999</h2>
                      <div class="card-actions">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`;
    phoneContainer.appendChild(phoneCard);
  });

  // Hide loading spinner
  toggleLoadingSpinner(false);
};

// Phone details
const handleShowDetail = async(id)=>{
  console.log(id);

  // load data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);
  showPhoneDetails(phone);
}

// 
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('phone-name');
  phoneName.textContent = phone.name;

  const showDetailsContainer = document.getElementById('show-detail-container');
  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  `
  // show the modal
  show_details_modal.showModal();
};

// Handle search button
const handleSearch = (isShowAll = false) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value || lastSearchText; // Use the last search term if the current one is empty
  lastSearchText = searchText; // Update the last search term
  loadPhone(searchText, isShowAll);
  searchField.value = '';
};

// Toggle loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};

// Handle "Show All" button click
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone('iphone');
