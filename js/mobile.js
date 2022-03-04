// search field
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
        // console.log(searchText);
    searchField.value = '';
    if (searchText == '')
    {
        // error handling to remove previous load data.
        const searchResult = document.getElementById('search-result');
        searchResult.innerText = '';
        const mobDetails = document.getElementById('mobile-details');
        mobDetails.textContent = '';
        const noResult = document.getElementById('no-result');
        noResult.style.display = 'none';
        // display error message
        const noText = document.getElementById('no-text');
        noText.style.display = 'block';
    }

    else
    {
        
        const noText = document.getElementById('no-text');
        noText.style.display = 'none';
        // api url
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
            // console.log(url);
            fetch(url)
            .then(res => res.json())
            .then(data => displaySeachResult(data.data));
        
    }



}
// Display phones
const displaySeachResult = phones => {
    // console.log(phones);

    const mobDetails = document.getElementById('mobile-details');
    mobDetails.textContent = '';
    // no result 
    if(phones.length==0) {
        const searchResult = document.getElementById('search-result');
            
        searchResult.innerText = '';
    // {console.log('no result found');
    const noResult = document.getElementById('no-result');
    noResult.style.display = 'block';
    }
    // results
    else{
        const noResult = document.getElementById('no-result');
        noResult.style.display = 'none';
        if(phones.length<=20)
        {
           
            const searchResult = document.getElementById('search-result');
            
            searchResult.innerText = '';
            phones.forEach(phone => {
                
                // console.log(phone);
                // console.log(phone.slug);
                const div = document.createElement('div');
                div.classList.add('result-card')
                div.innerHTML = `
                    <div class="card h-100 card-color p-3 mx-auto">
                        <img src="${phone.image}" class="card-img-top" alt="phone pic">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">${phone.brand}</p>
                        </div>
                        <button onclick="mobileDetails('${phone.slug}')" class="btn btn-outline-secondary button-color w-50 mx-auto mb-3" type="button" id="phone-details">Details</button>
                    </div>
                `;
                searchResult.appendChild(div);
        
            })
        }
        else {
            const searchResult = document.getElementById('search-result');
            searchResult.innerText = '';
            for(i=0;i<20;i++){
                // console.log(phones[i].slug);
               
                const div = document.createElement('div');
                div.classList.add('result-card')
                div.innerHTML = `
                    <div class="card h-100 card-color p-3 mx-auto">
                        <img src="${phones[i].image}" class="card-img-top" alt="phone pic">
                        <div class="card-body">
                          <h5 class="card-title">${phones[i].phone_name}</h5>
                          <p class="card-text">Manufacturer: ${phones[i].brand}</p>
                        </div>
                        <button onclick="mobileDetails('${phones[i].slug}')" class="btn btn-outline-secondary button-color w-50 mx-auto mb-3" type="button" id="mobile-details-btn">Details</button>
                    </div>
                `;
                searchResult.appendChild(div);
        
            }
        }
    }
 
}
// details after clicking mobile
const mobileDetails = mobileID=> {
    // console.log(mobileID);
    const url = `https://openapi.programming-hero.com/api/phone/${mobileID}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayMobileDetails(data.data));
    // .then(data => console.log(data.data.mainFeatures.sensors[0]));

}

const displayMobileDetails = mobile => {
    // console.log(mobile);
  
    const mobDetails = document.getElementById('mobile-details');
    mobDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('details-card');
    // const releaseDate = mobile.releaseDate;
    // console.log(releaseDate);

    // witout releaseDate

    if(mobile.releaseDate == "")
    { 
        div.innerHTML = `
        <div class="card details-card h-100 card-color p-3 mx-auto text-center">
            <h5 class="card-title fw-bold">${mobile.name} Details</h5>
            <p class="card-text ">Realese Date: Unknown</p>
            <img src="${mobile.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
            <h5 class="card-title ">Main Features</h5>
            <p class="card-text">Display Size: ${mobile.mainFeatures.displaySize}</p>
            <p class="card-text">Memory: ${mobile.mainFeatures.memory}</p>
            <p class="card-text">Chipset: ${mobile.mainFeatures.chipSet}</p>
            <h5 class="card-title ">Sensors</h5>
            <p class="card-text ">${mobile.mainFeatures.sensors[0]}</p>
            <p class="card-text ">${mobile.mainFeatures.sensors[1]}</p>
            <p class="card-text ">${mobile.mainFeatures.sensors[2]}</p>
            <h5 class="card-title ">Other Features</h5>
            <p class="card-text">Bluetooth: ${mobile.others.Bluetooth}</p>
            <p class="card-text">GPS: ${mobile.others.GPS}</p>
            <p class="card-text">NFC: ${mobile.others.NFC}</p>
            <p class="card-text">USB: ${mobile.others.USB}</p>
            </div>
        </div>
        `
    }
    //  releaseDate
    else
    {
        div.innerHTML = `
        <div class="card details-card h-100 card-color p-3 mx-auto text-center">
            <h5 class="card-title fw-bold">${mobile.name} Details</h5>
            <p class="card-text ">Realese Date: ${mobile.releaseDate} </p>
            <img src="${mobile.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
            <h5 class="card-title ">Main Features</h5>
            <p class="card-text">Display Size: ${mobile.mainFeatures.displaySize}</p>
            <p class="card-text">Memory: ${mobile.mainFeatures.memory}</p>
            <p class="card-text">Chipset: ${mobile.mainFeatures.chipSet}</p>
            <h5 class="card-title ">Sensors</h5>
            <p class="card-text ">${mobile.mainFeatures.sensors[0]}</p>
            <p class="card-text ">${mobile.mainFeatures.sensors[1]}</p>
            <p class="card-text ">${mobile.mainFeatures.sensors[2]}</p>
            <h5 class="card-title ">Other Features</h5>
            <p class="card-text">Bluetooth: ${mobile.others.Bluetooth}</p>
            <p class="card-text">GPS: ${mobile.others.GPS}</p>
            <p class="card-text">NFC: ${mobile.others.NFC}</p>
            <p class="card-text">USB: ${mobile.others.USB}</p>
            
    
        </div>
        `
    }

    mobDetails.appendChild(div);

}