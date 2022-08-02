export const createError = (status, message) => {
    const err =new Error("This is wrong");
    err.status = status;
    err.message = message;
    return err;
  }