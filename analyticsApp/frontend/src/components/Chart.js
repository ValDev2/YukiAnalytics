import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines,VerticalBarSeries, LineSeries, MarkSeries, VerticalGridLines, LineMarkSeries, VerticalRectSeries} from 'react-vis';


class Chart extends Component {

  render(){

    const ONE_DAY = 86400 * 1000
    const timestamp = new Date().getTime()
    const data = this.props.notes.map(note => (
      {
      x: new Date(note.timestamp), y: note.note
    }))
    console.log(data)

    return(
      <div>
        <XYPlot
          xDomain={[timestamp - 40 * ONE_DAY, timestamp + 40 * ONE_DAY]}
          yDomain={[0, 20]}
          xType="time"
          width={1200}
          height={800} >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineMarkSeries data={data} style={{stroke: '#fff'}}/>
        </XYPlot>
      </div>

    );
  }
}

export default Chart;
