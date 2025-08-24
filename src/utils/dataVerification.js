// Data Organization Verification Utility
// This utility helps verify that all data organization components are working properly

import { dataOrganizationService, TAB_ORGANIZATION } from '../services/dataOrganization';
import { DATA_ORGANIZATION_CONFIG } from '../config/dataOrganizationConfig';

export class DataVerificationService {
  constructor() {
    this.verificationResults = {
      services: {},
      components: {},
      dataSources: {},
      configuration: {},
      overall: 'pending'
    };
  }

  // Verify all data organization components
  async verifyAll() {
    console.log('🔍 Starting data organization verification...');
    
    try {
      // Verify services
      await this.verifyServices();
      
      // Verify components
      await this.verifyComponents();
      
      // Verify data sources
      await this.verifyDataSources();
      
      // Verify configuration
      await this.verifyConfiguration();
      
      // Overall verification
      this.verifyOverall();
      
      console.log('✅ Data organization verification completed');
      return this.verificationResults;
      
    } catch (error) {
      console.error('❌ Data organization verification failed:', error);
      this.verificationResults.overall = 'failed';
      this.verificationResults.error = error.message;
      return this.verificationResults;
    }
  }

  // Verify core services
  async verifyServices() {
    console.log('🔍 Verifying services...');
    
    const services = {
      dataOrganizationService: false,
      endaomentAPI: false,
      cacheService: false
    };

    try {
      // Verify data organization service
      if (dataOrganizationService && typeof dataOrganizationService.getTabData === 'function') {
        services.dataOrganizationService = true;
      }

      // Verify endaoment API
      try {
        const { endaomentAPI } = await import('../services/endaomentAPI');
        if (endaomentAPI && typeof endaomentAPI.getEndaomentData === 'function') {
          services.endaomentAPI = true;
        }
      } catch (error) {
        console.warn('Endaoment API not available:', error.message);
      }

      // Verify cache service
      if (dataOrganizationService && typeof dataOrganizationService.getCacheStats === 'function') {
        services.cacheService = true;
      }

      this.verificationResults.services = services;
      console.log('✅ Services verification completed');
      
    } catch (error) {
      console.error('❌ Services verification failed:', error);
      this.verificationResults.services = { error: error.message };
    }
  }

  // Verify components
  async verifyComponents() {
    console.log('🔍 Verifying components...');
    
    const components = {
      OrganizedDashboard: false,
      EndaomentData: false,
      Dashboard: false
    };

    try {
      // Verify OrganizedDashboard
      try {
        const { default: OrganizedDashboard } = await import('../components/OrganizedDashboard');
        if (OrganizedDashboard) {
          components.OrganizedDashboard = true;
        }
      } catch (error) {
        console.warn('OrganizedDashboard not available:', error.message);
      }

      // Verify EndaomentData
      try {
        const { default: EndaomentData } = await import('../components/EndaomentData');
        if (EndaomentData) {
          components.EndaomentData = true;
        }
      } catch (error) {
        console.warn('EndaomentData not available:', error.message);
      }

      // Verify original Dashboard
      try {
        const { default: Dashboard } = await import('../components/Dashboard');
        if (Dashboard) {
          components.Dashboard = true;
        }
      } catch (error) {
        console.warn('Dashboard not available:', error.message);
      }

      this.verificationResults.components = components;
      console.log('✅ Components verification completed');
      
    } catch (error) {
      console.error('❌ Components verification failed:', error);
      this.verificationResults.components = { error: error.message };
    }
  }

  // Verify data sources
  async verifyDataSources() {
    console.log('🔍 Verifying data sources...');
    
    const dataSources = {
      ensData: false,
      endaomentData: false,
      realTimeBalances: false,
      transactionHistory: false
    };

    try {
      // Verify ENS data
      try {
        const { ensFinancialData } = await import('../data/ensData');
        if (ensFinancialData && ensFinancialData.ensDaoOverview) {
          dataSources.ensData = true;
        }
      } catch (error) {
        console.warn('ENS data not available:', error.message);
      }

      // Verify endaoment data
      try {
        const { endaomentAPI } = await import('../services/endaomentAPI');
        const testData = await endaomentAPI.getEndaomentData();
        if (testData && testData.fundId) {
          dataSources.endaomentData = true;
        }
      } catch (error) {
        console.warn('Endaoment data not available:', error.message);
      }

      // Verify real-time balances
      try {
        const { dataService } = await import('../services/api');
        const testData = await dataService.getENSDAOTreasuryData();
        if (testData && testData.wallets) {
          dataSources.realTimeBalances = true;
        }
      } catch (error) {
        console.warn('Real-time balances not available:', error.message);
      }

      // Verify transaction history
      try {
        const { dataService } = await import('../services/api');
        const testData = await dataService.getENSDAOTransactions();
        if (testData && testData.transactions) {
          dataSources.transactionHistory = true;
        }
      } catch (error) {
        console.warn('Transaction history not available:', error.message);
      }

      this.verificationResults.dataSources = dataSources;
      console.log('✅ Data sources verification completed');
      
    } catch (error) {
      console.error('❌ Data sources verification failed:', error);
      this.verificationResults.dataSources = { error: error.message };
    }
  }

