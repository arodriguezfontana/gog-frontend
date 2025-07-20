import { BadRequestException, InternalServerErrorException, UnauthorizedException, NotFound } from "./exceptions";
import { logoutUser } from "./token";
export function throwCorrectException(err) {
  if (err.response?.status === 401) {
    logoutUser();
    throw new UnauthorizedException(err.response.data.error);
  }
  if (err.response.status === 400) {
    throw new BadRequestException(err.response.data.error);
  }
  if (err.response?.status === 404) {
    throw new NotFound(err.response.data.error);
  }
  throw new InternalServerErrorException(err.response.data.error);
}