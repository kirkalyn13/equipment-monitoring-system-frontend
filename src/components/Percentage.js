import ReactApexChart from 'react-apexcharts'

const Percentage = ({done, pending}) => {
    //const { pending } = useContext(PendingContext)
    const series = [done, pending]
    const options = {
        chart: {
          type: 'donut',
        },
        colors: ['#FFA000', '#607D8B'],
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
            <h2>Equipment Maintenance Percentage</h2>
            <ReactApexChart options={options} series={series} type="donut" height={350}/>
        </div>
    )
}

export default Percentage
