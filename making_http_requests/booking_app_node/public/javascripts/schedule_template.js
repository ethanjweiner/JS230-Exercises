function scheduleTemplate({ number, staff }) {
  const schedule = document.createElement('div');
  schedule.innerHTML = scheduleMarkup(number);
  const select = createStaffSelect({ number, staff });
  schedule.querySelector('.staff-select').appendChild(select);
  return schedule;
}

function scheduleMarkup(number) {
  return `
<dl>
  <h1>Schedule ${number}</h1>
  <dt>
    <label for="staff_id-${number}">Staff Name</label>
  </dt>
  <dd class="staff-select">
    <!-- Create select here -->
  </dd>
  <dt>
    <label for="date-${number}">Date</label>
  </dt>
  <dd>
    <input type="text" name="date-${number}" id="date-${number}" placeholder="mm-dd-yy" />
  </dd>
  <dt>
    <label for="time-${number}">Time</label>
  </dt>
  <dd>
    <input type="text" name="time-${number}" id="time-${number}" placeholder="hh-mm" />
  </dd>
</dl>
  `;
}

function createStaffSelect({ number, staff }) {
  const select = document.createElement('select');
  select.setAttribute('name', `staff_id-${number}`);
  select.setAttribute('id', `staff_id-${number}`);

  staff.forEach(({ id, name }) => {
    select[id] = new Option(name, id);
  });

  select.querySelector('option:not([value])').remove();
  return select;
}

export { scheduleTemplate };
