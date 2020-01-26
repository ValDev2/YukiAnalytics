import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Line } from 'react-chartjs-2';

const styles = {
  Chart: {
    width: "500px",
    height: "500px"
  }
};

class Chart extends Component {
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.Chart}>
        <Line
        data={{
          datasets: [
            {
              label: 'My First dataset',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [
                {x: new Date, y: 10},
                {x: new Date(1599872240185), y: 20},
                {x: new Date(1599874240185), y: 20}
              ]
            }
          ]
        }}
        options={
          {
            scales: {
              xAxes: [{
                type: "time",
                distribution: 'series',
                time: {
                  unit: "week"
                }
              }]
            }
          }
        }
        />
      </div>
    )
  }
}

export default withStyles(styles)(Chart);
