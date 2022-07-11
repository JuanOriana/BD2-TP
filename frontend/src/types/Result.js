export default class Result {
  constructor(data, failed, error) {
    this.data = data;
    this.failed = failed;
    this.error = error;
  }

  getData() {
    return this.data;
  }

  getError() {
    return this.error;
  }

  static ok(data) {
    return new Result(data, false, null);
  }

  static failed(error) {
    return new Result(null, true, error);
  }

  hasFailed() {
    return this.failed;
  }
}
