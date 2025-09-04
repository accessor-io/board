import React from 'react';
import ENSLookerDashboard from './ENSLookerDashboard';

/**
 * Looker Studio Integration Demo
 *
 * This component demonstrates how to integrate your specific Looker Studio report
 * (https://lookerstudio.google.com/u/0/reporting/8785928a-71d5-4b17-9fea-fe1c937b064f/page/RoKgC)
 * into your ENS DAO Finance Board.
 *
 * Features:
 * ✅ Embedded dashboard with your exact report ID
 * ✅ Real-time data synchronization
 * ✅ Status monitoring and error handling
 * ✅ Demo mode for testing without API keys
 * ✅ ENS DAO themed styling
 */

const LookerStudioDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            📊 ENS DAO Looker Studio Integration
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Seamlessly integrate your Looker Studio analytics dashboard into your ENS DAO Finance Board
            with real-time data synchronization and interactive visualizations.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Report ID: 8785928a-71d5-4b17-9fea-fe1c937b064f</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Page: RoKgC</span>
            </div>
          </div>
        </div>

        {/* Integration Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Embedded Dashboard</h3>
              <p className="text-slate-600 text-sm">
                Direct iframe embedding of your Looker Studio report with full interactivity
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Data Synchronization</h3>
              <p className="text-slate-600 text-sm">
                Real-time sync between Looker Studio data and your React application
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Live Updates</h3>
              <p className="text-slate-600 text-sm">
                Automatic refresh and status monitoring with error recovery
              </p>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <ENSLookerDashboard />

        {/* Usage Instructions */}
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-lg p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            🚀 How to Use This Integration
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Setup (Demo Mode)</h3>
              <ol className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <span>Your Looker Studio report is embedded and working in demo mode</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <span>Data synchronization shows mock results for testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <span>Click "Sync Data" to test the synchronization workflow</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Production Setup</h3>
              <ol className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">1</span>
                  </div>
                  <span>Create Google Cloud service account and enable Looker Studio API</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">2</span>
                  </div>
                  <span>Add <code className="bg-slate-100 px-1 rounded">VITE_LOOKER_STUDIO_API_KEY</code> to your .env file</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">3</span>
                  </div>
                  <span>Share your Looker Studio report with the service account</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-2">📋 Configuration Files Updated:</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• <code>src/config/lookerStudioConfig.js</code> - Report ID and settings configured</li>
              <li>• <code>src/services/lookerStudioAPI.js</code> - API integration service</li>
              <li>• <code>src/components/LookerStudioDashboard.jsx</code> - Embedding component</li>
              <li>• <code>src/components/ENSLookerDashboard.jsx</code> - ENS-specific implementation</li>
              <li>• <code>.env.example</code> - Environment variables documented</li>
              <li>• <code>src/components/Dashboard.jsx</code> - New tab added to navigation</li>
            </ul>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-slate-500">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://lookerstudio.google.com/u/0/reporting/8785928a-71d5-4b17-9fea-fe1c937b064f/page/RoKgC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              🔗 View Original Report
            </a>
            <a
              href="https://developers.google.com/looker-studio/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              📚 API Documentation
            </a>
            <a
              href="https://cloud.google.com/bigquery/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              🗄️ BigQuery Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookerStudioDemo;
