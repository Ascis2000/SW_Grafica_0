
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

    let arr_titulos = arr_datos.map( dt => dt.titulo );
    let arr_anios = arr_datos.map( dt => dt.anios );

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
    let anioFin = arr_anios[ arr_anios.length - 1];

    // opciones para la gráfica
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

    // obtenemos 
    let numMayor = Math.max(...arr_numPeliculas);

    // Opciones para la gráfica
    let options = {
        axisY: {
            low: 0,
            high: numMayor + 1,
            scaleMinSpace: 10,
            onlyInteger: true
        },
        height: '300px',
        showPoint: true,
        showArea: true,
        showLabel: true
    };
    new Chartist.Line('.ct-chart_1', data, options);
    console.log("****************");
});

async function buscarTituloPorId(id) {
    try {
        const data = await getSW_Films(); // Obtener los datos de las películas
        
        // Buscar en el array results
        const resultado = data.results.find((item) => item.episode_id === id);
        
        // Si se encuentra el resultado, devolver el título; de lo contrario, lanzar un error
        if (resultado) {
            return resultado.title;
        } else {
            throw new Error(`No se encontró una película con el ID: ${id}`);
        }
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }
}

getSW_Personajes().then((swPersonajes) => {
    console.log("Ejercicio Star Wars Personajes *********");
    console.log("SWAPI results", swPersonajes.results);

    let arr_resultados = swPersonajes.results;

    /* let po = await buscarTituloPorId(2).then((titulo) => {
        return titulo;
    });
    alert(po) */

    // Usamos map 
    const arr_datos = arr_resultados.map(item => {
        let nombre = item.name;
        let peliculas = item.films;

        return {nombre, peliculas};
    });

    let arr_nombres = arr_datos.map(dt => {
        return dt.nombre;
    });

    let arr_numPeliculas = arr_datos.map(dt => {
        return dt.peliculas.length;
    });

    console.log("arr_nombres", arr_nombres);
    console.log("arr_numPeliculas", arr_numPeliculas);

    // código para la grafica
    // selector en el DOM
    const grafica = document.querySelector("#grafica");
    const personajes = arr_nombres; // eje X

    // Opciones de grafica
    const dataset = {
        label: "Apariciones personajes / película",
        data: arr_numPeliculas,
        pointRadius: 5, 
        borderWidth: 1,      
        borderColor: 'rgba(54, 162, 235, 1)',   
        backgroundColor: 'rgba(54, 162, 235, 0.2)', 

        pointHoverRadius: 12, 
        pointBackgroundColor: arr_numPeliculas.map(value => 
            (value === Math.max(...arr_numPeliculas)) 
            ? 'rgba(126, 200, 73, 0.8)' // color verde
            : (value === Math.min(...arr_numPeliculas)) 
            ? 'rgba(255, 99, 132, 0.8)' // color rojo
            : 'rgba(54, 162, 235, 0.8)' // color azul
        )
    };

    let optionsChar = {
        type: 'line', // Tipo de gráfica
        data: {
            labels: personajes,
            datasets: [dataset]
        },
        options: {
            layout: {
                padding: {
                    right: 20 // Ajusta este valor para aumentar o disminuir el margen a la derecha
                }
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Películas',
                        fontStyle: 'bold'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 8,
                        stepSize: 1
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Apariciones totales',
                        fontStyle: 'bold'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        const personaje = data.labels[tooltipItem.index];
                        const apariciones = tooltipItem.yLabel ;
                        let txtPelicula = (tooltipItem.yLabel == 1) ? 'película' : 'películas'
                        return ` Ha aparecido en ${apariciones} ${txtPelicula}`;
                    }
                }
            }
        }
    };
    new Chart(grafica, optionsChar);
});

