# Koywe Challenge |Lista de verificación de progreso|

## ✅ Tareas Completadas

### Autenticación y Seguridad
- [x] Configuración de Firebase Authentication
- [x] Implementación de AuthModule y AuthService
- [x] Endpoints de Registro/Listar Usuarios
- [x] Implementación de Guard JWT
- [x] Configuración de Docker para Desarrollo

### Estructura Base
- [x] Configuración del Proyecto NestJS
- [x] Configuración de TypeORM
- [x] Implementación del Módulo de Usuarios
- [x] Configuración de Documentación Swagger

## 🚧 Tareas Pendientes

### Endpoints de Cotización
- [ ] Implementación POST /quote
  - [ ] Lógica de Cálculo de Tasas
  - [ ] Integración/Simulación de API CryptoMKT
  - [ ] Almacenamiento en Base de Datos
  - [ ] Validación de Entrada

- [ ] Implementación GET /quote/:id
  - [ ] Lógica de Recuperación de Cotización
  - [ ] Validación de Expiración
  - [ ] Manejo de Errores

### Base de Datos
- [ ] Modelo de Cotización
- [ ] Migraciones de Base de Datos
- [ ] Repositorio de Cotizaciones

### Pruebas
- [ ] Pruebas Unitarias
- [ ] Pruebas de Integración

### Documentación
- [ ] Actualizaciones del README
  - [ ] Instrucciones de Configuración
  - [ ] Variables de Entorno
  - [ ] Documentación de API
- [ ] Documentación Swagger
- [X] Ejemplo de Variables de Entorno (.env.example)


##  Instrucciones de Configuración


## Requisitos Previos
- Node.js (v18 o superior)
- Docker Desktop
- Git
- Firebase cuenta y proyecto

## Pasos de Instalación

### Clonar el Repositorio
```bash
git clone https://github.com/{username}/koywe-challenge-v1.git
cd koywe-challenge-v1
```

### Instalar dependencias (opcional, se usa docker para levantar)
```bash
npm install
```

### Agregar variables de entorno en la raíz y también una versión para los tests
```bash
.env
.env.test
```

### Levantar contenedores
```bash
docker compose -f docker-compose.dev.yml up
```

### Visitar Swagger
```bash
http://localhost:3000/docs
```

# Comandos útiles

### Revisar base de datos
```bash
- sudo docker exec -it nombre_contenedor_base_de_datos bash
- psql -U root -d nombre_base_de_datos <———— entrar a la base de datos

[ 
  \l  <-- Listar todas las bases de datos
  \c  <—- Elegir la base de datos
  \dt <-- Lista todas las tablas en la base de datos actual
]
```

###  Detener servicios
docker compose -f docker-compose.dev.yml down

###  Reiniciar servicios
docker compose -f docker-compose.dev.yml restart
