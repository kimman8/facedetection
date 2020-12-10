const cardButtons = document.querySelectorAll('.card button');
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

function handleCardButtonClick(event) {
  const button = event.currentTarget;
  const card = button.closest('.card');
  console.log(card);
  //grab da img src
  const imgSrc = card.querySelector('img').src;
  console.log(imgSrc);
  const desc = card.dataset.description;
  console.log(desc);
  const name = card.querySelector('h2').textContent;
  modalInner.innerHTML = `
  <img width="600" height="600" src="${imgSrc.replace(
    '200',
    '600'
  )}" alt="${name}" class="">
  <p>${desc}</p>
  `;
  //show da modal
  modalOuter.classList.add('open');
}

cardButtons.forEach(cunt1 =>
  cunt1.addEventListener('click', handleCardButtonClick)
);

function closeModal() {
  modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click', function (event) {
  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', event => {
  console.log(event);
  if (event.key === 'Escape') {
    closeModal();
  }
});
