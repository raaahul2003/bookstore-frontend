import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faUser } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { allUsersAPI, booksAPI } from '../../services/allApi'
import { ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, PieChart } from 'recharts';
import { generateMockData, RechartsDevtools } from '@recharts/devtools';

const data = generateMockData(6, 823);
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

function Dashboard() {

  const [books, setBooks] = useState()
  const [users, setUsers] = useState()

  const allBooks = async () => {
    const res = await booksAPI()
    setBooks(res.data)
  }

  const allUsers = async () => {
    const res = await allUsersAPI()
    setUsers(res.data)
  }

  useEffect(() => {
    allBooks()
    allUsers()
  }, [])

  return (
    <>
      <AdminHeader />
      <div className='min-h-screen bg-slate-50 md:grid md:grid-cols-5'>
        <div className='md:col-span-1'>
          <Sidebar />

        </div>
        <div className='min-w-0 md:col-span-4'>
          <div className='p-4 sm:p-6 lg:p-8'>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-indigo-700'>Overview</p>
            <h1 className='mt-1 font-display text-3xl font-bold text-slate-950'>Admin dashboard</h1>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
              <div className='flex min-h-32 min-w-0 items-center gap-4 rounded-2xl bg-indigo-700 p-5 text-white shadow-lg shadow-indigo-200 sm:p-6'>
                <FontAwesomeIcon className='shrink-0 rounded-xl bg-white/15 p-3 text-2xl text-amber-300 sm:text-3xl' icon={faFile} />
                <div className='min-w-0'>
                  <h3 className='text-base font-medium sm:text-lg'>Total Number of Books</h3>
                  <h3 className='text-xl font-bold sm:text-2xl'>{books?.length}</h3>
                </div>
              </div>
              <div className='flex min-h-32 min-w-0 items-center gap-4 rounded-2xl bg-teal-700 p-5 text-white shadow-lg shadow-teal-100 sm:p-6'>
                <FontAwesomeIcon className='shrink-0 rounded-xl bg-white/15 p-3 text-2xl text-amber-200 sm:text-3xl' icon={faUser} />
                <div className='min-w-0'>
                  <h3 className='text-base font-medium sm:text-lg'>Total Number of Users</h3>
                  <h3 className='text-xl font-bold sm:text-2xl'>{users?.length}</h3>
                </div>
              </div>
              <div className='flex min-h-32 min-w-0 items-center gap-4 rounded-2xl bg-amber-500 p-5 text-slate-950 shadow-lg shadow-amber-100 sm:p-6'>
                <FontAwesomeIcon className='shrink-0 rounded-xl bg-white/30 p-3 text-2xl sm:text-3xl' icon={faSearch} />
                <div className='min-w-0'>
                  <h3 className='text-base font-medium sm:text-lg'>Total Number of Employess</h3>
                  <h3 className='text-xl font-bold sm:text-2xl'>100+</h3>
                </div>
              </div>

            </div>
          </div>
          <div className='mt-2 grid grid-cols-1 gap-5 p-4 sm:p-6 lg:p-8 xl:grid-cols-2'>
            <div className='min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
              <h2 className='mb-4 text-base font-bold sm:text-lg'>
                Book Purchase Ratio
              </h2>
              {/* Book Purchase Ratio Barchart */}
              <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
                <BarChart
                  responsive
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="label" />
                  <YAxis width="auto" />
                  <Tooltip />
                  <Legend />
                  <Bar fill='#ee0606' dataKey="x" radius={[10, 10, 0, 0]} />
                  <Bar dataKey="y" radius={[10, 10, 0, 0]} />
                  <RechartsDevtools />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className='min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
              <h2 className='text-base font-bold sm:text-lg'>
                Growth Ratio(Yearly)
              </h2>
              {/* Growth Ratio (Yearly) Ratio Barchart */}
              <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
                <PieChart
                  responsive
                >
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#8884d8"
                    stroke="white"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#82ca9d"
                    stroke="white"
                    label
                  />
                  {/* <Tooltip defaultIndex={defaultIndex} /> */}
                  <RechartsDevtools />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>


        </div>
      </div>

    </>
  )
}

export default Dashboard
