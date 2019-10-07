// Configuración de las fuentes.
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Crea la gráfica de barras para el dross recolectado.
var ctx = document.getElementById("drossCalculadoChart");
var configBarChart = {
    type: 'bar',
    data: {
      labels: fechas,
      datasets: [{
        label: "Dross",
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: drossCalculado,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
            type: 'time',
            time: {
                unit: 'day',
                parser: timeFormat,
                round: 'day',
                tooltipFormat: 'll'
            }
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Gramos'
            },
            gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
            }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10
      }
    }
  };
var drossChartRendimiento = new Chart(ctx, configBarChart);
