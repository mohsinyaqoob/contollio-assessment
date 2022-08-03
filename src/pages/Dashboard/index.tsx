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
    labels: [],
    datasets: [],
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
    console.log("State Changed");
    fetch("/data.json")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          const labels = result[0].attributes.map((attr: any) => attr.name);
          this.setState({
            ...this.state,
            isLoaded: true,
            data: result,
            labels,
            datasets: [
              {
                label: "height",
                data: 200,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "weight",
                data: 300,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
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
    this.setState({
      currentItem: value,
    });
  };

  labels = ["length", "width", "height", "weight"];

  data = {
    labels: this.labels,
    datasets: [
      {
        label: "length",
        data: this.labels.map(() => 200),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "width",
        data: this.labels.map(() => 200),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
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
                <div
                  style={{
                    width: "400px",
                    height: "300px",
                  }}
                >
                  {/* Render Bar CHart Here */}
                  <Bar options={this.options} data={this.data} />
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
            </div>
          </div>
        )}
      </div>
    );
  }
}
