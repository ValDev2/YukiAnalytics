import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Line } from 'react-chartjs-2';


class NoteLineChart extends Component {
  render(){
    return(
      <div>
        <Line
          data={{
            datasets: [
              {
                label: "Stat, note",
                data: [
                  {x: 10, y: 20},
                  {x: 15, y: 15}
                ]
              }
            ]
          }}
         />
      </div>
    )
  }
}

export default NoteLineChart;
