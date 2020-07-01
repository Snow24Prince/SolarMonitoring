let voltage_battery = [];
let voltage_piezo = [];
let voltage_solar = [];
let time = [];

$(document).ready(function() {
    $.ajax({
        url: "https://picky-justice.000webhostapp.com/fetch-data.php",
        method: "POST",
        dataType: "json",
        success: function(data) {
          for (let i in data) {
            voltage_battery.push(data[i].value1);
            voltage_piezo.push(data[i].value2);
            voltage_solar.push(data[i].value3);
            time.push(data[i].reading_time);
          }
          voltageChart.update(0);
        },
        error: function(data) {
          console.log(data);
        }
    });
    $('#example').DataTable( {
        ajax: {
            url: "https://picky-justice.000webhostapp.com/fetch-data.php",
            dataSrc: "",
        },
        columns: [
            { data: "value1" },
            { data: "value2" },
            { data: "value3" },
            { data: "reading_time" }
        ],
        order: [[ 3, "desc" ]]
    } );
    
    dateTime();
    var voltageChart = new Chart(document.getElementById('voltageChart').getContext('2d'), voltageChartData);
    
});


function dateTime() {
  setTimeout(function() {
    var now = new Date();
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: 'true'
    };
    var time = new Intl.DateTimeFormat('en-US', options).format(now);
    document.getElementById('dateTime').innerHTML = time;
    dateTime();
  }, 1000);
}

var voltageChartData = {
  type: 'line',
  data: {
    xLabels: time,
    datasets: [{
      label: 'Solar Panel Voltage',
      fill: false,
      lineTension: 0,
      pointRadius: 0,
      data: voltage_solar,
      backgroundColor: [
        'green'
      ],
      borderColor: [
        'green'
      ],
      borderWidth: 1
    }, {
      label: 'Piezoelectric Voltage',
      fill: false,
      lineTension: 0,
      pointRadius: 0,
      data: voltage_piezo,
      backgroundColor: [
        'red'
      ],
      borderColor: [
        'red'
      ],
      borderWidth: 1
    }, {
      label: 'Battery Voltage Level',
      fill: false,
      lineTension: 0,
      pointRadius: 0,
      data: voltage_battery,
      backgroundColor: [
        'blue'
      ],
      borderColor: [
        'blue'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Voltage (V)'
        },
        ticks: {
          max: 15,
          stepSize: 1,
          beginAtZero: true
        }
      }]
    }
  }
};



