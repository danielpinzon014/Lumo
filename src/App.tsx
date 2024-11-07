import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Campaigns } from './components/Campaigns';
import { EmailBuilder } from './components/EmailBuilder';
import { CRM } from './components/CRM';
import { Assets } from './components/Assets';
import { Profile } from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns/*" element={<Campaigns />} />
          <Route path="/email-builder" element={<EmailBuilder />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;