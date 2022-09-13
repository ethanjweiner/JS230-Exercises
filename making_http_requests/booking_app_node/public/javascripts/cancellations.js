// Cancellations

function cancelSchedule(scheduleId) {
  const request = new XMLHttpRequest();
  request.open('DELETE', `/api/schedules/${scheduleId}`);
  request.send();
}

function cancelBooking(bookingId) {
  const request = new XMLHttpRequest();
  request.open('PUT', `/api/bookings/${bookingId}`);
  request.send();
}
