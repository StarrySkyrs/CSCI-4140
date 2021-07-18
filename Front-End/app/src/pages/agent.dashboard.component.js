import React from "react";
import axios from "axios";
import "./style.css";
import ProcessOrderForm from "../forms/ProcessOrderForm";
import Order from "../views/order-view.component";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      orders: [],
      parts: [],
    };
  }
  componentDidMount() {
    this.getParts();
    this.getOrders();
  }
  getParts = () => {
    axios.get("http://localhost:3000/parts").then((response) => {
      this.setState({ parts: response.data });
      console.log(response.data);
    });
  };
  getOrders = () => {
    axios.get(`http://localhost:3000/pos/`).then((response) => {
      this.setState({ orders: response.data });
      console.log(response.data);
    });
  };
  render() {
    const { parts, orders } = this.state;
    return (
      <div
        style={{
          marginTop: "70px",
          border: "1px solid black",
          width: "100%",
        }}
      >
        {/* ORDER TABLE */}
        <h2 class="text-left">Client Orders</h2>
        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered table-sm">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Company Name</th>
                <th>Order Date</th>
                <th>Total Amount Owing</th>
                <th>Order Status</th>
                <th>Order Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr>
                    <td>{order.poNo}</td>
                    <td>{order.clientCompId}</td>
                    <td>{order.datePO}</td>
                    <td>{order.poPrice}</td>
                    <td>{order.status}</td>
                    <td>
                      <ProcessOrderForm />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>1,001</td>
                <td>ABC Company</td>
                <td>In Process</td>
                <td>$500.00</td>
                <td>Placed</td>
              </tr>
              <tr>
                <td>1,002</td>
                <td>DEF Company</td>
                <td>In Process</td>
                <td>$500.00</td>
                <td>Placed</td>
              </tr>
              <tr>
                <td>1,003</td>
                <td>GHI Company</td>
                <td>In Process</td>
                <td>$500.00</td>
                <td>Placed</td>
              </tr>
              <tr>
                <td>1,003</td>
                <td>JKL Company</td>
                <td>In Process</td>
                <td>$500.00</td>
                <td>Placed</td>
              </tr>
              <tr>
                <td>1,004</td>
                <td>MNO Company</td>
                <td>In Process</td>
                <td>$500.00</td>
                <td>Placed</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-responsive">
          <h4>Product Inventory</h4>
          <table class="table table-striped table-hover table-bordered table-sm">
            <thead>
              <tr>
                <th>Part Number</th>
                <th>Part Name</th>
                <th>Part Description</th>
                <th>Price</th>
                <th>Quantity On Hand</th>
              </tr>
            </thead>
            <tbody>
              {/* PARTS TABLE */}
              {parts.map((part) => {
                return (
                  <tr>
                    <td>{part.partNo}</td>
                    <td>
                      {part.partName} {part.partPicture}
                    </td>
                    <td>{part.partDescription}</td>
                    <td>{part.currentPrice}</td>
                    <td>{part.part_QOH}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ProcessOrderForm />
        <p>Agent dashboard</p>
        <button>Go to</button>
      </div>
    );
  }
}
