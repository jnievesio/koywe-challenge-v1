export const USERS_LISTED = {
  statusCode: 'USERS_LISTED',
  message: 'Usuarios listados exitosamente',
};

export const INTERNAL_SERVER_ERROR = (errorMessage: string) => ({
  message: {
    statusCode: 'INTERNAL_SERVER_ERROR',
    message: errorMessage,
  },
  status: 500,
});
