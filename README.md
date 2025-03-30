# P4 – API REST para carrito de la compra

| Método HTTP | Ruta                | Cuerpo (JSON)                          | Descripción                                       | Respuesta esperada         |
|-------------|---------------------|----------------------------------------|--------------------------------------------------|-----------------------------|
| **GET**     | `/api/carrito`      | –                                      | Devuelve todos los productos del carrito         | 200 OK                      |
| **POST**    | `/api/carrito`      | `{ nombre, precio, cantidad }`         | Añade un nuevo producto al carrito               | 201 Created / 200 OK        |
| **PUT**     | `/api/carrito/{id}` | `{ nombre, precio, cantidad }`         | Actualiza los datos de un producto por su ID     | 200 OK / 404 Not Found      |
| **DELETE**  | `/api/carrito/{id}` | –                                      | Elimina un producto del carrito por su ID        | 204 No Content / 404 Not Found |

---


## COMPROBACIÓN

![EJ1](./ejemplos-uso/Captura de pantalla 2025-03-30 a las 20.31.45.png)
![EJ2](./ejemplos-uso/Captura de pantalla 2025-03-30 a las 20.31.52.png)
![EJ3](./ejemplos-uso/Captura de pantalla 2025-03-30 a las 20.31.57.png)
