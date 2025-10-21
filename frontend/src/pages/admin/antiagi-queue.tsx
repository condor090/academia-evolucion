import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface Lead {
  id: string;
  timestamp: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  cargo: string;
  industria: string;
  tamano: string;
  urgencia: string;
  status: 'pending' | 'in_progress' | 'completed';
  auditoria_enviada?: string;
  notas?: string;
}

export default function AntiAGIQueue() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'urgency'>('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const response = await fetch('/api/antiagi/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, status: Lead['status'], notas?: string) => {
    try {
      const response = await fetch('/api/antiagi/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status, notas })
      });

      if (response.ok) {
        await loadLeads();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Timestamp', 'Nombre', 'Email', 'Teléfono', 'Empresa', 'Cargo', 'Industria', 'Tamaño', 'Urgencia', 'Status', 'Notas'];
    const rows = filteredLeads.map(lead => [
      lead.id,
      new Date(lead.timestamp).toLocaleString(),
      lead.nombre,
      lead.email,
      lead.telefono,
      lead.empresa,
      lead.cargo,
      lead.industria,
      lead.tamano,
      lead.urgencia,
      lead.status,
      lead.notas || ''
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `antiagi-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getFilteredLeads = () => {
    let filtered = leads;

    if (filter !== 'all') {
      filtered = filtered.filter(lead => lead.status === filter);
    }

    // Ordenar
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else {
        // Por urgencia
        const urgencyOrder = { critica: 0, alta: 1, media: 2, baja: 3 };
        return urgencyOrder[a.urgencia as keyof typeof urgencyOrder] - urgencyOrder[b.urgencia as keyof typeof urgencyOrder];
      }
    });

    return filtered;
  };

  const filteredLeads = getFilteredLeads();

  const stats = {
    total: leads.length,
    pending: leads.filter(l => l.status === 'pending').length,
    in_progress: leads.filter(l => l.status === 'in_progress').length,
    completed: leads.filter(l => l.status === 'completed').length,
    critica: leads.filter(l => l.urgencia === 'critica').length,
    alta: leads.filter(l => l.urgencia === 'alta').length
  };

  const getUrgencyColor = (urgencia: string) => {
    switch (urgencia) {
      case 'critica': return 'bg-red-100 text-red-800 border-red-300';
      case 'alta': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'baja': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in_progress': return 'En Progreso';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando leads...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin - Cola de Auditorías Anti-AGI</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cola de Auditorías Anti-AGI</h1>
                <p className="text-gray-600 mt-1">Gestión de leads y seguimiento de auditorías</p>
              </div>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar CSV
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Leads</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-900">{stats.pending}</div>
              <div className="text-sm text-blue-700">Pendientes</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-900">{stats.in_progress}</div>
              <div className="text-sm text-purple-700">En Progreso</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
              <div className="text-sm text-green-700">Completadas</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="text-2xl font-bold text-red-900">{stats.critica}</div>
              <div className="text-sm text-red-700">Críticas 🔴</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="text-2xl font-bold text-orange-900">{stats.alta}</div>
              <div className="text-sm text-orange-700">Urgencia Alta 🟠</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Estado</label>
                <div className="flex gap-2">
                  {(['all', 'pending', 'in_progress', 'completed'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filter === status
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'all' ? 'Todos' : getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Más recientes</option>
                  <option value="oldest">Más antiguos</option>
                  <option value="urgency">Por urgencia</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID / Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Urgencia</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-gray-900">{lead.id}</div>
                        <div className="text-xs text-gray-500">{new Date(lead.timestamp).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{lead.nombre}</div>
                        <div className="text-xs text-gray-600">{lead.cargo}</div>
                        <div className="text-xs text-blue-600">{lead.email}</div>
                        <div className="text-xs text-gray-500">{lead.telefono}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{lead.empresa}</div>
                        <div className="text-xs text-gray-500">{lead.tamano} empleados</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {lead.industria}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getUrgencyColor(lead.urgencia)}`}>
                          {lead.urgencia === 'critica' && '🔴'}
                          {lead.urgencia === 'alta' && '🟠'}
                          {lead.urgencia === 'media' && '🟡'}
                          {lead.urgencia === 'baja' && '🟢'}
                          {' '}{lead.urgencia.charAt(0).toUpperCase() + lead.urgencia.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(lead.status)}`}>
                          {getStatusLabel(lead.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="in_progress">En Progreso</option>
                          <option value="completed">Completada</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No hay leads que coincidan con los filtros
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}