# Proyecto Final – Dockerización

---

## Imagen en DockerHub

Imagen pública del proyecto:  
https://hub.docker.com/r/dan13lrivero/serverriverojorge

---

## Cómo ejecutar el proyecto con Docker

Ejecutar el contenedor:

```bash
docker run -p 8080:8080 dan13lrivero/serverriverojorge:1.0.0
```

---

## Cómo construir localmente la imagen

```bash
docker build -t dan13lrivero/serverriverojorge:1.0.0 .
```

---

## Cómo subir la imagen a DockerHub

```bash
docker push dan13lrivero/serverriverojorge:1.0.0
```