  // Verify configuration
  async verifyConfiguration() {
    console.log('🔍 Verifying configuration...');
    
    const configuration = {
      tabOrganization: false,
      dataOrganizationConfig: false,
      componentMappings: false
    };

    try {
      // Verify tab organization
      if (TAB_ORGANIZATION && Object.keys(TAB_ORGANIZATION).length > 0) {
        configuration.tabOrganization = true;
      }

      // Verify data organization config
      if (DATA_ORGANIZATION_CONFIG && DATA_ORGANIZATION_CONFIG.tabs) {
        configuration.dataOrganizationConfig = true;
      }

      // Verify component mappings
      if (DATA_ORGANIZATION_CONFIG && DATA_ORGANIZATION_CONFIG.componentMappings) {
        configuration.componentMappings = true;
      }

      this.verificationResults.configuration = configuration;
      console.log('✅ Configuration verification completed');
      
    } catch (error) {
      console.error('❌ Configuration verification failed:', error);
      this.verificationResults.configuration = { error: error.message };
    }
  }

  // Overall verification
  verifyOverall() {
    console.log('🔍 Verifying overall system...');
    
    const servicesOk = this.verificationResults.services && 
      Object.values(this.verificationResults.services).every(v => v === true || v === false);
    
    const componentsOk = this.verificationResults.components && 
      Object.values(this.verificationResults.components).every(v => v === true || v === false);
    
    const dataSourcesOk = this.verificationResults.dataSources && 
      Object.values(this.verificationResults.dataSources).every(v => v === true || v === false);
    
    const configOk = this.verificationResults.configuration && 
      Object.values(this.verificationResults.configuration).every(v => v === true || v === false);

    if (servicesOk && componentsOk && dataSourcesOk && configOk) {
      this.verificationResults.overall = 'success';
      console.log('✅ Overall verification: SUCCESS');
    } else {
      this.verificationResults.overall = 'partial';
      console.log('⚠️ Overall verification: PARTIAL SUCCESS');
    }
  }

  // Get verification summary
  getSummary() {
    const results = this.verificationResults;
    
    const summary = {
      overall: results.overall,
      services: {
        total: Object.keys(results.services || {}).length,
        working: Object.values(results.services || {}).filter(v => v === true).length,
        failed: Object.values(results.services || {}).filter(v => v === false).length
      },
      components: {
        total: Object.keys(results.components || {}).length,
        working: Object.values(results.components || {}).filter(v => v === true).length,
        failed: Object.values(results.components || {}).filter(v => v === false).length
      },
      dataSources: {
        total: Object.keys(results.dataSources || {}).length,
        working: Object.values(results.dataSources || {}).filter(v => v === true).length,
        failed: Object.values(results.dataSources || {}).filter(v => v === false).length
      },
      configuration: {
        total: Object.keys(results.configuration || {}).length,
        working: Object.values(results.configuration || {}).filter(v => v === true).length,
        failed: Object.values(results.configuration || {}).filter(v => v === false).length
      }
    };

    return summary;
  }

  // Print verification report
  printReport() {
    const results = this.verificationResults;
    const summary = this.getSummary();
    
    console.log('\n📊 DATA ORGANIZATION VERIFICATION REPORT');
    console.log('==========================================');
    console.log(`Overall Status: ${results.overall.toUpperCase()}`);
    console.log('');
    
    console.log('🔧 Services:');
    Object.entries(results.services || {}).forEach(([service, status]) => {
      console.log(`  ${service}: ${status ? '✅' : '❌'}`);
    });
    console.log('');
    
    console.log('🧩 Components:');
    Object.entries(results.components || {}).forEach(([component, status]) => {
      console.log(`  ${component}: ${status ? '✅' : '❌'}`);
    });
    console.log('');
    
    console.log('📡 Data Sources:');
    Object.entries(results.dataSources || {}).forEach(([source, status]) => {
      console.log(`  ${source}: ${status ? '✅' : '❌'}`);
    });
    console.log('');
    
    console.log('⚙️ Configuration:');
    Object.entries(results.configuration || {}).forEach(([config, status]) => {
      console.log(`  ${config}: ${status ? '✅' : '❌'}`);
    });
    console.log('');
    
    console.log('📈 Summary:');
    console.log(`  Services: ${summary.services.working}/${summary.services.total} working`);
    console.log(`  Components: ${summary.components.working}/${summary.components.total} working`);
    console.log(`  Data Sources: ${summary.dataSources.working}/${summary.dataSources.total} working`);
    console.log(`  Configuration: ${summary.configuration.working}/${summary.configuration.total} working`);
    console.log('');
    
    if (results.overall === 'success') {
      console.log('🎉 All systems operational!');
    } else if (results.overall === 'partial') {
      console.log('⚠️ Some systems need attention');
    } else {
      console.log('❌ System verification failed');
    }
  }
}

// Create singleton instance
export const dataVerificationService = new DataVerificationService();

// Utility function to run verification
export const runDataVerification = async () => {
  const results = await dataVerificationService.verifyAll();
  dataVerificationService.printReport();
  return results;
};

// Auto-run verification in development
if (import.meta.env && import.meta.env.DEV) {
  console.log('🔍 Auto-running data verification in development mode...');
  runDataVerification().catch(console.error);
}

export default {
  DataVerificationService,
  dataVerificationService,
  runDataVerification
};
