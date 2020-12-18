const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

//we need an array to hold our state
let items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name: name,
    id: Date.now(),
    complete: false,
  };
  //push da items into our state
  items.push(item);
  //   console.log(`there are  now ${items.length} items in your state`);
  e.currentTarget.item.value = '';
  //fire off a custom event that will tell anyone who cares that the
  //items have been updated
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  console.log(items);
  const html = items
    .map(
      item =>
        `<li class="shopping-item"> 
        <input
         value ="${item.id}"
          type = "checkbox"
          ${item.complete ? 'checked' : ''}

          >
        <span class="itemName">${item.name}</span>
         <button aria-label ="Remove ${item.name}"
         value="${item.id}"
         >&times;</button>
        </li>`
    )
    .join('');

  //   console.log(html);
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  console.info('Saving items to local Storage');
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('restoring from LS');
  //pull items from LS
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // items = lsItems;
    // lsItems.forEach(item => items.push(item));
    //items.push(lsItems[0]);
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log('DELETING ITEM', id);
  //update our items array without this one
  items = items.filter(item => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  console.log('marking as complete', id);
  const itemRef = items.find(item => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
//event delegation: we listen for the click on the list  <ul>
//but then delegate the click over to the button if thtas wat we lcicked
list.addEventListener('click', function (e) {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
