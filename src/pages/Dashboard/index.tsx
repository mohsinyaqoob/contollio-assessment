import React, { Component } from "react";
import Slider from "react-rangeslider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import "react-rangeslider/lib/index.css";
import "./index.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {};

type State = {};

export default class Dashboard extends Component<Props, State> {
  state: any = {
    isLoaded: false,
    data: [],
    currentItem: 0,
    chartData: {
      labels: ["length", "width", "height", "weight"],
      datasets: [],
    },
  };

  options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Contollio Bar Chart",
      },
    },
  };

  componentDidMount() {
    fetch("/data.json")
      .then((res) => res.json())
      .then(
        (result) => {
          const labels = result[this.state.currentItem].attributes.map(
            (attr: any) => attr.name
          );
          this.setState({
            ...this.state,
            isLoaded: true,
            data: result,
            chartData: {
              labels,
              datasets: [
                {
                  label: "Value",
                  data: result[this.state.currentItem].attributes.map(
                    (attr: any) => attr.value
                  ),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "lightgreen",
                },
              ],
            },
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleOnChange = (value: any) => {
    const labels = this.state.data[value].attributes.map(
      (attr: any) => attr.name
    );

    this.setState({
      currentItem: value,
      chartData: {
        labels,
        datasets: [
          {
            label: "Value",
            data: this.state.data[value].attributes.map(
              (attr: any) => attr.value
            ),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "lightgreen",
          },
        ],
      },
    });
  };

  render() {
    let { currentItem, data } = this.state;
    return (
      <div className="dashboard-wrapper">
        {data && data.length > 0 && (
          <div className="item-container">
            <div className="item-heading">
              <h1>{data[currentItem].title}</h1>
            </div>
            <div className="item-body">
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[currentItem].attributes.map(
                      (attr: any, index: number) => (
                        <tr key={index}>
                          <td>{attr.name}</td>
                          <td>{`${attr.value}${attr.unit}`}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="data-chart">
                <div className="graph-border">
                  {/* Render Bar CHart Here */}
                  <Bar options={this.options} data={this.state.chartData} />
                </div>
              </div>
            </div>
            <div className="item-footer">
              <Slider
                value={currentItem}
                orientation="horizontal"
                onChange={this.handleOnChange}
                min={0}
                max={data.length - 1}
              />
              <p className="range-slider-footer">
                Drag the range slider to switch to next data item(s)
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
