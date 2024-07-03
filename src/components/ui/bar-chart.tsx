'use client'
import { NextPage } from 'next'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface Props {}


const BarChartComponent: NextPage<Props> = ({}) => {

const data = [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 1000
    }
  ];
  return <ResponsiveContainer width={"100%"}>
    <BarChart data={data}>
      <XAxis dataKey={"name"} tickLine={false} axisLine={false} stroke='#888888'/>
      <YAxis tickLine={false} axisLine={false} stroke='#888888' fontSize={12} tickFormatter={(value)=>value}/>
      <Bar dataKey={'total'} radius={[4,4,0,0]}/>
    </BarChart>
    
  </ResponsiveContainer>
}

export default BarChartComponent