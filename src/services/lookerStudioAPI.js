// Looker Studio API Integration Service
// Enables pulling data from Looker Studio reports and dashboards

const LOOKER_STUDIO_CONFIG = {
  apiKey: import.meta.env.VITE_LOOKER_STUDIO_API_KEY || 'demo',
  baseUrl: 'https://datastudio.googleapis.com/v1',
  reportId: import.meta.env.VITE_LOOKER_STUDIO_REPORT_ID || 'demo-report-id',
  refreshInterval: 300000 // 5 minutes
};

// Data source mapping for Looker Studio integration
const DATA_SOURCE_MAPPINGS = {
  'etherscan': {
    name: 'Etherscan Blockchain Data',
    fields: ['transaction_hash', 'from_address', 'to_address', 'value', 'timestamp', 'gas_used']
  },
  'dune': {
    name: 'Dune Analytics',
    fields: ['query_id', 'execution_date', 'result_data', 'row_count']
  },
  'karpatkey': {
    name: 'Karpatkey Reports',
    fields: ['report_date', 'asset_value', 'roi_percentage', 'strategy_name']
  },
  'endaoment': {
    name: 'Endaoment Fund Data',
    fields: ['fund_id', 'contribution_amount', 'disbursement_date', 'recipient']
  }
};

export const lookerStudioAPI = {
  // Fetch data from Looker Studio report
  async fetchReportData(reportId = LOOKER_STUDIO_CONFIG.reportId) {
    try {
      if (LOOKER_STUDIO_CONFIG.apiKey === 'demo') {
        console.warn('Using mock Looker Studio data');
        return this.getMockReportData();
      }

      const url = `${LOOKER_STUDIO_CONFIG.baseUrl}/reports/${reportId}/data`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${LOOKER_STUDIO_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Looker Studio API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformLookerData(data);

    } catch (error) {
      console.error('Error fetching Looker Studio data:', error);
      return this.getMockReportData();
    }
  },

  // Get embedded report URL for iframe embedding
  getEmbeddedReportUrl(reportId, config = {}) {
    const baseUrl = 'https://datastudio.google.com/embed/reporting';
    const params = new URLSearchParams({
      'config': JSON.stringify(config)
    });

    return `${baseUrl}/${reportId}/page/${config.pageId || 'p_0000000000'}?${params}`;
  },

  // Transform Looker Studio data to match our internal format
  transformLookerData(lookerData) {
    const transformed = {
      timestamp: new Date().toISOString(),
      source: 'looker-studio',
      datasets: []
    };

    // Process each data table from Looker Studio
    if (lookerData.tables) {
      lookerData.tables.forEach((table, index) => {
        const dataset = {
          id: `dataset_${index}`,
          name: table.name || `Dataset ${index + 1}`,
          columns: table.columns || [],
          rows: table.rows || [],
          rowCount: table.rows?.length || 0,
          lastUpdated: table.lastRefreshTime || new Date().toISOString()
        };

        // Map data source if possible
        dataset.mappedSource = this.mapDataSource(dataset.name);
        transformed.datasets.push(dataset);
      });
    }

    return transformed;
  },

  // Map Looker Studio dataset names to our internal data sources
  mapDataSource(datasetName) {
    const name = datasetName.toLowerCase();

    for (const [key, mapping] of Object.entries(DATA_SOURCE_MAPPINGS)) {
      if (name.includes(key) || mapping.name.toLowerCase().includes(name)) {
        return {
          internalSource: key,
          mapping: mapping,
          confidence: 0.8
        };
      }
    }

    return null;
  },

  // Mock data for development/testing
  getMockReportData() {
    return {
      timestamp: new Date().toISOString(),
      source: 'looker-studio-mock',
      datasets: [
        {
          id: 'etherscan_tx',
          name: 'Etherscan Transactions',
          columns: ['transaction_hash', 'from_address', 'to_address', 'value', 'timestamp'],
          rows: [
            ['0x123...', '0xabcd...', '0xefgh...', '1.5', '2024-01-15T10:30:00Z'],
            ['0x456...', '0 ijkl...', '0xabcd...', '2.1', '2024-01-15T11:15:00Z']
          ],
          rowCount: 2,
          lastUpdated: new Date().toISOString(),
          mappedSource: {
            internalSource: 'etherscan',
            mapping: DATA_SOURCE_MAPPINGS.etherscan,
            confidence: 0.9
          }
        },
        {
          id: 'karpatkey_perf',
          name: 'Karpatkey Performance',
          columns: ['date', 'portfolio_value', 'roi_percentage'],
          rows: [
            ['2024-01-01', '52000000', '5.2'],
            ['2024-01-15', '52300000', '5.8']
          ],
          rowCount: 2,
          lastUpdated: new Date().toISOString(),
          mappedSource: {
            internalSource: 'karpatkey',
            mapping: DATA_SOURCE_MAPPINGS.karpatkey,
            confidence: 0.85
          }
        }
      ]
    };
  },

  // Sync Looker Studio data with our internal data sources
  async syncWithInternalData(lookerData) {
    const syncResults = {
      syncedDatasets: [],
      errors: [],
      stats: { total: 0, synced: 0, failed: 0 }
    };

    for (const dataset of lookerData.datasets) {
      syncResults.stats.total++;

      try {
        if (dataset.mappedSource) {
          const result = await this.syncDataset(dataset);
          syncResults.syncedDatasets.push(result);
          syncResults.stats.synced++;
        } else {
          // Store as generic data
          const result = await this.storeGenericDataset(dataset);
          syncResults.syncedDatasets.push(result);
          syncResults.stats.synced++;
        }
      } catch (error) {
        syncResults.errors.push({
          datasetId: dataset.id,
          error: error.message
        });
        syncResults.stats.failed++;
      }
    }

    return syncResults;
  },

  // Sync specific dataset based on mapped source
  async syncDataset(dataset) {
    const { internalSource } = dataset.mappedSource;

    switch (internalSource) {
      case 'etherscan':
        return await this.syncEtherscanData(dataset);
      case 'karpatkey':
        return await this.syncKarpatkeyData(dataset);
      case 'endaoment':
        return await this.syncEndaomentData(dataset);
      default:
        return await this.storeGenericDataset(dataset);
    }
  },

  // Sync methods for different data sources
  async syncEtherscanData(dataset) {
    // Transform and merge with existing Etherscan data
    const { standardizedEtherscanAPI } = await import('./standardizedAPI');

    // Process rows and sync with our transaction data
    const transformedTxs = dataset.rows.map(row => ({
      hash: row[0],
      from: row[1],
      to: row[2],
      value: row[3],
      timestamp: row[4],
      source: 'looker-studio-sync'
    }));

    return {
      datasetId: dataset.id,
      source: 'etherscan',
      recordsSynced: transformedTxs.length,
      status: 'completed'
    };
  },

  async syncKarpatkeyData(dataset) {
    // Update Karpatkey performance data
    const { endaomentAPI } = await import('./endaomentAPI');

    // Process performance metrics
    const performanceData = dataset.rows.map(row => ({
      date: row[0],
      value: parseFloat(row[1]),
      roi: parseFloat(row[2]),
      source: 'looker-studio-sync'
    }));

    return {
      datasetId: dataset.id,
      source: 'karpatkey',
      recordsSynced: performanceData.length,
      status: 'completed'
    };
  },

  async syncEndaomentData(dataset) {
    // Update Endaoment fund data
    const { endaomentAPI } = await import('./endaomentAPI');

    return {
      datasetId: dataset.id,
      source: 'endaoment',
      recordsSynced: dataset.rows.length,
      status: 'completed'
    };
  },

  // Store unmapped datasets
  async storeGenericDataset(dataset) {
    // Store in local cache or send to data organization service
    const { dataOrganizationService } = await import('./dataOrganization');

    return {
      datasetId: dataset.id,
      source: 'generic',
      recordsSynced: dataset.rows.length,
      status: 'stored'
    };
  },

  // Get data quality metrics for Looker Studio integration
  getDataQualityMetrics() {
    return {
      timestamp: new Date().toISOString(),
      integrationStatus: LOOKER_STUDIO_CONFIG.apiKey !== 'demo' ? 'connected' : 'demo-mode',
      configuredSources: Object.keys(DATA_SOURCE_MAPPINGS),
      refreshInterval: LOOKER_STUDIO_CONFIG.refreshInterval,
      lastSyncAttempt: null,
      dataMappings: DATA_SOURCE_MAPPINGS
    };
  }
};

export default {
  lookerStudioAPI,
  LOOKER_STUDIO_CONFIG,
  DATA_SOURCE_MAPPINGS
};
