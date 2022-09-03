// Bold Element

// function makeBold(element, callback) {
//   element.style.fontWeight = 'bold';
//   if (callback && typeof callback === 'function') {
//     callback(element);
//   }
// }

// Further Exploration

// Requirmeents
// Bold the section or paragraph upon mouse click
// Upon bolding, fire a custom event listener. Use event delegation.

function makeBold(element) {
  element.style.fontWeight = 'bold';
  element.dispatchEvent(new CustomEvent('bolded', { bubbles: true }));
}

document.addEventListener('click', (event) => {
  if (event.target.tagName === 'P' || event.target.tagName === 'SECTION') {
    makeBold(event.target);
  }
});

// Highlight upon bold
document.addEventListener('bolded', (event) => {
  event.target.classList.add('highlighted');
  console.log('New Classlist: ', event.target.classList);
});
