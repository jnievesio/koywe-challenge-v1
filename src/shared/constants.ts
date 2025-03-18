export const API_RESPONSES = {
  BAD_REQUEST: {
    status: 400,
    description: 'La solicitud contiene datos inválidos o faltantes',
  },
  UNAUTHORIZED: {
    status: 401,
    description: 'No autorizado - Token inválido o faltante',
  },
  FORBIDDEN: {
    status: 403,
    description: 'Prohibido - No tiene permisos para acceder',
  },
  NOT_FOUND: {
    status: 404,
    description: 'Recurso no encontrado',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    description: 'Error interno del servidor',
  },
};
