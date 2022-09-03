document.querySelector('img').addEventListener(
  'click',
  (event) => {
    event.stopPropagation();
  },
  false
);
