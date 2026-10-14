const API_KEY = "VV65loLis0TbFxp97WJeWIjlyJGMaesXMXyk8XOY";

const botones = document.querySelectorAll(".ver-detalles");   // para todas las tarjetas

botones.forEach((boton) => {     // usamos la funcion con parametro boton, para colocar la informacion en cada tarjeta

    boton.addEventListener("click", async () => {

        const nombre = boton.dataset.planeta;
        const contenido = document.getElementById("contenidoDetalle");

        contenido.textContent = "Cargando información...";


        const url = "https://api.api-ninjas.com/v1/planets?name=" + encodeURIComponent(nombre);

        const respuesta = await fetch(url, {
            headers: {
                "X-Api-Key": API_KEY
            }
        });




        const datos = await respuesta.json();  // la informacion que nos da la api la transformamos para java



        if (datos.length === 0) {
            contenido.textContent = "No se encontró información del planeta.";   // si no recibimos informacion por alguna razon, aparecera este mensaje
            return;
        }



        const planeta = datos[0];


        // aqui se agrega la informacion 
        contenido.innerHTML = `   
    <p>Nombre: ${planeta.name}</p>
    <p>Temperatura: ${planeta.temperature} K</p>
    <p>Masa: ${planeta.mass} masas de Júpiter</p>
    <p>Radio: ${planeta.radius} radios de Júpiter</p>
    <p>Período orbital: ${planeta.period} días</p>
`;

    });

});


// buscador

const formulario = document.getElementById("formularioTemperatura");

const input = document.getElementById("temperaturaMaxima");

const botonesFiltro = document.querySelectorAll(".ver-detalles");

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const temperatura = Number(input.value);

    botonesFiltro.forEach(async (boton) => {

        // Obtenemos el nombre de cada planeta
        const nombre = boton.dataset.planeta;

        // Identificamos la tarjeta del planeta
        const tarjeta = boton.closest(".carousel-item");

        // Construimos la URL de la API
        const url = "https://api.api-ninjas.com/v1/planets?name=" + encodeURIComponent(nombre);

        // Consultamos la API
        const respuesta = await fetch(url, {
            headers: {
                "X-Api-Key": API_KEY
            }
        });

        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();

        // Comprobamos si encontramos el planeta
        if (datos.length === 0) {
            console.log(nombre + ": no encontrado");
            return;
        }

        const planeta = datos[0];

        // Comprobamos si tiene temperatura
        if (planeta.temperature == null) {
            console.log(nombre + ": temperatura no disponible");
            return;
        }

        // Comparamos las temperaturas
        if (planeta.temperature <= temperatura) {

            tarjeta.style.display = "";

        } else {

            tarjeta.style.display = "none";

        }

    });

});

// Botón Mostrar todos
const mostrarTodos = document.getElementById("mostrarTodos");

mostrarTodos.addEventListener("click", () => {

    botonesFiltro.forEach((boton) => {

        const tarjeta = boton.closest(".carousel-item");

        tarjeta.style.display = "";

    });

    input.value = "";

});