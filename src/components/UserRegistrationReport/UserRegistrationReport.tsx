import { RootState } from '@/lib/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useGetUsersStatisticsQuery } from '@/lib/services/statisticsApi';

const UserRegistrationReport: React.FC = () => {
  const {data: statitstics} = useGetUsersStatisticsQuery(null)  

  const totalUsers = 20;
  const growthRate = 8.5; // porcentaje

  const authenticationMethods = [
    { name: 'Email/Password', value: 9000 },
    { name: 'Google', value: 6000 },
  ];

  const totalAuthUsers = authenticationMethods.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">User Registration</h3>

      {/* Total Users and Growth Rate */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Growth Rate</p>
          <p className="text-2xl font-bold text-green-600">+{growthRate}%</p>
        </div>
      </div>

      {/* Nuevos usuarios por mes */}
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">New Users by Month</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statitstics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="countUsers" fill="#3C65F5" name="New Users" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Representación clara y directa de cómo los usuarios prefieren autenticarse en la plataforma */}
      <div>
        <h4 className="text-md font-semibold mb-4">Authentication Methods</h4>
        <div className="grid grid-cols-1 gap-4">
          <ul className="space-y-4">
            {authenticationMethods.map((method, index) => (
              <li key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                <span className="text-base">{method.name}</span>
                <div className="text-right">
                  <p className="text-2xl font-bold">{((method.value / totalAuthUsers) * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">{method.value.toLocaleString()} users</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationReport;