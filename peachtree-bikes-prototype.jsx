import React, { useState } from 'react';
import { Search, Plus, Filter, LayoutGrid, ChevronDown, ChevronRight, Moon, Sun, Menu, Settings, Users, Package, Store, BarChart3, FileText, Clock, Check, Circle, ArrowRight, X, Edit3, Trash2, Eye, EyeOff, Mic, Play, RotateCcw, ChevronUp, Home, ShoppingCart, User, MessageSquare, Star, Bike, Zap, Mountain, Road, TreePine, Activity, DollarSign, TrendingUp, AlertCircle, CheckCircle2, XCircle, MoreHorizontal, Mail, Phone, Target, Clipboard, ThumbsUp, ThumbsDown, HelpCircle, Info, ExternalLink, LogOut, Bell, Layers, Grid3X3, List, Calendar, MapPin, Tag, Hash, Award, Shield, Wrench, Heart, Share2 } from 'lucide-react';

// Mock Data
const mockDeals = [
  { id: 'D-1046', customer: 'Maya Patel', email: 'maya.patel@example.com', phone: '+1 (415) 555-0127', budget: '$2,800-$4,500', stage: 'bike-finder', amount: 3200, tags: ['Gravel', 'Test ride'], updated: 'Today', note: 'Returning rider • Wants gravel + commute', inStore: true },
  { id: 'D-1047', customer: 'Ethan Brooks', email: 'ethan.b@example.com', phone: '+1 (415) 555-0198', budget: '$5,000-$8,000', stage: 'test-ride', amount: 6900, tags: ['MTB', 'Suspension'], updated: 'Today', note: 'Experienced rider • Trail focus' },
  { id: 'D-1044', customer: 'Noah Martin', email: 'noah.m@example.com', phone: '+1 (415) 555-0156', budget: '$4,000-$6,000', stage: 'recommendation', amount: 5600, tags: ['eBike', 'Accessories'], updated: 'Yesterday', note: 'New to cycling • Commute priority' },
  { id: 'D-1048', customer: 'Jordan Kim', email: 'jordan.k@example.com', phone: '+1 (415) 555-0134', budget: '$3,500-$5,000', stage: 'recommendation', amount: 4100, tags: ['Gravel', 'Quote'], updated: '1d ago', note: 'Weekend adventurer' },
  { id: 'D-1045', customer: 'Sophia Reyes', email: 'sophia.r@example.com', phone: '+1 (415) 555-0112', budget: '$4,000-$5,500', stage: 'closed', amount: 4800, tags: ['Commuter', 'Delivered'], updated: '3d ago', note: 'Urban commuter • Delivered' },
];

const mockProducts = [
  { id: 'P-001', name: 'Gravel Explorer Pro', category: 'Gravel', price: 3200, terrain: ['Gravel', 'Road'], style: 'Adventure', sizes: ['S', 'M', 'L', 'XL'], ebike: false, stock: 12 },
  { id: 'P-002', name: 'TrailBlazer 29er', category: 'MTB', price: 4500, terrain: ['Trail', 'Mountain'], style: 'Trail', sizes: ['S', 'M', 'L'], ebike: false, stock: 8 },
  { id: 'P-003', name: 'City Commuter Elite', category: 'Commuter', price: 1800, terrain: ['Urban', 'Road'], style: 'Commute', sizes: ['S', 'M', 'L', 'XL'], ebike: false, stock: 15 },
  { id: 'P-004', name: 'E-Cruise 500', category: 'eBike', price: 4200, terrain: ['Urban', 'Trail'], style: 'Commute', sizes: ['M', 'L', 'XL'], ebike: true, stock: 6 },
  { id: 'P-005', name: 'Road Racer Carbon', category: 'Road', price: 5800, terrain: ['Road'], style: 'Performance', sizes: ['S', 'M', 'L'], ebike: false, stock: 4 },
  { id: 'P-006', name: 'Adventure Tourer', category: 'Gravel', price: 2900, terrain: ['Gravel', 'Road', 'Light Trail'], style: 'Adventure', sizes: ['S', 'M', 'L', 'XL'], ebike: false, stock: 10 },
];

const mockStores = [
  { id: 'S-001', name: 'Peachtree Bikes - Downtown', location: 'Atlanta, GA', manager: 'Sarah Chen', associates: 5, activeDeals: 12 },
  { id: 'S-002', name: 'Peachtree Bikes - Buckhead', location: 'Atlanta, GA', manager: 'Mike Johnson', associates: 4, activeDeals: 8 },
  { id: 'S-003', name: 'Peachtree Bikes - Decatur', location: 'Decatur, GA', manager: 'Lisa Park', associates: 3, activeDeals: 6 },
];

