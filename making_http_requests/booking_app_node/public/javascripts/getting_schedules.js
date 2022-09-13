function retrieveSchedules() {
  function tallyScheduleCounts(schedules) {
    return schedules.reduce((tally, schedule) => {
      const key = `staff ${schedule['staff_id']}`;
      tally[key] = tally[key] ? tally[key] + 1 : 1;
      return tally;
    }, {});
  }

  const request = new XMLHttpRequest();

  request.open('GET', '/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', () => {
    const schedules = request.response;

    if (schedules.length === 0) {
      alert('There are currently no schedules available for booking');
    } else {
      alert(objectToString(tallyScheduleCounts(schedules)));
    }
  });

  request.addEventListener('timeout', () => {
    alert('Request timed out. Please try again.');
  });

  request.send();
}

function retrieveSchedules() {
  retrieveStaff((staff) => {
    const staffIds = staff.map((staff) => staff['id']);
    const promises = staffIds.map(retrieveScheduleCount);

    const tally = {};

    Promise.all(promises).then((results) => {
      results.forEach(({ staffId, numSchedules }) => {
        tally[`staff ${staffId}`] = numSchedules;
      });
      alert(objectToString(tally));
    });
  });
}

function retrieveStaff(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', '/api/staff_members');
  request.responseType = 'json';

  request.addEventListener('load', () => {
    callback(request.response);
  });

  request.send();
}

function retrieveScheduleCount(staffId) {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open('GET', `/api/schedules/${staffId}`);
    request.responseType = 'json';

    request.addEventListener('load', (event) => {
      resolve({ staffId, numSchedules: request.response.length });
    });

    request.send();
  });
}

function objectToString(object) {
  return Object.entries(object)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}

retrieveSchedules();
