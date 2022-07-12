export function handleService(
  promise,
  navigate,
  setterFunction,
  cleanerFunction
) {
  promise
    .then((response) => {
      if (response.hasFailed()) {
        if (response.getError() === 204) {
          // @ts-ignore
          setterFunction(undefined);
        } else if (isNaN(response.getError())) {
          return;
        } else {
          navigate(`/error?code=${response.getError()}`);
        }
      } else {
        setterFunction(response.getData());
      }
    })
    .catch(() => navigate("/error?code=500"))
    .finally(cleanerFunction);
}
