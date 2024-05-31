import React, { PureComponent } from 'react';
import { AreaChart, CartesianAxis, LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//       "day": "Sun Jan 29",
//       "incoming": 0,
//       "outgoing": 0
//   },
//   {
//       "day": "Mon Jan 30",
//       "incoming": 0,
//       "outgoing": 0
//   },
//   {
//       "day": "Tue Jan 31",
//       "incoming": 0,
//       "outgoing": 0
//   },
//   {
//       "day": "Wed Feb 01",
//       "incoming": 14500,
//       "outgoing": 3000
//   },
//   {
//       "day": "Thu Feb 02",
//       "incoming": 0,
//       "outgoing": 0
//   },
//   {
//       "day": "Fri Feb 03",
//       "incoming": 0,
//       "outgoing": 0
//   },
//   {
//       "day": "Sat Feb 04",
//       "incoming": 0,
//       "outgoing": 0
//   },
//   {
//       "day": "Sun Feb 05",
//       "incoming": 0,
//       "outgoing": 0
//   }
// ]

const DashboardChart=({data})=> {
//   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

//   render() {
    return (
      <ResponsiveContainer width="95%" height={400}>
        <AreaChart
          width={300}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 5" />
          <XAxis dataKey="day"/>
          <YAxis  />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="pv" stroke="#00bf00" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#ff1414" /> */}
            <Area type="monotone" dataKey="incoming" stroke="#00bf00" fill="#00bf00" />
            <Area type="monotone" dataKey="outgoing" stroke="#1f332b" fill="#1f332b" />
        </AreaChart>
      </ResponsiveContainer>
    );
//   }
}

export default DashboardChart
