# Proyecto Final – Dockerización y Testing

Sistema de adopción de mascotas con API REST documentada.

---

## Imagen en DockerHub

Imagen pública del proyecto:  
**https://hub.docker.com/r/dan13lrivero/serverriverojorge**

---

## Cómo ejecutar el proyecto con Docker

### Opción 1: Usar imagen desde DockerHub
```bash
docker pull dan13lrivero/serverriverojorge:1.0.0
docker run -p 8080:8080 --env MONGO_URL="tu_url_de_mongo" dan13lrivero/serverriverojorge:1.0.0
```

### Opción 2: Construir la imagen localmente
```bash
docker build -t dan13lrivero/serverriverojorge:1.0.0 .
docker run -p 8080:8080 --env MONGO_URL="tu_url_de_mongo" dan13lrivero/serverriverojorge:1.0.0
```

**Nota:** Reemplazar `tu_url_de_mongo` con la URL de conexión a MongoDB.

---

## Documentación de la API

Una vez el contenedor esté corriendo, acceder a la documentación Swagger:

**http://localhost:8080/api-docs**

Se documentó el módulo completo de **Users** con los siguientes endpoints:
- GET `/api/users` - Listar todos los usuarios
- GET `/api/users/:uid` - Obtener usuario por ID
- PUT `/api/users/:uid` - Actualizar usuario
- DELETE `/api/users/:uid` - Eliminar usuario

---

## Tests Funcionales

El proyecto incluye tests funcionales para el router de **adoptions** que cubren:
- GET `/api/adoptions` - Listar todas las adopciones
- GET `/api/adoptions/:aid` - Obtener adopción por ID
- POST `/api/adoptions/:uid/:pid` - Crear una adopción
- Validaciones de errores 404

### Ejecutar los tests
```bash
npm test
```

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- Docker
- Swagger (documentación)
- Mocha + Chai + Supertest (testing)

---

## Subir imagen a DockerHub
```bash
docker push dan13lrivero/serverriverojorge:1.0.0
```

---

## Autor

Jorge Rivero