export default function fetchJSON(path, method, options = {}) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, path);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    request.addEventListener('load', () => {
      if (request.status >= 200 && request.status < 300) {
        const data =
          method === 'GET' ? JSON.parse(request.response) : request.response;
        resolve(data);
      } else {
        reject(request.responseText);
      }
    });

    if (options.timeout) {
      request.timeout = options.timeout;
      request.addEventListener('timeout', () => {
        alert('Request timed out! Try again.');
      });
    }

    request.send(JSON.stringify(options.data) || null);
  });
}
