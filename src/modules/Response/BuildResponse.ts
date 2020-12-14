type DataResponse = {
  message?: string;
  code?: number;
  [key: string]: any;
};

class BuildResponse {
  private static baseResponse(dataResponse: DataResponse) {
    const {
      message = 'data has been received!',
      code = 200,
      ...rest
    } = dataResponse;
    // spread 연산자가 typescript에서 잘 안되는 것 같아서 Object.assign으로 교체
    return Object.assign(rest, { message, code });
  }

  /**
   * Response Success
   */
  public static get(dataResponse: DataResponse) {
    return this.baseResponse(dataResponse);
  }

  /**
   * Response Create
   */
  public static created(dataResponse: DataResponse) {
    return this.baseResponse({
      code: 201,
      message: 'data has been added!',
      ...dataResponse,
    });
  }

  /**
   * Response Update
   */
  public static updated(dataResponse: DataResponse) {
    return this.baseResponse({
      message: 'the data has been updated!',
      ...dataResponse,
    });
  }

  /**
   * Response Delete
   */
  public static deleted(dataResponse: DataResponse) {
    return this.baseResponse({
      message: 'data has been deleted!',
      ...dataResponse,
    });
  }
}

export default BuildResponse;
