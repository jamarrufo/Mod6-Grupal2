/*Necesitarás crear un servidor en Node que permita crear, leer, renombrar y eliminar archivos
alojados en el servidor por medio de las rutas correspondientes.
Deberás enviar los datos como parámetros en una consulta GET por medio de formularios
HTML. Siéntete libre de crearlo si así lo prefieres o usar el del Apoyo Desafío, el cual
contiene lo que verás en la siguiente imagen.*/

/*1. Crear un servidor en Node con el módulo http.
 

2. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta recibida.

3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es declarado 
en los parámetros de la consulta recibida.

4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es declarado en 
los parámetros de la consulta recibida.

5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los parámetros de la 
consulta recibida.

6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta recibida.

7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato “dd/mm/yyyy”. 
Considera que si el día o el mes es menor a 10 concatenar un “0” a la izquierda. (Opcional)

8. En la ruta para renombrar, devuelve un mensaje de éxito incluyendo el nombre anterior del archivo y su 
nuevo nombre de forma dinámica . (Opcional)

9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente mensaje: 
“Tu solicitud para eliminar el archivo <nombre_archivo> se está procesando”, y luego de 3 segundos envía el
 mensaje de éxito mencionando el nombre del archivo eliminado. (Opcional)
*/
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const path = queryObject.path;
  const content = queryObject.content;
  const newName = queryObject.newName;

  if (req.url.includes('/crear')) {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    fs.writeFile(path, `${currentDate}\n${content}`, (err) => {
      if (err) {
        res.write(`Error: ${err}`);
      } else {
        res.write(`Archivo creado con éxito: ${path}`);
      }
      res.end();
    });
  } else if (req.url.includes('/leer')) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        res.write(`Error: ${err}`);
      } else {
        res.write(data);
      }
      res.end();
    });
  } else if (req.url.includes('/renombrar')) {
    fs.rename(path, newName, (err) => {
      if (err) {
        res.write(`Error: ${err}`);
      } else {
        res.write(`Archivo renombrado con éxito de ${path} a ${newName}`);
      }
      res.end();
    });
  } else if (req.url.includes('/eliminar')) {
    fs.unlink(path, (err) => {
      if (err) {
        res.write(`Error: ${err}`);
      } else {
        res.write(`Archivo eliminado con éxito: ${path}`);
      }
      res.end();
    });
  } else {
    res.write('Ruta no válida');
    res.end();
  }
});

server.listen(3000);

/* Integrantes
- Diego Arancibia
- Maximiliano Briones
- Jorge Gutierrez
- Jose Marrufo
- Fabian Salgado 
*/

