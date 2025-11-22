import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, Download, TrendingUp, AlertCircle, CheckCircle, XCircle, Home } from 'lucide-react';
import { franchiseCacheService } from '../services/franchiseCacheService';
import { canadianFranchiseAPI } from '../services/canadianFranchiseAPI';
import { franchiseScraperService } from '../services/franchiseScraperService';
import { allCanadianFranchises } from '../franchiseData';

interface APIStatus {
  name: string;
  status: 'connected' | 'disconnected' | 'testing';
  lastSync?: string;
  recordCount?: number;
}

interface CacheStats {
  total: number;
  active: number;
  byIndustry: Record<string, number>;
  bySource: Record<string, number>;
}

export const FranchiseAPIManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'apis' | 'cache' | 'scraper' | 'real-estate'>('overview');
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([]);
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [realtimeStats, setRealtimeStats] = useState<any>(null);

  useEffect(() => {
    loadData();
    if (activeTab === 'real-estate') {
      loadRealEstateStatus();
    }
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const stats = await franchiseCacheService.getFranchiseStats();
      setCacheStats(stats);

      const recentLogs = await franchiseCacheService.getRecentAPILogs(20);
      setLogs(recentLogs);

      setApiStatuses([
        { name: 'FranChimp (RapidAPI)', status: 'disconnected', recordCount: 0 },
        { name: 'Canadian Franchise Association', status: 'disconnected', recordCount: 0 },
        { name: 'BeTheBoss.ca', status: 'disconnected', recordCount: 0 },
        { name: 'FranchiseDirect Canada', status: 'disconnected', recordCount: 0 },
        { name: 'Local Data', status: 'connected', recordCount: allCanadianFranchises.length }
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncLocalDataToCache = async () => {
    setLoading(true);
    setSyncMessage('Syncing local franchise data to Supabase...');

    try {
      const count = await franchiseCacheService.saveFranchises(allCanadianFranchises, 'local');
      setSyncMessage(`✅ Successfully synced ${count} franchises to database!`);
      await loadData();

      setTimeout(() => setSyncMessage(''), 3000);
    } catch (error) {
      console.error('Error syncing data:', error);
      setSyncMessage('❌ Error syncing data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const testAPIConnection = async (apiName: string) => {
    setSyncMessage(`Testing ${apiName}...`);

    try {
      const franchises = await canadianFranchiseAPI.searchAllAPIs({
        limit: 5
      });

      if (franchises.length > 0) {
        setSyncMessage(`✅ ${apiName} returned ${franchises.length} results`);
        await franchiseCacheService.saveFranchises(franchises, apiName.toLowerCase());
        await loadData();
      } else {
        setSyncMessage(`⚠️ ${apiName} returned no results. Check API keys.`);
      }

      setTimeout(() => setSyncMessage(''), 3000);
    } catch (error) {
      console.error(`Error testing ${apiName}:`, error);
      setSyncMessage(`❌ ${apiName} connection failed`);
      setTimeout(() => setSyncMessage(''), 3000);
    }
  };

  const cleanExpiredCache = async () => {
    setLoading(true);
    setSyncMessage('Cleaning expired cache entries...');

    try {
      const count = await franchiseCacheService.cleanExpiredCache();
      setSyncMessage(`🧹 Cleaned ${count} expired entries`);
      await loadData();

      setTimeout(() => setSyncMessage(''), 3000);
    } catch (error) {
      console.error('Error cleaning cache:', error);
      setSyncMessage('❌ Error cleaning cache');
    } finally {
      setLoading(false);
    }
  };

  const showScraperInfo = () => {
    setSyncMessage('Check browser console for scraper information...');
    franchiseScraperService.scrapePublicData('cfa');
    setTimeout(() => setSyncMessage(''), 3000);
  };

  const syncRealEstateListings = async () => {
    setLoading(true);
    setSyncMessage('Syncing real estate listings...');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/sync-real-estate?action=sync`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setSyncMessage(`✅ Synced: ${data.stats.added} added, ${data.stats.updated} updated, ${data.stats.skipped} skipped`);
        await loadRealEstateStatus();
      } else {
        setSyncMessage('❌ Sync failed. Check console for details.');
      }

      setTimeout(() => setSyncMessage(''), 5000);
    } catch (error) {
      console.error('Error syncing real estate:', error);
      setSyncMessage('❌ Error syncing real estate listings');
      setTimeout(() => setSyncMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const loadRealEstateStatus = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/sync-real-estate?action=status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setRealtimeStats(data);
      }
    } catch (error) {
      console.error('Error loading real estate status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Franchise API Manager</h1>
                <p className="text-blue-100 mt-1">Manage franchise data sources and cache</p>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-200">
            <div className="flex gap-1 px-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'apis', label: 'API Status' },
                { id: 'cache', label: 'Database Cache' },
                { id: 'real-estate', label: 'Real Estate Sync' },
                { id: 'scraper', label: 'Web Scraper' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {syncMessage && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
                {syncMessage}
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm font-medium">Total Franchises</p>
                        <p className="text-3xl font-bold text-blue-900 mt-2">{cacheStats?.total || 0}</p>
                      </div>
                      <TrendingUp className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm font-medium">Active Listings</p>
                        <p className="text-3xl font-bold text-green-900 mt-2">{cacheStats?.active || 0}</p>
                      </div>
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm font-medium">Industries</p>
                        <p className="text-3xl font-bold text-orange-900 mt-2">
                          {cacheStats ? Object.keys(cacheStats.byIndustry).length : 0}
                        </p>
                      </div>
                      <Database className="w-10 h-10 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={syncLocalDataToCache}
                      disabled={loading}
                      className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                      Sync Local Data to Database
                    </button>

                    <button
                      onClick={() => testAPIConnection('All APIs')}
                      disabled={loading}
                      className="flex items-center gap-3 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Download className="w-5 h-5" />
                      Test API Connections
                    </button>

                    <button
                      onClick={cleanExpiredCache}
                      disabled={loading}
                      className="flex items-center gap-3 px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                    >
                      <Database className="w-5 h-5" />
                      Clean Expired Cache
                    </button>

                    <button
                      onClick={loadData}
                      disabled={loading}
                      className="flex items-center gap-3 px-6 py-4 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                      Refresh Statistics
                    </button>
                  </div>
                </div>

                {cacheStats && Object.keys(cacheStats.byIndustry).length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Franchises by Industry</h3>
                    <div className="space-y-3">
                      {Object.entries(cacheStats.byIndustry).map(([industry, count]) => (
                        <div key={industry} className="flex items-center justify-between">
                          <span className="text-slate-700">{industry}</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'apis' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-2">API Setup Required</p>
                      <p>To enable API integrations, add your API keys to the .env file. See FRANCHISE_API_GUIDE.md for detailed instructions.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {apiStatuses.map((api, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {api.status === 'connected' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-slate-400" />
                          )}
                          <div>
                            <h3 className="font-bold text-slate-900">{api.name}</h3>
                            <p className="text-sm text-slate-600">
                              {api.status === 'connected' ? 'Connected' : 'Not Configured'}
                              {api.recordCount !== undefined && ` • ${api.recordCount} records`}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => testAPIConnection(api.name)}
                          disabled={loading || api.status === 'connected'}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          Test Connection
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cache' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Recent API Activity</h3>

                  {logs.length === 0 ? (
                    <p className="text-slate-600">No API activity logged yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Source</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Endpoint</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {logs.map((log, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="px-4 py-3 text-sm text-slate-900">{log.api_source}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{log.endpoint}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  log.status_code >= 200 && log.status_code < 300
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {log.status_code}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-slate-600">
                                {new Date(log.created_at).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {cacheStats && Object.keys(cacheStats.bySource).length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Data Sources</h3>
                    <div className="space-y-3">
                      {Object.entries(cacheStats.bySource).map(([source, count]) => (
                        <div key={source} className="flex items-center justify-between">
                          <span className="text-slate-700 capitalize">{source}</span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'real-estate' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-2">Real-Time Real Estate Listings</p>
                      <p>Automatically fetch and sync real estate listings every 3 hours. Manual sync available below.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {realtimeStats?.count || 0}
                    </div>
                    <div className="text-slate-600 text-sm">Total Listings</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">3hrs</div>
                    <div className="text-slate-600 text-sm">Auto-Sync Interval</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">API</div>
                    <div className="text-slate-600 text-sm">Data Source</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Manual Sync</h3>
                  <p className="text-slate-600 mb-4">
                    Click the button below to manually trigger a sync of real estate listings. This will fetch the latest listings and update the database.
                  </p>

                  <button
                    onClick={syncRealEstateListings}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? 'Syncing...' : 'Sync Real Estate Listings'}
                  </button>
                </div>

                {realtimeStats?.recent && realtimeStats.recent.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Listings</h3>
                    <div className="space-y-3">
                      {realtimeStats.recent.map((listing: any) => (
                        <div key={listing.id} className="flex justify-between items-start p-4 bg-slate-50 rounded-lg">
                          <div>
                            <div className="font-medium text-slate-900">{listing.title}</div>
                            <div className="text-sm text-slate-500">Updated: {new Date(listing.updated_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Setup Cron Job</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    To enable automatic syncing every 3 hours, refer to the CRON_SETUP.md file in your project root for detailed instructions.
                  </p>
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <code className="text-xs text-slate-700">
                      SELECT cron.schedule('sync-real-estate-listings', '0 */3 * * *', ...)
                    </code>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'scraper' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-2">Web Scraping Guidelines</p>
                      <p>Web scraping should be used as a last resort. Always prefer official API partnerships. Review FRANCHISE_API_GUIDE.md for ethical scraping practices.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Scraper Information</h3>
                  <p className="text-slate-600 mb-4">
                    The web scraper service provides information about scraping Canadian franchise data sources.
                    Click below to view scraping guidelines and source information in the browser console.
                  </p>

                  <button
                    onClick={showScraperInfo}
                    className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    View Scraper Information (Console)
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Recommended Approach</h3>
                  <ol className="list-decimal list-inside space-y-2 text-slate-700">
                    <li>Contact franchise data providers for official API access</li>
                    <li>Use FranChimp or FRANdata APIs for verified data</li>
                    <li>Partner with Canadian Franchise Association for premium data</li>
                    <li>Only consider web scraping with explicit permission</li>
                    <li>Always respect robots.txt and Terms of Service</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
