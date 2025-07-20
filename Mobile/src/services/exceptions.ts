class APIException extends Error {
  path: string;
  constructor(message: string, path = "") {
    super(message);
    this.name = this.constructor.name;
    this.path = path;
  }
}

class BadRequestException extends APIException {
  constructor(message: string) {
    super(message);
    this.path = "/"
  }
}

class UnauthorizedException extends APIException {
  constructor(message: string) {
    super(message);
    this.path = "/login"
  }
}

class InternalServerErrorException extends APIException {
  constructor(message: string) {
    super(message);
    this.path = "/"
  }

}
class NotFound extends APIException {
  constructor(message: string) {
    super(message);
    this.path = "/"
  }
}

export { BadRequestException, UnauthorizedException, InternalServerErrorException, NotFound, APIException };