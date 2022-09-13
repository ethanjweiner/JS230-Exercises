// Booking Time Slots

/*
# PROBLEM

1. Retrieve available schedules for booking
  - Use a short timeout -> retry
2. Add a booking
  - Sub-Problem: Check if student exists, if so, book
  - Otherwise, unhide new student form + autofill w/ email & random booking sequence
3. Add new student to database (and subsequently book new student)

# IDEAS

- Break sub-problems into separate files (modules)

# PLAN

- Focus on high-level interface first (primary tasks upon DOM load)
- Extract work on each of the 3 sub-problems into smaller files
*/

import fetchJSON from './my_fetch.js';
import formToJSON from './form_to_json.js';

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.querySelector('.booking-form');
  const newStudentForm = document.querySelector('.student-form');

  main();

  function main() {
    populateSchedulesSelect();
    bookingForm.addEventListener('submit', handleBooking);
    newStudentForm.addEventListener('submit', handleNewStudent);
  }

  function populateSchedulesSelect() {
    const schedulesSelect = document.querySelector('select#id');

    const promises = [
      fetchJSON('/api/schedules', 'GET'),
      fetchJSON('/api/staff_members', 'GET'),
    ];

    Promise.all(promises).then(([schedules, staff]) => {
      const availableSchedules = schedules.filter(({ student_email }) => {
        return !student_email;
      });

      availableSchedules.forEach(({ id, staff_id, date, time }, index) => {
        const staffName = staffIdToName(staff_id, staff);
        const text = `${staffName} | ${date} | ${time}`;
        schedulesSelect[index] = new Option(text, id);
      });
    });
  }

  function handleBooking(event) {
    if (event) event.preventDefault();

    fetchJSON('/api/bookings', 'POST', { data: formToJSON(bookingForm) })
      .then(() => {
        alert('Booked');
        bookingForm.reset();
      })
      .catch((error) => {
        alert(error);

        if (/booking_sequence/.test(error)) {
          const bookingSequence = error.split('booking_sequence: ')[1];

          newStudentForm.classList.remove('hidden');
          newStudentForm['email'].value = bookingForm['student_email'].value;
          newStudentForm['booking_sequence'].value = bookingSequence;
        }
      });
  }

  function handleNewStudent(event) {
    event.preventDefault();

    fetchJSON('/api/students', 'POST', { data: formToJSON(newStudentForm) })
      .then((response) => {
        alert(response);

        // Re-submit booking form w/ correct email
        bookingForm['student_email'].value = newStudentForm['email'].value;
        bookingForm.dispatchEvent(new Event('submit', { cancelable: true }));

        newStudentForm.reset();
      })
      .catch(alert);
  }

  function staffIdToName(staffId, staff) {
    return Object.values(staff).find((member) => member.id === staffId).name;
  }
});
