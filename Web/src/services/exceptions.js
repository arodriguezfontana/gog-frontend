class APIException extends Error {
  constructor(message, path = "") {
    super(message);
    this.name = this.constructor.name;
    this.path = path;
  }
}

class BadRequestException extends APIException {
  constructor(message) {
    super(message);
    this.path = "/";
  }
}

class UnauthorizedException extends APIException {
  constructor(message) {
    super(message);
    this.path = "/login";
  }
}

class InternalServerErrorException extends APIException {
  constructor(message) {
    super(message);
    this.path = "/error";
  }

}
class NotFound extends APIException {
  constructor(message) {
    super(message);
    this.path = "/404";
  }
}

export { BadRequestException, UnauthorizedException, InternalServerErrorException, NotFound, APIException };