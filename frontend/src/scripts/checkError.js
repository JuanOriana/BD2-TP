export function checkError(response) {
  if (
    response.status >= 200 &&
    response.status <= 299 &&
    response.status !== 204
  ) {
    return response.json();
  } else {
    throw Error(response.status.toString());
  }
}
