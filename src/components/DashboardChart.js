import React, { PureComponent } from 'react';
import { AreaChart, LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    day: 'Monday',
    uv: 400,
    pv: 1400,
    amt: 2400,
  },
  {
    day: 'Tuesday',
    uv: 3000,
    pv: 398,
    amt: 2210,
  },
  {
    day: 'Wednesday',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    day: 'Thursday',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    day: 'Friday',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    day: 'Saturday',
    uv: 2390,
    pv: 9800,
    amt: 2500,
  },
  {
    day: 'Sunday',
    uv: 3490,
    pv: 1300,
    amt: 2100,
  },
];

const DashboardChart=()=> {
//   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

//   render() {
    return (
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="pv" stroke="#00bf00" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#ff1414" /> */}
            <Area type="monotone" dataKey="pv" stroke="#00bf00" fill="#00bf00" />
            <Area type="monotone" dataKey="uv" stroke="#1f332b" fill="#1f332b" />
        </AreaChart>
      </ResponsiveContainer>
    );
//   }
}

export default DashboardChart
