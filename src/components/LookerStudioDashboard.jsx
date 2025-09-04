import React, { useState, useEffect, useRef } from 'react';
import { lookerStudioAPI } from '../services/lookerStudioAPI';

const LookerStudioDashboard = ({
  reportId,
  height = '600px',
  width = '100%',
  showControls = true,
  autoRefresh = true,
  refreshInterval = 300000, // 5 minutes
  onDataSync = null
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle');
  const iframeRef = useRef(null);
  const refreshTimerRef = useRef(null);

  // Generate embedded URL
  const embeddedUrl = lookerStudioAPI.getEmbeddedReportUrl(reportId, {
    pageId: 'p_0000000000', // Default page
    'params': {
      'config': {
        'mode': 'view',
        'showToolbar': showControls,
        'showInfo': false
      }
    }
  });

  // Handle data synchronization
  const handleDataSync = async () => {
    if (!onDataSync) return;

    try {
      setSyncStatus('syncing');
      const lookerData = await lookerStudioAPI.fetchReportData(reportId);
      const syncResults = await lookerStudioAPI.syncWithInternalData(lookerData);

      setLastSync(new Date());
      setSyncStatus('completed');

      if (onDataSync) {
        onDataSync(syncResults);
      }
    } catch (err) {
      console.error('Data sync failed:', err);
      setSyncStatus('error');
      setError(err.message);
    }
  };

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshTimerRef.current = setInterval(() => {
        handleDataSync();
      }, refreshInterval);

      // Initial sync
      handleDataSync();
    }

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, reportId]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load Looker Studio dashboard');
  };

  return (
    <div className="looker-studio-dashboard bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with controls */}
      {showControls && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Looker Studio Dashboard
            </h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                syncStatus === 'syncing' ? 'bg-blue-500 animate-pulse' :
                syncStatus === 'completed' ? 'bg-green-500' :
                syncStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'
              }`} />
              <span className="text-sm text-gray-600 capitalize">
                {syncStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {lastSync && (
              <span className="text-sm text-gray-500">
                Last sync: {lastSync.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={handleDataSync}
              disabled={syncStatus === 'syncing'}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Data'}
            </button>
          </div>
        </div>
      )}

      {/* Dashboard content */}
      <div className="relative" style={{ height, width }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50">
            <div className="text-center text-red-600">
              <p className="font-semibold mb-2">Error loading dashboard</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!error && (
          <iframe
            ref={iframeRef}
            src={embeddedUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '0 0 8px 8px'
            }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title="Looker Studio Dashboard"
            allowFullScreen
          />
        )}
      </div>

      {/* Footer with data quality info */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        <div className="flex justify-between items-center">
          <span>Data source: Looker Studio</span>
          <span>Report ID: {reportId}</span>
        </div>
      </div>
    </div>
  );
};

export default LookerStudioDashboard;
