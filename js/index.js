
/*
1. Pediremos las películas de Star Wars y pintaremos una gráfica 
de líneas en la que podamos ver cada una de las películas.
*/
async function getSW_Films(){
    try {
        let response = await fetch(`https://swapi.dev/api/films/`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        console.log('SWAPI Films https://swapi.dev/api/films/ = ', response)
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
getSW_Films().then((swFilms) => {
    console.log("Ejercicio Star Wars Films *********");
    console.log("SWAPI results", swFilms.results);

    let arr_resultados = swFilms.results;

    // Usamos map 
    const arr_datos = arr_resultados.map(item => {
        let titulo = item.title;
        let anios = item.release_date.split("-")[0];

        return {titulo, anios};
    });
    console.log("arr_datos=", arr_datos);

    let arr_titulos = arr_datos.map(dt => {
        return dt.titulo;
    });

    let arr_anios = arr_datos.map(dt => {
        return dt.anios;
    });

    console.log("arr_titulos", arr_titulos);
    console.log("arr_anios", arr_anios);

    // código para la grafica
    let data = {
        labels: arr_titulos, // Eje X
        series: [
            arr_anios // Eje Y
        ]
    };

    let anioInicio = arr_anios[0];
    let anioFin = arr_anios[ arr_anios.length - 1]
    // Opciones para la gráfica
    let options = {
        axisY: {
            low: anioInicio,
            high: anioFin,
            scaleMinSpace: 10,
            onlyInteger: true
        },
        height: '300px',
        showPoint: true,
        showArea: true,


    };
    new Chartist.Line('.ct-chart_0', data, options);
    console.log("****************");
});


/*
2. Pediremos los personajes de Star Wars y pintaremos una gráfica 
de barras en la que podamos ver
*/
async function getSW_Personajes(){
    try {
        let response = await fetch(`https://swapi.dev/api/people/`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        console.log('SWAPI Personajes https://swapi.dev/api/people/ = ', response)
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
getSW_Personajes().then((swPersonajes) => {
    console.log("Ejercicio Star Wars Personajes *********");
    console.log("SWAPI results", swPersonajes.results);

    let arr_resultados = swPersonajes.results;

    // Usamos map 
    const arr_datos = arr_resultados.map(item => {
        let nombre = item.name;
        let numPeliculas = item.films.length;

        return {nombre, numPeliculas};
    });

    let arr_nombres = arr_datos.map(dt => {
        return dt.nombre;
    });

    let arr_numPeliculas = arr_datos.map(dt => {
        return dt.numPeliculas;
    });

    console.log("arr_nombres", arr_nombres);
    console.log("arr_numPeliculas", arr_numPeliculas);

    // código para la grafica
    let data = {
        labels: arr_nombres, // Eje X
        series: [
            arr_numPeliculas
        ]
    };

    let numMenor = Math.min(...arr_numPeliculas);
    let numMayor = Math.max(...arr_numPeliculas);

    // Opciones para la gráfica
    let options = {
        axisY: {
            low: numMenor,
            high: numMayor,
            scaleMinSpace: 10,
            onlyInteger: true
        },
        height: '300px',
        showPoint: true,
        showArea: true,
        showLabel: true,
        
        tooltipFnc: undefined, // Accepts function
  // Build custom tooltip

  transformTooltipTextFnc: undefined, // Accepts function
  // Transform tooltip text

  class: undefined, // Accecpts 'class1', 'class1 class2', etc.
  // Adds class(es) to the tooltip wrapper

  anchorToPoint: false, // Accepts true or false
    };
    new Chartist.Line('.ct-chart_1', data, options);
    console.log("****************");
});


getSW_Personajes().then((swPersonajes) => {
    console.log("Ejercicio Star Wars Personajes *********");
    console.log("SWAPI results", swPersonajes.results);

    let arr_resultados = swPersonajes.results;

    // Usamos map 
    const arr_datos = arr_resultados.map(item => {
        let nombre = item.name;
        let numPeliculas = item.films.length;

        return {nombre, numPeliculas};
    });

    let arr_nombres = arr_datos.map(dt => {
        return dt.nombre;
    });

    let arr_numPeliculas = arr_datos.map(dt => {
        return dt.numPeliculas;
    });

    console.log("arr_nombres", arr_nombres);
    console.log("arr_numPeliculas", arr_numPeliculas);

    // código para la grafica
    // Obtener una referencia al elemento canvas del DOM
    const grafica = document.querySelector("#grafica");
    // Las etiquetas son las que van en el eje X. 
    const personajes = arr_nombres;
    // Podemos tener varios conjuntos de datos. Comencemos con uno
    const tooltip = {
        label: "Aparición Personajes por película",
        //data: arr_numPeliculas, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        data: arr_numPeliculas,
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
        borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
        borderWidth: 1,// Ancho del borde
    };

    let optionsChar = {
        type: 'line',// Tipo de gráfica
        data: {
            labels: personajes,
            datasets: [
                tooltip
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,  // Comenzar en 0
                        max: 8,
                        stepSize: 1
                    }
                }],
            }
        }
    }
    new Chart(grafica, optionsChar);
});

