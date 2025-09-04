// Looker Studio Configuration for ENS DAO Finance Board
// Setup instructions and configuration options

export const LOOKER_STUDIO_SETUP = {
  // Step 1: Google Cloud Project Setup
  googleCloudSetup: {
    steps: [
      'Create Google Cloud Project',
      'Enable Looker Studio API',
      'Create Service Account with appropriate permissions',
      'Generate JSON key for the service account',
      'Add service account email to Looker Studio report sharing'
    ],
    requiredPermissions: [
      'https://www.googleapis.com/auth/datastudio.readonly',
      'https://www.googleapis.com/auth/cloud-platform.readonly'
    ]
  },

  // Step 2: Environment Variables
  environmentVariables: {
    VITE_LOOKER_STUDIO_API_KEY: 'Your Google Service Account JSON key',
    VITE_LOOKER_STUDIO_REPORT_ID: 'Your Looker Studio Report ID',
    VITE_GOOGLE_CLOUD_PROJECT_ID: 'Your Google Cloud Project ID'
  },

  // Step 3: Data Source Configuration
  dataSources: {
    bigquery: {
      setup: 'Create BigQuery dataset for ENS DAO data',
      tables: [
        'ens_dao.transactions',
        'ens_dao.wallet_balances',
        'ens_dao.token_holdings',
        'ens_dao.expenditures'
      ],
      schema: {
        transactions: [
          'hash: STRING',
          'from_address: STRING',
          'to_address: STRING',
          'value: FLOAT64',
          'gas_price: FLOAT64',
          'timestamp: TIMESTAMP',
          'block_number: INT64'
        ]
      }
    },
    googleSheets: {
      existingIntegration: true,
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1VEnq3-L1shQAUybi8xBB1B6rFZI0v9HUX0IUp481-x8/edit'
    }
  },

  // Step 4: Report Configuration
  reports: {
    mainDashboard: {
      id: '8785928a-71d5-4b17-9fea-fe1c937b064f', // Your actual Looker Studio report ID
      name: 'ENS DAO Treasury Overview',
      pages: [
        'Executive Summary',
        'Transaction Analysis',
        'Asset Allocation',
        'Risk Metrics'
      ],
      refreshSchedule: 'Every 15 minutes',
      dataSources: ['BigQuery', 'Google Sheets', 'Etherscan API'],
      defaultPage: 'RoKgC' // From your URL
    }
  }
};

// Data Pipeline Configuration
export const DATA_PIPELINE_CONFIG = {
  // Automated data sync from React app to BigQuery
  syncToBigQuery: {
    enabled: true,
    frequency: '5 minutes',
    datasets: [
      {
        source: 'etherscan',
        targetTable: 'ens_dao.raw_transactions',
        transformation: 'standardizedTransformers.transformTransaction'
      },
      {
        source: 'karpatkey',
        targetTable: 'ens_dao.portfolio_performance',
        transformation: 'standardizedTransformers.transformBalance'
      }
    ]
  },

  // BigQuery scheduled queries for data processing
  scheduledQueries: [
    {
      name: 'daily_treasury_summary',
      schedule: 'Every day at 00:00 UTC',
      query: `
        SELECT
          DATE(timestamp) as date,
          SUM(value) as total_value,
          COUNT(*) as transaction_count,
          AVG(gas_price) as avg_gas_price
        FROM \`ens_dao.transactions\`
        WHERE DATE(timestamp) = CURRENT_DATE()
        GROUP BY DATE(timestamp)
      `
    }
  ]
};

// Integration Examples
export const INTEGRATION_EXAMPLES = {
  // Example 1: Embed dashboard in existing component
  embeddedDashboard: `
    import LookerStudioDashboard from '../components/LookerStudioDashboard';

    const AnalyticsTab = () => {
      const handleDataSync = (syncResults) => {
        console.log('Data sync completed:', syncResults);
        // Update local state or trigger re-render
      };

      return (
        <LookerStudioDashboard
          reportId="1abc...def"
          height="800px"
          onDataSync={handleDataSync}
          autoRefresh={true}
          refreshInterval={300000}
        />
      );
    };
  `,

  // Example 2: Data synchronization hook
  dataSyncHook: `
    import { useEffect, useState } from 'react';
    import { lookerStudioAPI } from '../services/lookerStudioAPI';

    const useLookerSync = (reportId, autoSync = true) => {
      const [syncData, setSyncData] = useState(null);
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        if (autoSync) {
          const syncData = async () => {
            setIsLoading(true);
            try {
              const data = await lookerStudioAPI.fetchReportData(reportId);
              const results = await lookerStudioAPI.syncWithInternalData(data);
              setSyncData(results);
            } catch (error) {
              console.error('Sync failed:', error);
            } finally {
              setIsLoading(false);
            }
          };

          syncData();
          const interval = setInterval(syncData, 300000); // 5 minutes
          return () => clearInterval(interval);
        }
      }, [reportId, autoSync]);

      return { syncData, isLoading };
    };
  `,

  // Example 3: Manual data export
  manualExport: `
    const exportToLooker = async () => {
      const { etherscanAPI } = await import('../services/api');
      const transactions = await etherscanAPI.getTransactionHistory(walletAddress);

      // Export to Google Sheets or BigQuery
      const exportData = {
        timestamp: new Date().toISOString(),
        source: 'ens-dao-app',
        data: transactions,
        schema: 'transaction_v1'
      };

      // Send to your export endpoint
      await fetch('/api/export/looker-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exportData)
      });
    };
  `
};

export default {
  LOOKER_STUDIO_SETUP,
  DATA_PIPELINE_CONFIG,
  INTEGRATION_EXAMPLES
};
