import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CampaignsList } from './CampaignsList';
import { CreateCampaign } from './CreateCampaign';

export function Campaigns() {
  return (
    <Routes>
      <Route path="/" element={<CampaignsList />} />
      <Route path="/new" element={<CreateCampaign />} />
    </Routes>
  );
}