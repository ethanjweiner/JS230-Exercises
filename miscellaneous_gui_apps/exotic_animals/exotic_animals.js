const images = document.querySelectorAll('#exotic_animals img');
images.forEach((image) => {
  let timeoutID;

  image.addEventListener('mouseenter', (e) => {
    timeoutID = setTimeout(() => {
      showCaption(e.target.parentNode.lastElementChild);
    }, 2000);
  });

  image.addEventListener('mouseleave', (e) => {
    hideCaption(e.target.parentNode.lastElementChild);
    if (timeoutID) clearTimeout(timeoutID);
  });
});

function showCaption(caption) {
  caption.classList.add('active');
}

function hideCaption(caption) {
  caption.classList.remove('active');
}
