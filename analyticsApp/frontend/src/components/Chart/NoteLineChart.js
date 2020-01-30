import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Line } from 'react-chartjs-2';

const styles = {
  root: {

  }
};

class NoteLineChart extends Component {

  getData = () => {
    const { dataset } = this.props;
    const result = dataset.map( mat_data => {
      return {
        x: new Date(mat_data.timestamp),
        y: mat_data.value.note,
        z: mat_data.value.coefficient
      }
    })
    return result
  }

  render(){
    const x = this.props.dataset.map( mat_data => new Date(mat_data.timestamp));
    const y = this.props.dataset.map( mat_data => mat_data.value.note );
    const { classes, title } = this.props;
    return(
      <div className={classes.root}>
        <Line
          data={{
            labels: x,
            datasets: [
              {
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,0.4)',
                label: `${title}`,
                borderDash: [],
                borderJoinStyle: "round",
                pointBorderWidth: "5",
                pointHoverRadius: "6",
                fillColor: "red",
                pointHitRadius: "2",
                data: y,
              }
            ]
          }}
          options={
            {
              maintainAspectRatio: true,
              scales: {
                xAxes: [{
                  type: "time",
                  time: {
                    unit: "week"
                  }
                }]
              }
            }
          }
          width={350}
          height={200}
         />
      </div>
    )
  }
}

export default withStyles(styles)(NoteLineChart);
