import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from '@ant-design/plots';
import {Table} from "antd";
import { getMonthlyData } from '../Features/Auth/authSlice';
const Columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  }
];
  const data1 = [];
  for(let i = 0; i < 46; i++){
    data1.push({
      key: i,
      name: `Abdisha King ${i}`,
      product: 25,
      status: `Arat Kilo no ${i}`
    });
  };
const Dashboard = () => {
    const dispatch = useDispatch();
   
    const monthlyDataState = useSelector((state) => state.auth.getMonthlyOrders);
    const [monthlyData, setMonthlyData] = useState([]);
    useEffect(() =>{
      dispatch(getMonthlyData());
    }, []);
    useEffect(() => {
      let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      let data = [];
      for(let i = 0; i < monthlyDataState?.length; i++){
        const element = monthlyDataState[i];
        data.push({type: monthNames[element?._id?.month], income: element?.count  });
        setMonthlyData(data);
      }
    }, [monthlyDataState])
    // const data = [
    //   {
    //     type: 'Jan',
    //     sales: 38,
    //   },
    //   {
    //     type: 'Feb',
    //     sales: 52,
    //   },
    //   {
    //     type: 'Mar',
    //     sales: 61,
    //   },
    //   {
    //     type: 'Apr',
    //     sales: 145,
    //   },
    //   {
    //     type: 'May',
    //     sales: 48,
    //   },
    //   {
    //     type: 'Jun',
    //     sales: 38,
    //   },
    //   {
    //     type: 'July',
    //     sales: 38,
    //   },
    //   {
    //     type: 'Aug',
    //     sales: 38,
    //   },
    //   {
    //     type: 'Sep',
    //     sales: 38,
    //   },
    //   {
    //     type: 'Oct',
    //     sales: 38,
    //   },
    //   {
    //     type: 'Nov',
    //     sales: 38,
    //   },
    //   {
    //     type: 'Dec',
    //     sales: 38,
    //   },
    // ];
    const config = {
      data: monthlyData,
      xField: 'type',
      yField: 'income',
      color: ({type}) =>{
        return "#ffd333"
      },
      label: {
        position: 'middle',
        style: {
          fill: 'white',
          opacity: 1,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: 'Month',
        },
        sales: {
          alias: 'Income',
        },
      },
    };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className=" desc">Total</p>
            <h4 className="mb-0 sub-title">$100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6> <BsArrowDownRight />32%</h6>
            <p className="mb-0 desc">Compared to Appril 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className=" desc">Total</p>
            <h4 className="mb-0 sub-title">$100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className='red'> <BsArrowDownRight />32%</h6>
            <p className="mb-0 desc">Compared to Appril 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className=" desc">Total</p>
            <h4 className="mb-0 sub-title">$100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className='green'> <BsArrowDownRight />32%</h6>
            <p className="mb-0 desc">Compared to Appril 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5"> Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4"> Recent Orders</h3>
        <div>
          <Table
                columns={Columns}
                dataSource={data1}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
