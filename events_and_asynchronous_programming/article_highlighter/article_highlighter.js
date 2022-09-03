// Article Highlighter

/*
# PROBLEM

Requirements:
- When a nav link is clicked on:
  - Scroll to article
  - Remove all highlights
  - Add highlight to clicked article
- When an article is clicked on:
  - Remove all highlights
  - Add highlight to clicked article
- When the user clicks anywhere else:
  - Remove all highlights
  - Add highlight to the `main` element


# IDEAS

- Will need to stop propagation to avoid firing the event on the `body` every
time
- Event delegation: Delegate all click events on articles to `document`
*/

function highlight({ target, currentTarget }) {
  removeHighlights();

  let element;

  if (currentTarget.tagName === 'ARTICLE') {
    element = currentTarget;
  } else if (target.tagName === 'A') {
    element = document.querySelector(target.hash);
  } else {
    element = document.querySelector('main');
  }

  element.classList.add('highlight');
}

function removeHighlights() {
  document.querySelectorAll('.highlight').forEach((element) => {
    element.classList.remove('highlight');
  });
}

const nav = document.querySelector('ul');

nav.addEventListener('click', highlight);
document.addEventListener('click', highlight);

document.querySelectorAll('article').forEach((article) => {
  article.addEventListener('click', (event) => {
    event.stopPropagation();
    highlight(event);
  });
});

// Better approach: Add a single listener to the document to which all click
// events are delegated, & handle logic conditionally