const mockUsers = [
  { id: 'U-001', name: 'Sarah Chen', email: 'sarah@peachtreebikes.com', role: 'Store Manager', store: 'Downtown', status: 'Active' },
  { id: 'U-002', name: 'Mike Johnson', email: 'mike@peachtreebikes.com', role: 'Store Manager', store: 'Buckhead', status: 'Active' },
  { id: 'U-003', name: 'Alex Rivera', email: 'alex@peachtreebikes.com', role: 'Sales Associate', store: 'Downtown', status: 'Active' },
  { id: 'U-004', name: 'Jamie Wong', email: 'jamie@peachtreebikes.com', role: 'Sales Associate', store: 'Buckhead', status: 'Active' },
  { id: 'U-005', name: 'Admin User', email: 'admin@peachtreebikes.com', role: 'System Admin', store: 'All', status: 'Active' },
];

const bikeFinderQuestions = [
  { id: 'riding-type', question: 'What type of riding do you plan to do most often?', hint: "If they're unsure, ask: what do your best days on a bike look like?", options: ['MTB', 'Road', 'Gravel', 'Fitness/Commute'] },
  { id: 'terrain', question: 'Where will you ride most often?', hint: 'Pick the terrain that matches their most common route.', options: ['Paved roads', 'Mixed surfaces', 'Trails', 'Urban'] },
  { id: 'goal', question: "What's the main goal?", hint: 'This helps pick the right geometry + component focus.', options: ['Fitness', 'Commuting', 'Recreation', 'Competition'] },
  { id: 'ebike', question: 'Do you want an eBike?', hint: "If they're unsure, frame it as 'assist vs no-assist'.", options: ['Yes', 'No', 'Open to it'] },
  { id: 'ebike-feel', question: 'If yes: what feel do you want?', hint: 'Choose between maximum assist or a lighter, more natural ride feel.', options: ['Maximum assist', 'Natural feel', 'N/A'] },
  { id: 'budget', question: 'Budget tier', hint: "We'll match spec level to their expectations.", options: ['Under $2,000', '$2,000-$4,000', '$4,000-$6,000', '$6,000+'] },
];

const accessories = [
  { id: 'A-001', name: 'Premium Helmet', price: 180, category: 'Safety', compatible: ['all'] },
  { id: 'A-002', name: 'Clip-in Pedals', price: 150, category: 'Components', compatible: ['Road', 'Gravel'] },
  { id: 'A-003', name: 'Rear Rack', price: 85, category: 'Cargo', compatible: ['Commuter', 'Gravel'] },
  { id: 'A-004', name: 'Fenders Set', price: 65, category: 'Protection', compatible: ['Commuter', 'Gravel'] },
  { id: 'A-005', name: 'Bike Computer', price: 250, category: 'Electronics', compatible: ['all'] },
  { id: 'A-006', name: 'Water Bottle Kit', price: 45, category: 'Hydration', compatible: ['all'] },
];

// Shared Components
const Badge = ({ children, variant = 'default', size = 'sm' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-50 text-blue-600',
  };
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick, className = '', disabled = false }) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    ghost: 'hover:bg-gray-100 text-gray-600',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-xl border border-gray-200 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}>
    {children}
  </div>
);

const Input = ({ placeholder, value, onChange, icon: Icon, className = '' }) => (
  <div className={`relative ${className}`}>
    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-gray-300 bg-white py-2 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
    />
  </div>
);

const Select = ({ value, onChange, options, placeholder, className = '' }) => (
  <select
    value={value}
    onChange={onChange}
    className={`rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const ProgressBar = ({ progress, className = '' }) => (
  <div className={`h-1 bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
  </div>
);

const Avatar = ({ name, size = 'md' }) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <div className={`${sizes[size]} rounded-full bg-blue-100 text-blue-700 font-medium flex items-center justify-center`}>
      {initials}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">{children}</div>
      </div>
    </div>
  );
};

