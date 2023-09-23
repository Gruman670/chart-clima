import { fetchApi } from "./fetch.js";

let temperaturas = [];
let ubicaciones = [];

const rgbaRedColor = "red";
const rgbRedColor = "red";

const rgbaBlueColor = "blue";
const rgbBlueColor = "blue";

async function renderData() {
    const climas = await fetchApi(
        "https://api.gael.cloud/general/public/clima"
    );

    temperaturas = climas.map((clima) => clima.Temp);
    ubicaciones = climas.map((clima) => clima.Estacion);
   

    const backgroundColors = temperaturas.map((ubicacion) =>
        ubicacion > 10 ? rgbaBlueColor : rgbaRedColor
    );
    const borderColors = temperaturas.map((ubicacion) =>
        ubicacion > 10 ? rgbBlueColor : rgbRedColor
    );
 
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
                        label: function (context) {
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
