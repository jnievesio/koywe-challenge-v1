export const USER_CREATED = {
  statusCode: 'USER_CREATED',
  message: 'Usuario creado exitosamente',
};

export const INTERNAL_SERVER_ERROR = (errorMessage: string) => ({
  message: {
    statusCode: 'INTERNAL_SERVER_ERROR',
    message: errorMessage,
  },
  status: 500,
});
