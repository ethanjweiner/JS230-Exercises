// Goals
// Submit new staff memeber to /api/staff_members
// Serialize the data so it can be added
// Perform client-side validation of the output
// Possible status codes: 422, 200

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const request = new XMLHttpRequest();
    request.open('POST', form.action);

    request.addEventListener('load', () => {
      if (request.status === 201) {
        const data = JSON.parse(request.response);
        alert(`Successfully created staff with id: ${data.id}`);
        form.reset();
      } else if (request.status === 400) {
        alert(request.responseText);
      }
    });

    request.send(new FormData(form));
  });
});
