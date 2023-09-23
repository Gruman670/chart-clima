Tablero de Datos Climáticos
Este código HTML y JavaScript crea un tablero de datos climáticos utilizando Chart.js para visualizar las temperaturas de diferentes ubicaciones.

index.html: El archivo HTML que define la estructura de la página web y carga el script.js.
script.js: Un script JavaScript que recupera datos climáticos de una API y representa las temperaturas en un gráfico de barras con colores personalizados.
fetch.js: Un módulo JavaScript que contiene una función para realizar solicitudes HTTP y obtener datos de una API.

Codigos 

HTML 
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Tablero de Datos Clima</title>
</head>
<body>
    <canvas id="myChart"></canvas>
    <script src="./script.js" type="module"></script>
</body>
</html>



SCRIPT.JS 
import { fetchApi } from "./fetch.js";

let temperaturas = [];
let ubicaciones = [];

const rgbaRed = "red";
const rgbRed = "red";
const rgbaBlue = "blue";
const rgbBlue = "blue";

async function renderData() {
    const climas = await fetchApi("https://api.gael.cloud/general/public/clima");
    temperaturas = climas.map(clima => clima.Temp);
    ubicaciones = climas.map(clima => clima.Estacion);
    const backgroundColors = temperaturas.map(temp => temp > 10 ? rgbaBlue : rgbaRed);
    const borderColors = temperaturas.map(temp => temp > 10 ? rgbBlue : rgbRed);
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ubicaciones,
            datasets: [
                {
                    label: "Temperatura Mayores",
                    data: temperaturas,
                    borderWidth: 1,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: "Gráfico de Clima en Chile",
                    padding: {
                        top: 50,
                        bottom: 30,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: context => {
                            let label = context.dataset.label || "";
                            if (label) {
                                label += ": ";
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + "°";
                            }
                            return label;
                        },
                    },
                },
            },
        },
    });
}

renderData();

