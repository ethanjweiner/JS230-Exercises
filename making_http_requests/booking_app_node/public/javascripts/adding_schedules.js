import { scheduleTemplate } from './schedule_template.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const addScheduleButton = document.querySelector('button.add-more');

  let scheduleCount = 0;
  let staff;

  // Populate staff w/ IIFE
  (() => {
    const request = new XMLHttpRequest();
    request.open('GET', '/api/staff_members');
    request.responseType = 'json';

    request.addEventListener('load', () => {
      staff = request.response;
      addSchedule();
    });

    request.send();
  })();

  // Add new schedules on button click
  addScheduleButton.addEventListener('click', addSchedule);

  // Submit all schedules on form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const request = new XMLHttpRequest();
    request.open('POST', '/api/schedules');

    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    request.addEventListener('load', () => {
      if (request.status === 201) form.reset();
      alert(request.responseText);
    });

    request.send(JSON.stringify(schedulesData()));
  });

  // Retrieve data from all schedules in form
  function schedulesData() {
    const data = [];

    for (let number = 1; number <= scheduleCount; number++) {
      data.push({
        staff_id: parseInt(form[`staff_id-${number}`].value),
        date: form[`date-${number}`].value,
        time: form[`time-${number}`].value,
      });
    }

    return { schedules: data };
  }

  // Create new schedule and insert into DOM
  function addSchedule() {
    scheduleCount += 1;
    const schedule = scheduleTemplate({ staff, number: scheduleCount });
    document.querySelector('.schedules').appendChild(schedule);
  }
});
