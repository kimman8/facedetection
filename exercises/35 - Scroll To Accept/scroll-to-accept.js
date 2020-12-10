const terms = document.querySelector('.terms-and-conditions');
const watch = document.querySelector('.watch');
const button = document.querySelector('.accept');

const ob = new IntersectionObserver(obCallBack, {
  root: terms,
  threshold: 1,
});

function obCallBack(payload) {
  if (payload[0].intersectionRatio === 1) {
    button.disabled = false;
    //stop observing da btton
    ob.unobserve(terms.lastElementChild);
  } else {
    button.disabled = true;
  }
}
ob.observe(terms.lastElementChild);
