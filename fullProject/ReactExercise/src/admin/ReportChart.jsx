import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
export default function ReportChart() {
  Chart.register(...registerables);
  const [topProduct, setTopProduct] = useState([]);
  const [topUser, setTopUser] = useState([]);
  const [totalAllAmount, setTotalAllAmount] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState({
    labels: [],
    datas: [],
  });

  useEffect(() => {
    handleDateChange(new Date());
    getTop5Sale();
    getTopUser();
    getTotalAllAmount();
  }, []);
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/report/${year}/${month}`
      );
      const data = await response.data;
      const newArr = data.map((item) => item.amount);
      const labels = [];
      const result = await response.data;
      result.forEach((day, index) => {
        labels.push(index + 1);
      });
      setData({
        ...data,
        labels,
        datas: newArr,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getTopUser = async () => {
    await axios.get("http://localhost:8080/api/report/topUser").then((res) => {
      setTopUser(res.data);
    });
  };
  const topUserName = topUser.map((user) => user.fullName);
  const topAmount = topUser.map((user) => user.amount);
  const getTop5Sale = async () => {
    await axios
      .get("http://localhost:8080/api/products/topSeller")
      .then((res) => {
        setTopProduct(res.data);
      });
  };
  const topProductName = topProduct.map((product) => product.productName);
  const topQuantity = topProduct.map((product) => product.quantity);
  const totalAmountMonth = () => {
    const map = data.datas;
    if (map.length > 0) {
      return map.reduce((acc, item) => acc + item, 0);
    } else {
      return 0;
    }
  };
  const getTotalAllAmount = async () => {
    await axios
      .get("http://localhost:8080/api/report/totalAllAmount")
      .then((res) => {
        setTotalAllAmount(res.data);
      });
  };
  return (
    <div className="col-9" style={{ marginLeft: "280px" }}>
      <div className="row mb-3">
        <div className="col-6">
          <div class="card h-100 w-100">
            <div class="card-header">
              <h4>Top 5 mặt hàng bán chạy</h4>
            </div>
            <div class="card-body h-100 w-100">
              <Bar
                data={{
                  labels: topProductName,
                  datasets: [
                    {
                      label: "số lượng bán được",
                      data: topQuantity,
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div class="card h-100 w-100">
            <div class="card-header">
              <h4>Top 5 Người dùng mua hàng </h4>
            </div>
            <div class="card-body h-100 w-100">
              <Bar
                data={{
                  labels: topUserName,
                  datasets: [
                    {
                      label: "Số tiền đã mua",
                      data: topAmount,
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row bg-light border-2">
        <div className="row pb-2">
          <div class="card-header">
            <h2>Biểu đồ</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showIcon
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            <div className="form-group pt-2">
              <label htmlFor />
              Doanh thu tháng
              <input
                type="text"
                name
                id
                className="form-control"
                placeholder
                aria-describedby="helpId"
                value={totalAmountMonth().toLocaleString() + "đ"}
                readOnly
              />
            </div>
            <div className="form-group pt-2">
              <label htmlFor />
              Tổng doanh thu
              <input
                type="text"
                name
                id
                className="form-control"
                placeholder
                aria-describedby="helpId"
                value={totalAllAmount?.toLocaleString() + "đ"}
                readOnly
              />
            </div>
          </div>
          <div className="col-9">
            <Bar
              data={{
                labels: data.labels,
                datasets: [
                  {
                    label: "doanh thu",
                    data: data.datas,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
