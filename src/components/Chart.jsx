import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import Colors from "../constants/Colors";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: props.dates,
        datasets: [
          {
            label: "Bioritmo Fisico",
            backgroundColor: Colors.green,
            fill: false,
            borderColor: Colors.green,
            data: props.fisico
          },
          {
            label: "Bioritmo Emocional",
            backgroundColor: Colors.three,
            borderColor: Colors.three,

            fill: false,

            data: props.emocional
          },
          {
            label: "Bioritmo Intelectual",
            backgroundColor: Colors.four,
            borderColor: Colors.four,
            fill: false,
            data: props.intelectual
          }
        ]
      }
    };
  }
  render() {
    return (
      <div>
        <Line
          options={{
            responsive: true
          }}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default Chart;
