function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery found!');
  }

  //select da elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  const galleries = document.querySelector('.galleries');
  let currentImage;

  function openModal() {
    // console.info('opening modal..');
    //first check if modal is already open or not
    if (modal.matches('.open')) {
      console.info('modal already open!');
      return; //stop da function from running
    }
    modal.classList.add('open');
    //event listeners to be bound when we open modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }
  function closeModal() {
    modal.classList.remove('open');
    //TODO: add event listeners for clicks and keyboard
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }
  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.keyCode === 27) return closeModal();
    if (event.keyCode === 37) return showPrevImage();
    if (event.keyCode === 39) return showNextImage();
  }
  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el) {
    if (!el) {
      console.info('no image to show');
      return;
    }
    //update da modal with this info
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('img').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }
  //these are our evevnt listeners

  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  //loop over each image
  images.forEach(image => {
    //attach an event listener for each image
    image.addEventListener('keyup', e => {
      //when its keyup'd, check if its ENTER
      if (e.key === 'Enter') {
        //if it was, show that image
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);
}

//use it on da page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
