import React, { useState, useEffect } from 'react';
import LookerStudioDashboard from './LookerStudioDashboard';
import { lookerStudioAPI } from '../services/lookerStudioAPI';
import { LOOKER_STUDIO_CONFIG } from '../config/lookerStudioConfig';

const ENSLookerDashboard = () => {
  const [syncResults, setSyncResults] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [dataQuality, setDataQuality] = useState(null);

  // Your specific Looker Studio report ID
  const reportId = '8785928a-71d5-4b17-9fea-fe1c937b064f';

  useEffect(() => {
    // Check connection status
    const checkConnection = () => {
      const hasApiKey = LOOKER_STUDIO_CONFIG.apiKey !== 'demo';
      const hasReportId = reportId && reportId !== 'demo-report-id';
      setIsConnected(hasApiKey && hasReportId);
    };

    checkConnection();

    // Get data quality metrics
    const qualityMetrics = lookerStudioAPI.getDataQualityMetrics();
    setDataQuality(qualityMetrics);
  }, [reportId]);

  // Handle data synchronization
  const handleDataSync = (results) => {
    console.log('ENS Looker Studio data sync completed:', results);
    setSyncResults(results);

    // You can trigger updates to other components here
    if (results.stats.synced > 0) {
      // Refresh related data in your app
      console.log(`Successfully synced ${results.stats.synced} datasets`);
    }
  };

  // Custom styling for ENS DAO theme
  const dashboardStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)',
    overflow: 'hidden'
  };

  return (
    <div className="ens-looker-dashboard space-y-6">
      {/* Header with status */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              ENS DAO Analytics Dashboard
            </h2>
            <p className="text-slate-600">
              Real-time treasury analytics powered by Looker Studio
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
              }`} />
              <span className="text-sm font-medium">
                {isConnected ? 'Connected' : 'Demo Mode'}
              </span>
            </div>

            {/* Report ID */}
            <div className="text-xs text-slate-500 font-mono">
              Report: {reportId.slice(0, 12)}...
            </div>
          </div>
        </div>

        {/* Data Quality Summary */}
        {dataQuality && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded p-3">
              <div className="text-sm font-medium text-slate-900">Status</div>
              <div className="text-lg font-semibold text-slate-700 capitalize">
                {dataQuality.integrationStatus}
              </div>
            </div>
            <div className="bg-slate-50 rounded p-3">
              <div className="text-sm font-medium text-slate-900">Data Sources</div>
              <div className="text-lg font-semibold text-slate-700">
                {dataQuality.configuredSources?.length || 0}
              </div>
            </div>
            <div className="bg-slate-50 rounded p-3">
              <div className="text-sm font-medium text-slate-900">Refresh Rate</div>
              <div className="text-lg font-semibold text-slate-700">
                {Math.round(dataQuality.refreshInterval / 60000)}min
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Dashboard */}
      <div style={dashboardStyle}>
        <LookerStudioDashboard
          reportId={reportId}
          height="700px"
          width="100%"
          showControls={true}
          autoRefresh={true}
          refreshInterval={300000} // 5 minutes
          onDataSync={handleDataSync}
        />
      </div>

      {/* Sync Results Panel */}
      {syncResults && (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Data Synchronization Results
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {syncResults.stats.synced}
              </div>
              <div className="text-sm text-slate-600">Synced</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {syncResults.stats.failed}
              </div>
              <div className="text-sm text-slate-600">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {syncResults.stats.total}
              </div>
              <div className="text-sm text-slate-600">Total</div>
            </div>
          </div>

          {/* Detailed results */}
          <div className="space-y-2">
            {syncResults.syncedDatasets.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    result.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="font-medium text-slate-900">
                    {result.datasetId}
                  </span>
                  <span className="text-sm text-slate-600">
                    ({result.source})
                  </span>
                </div>
                <span className="text-sm text-slate-500">
                  {result.recordsSynced} records
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connection Instructions */}
      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="text-yellow-600 mt-0.5">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Setup Required for Full Integration
              </h3>
              <div className="text-yellow-700 space-y-2">
                <p>To enable full Looker Studio integration:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Add your Google Service Account JSON key to <code className="bg-yellow-100 px-1 rounded">VITE_LOOKER_STUDIO_API_KEY</code></li>
                  <li>Share your Looker Studio report with the service account email</li>
                  <li>Enable Looker Studio API in your Google Cloud Project</li>
                  <li>Set up BigQuery dataset for data synchronization (optional)</li>
                </ol>
                <p className="mt-3">
                  <strong>Current mode:</strong> Demo mode with mock data synchronization
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer with links */}
      <div className="text-center text-sm text-slate-500">
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://lookerstudio.google.com/u/0/reporting/8785928a-71d5-4b17-9fea-fe1c937b064f/page/RoKgC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View in Looker Studio
          </a>
          <a
            href="https://developers.google.com/looker-studio/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            API Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default ENSLookerDashboard;
