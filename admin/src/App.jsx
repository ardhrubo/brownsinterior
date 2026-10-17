import React, { useState, useEffect, useMemo } from 'react';
import {
  Inbox,
  Search,
  RefreshCw,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Trash2,
  LogOut,
  Lock,
  Database,
  Sparkles,
  MessageSquare,
  ExternalLink,
  Layers,
  Maximize2,
  Wallet,
} from 'lucide-react';
import {
  supabase,
  isSupabaseConfigured,
  ADMIN_PASSCODE,
  fetchInquiries,
  updateInquiryRecord,
  deleteInquiryRecord,
} from './lib/supabase';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New Inquiry', color: 'amber' },
  { value: 'contacted', label: 'Contacted', color: 'blue' },
  { value: 'site_visit', label: 'Site Visit', color: 'purple' },
  { value: 'quoted', label: 'BOQ Quoted', color: 'indigo' },
  { value: 'won', label: 'Project Won', color: 'emerald' },
  { value: 'archived', label: 'Archived', color: 'slate' },
];

const CATEGORIES = [
  'All Categories',
  'Interior Design',
  'Architecture',
  'Engineering',
  'Renovation & Remodeling',
  'Exhibition & Trade Show Booth Design',
  'Project Management',
  'Additional Services',
];

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem('browns_admin_auth') === 'true';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [notesDraft, setNotesDraft] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await fetchInquiries();
      setInquiries(list);
      if (list.length > 0 && !selectedId) {
        setSelectedId(list[0].id);
        setNotesDraft(list[0].admin_notes || '');
      }
    } catch (err) {
      showToast(`Error loading inquiries: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    loadData();

    // Subscribe to live Supabase Realtime inserts/updates if configured
    if (supabase) {
      const channel = supabase
        .channel('admin-inquiries-feed')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'inquiries' },
          () => {
            loadData();
            showToast('Live update received from Supabase!');
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [authenticated]);

  const selectedInquiry = useMemo(
    () => inquiries.find((item) => item.id === selectedId) || null,
    [inquiries, selectedId]
  );

  useEffect(() => {
    if (selectedInquiry) {
      setNotesDraft(selectedInquiry.admin_notes || '');
    }
  }, [selectedInquiry?.id]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (
        categoryFilter !== 'All Categories' &&
        item.service_category !== categoryFilter
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = [
          item.name,
          item.email,
          item.phone,
          item.service_category,
          item.sub_service,
          item.location,
          item.message,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [inquiries, statusFilter, categoryFilter, searchQuery]);

  const kpis = useMemo(() => {
    return {
      total: inquiries.length,
      newCount: inquiries.filter((i) => i.status === 'new').length,
      activeCount: inquiries.filter((i) =>
        ['contacted', 'site_visit', 'quoted'].includes(i.status)
      ).length,
      wonCount: inquiries.filter((i) => i.status === 'won').length,
    };
  }, [inquiries]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcodeInput === ADMIN_PASSCODE) {
      sessionStorage.setItem('browns_admin_auth', 'true');
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid admin passcode. Default is browns2026');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('browns_admin_auth');
    setAuthenticated(false);
    setPasscodeInput('');
  };

  const handleStatusChange = async (id, nextStatus) => {
    try {
      const updated = await updateInquiryRecord(id, { status: nextStatus });
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
      );
      showToast(`Status updated to "${nextStatus.replace('_', ' ')}"`);
    } catch (err) {
      showToast(`Failed to update status: ${err.message}`);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const updated = await updateInquiryRecord(selectedInquiry.id, {
        admin_notes: notesDraft,
      });
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === selectedInquiry.id ? { ...item, ...updated } : item
        )
      );
      showToast('Admin notes saved.');
    } catch (err) {
      showToast(`Failed to save notes: ${err.message}`);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await deleteInquiryRecord(id);
      const remaining = inquiries.filter((item) => item.id !== id);
      setInquiries(remaining);
      if (selectedId === id) {
        setSelectedId(remaining[0]?.id || null);
      }
      showToast('Inquiry deleted.');
    } catch (err) {
      showToast(`Failed to delete: ${err.message}`);
    }
  };

  const exportCsv = () => {
    const headers = [
      'Date',
      'Name',
      'Phone',
      'Email',
      'Category',
      'Sub-Service',
      'Location',
      'Area (sq ft)',
      'Estimated Budget',
      'Status',
      'Message',
      'Admin Notes',
    ];
    const rows = filteredInquiries.map((i) => [
      new Date(i.created_at).toLocaleString(),
      i.name,
      i.phone,
      i.email,
      i.service_category,
      i.sub_service || '',
      i.location || '',
      i.area_sqft || '',
      i.estimated_budget || '',
      i.status,
      (i.message || '').replace(/\n/g, ' '),
      (i.admin_notes || '').replace(/\n/g, ' '),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows]
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        )
        .join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `browns-interior-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  if (!authenticated) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="login-brand">
            <span className="brand-badge">ADMIN PORTAL</span>
            <h1>Brown's Interior</h1>
            <p>Lead &amp; Consultation Management System</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="admin-passcode">
              <Lock size={15} /> Enter Studio Admin Passcode
            </label>
            <input
              id="admin-passcode"
              type="password"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              placeholder="Enter passcode (default: browns2026)"
              autoFocus
            />
            {authError && <div className="login-error">{authError}</div>}
            <button type="submit" className="btn-primary full">
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="login-hint">
            <span>Default Passcode: <code>browns2026</code></span>
            <span>Set <code>VITE_ADMIN_PASSCODE</code> in <code>admin/.env</code> to customize.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Top Navbar */}
      <header className="admin-header">
        <div className="admin-header-left">
          <div className="admin-logo-mark">B</div>
          <div>
            <h1>Brown's Interior — Admin</h1>
            <span className="admin-sub">Form Submissions &amp; Lead Tracker</span>
          </div>
        </div>

        <div className="admin-header-right">
          <div className={`db-pill ${isSupabaseConfigured ? 'live' : 'demo'}`}>
            <Database size={14} />
            <span>
              {isSupabaseConfigured
                ? 'Supabase Connected (Live)'
                : 'Preview Mode (Add Supabase Keys in .env)'}
            </span>
          </div>

          <button type="button" className="btn-ghost" onClick={loadData} title="Refresh">
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>

          <button type="button" className="btn-ghost" onClick={exportCsv}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>

          <button type="button" className="btn-ghost danger" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {toast && <div className="admin-toast">{toast}</div>}

      <main className="admin-main">
        {/* KPI Row */}
        <section className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon gold"><Inbox size={20} /></div>
            <div>
              <span>Total Submissions</span>
              <strong>{kpis.total}</strong>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon amber"><Sparkles size={20} /></div>
            <div>
              <span>New / Unread Leads</span>
              <strong>{kpis.newCount}</strong>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon blue"><Clock size={20} /></div>
            <div>
              <span>In Progress / Quoted</span>
              <strong>{kpis.activeCount}</strong>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon emerald"><CheckCircle2 size={20} /></div>
            <div>
              <span>Projects Won</span>
              <strong>{kpis.wonCount}</strong>
            </div>
          </div>
        </section>

        {/* Filter & Search Toolbar */}
        <section className="toolbar-bar">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, phone, email, location, or service..."
            />
          </div>

          <div className="filter-group">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by service category"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="status-tabs">
              <button
                type="button"
                className={statusFilter === 'all' ? 'active' : ''}
                onClick={() => setStatusFilter('all')}
              >
                All ({inquiries.length})
              </button>
              {STATUS_OPTIONS.map((st) => (
                <button
                  key={st.value}
                  type="button"
                  className={statusFilter === st.value ? 'active' : ''}
                  onClick={() => setStatusFilter(st.value)}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Master-Detail Workspace */}
        <section className="workspace-split">
          {/* Left: Submissions List */}
          <div className="submissions-list-panel">
            {loading ? (
              <div className="empty-state">Loading form submissions...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="empty-state">
                No inquiries match your current filters.
              </div>
            ) : (
              filteredInquiries.map((item) => {
                const stObj =
                  STATUS_OPTIONS.find((s) => s.value === item.status) ||
                  STATUS_OPTIONS[0];
                const isSelected = item.id === selectedInquiry?.id;
                return (
                  <article
                    key={item.id}
                    className={`submission-row ${isSelected ? 'selected' : ''} ${
                      item.status === 'new' ? 'unread' : ''
                    }`}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <div className="sub-row-top">
                      <strong>{item.name}</strong>
                      <span className={`status-badge ${stObj.color}`}>
                        {stObj.label}
                      </span>
                    </div>

                    <div className="sub-row-service">
                      <Layers size={13} />
                      <span>
                        {item.service_category}
                        {item.sub_service ? ` → ${item.sub_service}` : ''}
                      </span>
                    </div>

                    <p className="sub-row-excerpt">{item.message}</p>

                    <div className="sub-row-meta">
                      <span>
                        <Phone size={12} /> {item.phone}
                      </span>
                      {item.location && (
                        <span>
                          <MapPin size={12} /> {item.location}
                        </span>
                      )}
                      <span>
                        <Calendar size={12} />{' '}
                        {new Date(item.created_at).toLocaleDateString('en-BD', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Right: Full Inquiry Inspector */}
          <aside className="inspector-panel">
            {!selectedInquiry ? (
              <div className="empty-state">
                Select an inquiry from the list to inspect full project details.
              </div>
            ) : (
              <div className="inspector-content">
                <div className="inspector-head">
                  <div>
                    <span className="inspector-source">
                      {selectedInquiry.source === 'cost_calculator_quote'
                        ? 'Submitted via Cost Calculator'
                        : 'Submitted via Website Contact Form'}
                    </span>
                    <h2>{selectedInquiry.name}</h2>
                    <span className="inspector-date">
                      Received on{' '}
                      {new Date(selectedInquiry.created_at).toLocaleString('en-BD')}
                    </span>
                  </div>

                  <div className="inspector-status-control">
                    <label htmlFor="status-select">Lead Status</label>
                    <select
                      id="status-select"
                      value={selectedInquiry.status}
                      onChange={(e) =>
                        handleStatusChange(selectedInquiry.id, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st.value} value={st.value}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Contact Action Bar */}
                <div className="quick-actions-row">
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="action-chip"
                  >
                    <Phone size={15} /> Call {selectedInquiry.phone}
                  </a>
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action-chip whatsapp"
                  >
                    <MessageSquare size={15} /> WhatsApp Client
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                      `Re: Your Inquiry with Brown's Interior (${selectedInquiry.service_category})`
                    )}`}
                    className="action-chip"
                  >
                    <Mail size={15} /> Email Reply
                  </a>
                </div>

                {/* Project Specifications Grid */}
                <div className="specs-box-grid">
                  <div className="spec-cell">
                    <span>Service Category</span>
                    <strong>{selectedInquiry.service_category}</strong>
                  </div>
                  <div className="spec-cell">
                    <span>Specialized Service</span>
                    <strong>
                      {selectedInquiry.sub_service || 'General Category Inquiry'}
                    </strong>
                  </div>
                  <div className="spec-cell">
                    <span>
                      <MapPin size={12} /> Project Location
                    </span>
                    <strong>{selectedInquiry.location || 'Not specified'}</strong>
                  </div>
                  <div className="spec-cell">
                    <span>
                      <Maximize2 size={12} /> Approx. Area
                    </span>
                    <strong>
                      {selectedInquiry.area_sqft
                        ? `${selectedInquiry.area_sqft} sq ft`
                        : 'Not specified'}
                    </strong>
                  </div>
                  <div className="spec-cell wide">
                    <span>
                      <Wallet size={12} /> Target / Calculated Budget
                    </span>
                    <strong className="gold-text">
                      {selectedInquiry.estimated_budget || 'Requested Custom BOQ'}
                    </strong>
                  </div>
                </div>

                {/* Client Message */}
                <div className="inspector-block">
                  <h3>
                    <FileText size={15} /> Project Details &amp; Client Message
                  </h3>
                  <div className="message-body">{selectedInquiry.message}</div>
                </div>

                {/* Internal Studio Notes */}
                <div className="inspector-block">
                  <h3>Internal Studio Notes (Engr. Aslam &amp; Team)</h3>
                  <textarea
                    rows="3"
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Add call notes, site visit date, assigned architect, or BOQ follow-up details..."
                  />
                  <div className="inspector-footer-actions">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                    >
                      {savingNotes ? 'Saving...' : 'Save Studio Notes'}
                    </button>

                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDelete(selectedInquiry.id)}
                    >
                      <Trash2 size={15} /> Delete Inquiry
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}
