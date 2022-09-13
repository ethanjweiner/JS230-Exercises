export default function formToJSON(form) {
  const formData = new FormData(form);
  const json = {};

  for (const pair of formData.entries()) {
    json[pair[0]] = pair[1];
  }

  return json;
}
