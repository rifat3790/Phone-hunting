const loadPhone = async (searchText) => {
  try{
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchText}`
      );
      const data = await res.json();
      const phones = data.data;
      // console.log(phones);
      displayPhone(phones);
  }
  catch(error){
    console.error("Error fetching data:", error);
  }
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  const showAllContainer = document.getElementById("show-all-container");

  // Clear the phone container before adding new cards
  phoneContainer.textContent = '';

  // Check if there are more than 12 phones
  if (phones.length > 12) {
    // Display the "Show All" button
    showAllContainer.classList.remove('hidden');
  } else {
    // Hide the "Show All" button
    showAllContainer.classList.add('hidden');
  }

  // Display only the first 12 phones
  phones = phones.slice(0, 12);

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
                        <button class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`;
    phoneContainer.appendChild(phoneCard);
  });
};



// handle search button
const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
    // console.log(searchText);
    searchField.value = '';
    
}

loadPhone('iphone');
