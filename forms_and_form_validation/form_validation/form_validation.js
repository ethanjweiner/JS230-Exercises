// Form Validation

const App = {
  init() {
    this.form = document.querySelector('form');
    this.inputs = this.form.querySelectorAll('input');
    this.formError = this.form.querySelector('p.error');
    this.firstNameInput = this.form.querySelector('input[name="first-name"]');
    this.lastNameInput = this.form.querySelector('input[name="last-name"]');
    this.phoneNumberInput = this.form.querySelector(
      'input[name="phone-number"]'
    );
    this.bind();
  },

  bind() {
    this.form.addEventListener('blur', (e) => this.handleBlur(e), true);
    this.form.addEventListener('focus', (e) => this.handleFocus(e), true);
    this.form.addEventListener('submit', (e) => this.handleSubmission(e));
    this.inputs.forEach(this.preventInvalidInput, this);
  },

  preventInvalidInput(input) {
    input.addEventListener('keypress', (e) => {
      if (!this.validKeyInput(e.target, e.key) || this.tooLong(e.target)) {
        e.preventDefault();
      }
    });
  },

  validKeyInput(input, key) {
    if (!input.dataset.keyPattern) return true;
    const regex = new RegExp(input.dataset.keyPattern);

    return regex.test(key);
  },

  tooLong(input) {
    if (!input.maxLength) return false;

    return input.value.length >= input.maxLength;
  },

  handleSubmission(e) {
    e.preventDefault();
    if (this.form.checkValidity()) {
      this.formError.textContent = '';
    } else {
      this.formError.textContent =
        'Form cannot be submitted until errors are corrected.';
    }
  },

  handleFocus(e) {
    if (e.target.tagName !== 'INPUT') return;

    const input = e.target;

    input.classList.remove('error');
    this.setInputError(input, '');
  },

  handleBlur(e) {
    if (e.target.tagName !== 'INPUT') return;

    if (this.form.checkValidity()) {
      this.formError.textContent = '';
    }

    const input = e.target;

    if (input.checkValidity()) return;

    input.classList.add('error');

    if (input.validity.valueMissing) this.setInputError(input, 'valueMissing');
    if (input.validity.patternMismatch)
      this.setInputError(input, 'patternMismatch');
  },

  setInputError(input, messageType) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = this.errorMessage(input, messageType);
  },

  errorMessage(input, messageType) {
    const label = input.parentElement.previousElementSibling.firstElementChild;
    const elementName = label.textContent;

    switch (messageType) {
      case 'valueMissing':
        return `${elementName} is a required field.`;
      case 'patternMismatch':
        return `Please enter a valid ${elementName}`;
      default:
        return '';
    }
  },
};

App.init();
