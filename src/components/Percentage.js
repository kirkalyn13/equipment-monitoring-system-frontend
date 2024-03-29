import ReactApexChart from 'react-apexcharts'

const Percentage = ({done, pending}) => {
    const series = [done, pending]
    const options = {
        chart: {
          type: 'donut',
        },
        colors: ['#607D8B', '#F44336'],
        plotOptions:{
          pie:{
            donut:{
              labels:{
                show:true,
                name:{
                  show: true,
                },
                value:{
                  show: true,
                  color: '#000'
                },
                total:{
                  label: "Total Equipment",
                  show: true,
                  color: '#000'
                }
              }
            },
          },
        },
        stroke:{
          colors:['#FFF']
         },
        labels: ['Done', 'Pending'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
              height: 300
            },
          }
        }],
        legend: {
            position: 'bottom',
            labels:{
              colors: ["#000"]
            }
          },
        tooltip: {
            y: {
              formatter: function (val) {
                return  val + " equipment"
              }
            }
          }
      }
    return (
        <div className="percent">
            <h2>Equipment Calibration Percentage</h2>
            <ReactApexChart options={options} series={series} type="donut" height={350}/>
        </div>
    )
}

export default Percentage
