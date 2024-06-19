import { useGetPostDailyStatisticsQuery, useGetPostStatisticsQuery, useGetPostWeeklyStatisticsQuery } from '@/lib/services/statisticsApi';
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { StatisticsData } from '@/types/statisticsTypes';

const JobPostingActivity = () => {
  const [timeFrame, setTimeFrame] = useState('monthly'); // 'daily', 'weekly', 'monthly'

  const { data: monthlyPostings } = useGetPostStatisticsQuery(null);
  const { data: weeklyPostings } = useGetPostWeeklyStatisticsQuery(null);
  const { data: dailyPostings } = useGetPostDailyStatisticsQuery(null);

  const getPostingsData = () => {
    switch(timeFrame) {
      case 'daily':
        return dailyPostings;
      case 'weekly':
        return weeklyPostings;
      case 'monthly':
      default:
        return monthlyPostings;
    }
  };

  const getXAxisKey = () => {
    switch(timeFrame) {
      case 'daily':
        return 'day';
      case 'weekly':
        return 'week';
      case 'monthly':
      default:
        return 'month';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Job Posting Activity</h3>

      {/* Nuevas ofertas de empleo */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-semibold">New Job Postings</h4>
          <div>
            <select 
              value={timeFrame} 
              onChange={(e) => setTimeFrame(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getPostingsData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={getXAxisKey()} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="countPublications" fill="#8884d8" name="New Postings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Estadísticas rápidas de nuevos empleos */}
      {
        dailyPostings && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">Total New Postings (Last 30 days)</p>
              <p className="text-2xl font-bold">
                {dailyPostings.reduce((sum, day) => sum + (day.countPublications ?? 0), 0)}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">Average Postings per Day (Last 30 days)</p>
              <p className="text-2xl font-bold">
                {(dailyPostings.reduce((sum, day) => sum + (day.countPublications ?? 0), 0) / dailyPostings.length).toFixed(1)}
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default JobPostingActivity;
