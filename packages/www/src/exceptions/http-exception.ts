import {
  StatusCodes,
  getReasonPhrase,
} from 'http-status-codes'

class HttpException extends Error {
  public status: StatusCodes

  public message: string

  constructor({ status, message }: { status: number; message: string }) {
    super(message)
    this.status = status
    this.message = message || getReasonPhrase(status)
  }
}

export default HttpException
