import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import "./FM_Admin.css";
import Dashboard from "../Components_ABI/Dashboard";

const FM_Admin = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const barChartInstance = useRef(null);
  const lineChartInstance = useRef(null);

  const getPurchaseorder = () => {
    axios
      .get(`http://localhost:6001/api/getPurchaseorder`)
      .then((response) => {
        setData(response.data?.response || []);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  useEffect(() => {
    getPurchaseorder();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChartRef = chartRef.current.getContext("2d");

    // Destroy previous charts if they exist
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }
    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
    }

    // Process data to count status 0 and status 1 for all charts
    const statusCounts = data.reduce(
      (acc, order) => {
        if (order.status === 0) {
          acc.status0++;
        } else if (order.status === 1) {
          acc.status1++;
        }
        return acc;
      },
      { status0: 0, status1: 0 }
    );

    // Pie chart
    pieChartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Status 0", "Status 1"],
        datasets: [
          {
            label: "Purchase Orders by Status",
            data: [statusCounts.status0, statusCounts.status1],
            backgroundColor: ["red", "blue"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Purchase Orders by Status (Pie Chart)",
          },
          legend: {
            position: "top",
          },
        },
      },
    });

    // Bar chart
    const barChartRef = document.getElementById("myBarChart").getContext("2d");
    barChartInstance.current = new Chart(barChartRef, {
      type: "bar",
      data: {
        labels: ["Status 0", "Status 1"],
        datasets: [
          {
            label: "Purchase Orders by Status",
            data: [statusCounts.status0, statusCounts.status1],
            backgroundColor: ["red", "blue"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Purchase Orders by Status (Bar Chart)",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Line chart
    const lineChartRef = document.getElementById("myLineChart").getContext("2d");
    lineChartInstance.current = new Chart(lineChartRef, {
      type: "line",
      data: {
        labels: ["Status 0", "Status 1"],
        datasets: [
          {
            label: "Purchase Orders by Status",
            data: [statusCounts.status0, statusCounts.status1],
            borderColor: "green",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Purchase Orders by Status (Line Chart)",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="FM_Admin">
      <Dashboard />
      <p>Dashboard</p>

      <div className="FM_Charts">
        <div className="FM_Chart">
          <canvas id="myPieChart" ref={chartRef} width="400" height="400" />
        </div>
        <div className="FM_Chart">
          <canvas id="myBarChart" width="400" height="400" />
        </div>
        <div className="FM_Chart">
          <canvas id="myLineChart" width="400" height="400" />
        </div>
      </div>
    </div>
  );
};

export default FM_Admin;
