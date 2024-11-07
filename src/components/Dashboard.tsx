import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Megaphone, 
  Users, 
  Layout, 
  TrendingUp,
  Mail,
  FileCode,
  Clock
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    { name: 'Active Campaigns', value: '12', icon: Megaphone, color: 'bg-blue-500' },
    { name: 'Total Leads', value: '2,651', icon: Users, color: 'bg-green-500' },
    { name: 'Active Landings', value: '8', icon: Layout, color: 'bg-purple-500' },
    { name: 'Conversion Rate', value: '3.2%', icon: TrendingUp, color: 'bg-yellow-500' },
  ];

  const recentItems = [
    { id: 1, name: 'Summer Sale Campaign', type: 'campaign', date: '2 hours ago', status: 'Active' },
    { id: 2, name: 'Product Launch Landing', type: 'landing', date: '5 hours ago', status: 'Draft' },
    { id: 3, name: 'Welcome Series', type: 'automation', date: '1 day ago', status: 'Active' },
    { id: 4, name: 'Newsletter Template', type: 'email', date: '2 days ago', status: 'Draft' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Items */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentItems.map((item) => (
              <li key={item.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {item.type === 'campaign' && <Megaphone className="h-5 w-5 text-gray-400" />}
                    {item.type === 'landing' && <Layout className="h-5 w-5 text-gray-400" />}
                    {item.type === 'automation' && <FileCode className="h-5 w-5 text-gray-400" />}
                    {item.type === 'email' && <Mail className="h-5 w-5 text-gray-400" />}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          item.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
            <Link
              to="/campaigns"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View All Activity
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <Link
              to="/campaigns/new"
              className="col-span-1 flex flex-col items-center p-6 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              <Megaphone className="h-8 w-8 text-indigo-600" />
              <span className="mt-3 text-sm font-medium text-gray-900">New Campaign</span>
            </Link>
            <Link
              to="/email-builder"
              className="col-span-1 flex flex-col items-center p-6 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              <Mail className="h-8 w-8 text-indigo-600" />
              <span className="mt-3 text-sm font-medium text-gray-900">Create Email</span>
            </Link>
            <Link
              to="/assets"
              className="col-span-1 flex flex-col items-center p-6 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              <FileCode className="h-8 w-8 text-indigo-600" />
              <span className="mt-3 text-sm font-medium text-gray-900">Upload Asset</span>
            </Link>
            <Link
              to="/crm"
              className="col-span-1 flex flex-col items-center p-6 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              <Users className="h-8 w-8 text-indigo-600" />
              <span className="mt-3 text-sm font-medium text-gray-900">Manage Leads</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}