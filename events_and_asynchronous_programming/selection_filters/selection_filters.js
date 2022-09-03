// Selection Filters

const CLASSIFICATIONS_TO_ANIMALS = {
  Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  Mammal: ['Bear', 'Whale'],
  Bird: ['Ostrich'],
};

const ANIMALS_TO_CLASSIFICATIONS = {
  Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Turtle: ['Vertebrate', 'Cold-blooded'],
  Whale: ['Verebrate', 'Warm-blooded', 'Mammal'],
  Salmon: ['Vertebrate', 'Cold-blooded'],
  Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
};

const classificationsSelect = document.querySelector('#animal-classifications');
const animalsSelect = document.querySelector('#animals');
const clearButton = document.querySelector('#clear');
const form = document.querySelector('#selection-filters');

classificationsSelect.addEventListener('change', (event) => {
  const classification = event.currentTarget.value;
  const animals = CLASSIFICATIONS_TO_ANIMALS[classification];
  setOptions(animalsSelect, animals);
});

animalsSelect.addEventListener('change', (event) => {
  const animal = event.currentTarget.value;
  const classifications = ANIMALS_TO_CLASSIFICATIONS[animal];
  setOptions(classificationsSelect, classifications);
});

form.addEventListener('submit', setDefaults);

function setDefaults(event) {
  event.preventDefault();
  setOptions(classificationsSelect, [
    'Classifications',
    'Vertebrate',
    'Warm-blooded',
    'Cold-blooded',
    'Mammal',
    'Bird',
  ]);

  setOptions(animalsSelect, [
    'Animals',
    'Bear',
    'Turtle',
    'Whale',
    'Salmon',
    'Ostrich',
  ]);
}

// Destructure options from select
function setOptions({ options }, values) {
  options.length = 0; // Reset
  values.forEach((value, index) => {
    options[index] = new Option(value);
  });
}
