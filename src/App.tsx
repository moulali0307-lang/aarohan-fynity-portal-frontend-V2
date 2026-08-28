import React, { useMemo, useState } from "react";
import {
  LayoutDashboard, BookOpen, CalendarDays, Users, ClipboardCheck, FileBarChart,
  BarChart3, Settings, LogOut, Search, Bell, ChevronDown, Menu, X, Plus,
  GraduationCap, Clock3, TrendingUp, CheckCircle2, AlertCircle, Moon, Sun,
  ShieldCheck, UserRound, Presentation, FileText, ArrowRight, Sparkles
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, PieChart, Pie, Cell
} from "recharts";
import "./styles.css";

type Role = "Super Admin" | "Program Manager" | "Student";
type Page =
  | "Dashboard" | "Programs" | "Program Details" | "Curriculum" | "Schedule"
  | "Sessions" | "Students" | "Student Profile" | "Attendance" | "Daily Tests"
  | "Weekly Tests" | "Analytics" | "Reports" | "Settings";

const navByRole: Record<Role, { label: string; icon: React.ElementType; page: Page }[]> = {
  "Super Admin": [
    { label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
    { label: "Programs", icon: BookOpen, page: "Programs" },
    { label: "Students", icon: Users, page: "Students" },
    { label: "Attendance", icon: ClipboardCheck, page: "Attendance" },
    { label: "Analytics", icon: BarChart3, page: "Analytics" },
    { label: "Reports", icon: FileBarChart, page: "Reports" },
    { label: "Settings", icon: Settings, page: "Settings" },
  ],
  "Program Manager": [
    { label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
    { label: "Programs", icon: BookOpen, page: "Programs" },
    { label: "Curriculum", icon: GraduationCap, page: "Curriculum" },
    { label: "Schedule", icon: CalendarDays, page: "Schedule" },
    { label: "Sessions", icon: Presentation, page: "Sessions" },
    { label: "Students", icon: Users, page: "Students" },
    { label: "Attendance", icon: ClipboardCheck, page: "Attendance" },
    { label: "Daily Tests", icon: FileText, page: "Daily Tests" },
    { label: "Weekly Tests", icon: FileText, page: "Weekly Tests" },
    { label: "Reports", icon: FileBarChart, page: "Reports" },
  ],
  Student: [
    { label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
    { label: "My Program", icon: BookOpen, page: "Program Details" },
    { label: "Schedule", icon: CalendarDays, page: "Schedule" },
    { label: "Attendance", icon: ClipboardCheck, page: "Attendance" },
    { label: "Daily Tests", icon: FileText, page: "Daily Tests" },
    { label: "Weekly Tests", icon: FileText, page: "Weekly Tests" },
    { label: "My Performance", icon: TrendingUp, page: "Student Profile" },
  ],
};

const students = [
  ["Aarav Kumar", "AI Fellowship", "96%", "88%", "Active"],
  ["Meghana Reddy", "Full Stack", "93%", "91%", "Active"],
  ["Rahul Naik", "MERN Stack", "89%", "84%", "Active"],
  ["Sneha Devi", "Data Analytics", "97%", "94%", "Active"],
  ["Vikram Rao", "AI Fellowship", "86%", "79%", "Needs attention"],
];

const attendanceData = [
  { day: "Mon", value: 94 }, { day: "Tue", value: 91 }, { day: "Wed", value: 96 },
  { day: "Thu", value: 88 }, { day: "Fri", value: 93 }, { day: "Sat", value: 90 },
];

const performanceData = [
  { week: "W1", daily: 72, weekly: 78 }, { week: "W2", daily: 79, weekly: 81 },
  { week: "W3", daily: 84, weekly: 86 }, { week: "W4", daily: 88, weekly: 91 },
];

const COLORS = ["#0f6b45", "#f59e0b", "#7c3aed"];

function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("Super Admin");
  return (
    <div className="login-page">
      <div className="login-art">
        <div className="login-overlay" />
        <div className="login-copy">
          <span className="eyebrow"><Sparkles size={15}/> AI Fellowship Program</span>
          <h1>Empowering talent.<br/><span>Elevating futures.</span></h1>
          <p>A premium training operations workspace for AAROHAN (Fynity), built around programs, learning outcomes and student performance.</p>
          <div className="login-stats">
            <div><b>04</b><span>Programs</span></div>
            <div><b>120+</b><span>Learners</span></div>
            <div><b>94%</b><span>Avg. attendance</span></div>
          </div>
        </div>
      </div>
      <div className="login-panel">
        <div className="login-brand">
          <img src="/aarohan-logo.png" alt="AAROHAN" />
          <div><b>AAROHAN</b><span>Fynity • Training Portal</span></div>
        </div>
        <div className="login-content">
          <span className="login-kicker">WELCOME BACK</span>
          <h2>Sign in to your workspace</h2>
          <p>Choose a demo role to explore the frontend experience.</p>

          <label>Email address</label>
          <div className="input"><UserRound size={18}/><input value="demo@aarohan.fynity" readOnly /></div>
          <label>Password</label>
          <div className="input"><ShieldCheck size={18}/><input value="••••••••••" type="password" readOnly /></div>

          <label>Demo role</label>
          <div className="role-grid">
            {(["Super Admin", "Program Manager", "Student"] as Role[]).map(r => (
              <button className={role === r ? "role-card active" : "role-card"} onClick={() => setRole(r)} key={r}>
                <span>{r === "Super Admin" ? <ShieldCheck/> : r === "Program Manager" ? <Presentation/> : <GraduationCap/>}</span>
                <b>{r}</b>
              </button>
            ))}
          </div>
          <button className="primary login-btn" onClick={() => onLogin(role)}>Enter {role} Workspace <ArrowRight size={18}/></button>
          <small className="demo-note">Frontend demo • No real authentication or API connection</small>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ role, page, setPage, onLogout, mobileOpen, setMobileOpen }: any) {
  return <aside className={mobileOpen ? "sidebar open" : "sidebar"}>
    <div className="brand">
      <img src="/aarohan-logo.png" alt="AAROHAN" />
      <div><strong>AAROHAN</strong><span>FYNITY PORTAL</span></div>
      <button className="mobile-close" onClick={() => setMobileOpen(false)}><X/></button>
    </div>
    <div className="workspace"><span className="live-dot"/> {role} workspace</div>
    <nav>
      {navByRole[role].map(({label, icon: Icon, page: target}) => (
        <button key={label} className={page === target ? "nav-item active" : "nav-item"} onClick={() => {setPage(target); setMobileOpen(false)}}>
          <Icon size={18}/><span>{label}</span>
          {page === target && <i/>}
        </button>
      ))}
    </nav>
    <div className="sidebar-bottom">
      <div className="help-card"><div className="help-icon"><Sparkles size={16}/></div><b>Fynity Insight</b><p>Track learning momentum across every cohort.</p></div>
      <button className="logout" onClick={onLogout}><LogOut size={18}/> Sign out</button>
    </div>
  </aside>
}

function Header({ role, page, onMenu, dark, setDark }: any) {
  return <header className="header">
    <div className="header-left"><button className="menu-btn" onClick={onMenu}><Menu/></button><div><span className="breadcrumb">Workspace /</span><h1>{page}</h1></div></div>
    <div className="header-actions">
      <div className="search"><Search size={17}/><input placeholder="Search anything..." /></div>
      <button className="icon-btn" onClick={() => alert("No new notifications in demo.")}><Bell size={19}/><em>3</em></button>
      <button className="icon-btn" onClick={() => setDark(!dark)}>{dark ? <Sun size={19}/> : <Moon size={19}/>}</button>
      <div className="profile-chip"><div className="avatar">{role[0]}</div><div><b>{role}</b><span>Demo account</span></div><ChevronDown size={15}/></div>
    </div>
  </header>
}

function StatCard({ title, value, note, icon: Icon, tone }: any) {
  return <div className={`stat-card ${tone}`}>
    <div className="stat-top"><span>{title}</span><div className="stat-icon"><Icon size={19}/></div></div>
    <strong>{value}</strong><p><span className="up">↗ {note}</span> vs last month</p>
  </div>
}

function Dashboard({ role, setPage }: any) {
  return <div className="page">
    <section className="hero">
      <div><span className="eyebrow dark"><Sparkles size={15}/> AAROHAN • FYNITY</span><h2>Good morning, {role === "Student" ? "Learner" : role === "Program Manager" ? "Manager" : "Admin"} 👋</h2><p>Here’s your learning and training operations snapshot for August 2026.</p></div>
      <button className="primary" onClick={() => setPage(role === "Student" ? "Schedule" : "Programs")}><Plus size={18}/> {role === "Student" ? "View Schedule" : "Manage Programs"}</button>
    </section>
    <div className="stats-grid">
      <StatCard title={role === "Student" ? "My Attendance" : "Total Students"} value={role === "Student" ? "94.2%" : "120"} note="+8.4%" icon={Users} tone="green"/>
      <StatCard title={role === "Student" ? "Daily Test Avg." : "Active Programs"} value={role === "Student" ? "88.6%" : "04"} note="+5.2%" icon={BookOpen} tone="purple"/>
      <StatCard title={role === "Student" ? "Weekly Test Avg." : "Sessions This Month"} value={role === "Student" ? "91.0%" : "96"} note="+7.1%" icon={ClipboardCheck} tone="orange"/>
      <StatCard title="Completion Rate" value="92.8%" note="+3.6%" icon={TrendingUp} tone="blue"/>
    </div>
    <div className="dashboard-grid">
      <div className="card chart-card large"><div className="card-head"><div><h3>Attendance trend</h3><p>Average attendance across active cohorts</p></div><span className="select">Last 7 days <ChevronDown size={14}/></span></div>
        <ResponsiveContainer width="100%" height={275}><AreaChart data={attendanceData}><defs><linearGradient id="att" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0f6b45" stopOpacity={.28}/><stop offset="100%" stopColor="#0f6b45" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false}/><YAxis domain={[70,100]} axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="value" stroke="#0f6b45" strokeWidth={3} fill="url(#att)"/></AreaChart></ResponsiveContainer>
      </div>
      <div className="card"><div className="card-head"><div><h3>Program performance</h3><p>Average test scores</p></div></div><ResponsiveContainer width="100%" height={275}><BarChart data={performanceData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="week" axisLine={false} tickLine={false}/><YAxis domain={[50,100]} axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="daily" fill="#7c3aed" radius={[6,6,0,0]}/><Bar dataKey="weekly" fill="#f59e0b" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
    </div>
    <div className="bottom-grid">
      <div className="card"><div className="card-head"><div><h3>Students needing attention</h3><p>Attendance or performance below target</p></div><button className="text-btn" onClick={() => setPage("Students")}>View all</button></div>
        <div className="attention-list">{students.filter(s => s[4] !== "Active").concat(students.slice(0,2)).map((s,i)=><div className="attention" key={i}><div className="avatar warm">{s[0].split(" ").map(x=>x[0]).join("")}</div><div><b>{s[0]}</b><span>{s[1]} • {s[2]} attendance</span></div><AlertCircle size={18}/></div>)}</div>
      </div>
      <div className="card"><div className="card-head"><div><h3>Today’s sessions</h3><p>Upcoming training schedule</p></div><button className="text-btn" onClick={() => setPage("Schedule")}>Calendar</button></div>
        {["09:30 AM — AI Fundamentals","11:00 AM — React & TypeScript","02:00 PM — Data Analytics"].map((x,i)=><div className="session-row" key={x}><span className={`session-dot c${i}`}/><div><b>{x}</b><span>{["AI Fellowship","Full Stack","Data Analytics"][i]} • Room {101+i}</span></div><Clock3 size={16}/></div>)}
      </div>
    </div>
  </div>
}

function Programs({ setPage }: any) {
  const programs = [
    ["AI Fellowship Program","AI • 12 weeks","32 students","94%","Active","green"],
    ["MERN Stack Engineering","MERN • 16 weeks","28 students","91%","Active","purple"],
    ["Full Stack Development","Full Stack • 20 weeks","34 students","89%","Active","orange"],
    ["Data Analytics","Analytics • 12 weeks","26 students","96%","Active","blue"],
  ];
  return <div className="page"><div className="page-title"><div><span className="eyebrow">PROGRAM OPERATIONS</span><h2>Programs</h2><p>Manage cohorts, curriculum and delivery performance.</p></div><button className="primary" onClick={() => alert("Create Program modal — frontend demo")}><Plus size={18}/> New Program</button></div>
    <div className="filterbar"><div className="search wide"><Search size={17}/><input placeholder="Search programs..." /></div><button className="filter">All statuses <ChevronDown size={15}/></button><button className="filter">Sort: Recent <ChevronDown size={15}/></button></div>
    <div className="program-grid">{programs.map((p,i)=><div className={`program-card ${p[5]}`} key={p[0]} onClick={() => setPage("Program Details")}><div className="program-icon"><BookOpen size={22}/></div><span className="status active">{p[4]}</span><h3>{p[0]}</h3><p>{p[1]}</p><div className="progress-label"><span>Attendance</span><b>{p[3]}</b></div><div className="progress"><i style={{width:p[3]}}/></div><div className="program-meta"><span><Users size={15}/> {p[2]}</span><span>12 / 16 weeks</span></div><button className="outline">Open program <ArrowRight size={16}/></button></div>)}</div>
  </div>
}

function Students({ setPage }: any) {
  return <div className="page"><div className="page-title"><div><span className="eyebrow">LEARNER MANAGEMENT</span><h2>Students</h2><p>Track learner participation and performance across programs.</p></div><button className="primary" onClick={() => alert("Add student modal — frontend demo")}><Plus size={18}/> Add Student</button></div>
    <div className="card table-card"><div className="table-toolbar"><div className="search"><Search size={17}/><input placeholder="Search students..." /></div><button className="filter">All programs <ChevronDown size={15}/></button><button className="filter">Export <FileBarChart size={15}/></button></div>
      <div className="table-wrap"><table><thead><tr><th>Student</th><th>Program</th><th>Attendance</th><th>Performance</th><th>Status</th><th></th></tr></thead><tbody>{students.map((s,i)=><tr key={s[0]} onClick={() => setPage("Student Profile")}><td><div className="person"><div className="avatar">{s[0].split(" ").map(x=>x[0]).join("")}</div><div><b>{s[0]}</b><span>STU-2026-{100+i}</span></div></div></td><td>{s[1]}</td><td><b>{s[2]}</b></td><td><span className="score">{s[3]}</span></td><td><span className={s[4] === "Active" ? "status active" : "status warn"}>{s[4]}</span></td><td><ChevronDown size={16} className="rotate"/></td></tr>)}</tbody></table></div>
    </div>
  </div>
}

function ProgramDetails({ setPage }: any) {
  return <div className="page"><div className="detail-banner"><div className="program-icon big"><BookOpen size={30}/></div><div><span className="status active">ACTIVE PROGRAM</span><h2>AI Fellowship Program</h2><p>12-week AI and software engineering fellowship • Cohort 01</p></div><div className="banner-actions"><button className="outline" onClick={() => setPage("Curriculum")}>Curriculum</button><button className="primary" onClick={() => setPage("Schedule")}>View Schedule</button></div></div>
    <div className="stats-grid compact"><StatCard title="Students" value="32" note="+4" icon={Users} tone="green"/><StatCard title="Attendance" value="94%" note="+2.1%" icon={ClipboardCheck} tone="purple"/><StatCard title="Daily Avg." value="88%" note="+4.8%" icon={FileText} tone="orange"/><StatCard title="Completion" value="92%" note="+6%" icon={CheckCircle2} tone="blue"/></div>
    <div className="content-grid"><div className="card"><div className="card-head"><div><h3>Program journey</h3><p>Week-by-week curriculum progress</p></div></div>{["Foundation & AI mindset","Python & Data Foundations","Machine Learning Essentials","Generative AI & LLMs","Capstone & Demo Day"].map((x,i)=><div className="timeline" key={x}><div className={`timeline-dot ${i<3?"done":""}`}>{i<3?<CheckCircle2 size={15}/>:i+1}</div><div><b>Week {i*2+1}–{i*2+2} · {x}</b><span>{i<3?"Completed":"Upcoming"} • {i<3?"16":"8"} sessions</span></div><div className="timeline-line"/></div>)}</div>
      <div className="card"><div className="card-head"><div><h3>Program snapshot</h3><p>Current delivery status</p></div></div><div className="snapshot"><span>Curriculum completion</span><b>76%</b><div className="progress"><i style={{width:"76%"}}/></div></div><div className="snapshot"><span>Sessions conducted</span><b>42 / 48</b><div className="progress purple"><i style={{width:"87%"}}/></div></div><div className="snapshot"><span>Weekly test pass rate</span><b>91%</b><div className="progress orange"><i style={{width:"91%"}}/></div></div><button className="outline full" onClick={() => setPage("Analytics")}>Open analytics <ArrowRight size={16}/></button></div>
    </div>
  </div>
}

function Schedule() {
  const days = ["Mon 24","Tue 25","Wed 26","Thu 27","Fri 28","Sat 29","Sun 30"];
  return <div className="page"><div className="page-title"><div><span className="eyebrow">DELIVERY PLANNING</span><h2>Schedule</h2><p>Plan and review sessions across the training calendar.</p></div><button className="primary" onClick={() => alert("Schedule session modal — frontend demo")}><Plus size={18}/> Schedule Session</button></div>
    <div className="calendar-head"><button className="outline">‹</button><h3>August 24 – 30, 2026</h3><button className="outline">›</button><button className="filter">Today</button><button className="filter">Week <ChevronDown size={14}/></button></div>
    <div className="calendar">{days.map((d,di)=><div className="day" key={d}><div className={di===4?"day-head today":"day-head"}><span>{d.split(" ")[0]}</span><b>{d.split(" ")[1]}</b></div>{di<6 && [0,1].slice(0,di===5?1:2).map((_,i)=><div className={`event e${(di+i)%4}`} key={i}><b>{["AI Fundamentals","React & TypeScript","Data Analytics","Python Lab"][di%4]}</b><span>{i?"02:00 PM":"09:30 AM"}</span><small>{["AI Fellowship","Full Stack","Analytics"][di%3]}</small></div>)}</div>)}</div>
  </div>
}

function Attendance() {
  return <div className="page"><div className="page-title"><div><span className="eyebrow">PARTICIPATION</span><h2>Attendance</h2><p>Record and review attendance by program, session and learner.</p></div><button className="primary" onClick={() => alert("Attendance saved — frontend demo")}><CheckCircle2 size={18}/> Save Attendance</button></div>
    <div className="stats-grid compact"><StatCard title="Overall" value="94.2%" note="+2.8%" icon={ClipboardCheck} tone="green"/><StatCard title="Present" value="113" note="+6" icon={CheckCircle2} tone="purple"/><StatCard title="Absent" value="07" note="-2" icon={AlertCircle} tone="orange"/><StatCard title="Late" value="05" note="-1" icon={Clock3} tone="blue"/></div>
    <div className="card table-card"><div className="table-toolbar"><div><h3>Friday, 28 August 2026</h3><p>AI Fundamentals • 09:30 AM</p></div><div className="toolbar-right"><button className="filter">AI Fellowship <ChevronDown size={14}/></button><button className="filter">Mark all present</button></div></div><div className="table-wrap"><table><thead><tr><th>Learner</th><th>Program</th><th>Status</th><th>Check-in</th><th>Remark</th></tr></thead><tbody>{students.map((s,i)=><tr key={s[0]}><td><div className="person"><div className="avatar">{s[0][0]}</div><b>{s[0]}</b></div></td><td>{s[1]}</td><td><button className={i===4?"attendance-btn absent":"attendance-btn present"}>{i===4?"Absent":"Present"}</button></td><td>{i===4?"—":"09:"+(20+i*3)+" AM"}</td><td><span className="muted">{i===4?"Needs follow-up":"On time"}</span></td></tr>)}</tbody></table></div></div>
  </div>
}

function Tests({ weekly=false }: { weekly?: boolean }) {
  const rows = students.map((s,i)=>({name:s[0], program:s[1], score: [88,91,84,94,79][i], status:i===4?"Review":"Passed"}));
  return <div className="page"><div className="page-title"><div><span className="eyebrow">{weekly?"WEEKLY ASSESSMENT":"DAILY ASSESSMENT"}</span><h2>{weekly?"Weekly Tests":"Daily Tests"}</h2><p>{weekly?"Review weekly assessments, pass rates and cohort outcomes.":"Capture daily assessment scores and learning checks."}</p></div><button className="primary" onClick={() => alert("New test modal — frontend demo")}><Plus size={18}/> New {weekly?"Weekly":"Daily"} Test</button></div>
    <div className="test-layout"><div className="card table-card"><div className="table-toolbar"><div className="search"><Search size={17}/><input placeholder="Search learners..." /></div><button className="filter">{weekly?"Week 04":"28 Aug"} <ChevronDown size={14}/></button></div><div className="table-wrap"><table><thead><tr><th>Learner</th><th>Program</th><th>Score</th><th>Status</th><th></th></tr></thead><tbody>{rows.map(r=><tr key={r.name}><td><div className="person"><div className="avatar">{r.name[0]}</div><b>{r.name}</b></div></td><td>{r.program}</td><td><strong className="score">{r.score}%</strong></td><td><span className={r.status==="Passed"?"status active":"status warn"}>{r.status}</span></td><td><button className="icon-btn" onClick={() => alert("Edit score — frontend demo")}><ChevronDown size={16}/></button></td></tr>)}</tbody></table></div></div>
      <div className="card score-card"><div className="card-head"><div><h3>{weekly?"Week 04":"Today"} overview</h3><p>Assessment distribution</p></div></div><div className="donut"><ResponsiveContainer width="100%" height={210}><PieChart><Pie data={[{name:"Passed",value:82},{name:"Review",value:12},{name:"Not attempted",value:6}]} dataKey="value" innerRadius={60} outerRadius={82} paddingAngle={3}>{[0,1,2].map(i=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="donut-center"><b>82%</b><span>Pass rate</span></div></div><div className="legend"><span><i style={{background:COLORS[0]}}/>Passed <b>82%</b></span><span><i style={{background:COLORS[1]}}/>Review <b>12%</b></span><span><i style={{background:COLORS[2]}}/>Pending <b>6%</b></span></div></div></div>
  </div>
}

function Analytics() {
  return <div className="page"><div className="page-title"><div><span className="eyebrow">INSIGHTS</span><h2>Analytics</h2><p>Understand learner outcomes and delivery performance.</p></div><button className="filter">August 2026 <ChevronDown size={14}/></button></div>
    <div className="dashboard-grid"><div className="card chart-card large"><div className="card-head"><div><h3>Assessment performance</h3><p>Daily vs weekly assessment averages</p></div></div><ResponsiveContainer width="100%" height={310}><AreaChart data={performanceData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="week" axisLine={false} tickLine={false}/><YAxis domain={[50,100]} axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="daily" stroke="#7c3aed" fill="#7c3aed" fillOpacity={.10} strokeWidth={3}/><Area type="monotone" dataKey="weekly" stroke="#f59e0b" fill="#f59e0b" fillOpacity={.10} strokeWidth={3}/></AreaChart></ResponsiveContainer></div><div className="card"><div className="card-head"><div><h3>Program mix</h3><p>Active learner distribution</p></div></div><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={[{name:"AI",value:32},{name:"MERN",value:28},{name:"Full Stack",value:34},{name:"Analytics",value:26}]} dataKey="value" innerRadius={55} outerRadius={88}>{[0,1,2,3].map(i=><Cell key={i} fill={["#0f6b45","#7c3aed","#f59e0b","#0ea5e9"][i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="mini-stats"><span>AI <b>32</b></span><span>MERN <b>28</b></span><span>Full Stack <b>34</b></span><span>Analytics <b>26</b></span></div></div></div>
  </div>
}

function Generic({ title }: { title: string }) {
  return <div className="page"><div className="page-title"><div><span className="eyebrow">AAROHAN FYNITY</span><h2>{title}</h2><p>This frontend module is ready for interactive integration.</p></div><button className="primary" onClick={() => alert(`${title} action — frontend demo`)}><Plus size={18}/> Create New</button></div><div className="card empty"><div className="empty-icon"><Sparkles/></div><h3>{title} workspace</h3><p>Use the navigation, filters, actions and role switcher to explore the complete frontend experience.</p><button className="outline" onClick={() => alert("Demo interaction")}>Explore module <ArrowRight size={16}/></button></div></div>
}

function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [page, setPage] = useState<Page>("Dashboard");
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchRole = (r: Role) => { setRole(r); setPage("Dashboard"); };

  const content = useMemo(() => {
    if (page === "Dashboard") return <Dashboard role={role} setPage={setPage}/>;
    if (page === "Programs") return <Programs setPage={setPage}/>;
    if (page === "Program Details") return <ProgramDetails setPage={setPage}/>;
    if (page === "Students" || page === "Student Profile") return <Students setPage={setPage}/>;
    if (page === "Schedule") return <Schedule/>;
    if (page === "Attendance") return <Attendance/>;
    if (page === "Daily Tests") return <Tests/>;
    if (page === "Weekly Tests") return <Tests weekly/>;
    if (page === "Analytics") return <Analytics/>;
    return <Generic title={page}/>;
  }, [page, role]);

  if (!role) return <Login onLogin={setRole}/>;

  return <div className={dark ? "app dark" : "app"}>
    <Sidebar role={role} page={page} setPage={setPage} onLogout={() => setRole(null)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    <main className="main"><Header role={role} page={page} onMenu={() => setMobileOpen(true)} dark={dark} setDark={setDark}/>
      <div className="role-switcher"><span>DEMO ROLE</span>{(["Super Admin","Program Manager","Student"] as Role[]).map(r=><button key={r} className={role===r?"active":""} onClick={() => switchRole(r)}>{r}</button>)}</div>
      {content}
    </main>
  </div>
}

export default App;
