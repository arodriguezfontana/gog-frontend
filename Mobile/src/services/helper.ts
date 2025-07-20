import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  NotFound,
} from "./exceptions";
import { AxiosError } from "axios";

export function throwCorrectException(err: AxiosError): never {
  const status = err.response?.status;
  const data = err.response?.data as { error?: string } | undefined;
  const errorMessage = data?.error ?? "Unknown error";

  if (status === 401) {
    throw new UnauthorizedException(errorMessage);
  }
  if (status === 400) {
    throw new BadRequestException(errorMessage);
  }
  if (status === 404) {
    throw new NotFound(errorMessage);
  }
  throw new InternalServerErrorException(errorMessage);
}
