function getStatusData(id) {
  let statusArray = [];
  for(let i = 0; i < dataArray[id]['stats'].length; i++) {
    statusArray.push(dataArray[id]['stats'][i]['base_stat']);
  }
  return statusArray;
}

function getChartData(id) {
  const data = {
    labels: [
      'HP',
      'Atk',
      'Def',
      'Sp-Atk',
      'Sp-Def',
      'Speed'
    ],
    datasets: [{
      label: 'Base Stats',
      data: [
        dataArray[id]['stats'][0]['base_stat'], 
        dataArray[id]['stats'][1]['base_stat'], 
        dataArray[id]['stats'][2]['base_stat'], 
        dataArray[id]['stats'][3]['base_stat'], 
        dataArray[id]['stats'][4]['base_stat'], 
        dataArray[id]['stats'][5]['base_stat']
      ],
      fill: true,
      color: 'black',
      backgroundColor: 'rgba(0, 100, 0, 0.3)',
      borderColor: 'rgb(0, 100, 0)',
      pointBackgroundColor: 'rgb(0, 100, 0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(0, 100, 0)'
    }]
  };
  return data;
}

function showStatusPokemon(id) {
  let statusPokemon = document.getElementById('single-info');
  statusPokemon.innerHTML = `
    <canvas id="myChart"></canvas>
  `;
  const config = document.getElementById('myChart');

  const wtf = new Chart(config, {
    type: 'radar',
    data: getChartData(id),
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      elements: {
        line: {
          borderWidth: 1
        }
      },
      scales: {  //It is important for changing the scale in the Chart
        r: {  //Stands for radial
          pointLabels: {
            color: 'black',
            font: {
              size: 15
            }
          },
          angleLines: {
            color: 'rgba(0, 0, 0, 0.3)'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.3)'
          },
          beginAtZero: true,
          min: 0,
          max: 150,
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 10
            },
            stepSize: 25,
            showLabelBackdrop: (context) => {
              if(context.tick.value % 50 !== 1 && context.tick.value % 50 !== 2) {
                return false;
              }
            }
          }
        }
      }
    },
  });
  
  statusPokemon.style = 'margin-top: -20px; margin-left: -20px;';
  document.getElementById('info-info').style = 'font-weight: normal;'
  document.getElementById('info-status').style = 'font-weight: bold;'
  document.getElementById('info-moves').style = 'font-weight: normal;'
}