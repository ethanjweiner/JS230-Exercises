# Form Validation

## REQUIREMENTS

- Create a form w/ first name, email, password, phone
- Event handlers
  - Input unfocus/blur
    - Validate input, if invalid:
      - Display red error message to right of input
      - Border input red
    - If all inputs are valid:
      - Hide top-level error message
  - Input focus: Hide error message + reset border
  - Form submission
    - Validate all form fields, if invalid:
      - Display top-level error message
- Validation rules:
  - All field required except phone
  - Name = Letters only
    - Disallow key entries besides characters
  - Password >= 10 chars
  - Phone # = U.S. style
    - Disallow key entires besides #s & hyphens
  - Emails conform to `.+@.+`
  - Credit card: 4 inputs (same `name`)
    - Disallow key entires besides #s
    - Set maximum length to 4
- Can not use built-in form validation (use `novalidate` attribute on `form`)
- Use the `ConstraintValidationAPI` for validation purposes
- General idea:
  - Each input is associated w/ an error message
  - The entire form is associated w/ an error message

## PLAN

## IMPLEMENTATION NOTES

- Use the `Element.validity` to determine whether the pattern is good
  - `.valid` (boolean)
  - `.patternMismatch`
  - `.valueMissing`
  - etc.
