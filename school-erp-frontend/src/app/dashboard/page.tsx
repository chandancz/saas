'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Icon, ICONS } from '@/components/dashboard/Sidebar';

// ── mini charts ───────────────────────────────────────────────────────────────
function LineChart({ color }: { color: string }) {
  const pts = [20, 35, 28, 45, 38, 55, 48, 60, 52, 65, 58, 70, 65, 72];
  const w = 120, h = 48, max = Math.max(...pts), min = Math.min(...pts);
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - ((p - min) / (max - min)) * h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12">
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={path} />
    </svg>
  );
}

function BarChart() {
  const bars = [25, 35, 30, 50, 45, 55, 60, 75, 70, 80, 85, 90, 88, 95];
  const max = Math.max(...bars);
  return (
    <svg viewBox={`0 0 ${bars.length * 18} 100`} className="w-full h-28">
      {bars.map((b, i) => (
        <rect key={i} x={i * 18 + 2} y={100 - (b / max) * 100} width={14} height={(b / max) * 100} rx={3}
          fill="#818cf8" opacity={i >= bars.length - 4 ? 1 : 0.55} />
      ))}
    </svg>
  );
}

function RevenueChart() {
  const pts = [300, 450, 380, 520, 460, 580, 540, 600, 570, 620, 650, 680, 700, 720];
  const w = 400, h = 140, max = Math.max(...pts), min = Math.min(...pts);
  const coords = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - ((p - min) / (max - min)) * (h - 20) - 10}`);
  const lineD = `M ${coords.join(' L ')}`;
  const areaD = `M 0,${h} L ${coords.join(' L ')} L ${w},${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-36">
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#rg)" />
      <path d={lineD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => {
        const [x, y] = c.split(',');
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#6366f1" />;
      })}
    </svg>
  );
}

// ── static data ───────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Total Schools',   value: '1,284',  change: '+12.5%', up: true,  bg: 'bg-indigo-50', color: 'text-indigo-600', icon: ICONS.schools },
  { label: 'Active Schools',  value: '942',    change: '+8.2%',  up: true,  bg: 'bg-green-50',  color: 'text-green-600',  icon: ICONS.check },
  { label: 'Trial Schools',   value: '178',    change: '+5.4%',  up: true,  bg: 'bg-orange-50', color: 'text-orange-500', icon: ICONS.subscriptions },
  { label: 'Expired Schools', value: '164',    change: '+3.1%',  up: false, bg: 'bg-red-50',    color: 'text-red-500',    icon: ICONS.trash },
  { label: 'Total Students',  value: '425.6K', change: '+15.3%', up: true,  bg: 'bg-blue-50',   color: 'text-blue-600',   icon: ICONS.users },
  { label: 'Total Teachers',  value: '18.7K',  change: '+10.8%', up: true,  bg: 'bg-purple-50', color: 'text-purple-600', icon: ICONS.users },
];

const SCHOOLS = [
  { name: 'Greenfield International School', url: 'greenfield.edu.in',    date: 'May 26, 2025', status: 'Active' },
  { name: 'Sunrise Public School',           url: 'sunrisepublic.edu.in', date: 'May 25, 2025', status: 'Trial' },
  { name: 'City Montessori School',          url: 'cmsucknow.edu.in',     date: 'May 24, 2025', status: 'Active' },
  { name: 'Bright Future Academy',           url: 'brightfuture.edu.in',  date: 'May 23, 2025', status: 'Trial' },
];

const PAYMENTS = [
  { school: 'Greenfield International School', plan: 'Subscription – Pro Plan',   amount: '$3,200', status: 'Paid' },
  { school: 'Sunrise Public School',           plan: 'Subscription – Basic Plan', amount: '$1,200', status: 'Paid' },
  { school: 'City Montessori School',          plan: 'Subscription – Pro Plan',   amount: '$3,200', status: 'Paid' },
  { school: 'Bright Future Academy',           plan: 'Subscription – Basic Plan', amount: '$1,200', status: 'Paid' },
];

