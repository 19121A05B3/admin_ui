import React, {useEffect, useRef} from 'react';
import {Chart, DoughnutController, PieController, ArcElement} from 'chart.js';
//const Chart = require('chart.js');
Chart.register(DoughnutController, PieController, ArcElement);
const OngoingOverview = () => {
  const canvas: any = useRef(null);
  
  useEffect(() => {
    // const ctx: any = document.getElementById("myChart");
    const chart = new Chart(canvas?.current?.getContext('2d'), {
        type: 'doughnut',
        options: {
            responsive: true,
            circumference: 180,
            rotation : 270,
            // legend: {
            //     position: 'right',
            //     labels: {
            //         boxWidth: 100
            //     }
            // }
        },
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "Red",
              "Blue",
              "Yellow",
              "Green",
              "Purple",
              "Orange"
            ],
            borderColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            borderWidth: 1
          }
        ]
      }
    });
    return () => chart.destroy();
  }, []);
  return (
      <div style={{height: '300px', width: '400px'}}>
        <canvas id="myChart" ref={canvas} width="500" height="300" />
      </div>
  );
}

export default OngoingOverview;