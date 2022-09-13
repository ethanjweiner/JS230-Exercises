import fetchJSON from './my_fetch.js';

document.addEventListener('DOMContentLoaded', () => {
  const datesList = document.querySelector('#dates-list');

  main();

  async function main() {
    const dates = await fetchJSON('/api/bookings', 'GET');
    insertDates(dates, datesList);
    datesList.addEventListener('click', handleDateClick);
  }

  async function handleDateClick(event) {
    const target = event.target;

    if (target.classList.contains('booking')) {
      const date = target.textContent;
      const bookings = await fetchJSON(`/api/bookings/${date}`, 'GET');
      const bookingsList = createBookingsList(bookings);
      target.appendChild(bookingsList);
    }
  }

  function insertDates(dates, list) {
    dates.forEach((date) => {
      const dateItem = document.createElement('li');
      dateItem.classList.add('booking');
      dateItem.textContent = date;
      list.appendChild(dateItem);
    });
  }

  function createBookingsList(bookings) {
    const list = document.createElement('ul');

    bookings.forEach((booking) => {
      const listItem = document.createElement('li');
      listItem.textContent = booking.join(' | ');
      list.appendChild(listItem);
    });

    return list;
  }
});
