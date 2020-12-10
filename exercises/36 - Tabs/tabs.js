const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
  //hide all tab panels
  tabPanels.forEach(panel => {
    panel.hidden = true;
  });
  //mark all tabs as unselected
  tabButtons.forEach(tabButton => {
    tabButton.ariaSelected = false;
    tabButton.setAttribute('aria-selected', false);
  });
  //mark the clicked tab as selected
  event.currentTarget.setAttribute('aria-selected', true);
  //find associated tab panel and show it!
  const { id } = event.currentTarget;
  /* method 1
  const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  tabPanel.hidden = false;
  console.log(tabPanel);
  console.log(id);
  //   console.log(event.currentTarget);
  */

  // method 2 find in the array of tabpanels
  const tabPanel = tabPanels.find(
    panel => panel.getAttribute('aria-labelledby') === id
  );
  console.log(tabPanel);
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
