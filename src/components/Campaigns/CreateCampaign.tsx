import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

type Tab = 'basics' | 'audience' | 'objective';

export function CreateCampaign() {
  const [activeTab, setActiveTab] = useState<Tab>('basics');
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    audienceType: '',
    ageRanges: [] as string[],
    gender: '',
    location: '',
    objective: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      ageRanges: prev.ageRanges.includes(value)
        ? prev.ageRanges.filter((range) => range !== value)
        : [...prev.ageRanges, value],
    }));
  };

  const isBasicsValid = formData.name && formData.startDate && formData.endDate;
  const isAudienceValid = formData.audienceType;
  const isObjectiveValid = formData.objective;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data to your backend
    navigate('/campaigns');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/campaigns')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create Campaign</h1>
          <p className="mt-1 text-sm text-gray-500">
            Set up your new marketing campaign
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {['basics', 'audience', 'objective'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as Tab)}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === 'basics' && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Campaign Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    id="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    id="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audience' && (
            <div className="space-y-6">
              <div>
                <label htmlFor="audienceType" className="block text-sm font-medium text-gray-700">
                  Audience Type
                </label>
                <select
                  id="audienceType"
                  name="audienceType"
                  value={formData.audienceType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select audience type</option>
                  <option value="new">New Contacts</option>
                  <option value="active">Active Contacts</option>
                  <option value="inactive">Inactive Contacts</option>
                  <option value="frequent">Frequent Customers</option>
                  <option value="abandoned">Abandoned Cart Contacts</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <div className="space-y-2">
                  {['20-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51+'].map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.ageRanges.includes(range)}
                        onChange={() => handleCheckboxChange(range)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-2 space-x-4">
                  {['male', 'female', 'both'].map((gender) => (
                    <label key={gender} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleInputChange}
                        className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'objective' && (
            <div>
              <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
                Campaign Objective
              </label>
              <select
                id="objective"
                name="objective"
                value={formData.objective}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select campaign objective</option>
                <option value="sales">Increase Sales</option>
                <option value="leads">Generate New Leads</option>
                <option value="loyalty">Customer Loyalty</option>
                <option value="traffic">Increase Web Traffic</option>
                <option value="awareness">Brand Awareness</option>
                <option value="engagement">Boost Engagement</option>
              </select>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {activeTab !== 'basics' && (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'objective' ? 'audience' : 'basics')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            {activeTab !== 'objective' ? (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'basics' ? 'audience' : 'objective')}
                disabled={activeTab === 'basics' ? !isBasicsValid : !isAudienceValid}
                className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isObjectiveValid}
                className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                Create Campaign
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}