const ACTIVITIES = [
  { type: 'school',  text: 'New school Greenfield International School registered',           time: '10:24 AM',     color: 'bg-blue-100 text-blue-600' },
  { type: 'payment', text: 'Payment of $3,200 received from Greenfield International School', time: '09:41 AM',     color: 'bg-green-100 text-green-600' },
  { type: 'upgrade', text: 'School Sunrise Public School upgraded to Pro Plan',               time: 'Yesterday',    color: 'bg-orange-100 text-orange-500' },
  { type: 'user',    text: 'New admin user added in City Montessori School',                  time: 'Yesterday',    color: 'bg-purple-100 text-purple-600' },
  { type: 'support', text: 'Support ticket #SK-2456 resolved',                                time: 'May 24, 2025', color: 'bg-red-100 text-red-500' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, Super Admin!">
      <div className="p-4 sm:p-6 space-y-5">

        {/* Date range */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl px-4 h-9 shadow-sm hover:border-slate-300 transition-colors">
            <Icon d={ICONS.calendar} className="w-4 h-4 text-slate-400" />
            May 20 – May 26, 2025
            <Icon d={ICONS.chevronDown} className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-4 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-500">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon d={s.icon} className={`w-4 h-4 ${s.color}`} />
                </div>
              </div>
              <p className="text-xl font-extrabold text-slate-900">{s.value}</p>
              <div className="flex items-center gap-1">
                <svg className={`w-3 h-3 ${s.up ? 'text-green-500' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.up ? ICONS.arrowUp : ICONS.arrowDown} />
                </svg>
                <span className={`text-[11px] font-bold ${s.up ? 'text-green-600' : 'text-red-500'}`}>{s.change}</span>
                <span className="text-[10px] text-slate-400">vs last 30 days</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-800">Revenue Overview</h3>
              <button className="flex items-center gap-1 text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-3 h-7 hover:bg-slate-50">
                Last 30 Days <Icon d={ICONS.chevronDown} className="w-3 h-3" />
              </button>
            </div>
            <div className="mb-3">
              <span className="text-2xl font-extrabold text-slate-900">$2.4M</span>
              <span className="ml-2 text-xs font-bold text-green-600">↑ 16.3%</span>
              <span className="text-xs text-slate-400 ml-1">vs last 30 days</span>
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-slate-400 font-medium py-1">
                {['$3M','$2.4M','$1.8M','$1.2M','$600K','$0'].map(l => <span key={l}>{l}</span>)}
              </div>
              <div className="pl-12">
                <RevenueChart />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                  {['Apr 27','May 4','May 11','May 18','May 26'].map(l => <span key={l}>{l}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-800">School Growth</h3>
              <button className="flex items-center gap-1 text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-3 h-7 hover:bg-slate-50">
                Last 30 Days <Icon d={ICONS.chevronDown} className="w-3 h-3" />
              </button>
            </div>
            <div className="mb-3">
              <span className="text-2xl font-extrabold text-slate-900">+124</span>
              <span className="ml-2 text-xs font-bold text-green-600">↑ 14.2%</span>
              <span className="text-xs text-slate-400 ml-1">vs last 30 days</span>
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-slate-400 font-medium py-1">
                {['150','120','90','60','30','0'].map(l => <span key={l}>{l}</span>)}
              </div>
              <div className="pl-12">
                <BarChart />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                  {['Apr 27','May 4','May 11','May 18','May 26'].map(l => <span key={l}>{l}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI mini-cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-500 mb-1">Monthly Recurring Revenue</p>
            <p className="text-xl font-extrabold text-slate-900">$428,500</p>
            <span className="text-xs font-bold text-green-600">↑ 17.6%</span>
            <div className="mt-3"><LineChart color="#22c55e" /></div>
          </div>
          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-500 mb-1">Pending Payments</p>
            <p className="text-xl font-extrabold text-slate-900">$83,210</p>
            <span className="text-xs font-bold text-red-500">↑ 6.2%</span>
            <div className="mt-3"><LineChart color="#f97316" /></div>
          </div>
          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-slate-500">Storage Usage</p>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Icon d={ICONS.database} className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-extrabold text-slate-900">2.34 TB <span className="text-sm font-semibold text-slate-400">/ 10 TB</span></p>
            <div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-full w-[23%] rounded-full bg-blue-500" /></div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">23% used</p>
          </div>
          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-slate-500">Server Health</p>
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <Icon d={ICONS.shield} className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-extrabold text-green-600 mt-3">All Systems Operational</p>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold">100% Uptime</p>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Registrations */}
          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">Recent School Registrations</h3>
              <button className="text-xs text-blue-600 font-semibold hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {SCHOOLS.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    <Icon d={ICONS.schools} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{s.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{s.url}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] text-slate-400">{s.date}</p>
                    <span className={`inline-block mt-0.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">Recent Payments</h3>
              <button className="text-xs text-blue-600 font-semibold hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {PAYMENTS.map((p, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Icon d={ICONS.payments} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{p.school}</p>
                    <p className="text-[10px] text-slate-400 truncate">{p.plan}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-extrabold text-slate-800">{p.amount}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Paid</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-[#2a2d3a] shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">Recent Activities</h3>
              <button className="text-xs text-blue-600 font-semibold hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                  <div className={`w-7 h-7 rounded-lg ${a.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon d={
                      a.type === 'school' ? ICONS.schools : a.type === 'payment' ? ICONS.payments :
                      a.type === 'upgrade' ? ICONS.arrowUp : a.type === 'user' ? ICONS.users : ICONS.support
                    } className="w-3.5 h-3.5" />
                  </div>
                  <p className="flex-1 text-[11px] text-slate-700 font-medium leading-snug">{a.text}</p>
                  <span className="text-[10px] text-slate-400 flex-shrink-0 whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
