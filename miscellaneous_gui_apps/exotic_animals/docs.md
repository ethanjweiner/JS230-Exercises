# Exotic Animals

## REQUIREMENTS

- Upon `mouseover` of an image, display the caption after 2000ms
- Only display image if mouse is still in image at that time
- Otherwise, cancel the timeout associated with that image

## IDEAS

- Add event handlers to each image:
  - Upon `mouseenter`:
    - Create a `timeout`
    - Show the caption after the timeout
  - Upon `mouseleave`:
    - Hide the caption
    - If the `timeout` exists for displaying the caption, cancel it
