import { Chart, LineController, LinearScale, CategoryScale, LineElement, PointElement } from 'chart.js';
import { useEffect, useRef } from 'react';
Chart.register(LineController, LinearScale, CategoryScale, LineElement, PointElement);

const TodoChart = ({datelist, countbydate, successbydate}) =>{
    const chartRef = useRef(null);
    useEffect(()=>{
    if(countbydate !== undefined){
        console.log("pass")
        const xValues = datelist;
        const yValues = countbydate;
        const zValues = successbydate;
        console.log('xValues', xValues);
        console.log(yValues);
        const chart = new Chart(chartRef.current,{
            type:'line',
            data:{
                labels: xValues,
                datasets:[{
                    fill:false,
                    tension:0,
                    backgroundColor: 'rgba(0,0,255,1.0)',
                    borderColor: 'rgba(0,0,255,0.1)',
                    data: yValues,
 
                },{
                    fill:false,
                    tension:0,
                    backgroundColor: 'rgba(116, 79, 168, 0.75)',
                    borderColor: 'rgba(255,0,0,0.1)',
                    data: zValues,
                    pointRadius: 2  
                }]
            },
            options: {
                plugins: {
                    // title:{display:true, t}
                    legend: { display: true } // legend는 plugins 하위로 이동
                },
                scales: {
                    x:{
                        title:{
                            display:true,
                            text: 'date',
                            font:{
                                size:20
                            }
                        }
                    },
                    y: {
                        title:{
                            display:true,
                            text:'count',
                            font:{
                                size:20
                            }
                        }, // yAxes를 y로 변경
                        min:0,
                        max:10,
                        ticks:{
                            stepSize:1,
                        }
                        }
                    }
                }
                }
        );
        return () => chart.destroy();
    }}, [datelist]);
    
    return(
       <div className='canvas'>
            <canvas id='cv' ref={chartRef} ></canvas>
       </div>
        
        
    )
}
export default TodoChart;