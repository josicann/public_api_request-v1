/* API Requests***/
fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(response => response.json())
  .then(data => generateCards(data));

/*Selected DOM elements**/
const $gallery = $('#gallery');
const $body = $('body');

const addSearchBar = function() {
  const $searchContainer = $('.search-container');

  $searchContainer.append(
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`
  )

    $searchContainer.submit((event)=> {
      const $cards = $('.card');

      $.each($cards, (index, card) =>{
        if (!$(card).children('.card-info-container')
                    .children('#name')
                    .text().includes($('#search-input').val())) 
              {
          $(card).hide();
        }else {
          $(card).show();
              }
      });
    });
}();
function generateCards(data) {
  //append cards markup to DOM
  for(let i = 0; i < data.results.length; i++) {
    $gallery.append(
      `<div class="card">
          <div class="card-img-container">
              <img class="card-img" src=${data.results[i].picture.medium} alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
              <p class="card-text">${data.results[i].email}</p>
              <p class="card-text cap">${data.results[i].location.city}</p>
          </div>
       </div>`
     )
     //add event listener to create modal when card is clicked
     document.querySelectorAll('.card')[i].addEventListener('click', (event) => {
       console.log(i);
        createModal(data, i);
      });
    }
}


function createModal(data, index) {
  let birthyear = data.results[index].dob.date.substring(2,4);
  let birthmonth = data.results[index].dob.date.substring(5,7);
  let birthday = data.results[index].dob.date.substring(8,10);

  $body.append( 
    `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${data.results[index].picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.results[index].name.first} ${data.results[index].name.last}</h3>
                <p class="modal-text">${data.results[index].email}</p>
                <p class="modal-text cap">${data.results[index].location.city}</p>
                <hr>
                <p class="modal-text">${data.results[index].cell}</p>
                <p class="modal-text">${capitalize(`
                                      ${data.results[index].location.street}
                                      ${data.results[index].location.city},
                                      ${data.results[index].location.state}
                                      ${data.results[index].location.postcode}`)}</p>
                                      
                <p class="modal-text">Birthday: ${birthmonth}/${birthday}/${birthyear}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`
  )
  //close modal btn
  document.querySelector('#modal-close-btn').addEventListener('click', (event) => {
    $('.modal-container').remove();
  }); 
  //next modal btn
  document.querySelector('#modal-next').addEventListener('click', (event) => {
    if(index < data.results.length - 1 ) {
      index++;
      $('.modal-container').remove();
      createModal(data, index);
    };
  }); 
  //prev modalbtn
  document.querySelector('#modal-prev').addEventListener('click', (event) => {
    if(index > 0 ) {
      index--;
      $('.modal-container').remove();
      createModal(data, index);
    };
  }); 
};

function capitalize(string) {
  return string.replace(/\b\w/g, l => l.toUpperCase())
}