const Tabs = ({ tabs, activeTab, onChange }) => (
  <div className="flex border-b border-gray-200">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
          activeTab === tab.id
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// Header Component
const Header = ({ title, subtitle, darkMode, setDarkMode, userType, onUserTypeChange }) => (
  <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        <Bike size={24} className="text-gray-700" />
      </div>
      <div>
        <h1 className="font-semibold text-gray-900">{title}</h1>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Select
        value={userType}
        onChange={(e) => onUserTypeChange(e.target.value)}
        options={[
          { value: 'admin', label: 'Admin View' },
          { value: 'store', label: 'In-Store View' },
          { value: 'customer', label: 'Customer View' },
        ]}
        className="text-sm"
      />
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        <span className="text-sm">{darkMode ? 'Light' : 'Dark'}</span>
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <Settings size={20} className="text-gray-500" />
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <Menu size={20} className="text-gray-500" />
      </button>
    </div>
  </header>
);

// ============ ADMIN VIEW COMPONENTS ============

const AdminSidebar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'catalog', label: 'Product Catalog', icon: Package },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'deals', label: 'All Deals', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen p-4">
      <nav className="space-y-1">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <section.icon size={18} />
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Deals', value: '156', change: '+12%', icon: FileText, color: 'blue' },
    { label: 'Revenue (MTD)', value: '$284,500', change: '+8%', icon: DollarSign, color: 'green' },
    { label: 'Active Stores', value: '3', change: '0%', icon: Store, color: 'purple' },
    { label: 'Close Rate', value: '68%', change: '+5%', icon: TrendingUp, color: 'orange' },
  ];

  const stageDistribution = [
    { stage: 'Bike Finder', count: 24, color: 'bg-blue-500' },
    { stage: 'Test Ride', count: 18, color: 'bg-yellow-500' },
    { stage: 'Recommendation', count: 31, color: 'bg-purple-500' },
    { stage: 'Review', count: 12, color: 'bg-orange-500' },
    { stage: 'Closed', count: 71, color: 'bg-green-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-500 mt-1">Overview of all stores and sales activity</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} vs last month</p>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon size={20} className={`text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Deal Stage Distribution</h3>
          <div className="space-y-3">
            {stageDistribution.map(item => (
              <div key={item.stage} className="flex items-center gap-3">
                <div className="w-24 text-sm text-gray-600">{item.stage}</div>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${(item.count / 156) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-sm text-gray-600 text-right">{item.count}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Store Performance</h3>
          <div className="space-y-4">
            {mockStores.map(store => (
              <div key={store.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-sm">{store.name}</p>
                  <p className="text-xs text-gray-500">{store.manager} • {store.associates} associates</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{store.activeDeals} deals</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Activity</h3>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="space-y-3">
          {[
            { action: 'Deal closed', detail: 'Sophia Reyes purchased City Commuter Elite', time: '2h ago', icon: CheckCircle2, color: 'text-green-500' },
            { action: 'New deal created', detail: 'Maya Patel started bike finder', time: '3h ago', icon: Plus, color: 'text-blue-500' },
            { action: 'Test ride scheduled', detail: 'Ethan Brooks - TrailBlazer 29er', time: '5h ago', icon: Calendar, color: 'text-purple-500' },
            { action: 'Product added', detail: 'E-Cruise 700 added to catalog', time: '1d ago', icon: Package, color: 'text-orange-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2">
              <item.icon size={18} className={item.color} />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.action}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const AdminCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Product Catalog</h2>
          <p className="text-gray-500 mt-1">Manage bikes, accessories, and product attributes</p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Add Product</Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            className="flex-1"
          />
          <Select
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'mtb', label: 'MTB' },
              { value: 'road', label: 'Road' },
              { value: 'gravel', label: 'Gravel' },
              { value: 'commuter', label: 'Commuter' },
              { value: 'ebike', label: 'eBike' },
            ]}
            placeholder="Category"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Price</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Sizes</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stock</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Bike size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={product.ebike ? 'primary' : 'default'}>{product.category}</Badge>
                </td>
                <td className="py-3 px-4 text-sm">${product.price.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{product.sizes.join(', ')}</td>
                <td className="py-3 px-4">
                  <span className={`text-sm ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded"><Edit3 size={16} /></button>
                    <button className="p-1 hover:bg-gray-100 rounded text-red-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Product" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input placeholder="Enter product name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select options={[
                { value: 'mtb', label: 'MTB' },
                { value: 'road', label: 'Road' },
                { value: 'gravel', label: 'Gravel' },
                { value: 'commuter', label: 'Commuter' },
                { value: 'ebike', label: 'eBike' },
              ]} placeholder="Select category" className="w-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <Input placeholder="0" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Available Sizes</label>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <label key={size} className="flex items-center gap-1">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <label className="text-sm">This is an eBike</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button>Save Product</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const AdminStores = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Stores</h2>
          <p className="text-gray-500 mt-1">Manage store locations and their settings</p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Add Store</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {mockStores.map(store => (
          <Card key={store.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Store size={24} className="text-blue-600" />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <h3 className="font-semibold text-lg">{store.name}</h3>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <MapPin size={14} />
              {store.location}
            </p>
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-semibold">{store.activeDeals}</p>
                <p className="text-xs text-gray-500">Active Deals</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{store.associates}</p>
                <p className="text-xs text-gray-500">Associates</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm">
                <span className="text-gray-500">Manager:</span>{' '}
                <span className="font-medium">{store.manager}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Store">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Store Name</label>
            <Input placeholder="Enter store name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input placeholder="City, State" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Store Manager</label>
            <Select options={mockUsers.filter(u => u.role === 'Store Manager').map(u => ({ value: u.id, label: u.name }))} placeholder="Select manager" className="w-full" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button>Create Store</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const AdminUsers = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Users & Roles</h2>
          <p className="text-gray-500 mt-1">Manage user accounts and permissions</p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Add User</Button>
      </div>

      <Card className="p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Role</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Store</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} />
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={user.role === 'System Admin' ? 'primary' : 'default'}>{user.role}</Badge>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.store}</td>
                <td className="py-3 px-4">
                  <Badge variant="success">{user.status}</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded"><Edit3 size={16} /></button>
                    <button className="p-1 hover:bg-gray-100 rounded text-red-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New User">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input placeholder="Enter name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input placeholder="email@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select options={[
                { value: 'admin', label: 'System Admin' },
                { value: 'manager', label: 'Store Manager' },
                { value: 'associate', label: 'Sales Associate' },
              ]} placeholder="Select role" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Store</label>
              <Select options={mockStores.map(s => ({ value: s.id, label: s.name }))} placeholder="Select store" className="w-full" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button>Create User</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const AdminDeals = ({ onSelectDeal }) => {
  const [viewMode, setViewMode] = useState('kanban');
  const stages = [
    { id: 'bike-finder', label: 'Bike Finder', amount: 3200 },
    { id: 'test-ride', label: 'Test ride', amount: 6900 },
    { id: 'recommendation', label: 'Recommendation', amount: 9700 },
    { id: 'closed', label: 'Closed/Purchased', amount: 4800 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">All Deals</h2>
          <p className="text-gray-500 mt-1">View and manage deals across all stores</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-2 ${viewMode === 'kanban' ? 'bg-gray-100' : ''}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search deals by customer, ID, or tag..." icon={Search} className="flex-1" />
        <Button variant="secondary" icon={Filter}>Filter</Button>
      </div>

      {viewMode === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageDeals = mockDeals.filter(d => d.stage === stage.id);
            return (
              <div key={stage.id} className="flex-shrink-0 w-72">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{stage.label}</span>
                    <Badge>{stageDeals.length}</Badge>
                  </div>
                  <span className="text-sm text-gray-500">${stage.amount.toLocaleString()}</span>
                </div>
                <div className="space-y-3">
                  {stageDeals.map(deal => (
                    <Card key={deal.id} className="p-4" onClick={() => onSelectDeal(deal)}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{deal.customer}</p>
                          <p className="text-xs text-gray-500">{deal.id} • Updated {deal.updated}</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                      <p className="text-lg font-semibold">${deal.amount.toLocaleString()}</p>
                      <div className="flex gap-2 mt-3">
                        {deal.tags.map(tag => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Deal</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stage</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Updated</th>
              </tr>
            </thead>
            <tbody>
              {mockDeals.map(deal => (
                <tr key={deal.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => onSelectDeal(deal)}>
                  <td className="py-3 px-4 text-sm font-medium">{deal.id}</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium">{deal.customer}</p>
                    <p className="text-xs text-gray-500">{deal.email}</p>
                  </td>
                  <td className="py-3 px-4"><Badge>{deal.stage.replace('-', ' ')}</Badge></td>
                  <td className="py-3 px-4 text-sm font-medium">${deal.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{deal.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

const AdminView = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedDeal, setSelectedDeal] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <AdminDashboard />;
      case 'catalog': return <AdminCatalog />;
      case 'stores': return <AdminStores />;
      case 'users': return <AdminUsers />;
      case 'deals': return <AdminDeals onSelectDeal={setSelectedDeal} />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="flex">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 bg-gray-50 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

// ============ IN-STORE VIEW COMPONENTS ============

const DealsPipeline = ({ deals, onSelectDeal, onNewDeal }) => {
  const [viewMode, setViewMode] = useState('kanban');
  const [searchTerm, setSearchTerm] = useState('');

  const stages = [
    { id: 'bike-finder', label: 'Bike Finder', amount: 3200 },
    { id: 'test-ride', label: 'Test ride', amount: 6900 },
    { id: 'recommendation', label: 'Recommendation', amount: 9700 },
    { id: 'closed', label: 'Closed/Purchased', amount: 4800 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FileText size={24} />
            Deals pipeline
          </h2>
          <p className="text-gray-500 mt-1">Side-scroll by stage, filter quickly, and jump into a guided sale workspace.</p>
        </div>
        <Button icon={Plus} onClick={onNewDeal}>New deal</Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Search deals by customer, ID, or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
          className="flex-1 max-w-xl"
        />
        <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5">
          <Filter size={18} />
          <span className="text-sm font-medium">Filter</span>
          <Badge>All</Badge>
        </div>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5">
          <LayoutGrid size={18} />
          <span className="text-sm font-medium">Layout</span>
          <span className="text-sm text-gray-500">Kanban</span>
        </div>
        <span className="text-sm text-gray-500">Showing {deals.length} deals</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          return (
            <div key={stage.id} className="flex-shrink-0 w-72">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">${stage.amount.toLocaleString()}</span>
                  <span className="font-medium">{stage.label}</span>
                  <Badge>{stageDeals.length}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {stageDeals.map(deal => (
                  <Card key={deal.id} className="p-4" onClick={() => onSelectDeal(deal)}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{deal.customer}</p>
                        <p className="text-xs text-gray-500">{deal.id} • Updated {deal.updated}</p>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold mt-2">${deal.amount.toLocaleString()}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {deal.tags.map(tag => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DealWorkspace = ({ deal, onBack, isCustomerView, setIsCustomerView }) => {
  const [activeTab, setActiveTab] = useState('bike-finder');
  const [answers, setAnswers] = useState({});
  const [matchCount, setMatchCount] = useState(8);
  const [selectedBike, setSelectedBike] = useState(null);
  const [testRideNotes, setTestRideNotes] = useState('');
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  const tabs = [
    { id: 'bike-finder', label: 'Bike Finder' },
    { id: 'test-ride', label: 'Test ride' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'review', label: 'Review' },
  ];

  const flowSteps = [
    { id: 'bike-finder', label: 'Bike Finder', status: 'in-progress' },
    { id: 'test-ride', label: 'Test ride + sizing', status: 'todo' },
    { id: 'recommendations', label: 'Recommendations', status: 'todo' },
    { id: 'review', label: 'Review', status: 'todo' },
  ];

  const customerActivity = [
    { action: 'Viewed recommendations', time: '2m ago', type: 'Customer' },
    { action: 'Opened Bike Finder summary', time: '6m ago', type: 'Customer' },
    { action: 'Checked pricing', time: '12m ago', type: 'Customer' },
    { action: 'Viewed accessories list', time: '18m ago', type: 'Customer' },
    { action: 'Opened customer view', time: '22m ago', type: 'Customer' },
  ];

  const handleAnswerSelect = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);
    setMatchCount(Math.max(1, 8 - Object.keys(newAnswers).length));
  };

  const renderBikeFinder = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings size={18} />
            Bike Finder
          </h3>
          <p className="text-sm text-gray-500">Decision-tree questionnaire that narrows the catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="info">{matchCount} matches</Badge>
          <Button variant="ghost" size="sm" icon={RotateCcw}>Reset</Button>
        </div>
      </div>

      <div className="space-y-4">
        {bikeFinderQuestions.map((q, idx) => (
          <Card key={q.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{q.question}</h4>
                  <Badge variant={answers[q.id] ? 'success' : 'warning'} size="sm">
                    {answers[q.id] ? 'Answered' : 'Unanswered'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-3">{q.hint}</p>
                <div className="grid grid-cols-2 gap-3">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleAnswerSelect(q.id, opt)}
                      className={`p-3 border rounded-lg text-left text-sm transition-colors ${
                        answers[q.id] === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>{opt}</span>
                      {answers[q.id] !== opt && (
                        <span className="block text-xs text-gray-400 mt-1">Tap to choose</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronDown size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-gray-50">
        <p className="text-sm text-gray-600">
          <strong>Matches update live</strong> — This mockup keeps the questionnaire focused. Results can be surfaced in the sidebar "Bike matches" panel.
        </p>
      </Card>
    </div>
  );

  const renderTestRide = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Test Ride & Sizing</h3>
        <p className="text-sm text-gray-500">Capture fit measurements and ride feedback.</p>
      </div>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Sizing Checklist</h4>
        <div className="space-y-3">
          {['Stand-over height verified', 'Reach comfortable', 'Saddle height set', 'Handlebar position adjusted', 'Brake levers reachable'].map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500" />
              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Test Ride Feedback</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Bike Tested</label>
            <Select
              options={mockProducts.map(p => ({ value: p.id, label: `${p.name} - $${p.price}` }))}
              placeholder="Select bike"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Comfort Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} className="w-10 h-10 border rounded-lg hover:bg-blue-50 hover:border-blue-300 text-sm font-medium">
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Handling Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} className="w-10 h-10 border rounded-lg hover:bg-blue-50 hover:border-blue-300 text-sm font-medium">
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={testRideNotes}
              onChange={(e) => setTestRideNotes(e.target.value)}
              placeholder="Any observations about comfort, handling, fit..."
              className="w-full p-3 border rounded-lg text-sm resize-none h-24"
            />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
        <p className="text-sm text-gray-500">Top bike picks and matching accessories.</p>
      </div>

      <div>
        <h4 className="font-medium mb-3">Recommended Bikes</h4>
        <div className="grid grid-cols-2 gap-4">
          {mockProducts.slice(0, 4).map(bike => (
            <Card
              key={bike.id}
              className={`p-4 ${selectedBike?.id === bike.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedBike(bike)}
            >
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <Bike size={48} className="text-gray-300" />
              </div>
              <h5 className="font-medium">{bike.name}</h5>
              <p className="text-sm text-gray-500">{bike.category}</p>
              <p className="text-lg font-semibold mt-2">${bike.price.toLocaleString()}</p>
              <div className="flex gap-1 mt-2">
                {bike.terrain.map(t => (
                  <Badge key={t} size="sm">{t}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedBike && (
        <div>
          <h4 className="font-medium mb-3">Recommended Accessories for {selectedBike.name}</h4>
          <div className="grid grid-cols-3 gap-3">
            {accessories.map(acc => (
              <Card
                key={acc.id}
                className={`p-3 ${selectedAccessories.includes(acc.id) ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => {
                  if (selectedAccessories.includes(acc.id)) {
                    setSelectedAccessories(selectedAccessories.filter(id => id !== acc.id));
                  } else {
                    setSelectedAccessories([...selectedAccessories, acc.id]);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{acc.name}</p>
                    <p className="text-xs text-gray-500">{acc.category}</p>
                  </div>
                  <p className="font-medium">${acc.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderReview = () => {
    const selectedAccItems = accessories.filter(a => selectedAccessories.includes(a.id));
    const subtotal = (selectedBike?.price || 0) + selectedAccItems.reduce((sum, a) => sum + a.price, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Review</h3>
          <p className="text-sm text-gray-500">Summary of selected products and pricing.</p>
        </div>

        <Card className="p-6">
          <h4 className="font-medium mb-4 pb-4 border-b">Order Summary</h4>
          <div className="space-y-3">
            {selectedBike && (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Bike size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedBike.name}</p>
                    <p className="text-sm text-gray-500">{selectedBike.category}</p>
                  </div>
                </div>
                <p className="font-medium">${selectedBike.price.toLocaleString()}</p>
              </div>
            )}
            {selectedAccItems.map(acc => (
              <div key={acc.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">{acc.name}</p>
                    <p className="text-sm text-gray-500">{acc.category}</p>
                  </div>
                </div>
                <p className="font-medium">${acc.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1">Save Quote</Button>
          <Button className="flex-1">Proceed to Checkout</Button>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bike-finder': return renderBikeFinder();
      case 'test-ride': return renderTestRide();
      case 'recommendations': return renderRecommendations();
      case 'review': return renderReview();
      default: return renderBikeFinder();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Deal workspace</h1>
              <p className="text-sm text-gray-500">{deal.id} • Sale workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="info">In Progress</Badge>
            <Badge variant={deal.inStore ? 'primary' : 'default'}>{deal.inStore ? 'In store' : 'Remote'}</Badge>
            <Button
              variant="secondary"
              icon={isCustomerView ? EyeOff : Eye}
              onClick={() => setIsCustomerView(!isCustomerView)}
            >
              {isCustomerView ? 'Staff view' : 'Customer view'}
            </Button>
            <Button variant="primary">Save & Exit</Button>
          </div>
        </div>
        <ProgressBar progress={25} className="mt-4" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Sale progress</span>
          <span>0%</span>
        </div>
      </div>

      <div className="flex">
        {/* Left sidebar */}
        <aside className="w-80 border-r bg-white p-4 space-y-4">
          {/* Customer info */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{deal.customer}</h3>
                <p className="text-sm text-gray-500">{deal.note}</p>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Bike size={18} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span>{deal.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>{deal.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Target budget</span>
                <span>{deal.budget}</span>
              </div>
            </div>
          </Card>

          {/* Transcript */}
          {!isCustomerView && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mic size={18} />
                  <span className="font-medium">Transcript</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Mic</Button>
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="secondary" size="sm">Start</Button>
                </div>
              </div>
            </Card>
          )}

          {/* Bike matches */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium">Bike matches</h4>
                <p className="text-xs text-gray-500">Starts broad, tightens as you answer.</p>
              </div>
              <Badge>{matchCount}</Badge>
            </div>
            <p className="text-sm text-gray-500 mb-3">{Object.keys(answers).length}/5 answered</p>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">Full catalog</Button>
              <Button variant="secondary" size="sm">Choose a bike</Button>
              <Button variant="ghost" size="sm">Open list</Button>
            </div>
          </Card>

          {/* Flow progress */}
          {!isCustomerView && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Flow progress</h4>
                <Settings size={16} className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mb-3">Sale checkpoints.</p>
              <div className="space-y-2">
                {flowSteps.map((step, idx) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      step.status === 'in-progress' ? 'bg-blue-500' :
                      step.status === 'complete' ? 'bg-green-500' : 'bg-gray-200'
                    }`}>
                      {step.status === 'in-progress' && <Circle size={8} className="text-white" />}
                      {step.status === 'complete' && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-sm flex-1">{step.label}</span>
                    <Badge variant={step.status === 'in-progress' ? 'primary' : 'default'} size="sm">
                      {step.status === 'in-progress' ? 'In progress' : 'Todo'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Customer Activity */}
          {!isCustomerView && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Customer Activity</h4>
                <Activity size={16} className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mb-3">Last actions taken in Customer view.</p>
              <div className="space-y-3">
                {customerActivity.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{item.action}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                    <Badge size="sm">{item.type}</Badge>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3">View all activity</Button>
            </Card>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Card className="p-0">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            <div className="p-6">
              {renderTabContent()}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

const InStoreView = () => {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isCustomerView, setIsCustomerView] = useState(false);

  if (selectedDeal) {
    return (
      <DealWorkspace
        deal={selectedDeal}
        onBack={() => setSelectedDeal(null)}
        isCustomerView={isCustomerView}
        setIsCustomerView={setIsCustomerView}
      />
    );
  }

  return (
    <DealsPipeline
      deals={mockDeals}
      onSelectDeal={setSelectedDeal}
      onNewDeal={() => setSelectedDeal(mockDeals[0])}
    />
  );
};

// ============ CUSTOMER VIEW COMPONENTS ============

const CustomerView = () => {
  const [step, setStep] = useState('welcome');
  const [answers, setAnswers] = useState({});
  const [selectedBike, setSelectedBike] = useState(null);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <Card className="max-w-lg w-full p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Bike size={40} className="text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to Peachtree Bikes</h1>
        <p className="text-gray-500 mb-6">Let's find your perfect bike. Answer a few quick questions and we'll show you personalized recommendations.</p>
        <Button size="lg" onClick={() => setStep('questionnaire')} className="w-full">
          Start Bike Finder
        </Button>
        <p className="text-sm text-gray-400 mt-4">Takes about 2 minutes</p>
      </Card>
    </div>
  );

  const renderQuestionnaire = () => {
    const currentQuestionIndex = Object.keys(answers).length;
    const currentQuestion = bikeFinderQuestions[currentQuestionIndex];
    const progress = (currentQuestionIndex / bikeFinderQuestions.length) * 100;

    if (!currentQuestion) {
      setStep('results');
      return null;
    }

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {bikeFinderQuestions.length}</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
            </div>
            <ProgressBar progress={progress} />
          </div>

          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-2">{currentQuestion.question}</h2>
            <p className="text-gray-500 mb-6">{currentQuestion.hint}</p>
            <div className="space-y-3">
              {currentQuestion.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className="w-full p-4 border-2 rounded-xl text-left hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium">{option}</span>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
          </Card>

          {currentQuestionIndex > 0 && (
            <button
              onClick={() => {
                const newAnswers = { ...answers };
                const keys = Object.keys(newAnswers);
                delete newAnswers[keys[keys.length - 1]];
                setAnswers(newAnswers);
              }}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <ChevronRight size={16} className="rotate-180" />
              Go back
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const recommendedBikes = mockProducts.slice(0, 3);

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">We found your matches!</h1>
            <p className="text-gray-500">Based on your answers, here are our top recommendations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {recommendedBikes.map((bike, idx) => (
              <Card
                key={bike.id}
                className={`p-4 ${selectedBike?.id === bike.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedBike(bike)}
              >
                {idx === 0 && (
                  <Badge variant="primary" className="mb-2">Best Match</Badge>
                )}
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Bike size={64} className="text-gray-300" />
                </div>
                <h3 className="font-semibold text-lg">{bike.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{bike.category}</p>
                <p className="text-xl font-bold text-blue-600">${bike.price.toLocaleString()}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {bike.terrain.map(t => (
                    <Badge key={t} size="sm">{t}</Badge>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Why we recommend:</span> Great for {answers['riding-type'] || 'your riding style'} with excellent {answers['terrain'] || 'versatility'}.
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={() => setStep('questionnaire')}>
              Retake Quiz
            </Button>
            <Button onClick={() => setStep('accessories')} disabled={!selectedBike}>
              Continue with {selectedBike?.name || 'selection'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderAccessories = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setStep('results')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ChevronRight size={16} className="rotate-180" />
          Back to bikes
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Complete your setup</h1>
          <p className="text-gray-500">Recommended accessories for your {selectedBike?.name}.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {accessories.map(acc => (
            <Card
              key={acc.id}
              className={`p-4 ${selectedAccessories.includes(acc.id) ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => {
                if (selectedAccessories.includes(acc.id)) {
                  setSelectedAccessories(selectedAccessories.filter(id => id !== acc.id));
                } else {
                  setSelectedAccessories([...selectedAccessories, acc.id]);
                }
              }}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package size={24} className="text-gray-400" />
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAccessories.includes(acc.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}>
                  {selectedAccessories.includes(acc.id) && <Check size={14} className="text-white" />}
                </div>
              </div>
              <h3 className="font-medium mt-3">{acc.name}</h3>
              <p className="text-sm text-gray-500">{acc.category}</p>
              <p className="text-lg font-semibold mt-2">${acc.price}</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="secondary" onClick={() => setStep('results')}>
            Skip for now
          </Button>
          <Button onClick={() => setStep('summary')}>
            Review Order
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => {
    const selectedAccItems = accessories.filter(a => selectedAccessories.includes(a.id));
    const subtotal = (selectedBike?.price || 0) + selectedAccItems.reduce((sum, a) => sum + a.price, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setStep('accessories')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            <ChevronRight size={16} className="rotate-180" />
            Back to accessories
          </button>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Order Summary</h1>
            <p className="text-gray-500">Review your selections before checkout.</p>
          </div>

          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-4 pb-4 border-b">Your Selections</h3>
            <div className="space-y-4">
              {selectedBike && (
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border">
                    <Bike size={32} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{selectedBike.name}</p>
                    <p className="text-sm text-gray-500">{selectedBike.category}</p>
                  </div>
                  <p className="font-semibold">${selectedBike.price.toLocaleString()}</p>
                </div>
              )}
              {selectedAccItems.map(acc => (
                <div key={acc.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border">
                    <Package size={24} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{acc.name}</p>
                    <p className="text-sm text-gray-500">{acc.category}</p>
                  </div>
                  <p className="font-semibold">${acc.price}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-3 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200 mb-6">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Ready to complete your purchase?</p>
                <p className="text-sm text-blue-700 mt-1">A sales associate will finalize your order and help schedule test rides or delivery.</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="secondary" className="flex-1" icon={Share2}>
              Share with associate
            </Button>
            <Button className="flex-1" icon={ShoppingCart}>
              Complete Purchase
            </Button>
          </div>
        </div>
      </div>
    );
  };

  switch (step) {
    case 'welcome': return renderWelcome();
    case 'questionnaire': return renderQuestionnaire();
    case 'results': return renderResults();
    case 'accessories': return renderAccessories();
    case 'summary': return renderSummary();
    default: return renderWelcome();
  }
};

// ============ MAIN APP ============

export default function PeachtreeBikesApp() {
  const [userType, setUserType] = useState('store');
  const [darkMode, setDarkMode] = useState(false);

  const renderView = () => {
    switch (userType) {
      case 'admin': return <AdminView />;
      case 'store': return <InStoreView />;
      case 'customer': return <CustomerView />;
      default: return <InStoreView />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header
        title="Peachtree Bikes"
        subtitle={userType === 'admin' ? 'Admin Dashboard' : userType === 'store' ? 'In-store sales workspace' : 'Customer Experience'}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        userType={userType}
        onUserTypeChange={setUserType}
      />
      {renderView()}
    </div>
  );
}
