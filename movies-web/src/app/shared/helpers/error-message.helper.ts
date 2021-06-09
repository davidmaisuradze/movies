export const getErrorMessage = (error: any) => {
  return error && error.error ? error.error : 'Server Error';
};
