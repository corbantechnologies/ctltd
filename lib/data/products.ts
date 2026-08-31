export interface ProductHighlight {
  title: string;
  desc: string;
  iconName: string;
}

export interface ProductModule {
  title: string;
  desc: string;
  items: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface MockupMetric {
  label: string;
  value: string;
  trend?: string;
}

export interface MockupLedgerItem {
  title: string;
  subtitle: string;
  amount?: string;
  status?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  rank: number;
  name: string;
  shortTag: string;
  category: string;
  statusBadge: string;
  statusTone: "emerald" | "blue" | "amber";
  domain?: string;
  liveUrl?: string;
  heroHeadline: string;
  summary: string;
  highlights: ProductHighlight[];
  modules: ProductModule[];
  specs: ProductSpec[];
  techStack: string[];
  mockup: {
    browserUrl: string;
    windowTitle: string;
    metrics: MockupMetric[];
    ledgerItems: MockupLedgerItem[];
  };
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "sacco",
    slug: "sacco",
    rank: 1,
    name: "SACCO & Cooperative Core Banking Platform",
    shortTag: "SACCO Platform",
    category: "Financial Technology",
    statusBadge: "3 Kenyan SACCOs Live",
    statusTone: "emerald",
    domain: "wananchimali.com",
    liveUrl: "https://www.wananchimali.com/",
    heroHeadline: "The Complete Digital Core Banking System for SACCOs & Cooperatives",
    summary:
      "Enterprise core banking engine built for Kenyan SACCOs, chamas, and microfinances. Features full double-entry GL accounting, member self-service portals, admin branch manager workspaces, Safaricom Daraja M-Pesa STK Push deposits, and automated loan appraisal. Access demos and member portals via Wananchi Mali.",
    highlights: [
      {
        iconName: "Users",
        title: "Member CRM & Directory",
        desc: "Full CRM with bulk CSV onboarding, Next of Kin (NOK) tracking, role-based access, and active members audit exports.",
      },
      {
        iconName: "PiggyBank",
        title: "Multi-Pot Savings Engine",
        desc: "Share Capital, Holiday, Emergency, and monthly deposits tracked in real time with individual statement downloads.",
      },
      {
        iconName: "CreditCard",
        title: "Dual Loan Calculation Engine",
        desc: "Diminishing Balance and Flat Rate interest logic with automated guarantor approvals and penalty schedules.",
      },
      {
        iconName: "Smartphone",
        title: "Safaricom Daraja API Integration",
        desc: "Sub-second C2B STK Push deposits and automated B2C disbursement for approved loans.",
      },
      {
        iconName: "BookOpen",
        title: "Automated Double-Entry GL",
        desc: "Real-time ledger posting on every transaction with zero manual accounting work.",
      },
      {
        iconName: "BarChart3",
        title: "Executive & SASRA Reporting",
        desc: "Live Balance Sheet, Trial Balance, Profit & Loss, Debtors ledgers, and SASRA regulatory schedules.",
      },
    ],
    modules: [
      {
        title: "Member Self-Service Portal",
        desc: "Responsive web and mobile portal giving cooperative members 24/7 visibility into their accounts.",
        items: [
          "Instant savings deposits via Safaricom Daraja STK Push",
          "Loan application with automated savings eligibility appraisal",
          "Digital guarantor requests with instant SMS/email approvals",
          "Per-pot statement downloads and transaction history",
          "Next of Kin (NOK) relationship management",
        ],
      },
      {
        title: "Branch Administration Workspace",
        desc: "Comprehensive operations console for SACCO tellers, loan officers, and branch managers.",
        items: [
          "Bulk CSV upload for deposits, recurring fees, and loan repayments",
          "Multi-stage loan approval pipeline with guarantor verification",
          "Automated B2C M-Pesa loan disbursement upon approval",
          "Member KYC directory with active balance summaries",
          "Daily cash book and teller reconciliation sheets",
        ],
      },
      {
        title: "Core Double-Entry General Ledger",
        desc: "Financial accounting engine built from the ground up for strict cooperative compliance.",
        items: [
          "Automatic double-entry posting on every deposit, loan, and fee",
          "Real-time Trial Balance, Balance Sheet, and P&L generation",
          "Manual journal batches for adjustments and bank reconciliation",
          "Year-based financial filtering and multi-year audit logs",
          "Debtors aging analysis and non-performing loan provisions",
        ],
      },
      {
        title: "Dividend & AGM Distribution Engine",
        desc: "Advanced mathematical engine calculating member dividend shares accurately.",
        items: [
          "Weighted average share capital dividend calculations",
          "Customizable dividend payout rates approved at AGMs",
          "Automated withholding tax (WHT) deductions",
          "One-click batch distribution directly into member savings pots",
          "Exportable AGM member dividend schedules",
        ],
      },
    ],
    specs: [
      { label: "Active Deployments", value: "3 Kenyan SACCOs in Production" },
      { label: "Corporate Portal", value: "wananchimali.com" },
      { label: "Regulatory Ready", value: "SASRA & KRA ITMS Compliant" },
      { label: "Payment Rails", value: "Safaricom Daraja API (STK & B2C)" },
      { label: "Cloud Hosting", value: "Dedicated GCP Compute & Postgres" },
      { label: "Data Isolation", value: "Tenant Schema Boundary Isolation" },
    ],
    techStack: ["Next.js 15", "Django REST Framework", "PostgreSQL", "Daraja API"],
    mockup: {
      browserUrl: "https://www.wananchimali.com/admin/dashboard",
      windowTitle: "Wananchi Mali SACCO — Branch Core Management",
      metrics: [
        { label: "Total Asset Base", value: "KES 42.8M", trend: "+14% MoM" },
        { label: "Active Members", value: "1,420+", trend: "3 Cooperatives" },
        { label: "M-Pesa Collections", value: "KES 8.4M", trend: "Real-time" },
      ],
      ledgerItems: [
        {
          title: "M-Pesa STK Deposit — Account #WM-4091",
          subtitle: "Member: J. Mwangi · Share Capital Pot",
          amount: "+KES 15,000.00",
          status: "Cleared",
        },
        {
          title: "Loan Disbursement — Diminishing Balance",
          subtitle: "Approved by SACCO Admin · B2C Daraja",
          amount: "-KES 150,000.00",
          status: "Disbursed",
        },
      ],
    },
  },
  {
    id: "finance",
    slug: "finance",
    rank: 2,
    name: "MannaBooks — SME Accounting & General Ledger",
    shortTag: "MannaBooks",
    category: "Fintech & SME Accounting",
    statusBadge: "MannaBooks Flagship Accounting",
    statusTone: "blue",
    domain: "mannabooks.co.ke · fedhahub.co.ke",
    liveUrl: "https://www.mannabooks.co.ke/",
    heroHeadline: "Modern Double-Entry Bookkeeping, Invoicing & Financial General Ledger for SMEs",
    summary:
      "MannaBooks (mannabooks.co.ke) is Corban Technologies' flagship accounting SaaS built for East African SMEs. Features structured Chart of Accounts, quotes-to-invoice automation, customer receipting, KRA PAYE tax modeling, and real-time Balance Sheet and P&L ledgers. Accompanied by FedhaHub (fedhahub.co.ke), our dedicated financial blog and dividend intelligence hub.",
    highlights: [
      {
        iconName: "BookOpen",
        title: "Strict Double-Entry General Ledger",
        desc: "Structured Chart of Accounts (COA) across Assets, Liabilities, Equity, Income, and Expenses with automated journal posting.",
      },
      {
        iconName: "Receipt",
        title: "Quotations, Invoices & Receipting",
        desc: "Professional branded PDF quotes, one-click invoice generation, and automated customer payment receipts.",
      },
      {
        iconName: "Coins",
        title: "Kenyan KRA PAYE & Statutory Tax Engine",
        desc: "Statutory PAYE tax bracket formulas, relief computations, and automated deduction summaries.",
      },
      {
        iconName: "BarChart3",
        title: "Instant Financial Statements",
        desc: "Real-time Trial Balance, Profit & Loss, Balance Sheet, and General Ledger statements filterable by financial year.",
      },
      {
        iconName: "Calculator",
        title: "FedhaHub Financial Blog & Analytics",
        desc: "Supported by our dedicated financial publication (fedhahub.co.ke) providing AGM dividend models and advisory articles.",
      },
      {
        iconName: "TrendingUp",
        title: "Auditable Historical Logs",
        desc: "Immutable journal transaction records, user attribution timestamps, and full CSV/PDF financial export.",
      },
    ],
    modules: [
      {
        title: "MannaBooks: Core SME General Ledger",
        desc: "The primary accounting workspace engineered to eliminate spreadsheets and maintain perfectly balanced books.",
        items: [
          "Complete Chart of Accounts (COA) hierarchy management",
          "Automated journal batch creation with debit/credit balance verification",
          "Customer quotation creation with conversion to VAT tax invoices",
          "M-Pesa, Bank Wire, and Cash payment receipting linked to invoices",
          "Vendor bills tracking and accounts payable schedules",
        ],
      },
      {
        title: "Financial Statements & Executive Reports",
        desc: "Instant visibility into business profitability, cash flow, and financial health.",
        items: [
          "Real-time Profit & Loss (P&L) statements with gross and net margin breakdown",
          "Balance Sheet generation reflecting current assets, liabilities, and retained earnings",
          "Full Trial Balance verification ensuring accounting equation integrity",
          "Detailed ledger statement downloads per individual account code",
          "Year-end closing journal assistance and rollover balances",
        ],
      },
      {
        title: "KRA Tax Modeling & Statutory Deductions",
        desc: "Built-in compliance algorithms tailored for Kenyan payroll and tax reporting.",
        items: [
          "Kenyan KRA PAYE tax bracket calculation schedules",
          "NHIF/SHIF and NSSF statutory deduction computations",
          "Withholding tax (WHT) deduction ledgers and summaries",
          "Tax schedules exportable for iTax return filing",
        ],
      },
      {
        title: "FedhaHub Financial Publication (fedhahub.co.ke)",
        desc: "Corban's companion financial blog and dividend modeling publication.",
        items: [
          "In-depth articles and guides on SACCO governance and SME financial management",
          "SACCO dividend distribution formulas and AGM projection models",
          "Loan amortization simulators comparing Diminishing vs Flat rate interest",
          "Educational resources for business founders and accountants",
        ],
      },
    ],
    specs: [
      { label: "Flagship Accounting", value: "mannabooks.co.ke" },
      { label: "Financial Blog", value: "fedhahub.co.ke" },
      { label: "Accounting Basis", value: "Strict Double-Entry GL" },
      { label: "Tax System", value: "Kenyan KRA PAYE Ready" },
      { label: "Database", value: "PostgreSQL with Drizzle ORM" },
      { label: "Data Export", value: "PDF, Excel & CSV Schedules" },
    ],
    techStack: ["Next.js", "Drizzle ORM", "PostgreSQL", "Python Analytics"],
    mockup: {
      browserUrl: "https://www.mannabooks.co.ke/app/ledger",
      windowTitle: "MannaBooks — SME General Ledger & Accounting",
      metrics: [
        { label: "Invoiced Revenue", value: "KES 4.2M", trend: "Balanced" },
        { label: "General Ledger", value: "100% Balanced", trend: "Double-entry" },
        { label: "KRA PAYE Cleared", value: "Reconciled", trend: "Compliant" },
      ],
      ledgerItems: [
        {
          title: "Double-Entry Journal #JRN-2026-08",
          subtitle: "Customer Invoice #INV-1092 Cleared via M-Pesa",
          amount: "+KES 85,000.00",
          status: "Posted",
        },
        {
          title: "KRA Statutory PAYE Deduction Schedule",
          subtitle: "General Ledger Account #2100 (Tax Liabilities)",
          amount: "Balanced",
          status: "Reconciled",
        },
      ],
    },
  },
  {
    id: "retail",
    slug: "retail",
    rank: 3,
    name: "Omnichannel Commerce, E-Shop & Barcode POS",
    shortTag: "Retail & E-Shop",
    category: "Omnichannel Retail & E-Commerce",
    statusBadge: "Live Clients (GearHouse & Clate)",
    statusTone: "emerald",
    domain: "gearhouse.co.ke · clatecosmetics.com",
    liveUrl: "https://www.gearhouse.co.ke/",
    heroHeadline: "Omnichannel E-Commerce Storefronts, Barcode POS & Real-Time Inventory Control",
    summary:
      "Enterprise commerce infrastructure uniting digital customer e-shops with high-speed barcode cashier POS terminals. Trusted by live retail brands including Clate Cosmetics (clatecosmetics.com) for online beauty shop management and GearHouse Africa (gearhouse.co.ke) for omnichannel retail and POS operations.",
    highlights: [
      {
        iconName: "Store",
        title: "Online Customer E-Shop Storefront",
        desc: "Powers digital e-commerce shops like Clate Cosmetics with responsive product catalogs, live stock, and mobile carts.",
      },
      {
        iconName: "ScanBarcode",
        title: "Barcode Cashier POS Terminal",
        desc: "Sub-second product barcode scanning, fast search, multi-item cart management, and split payment methods.",
      },
      {
        iconName: "Smartphone",
        title: "Direct M-Pesa STK Push Checkout",
        desc: "Instant Safaricom Daraja STK prompt to customer handsets for frictionless counter and online purchases.",
      },
      {
        iconName: "Boxes",
        title: "Inventory Batch & Stock Control",
        desc: "Automated stock level deduction, low-stock threshold alerts, supplier receipting, and batch expiry tracking.",
      },
      {
        iconName: "Receipt",
        title: "Thermal Receipt Printing",
        desc: "Instant USB/Bluetooth thermal printer integration with branded customer receipts and digital SMS slips.",
      },
      {
        iconName: "TrendingUp",
        title: "Daily Cash Drawer Reconciliation",
        desc: "End-of-day teller cash declarations, sales audit logs, and gross margin profit reports.",
      },
    ],
    modules: [
      {
        title: "Omnichannel E-Commerce Storefront (Clate Cosmetics)",
        desc: "Modern digital customer shopping experience tailored for beauty brands, specialty shops, and online retailers.",
        items: [
          "Responsive product showcase with high-res galleries, variant selectors, and customer reviews",
          "Direct M-Pesa STK checkout with automated payment confirmation and digital order receipts",
          "Order fulfillment workflow: Pending, Processing, Dispatched, and Delivered",
          "Customer accounts with order history and saved delivery addresses",
          "Search engine optimized (SEO) product pages with social share previews",
        ],
      },
      {
        title: "Point-of-Sale (POS) Cashier Workspace (GearHouse Africa)",
        desc: "High-speed retail counter interface built for busy physical stores with zero lag.",
        items: [
          "Barcode scanner integration for instant SKU scanning and cart addition",
          "Split tender support: M-Pesa STK Push, Cash, Credit Card, and Store Credit",
          "Hold and resume shopping carts during peak customer checkout queues",
          "Automated VAT calculation and thermal receipt printing",
          "Offline-tolerant checkout caching during transient internet drops",
        ],
      },
      {
        title: "Inventory & Warehouse Stock Control",
        desc: "Centralized inventory management synchronizing online e-shops with physical store shelves.",
        items: [
          "Real-time stock synchronization across web stores and physical locations",
          "Supplier purchase orders (PO) and goods received note (GRN) logging",
          "Automated cost of goods sold (COGS) and gross profit margin tracking",
          "Low-stock dashboard indicators and automated reorder alerts",
          "Barcode label generation and batch printing",
        ],
      },
      {
        title: "Retail Analytics & Executive Intelligence",
        desc: "Actionable business metrics for store managers, brand directors, and accountants.",
        items: [
          "Top-selling products and slow-moving stock identification",
          "Hourly and daily sales volume heatmaps",
          "Cashier shift performance and end-of-day cash drawer balancing",
          "Customer lifetime value and repeat purchase loyalty metrics",
          "Exportable accounting transaction sheets for MannaBooks integration",
        ],
      },
    ],
    specs: [
      { label: "E-Shop Client", value: "clatecosmetics.com" },
      { label: "Retail Client", value: "gearhouse.co.ke" },
      { label: "Architecture", value: "Online E-Shop + Cashier POS" },
      { label: "Payment Rails", value: "Instant Daraja M-Pesa STK Push" },
      { label: "Hardware Support", value: "Barcode Scanners & Thermal Printers" },
      { label: "Sync Speed", value: "Sub-Second Multi-Branch" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Django REST API", "Daraja API"],
    mockup: {
      browserUrl: "https://www.clatecosmetics.com/admin/catalog",
      windowTitle: "Clate Cosmetics & GearHouse — Commerce Hub",
      metrics: [
        { label: "Daily Transactions", value: "KES 284,500", trend: "+22% Today" },
        { label: "Catalog SKUs", value: "850+ Items", trend: "Synced" },
        { label: "Avg. Checkout Speed", value: "12 Seconds", trend: "M-Pesa STK" },
      ],
      ledgerItems: [
        {
          title: "Online E-Shop Order #CC-9021 (Clate Cosmetics)",
          subtitle: "Payment: M-Pesa STK Push Instant Receipt",
          amount: "+KES 4,500.00",
          status: "Paid & Dispatched",
        },
        {
          title: "POS Counter Sale #GH-412 (GearHouse Africa)",
          subtitle: "Barcode Scanned · Cashier Register #01",
          amount: "+KES 12,800.00",
          status: "Completed",
        },
      ],
    },
  },
  {
    id: "marketing",
    slug: "marketing",
    rank: 4,
    name: "Marketing CRM & Business Telecom Engine",
    shortTag: "Marketing Engine",
    category: "Enterprise Marketing & Telecom",
    statusBadge: "Client Pilot (LJK Marketing)",
    statusTone: "amber",
    domain: "ljkmarketingagency.co.ke",
    liveUrl: "https://www.ljkmarketingagency.co.ke/",
    heroHeadline: "Alphanumeric Telecom Broadcasts, Client CRM & Automated Billing",
    summary:
      "Enterprise marketing operations engine designed for agencies and high-volume businesses. Delivers high-throughput telecom routing, custom alphanumeric sender IDs, contact segmentation, campaign ROI analytics, and client billing funnels. In live pilot with LJK Marketing Agency (ljkmarketingagency.co.ke).",
    highlights: [
      {
        iconName: "Radio",
        title: "Alphanumeric Sender ID Dispatch",
        desc: "Custom branded telecom sender IDs routed through certified high-throughput mobile network channels.",
      },
      {
        iconName: "Users",
        title: "Client CRM & Lead Funnels",
        desc: "Interactive deal pipeline, lead intake forms, contact segmentation, and customer communication timelines.",
      },
      {
        iconName: "Send",
        title: "High-Volume Campaign Scheduler",
        desc: "Schedule targeted bulk broadcast batches with dynamic tag merge variables and audience filtering.",
      },
      {
        iconName: "Wallet",
        title: "Automated M-Pesa Prepaid Billing",
        desc: "Instant wallet top-ups via Daraja STK Push with transparent per-message pricing and real-time balance debits.",
      },
      {
        iconName: "BarChart3",
        title: "Real-Time Delivery Analytics",
        desc: "Detailed breakdown of sent, delivered, failed, and bounced messages with carrier delivery receipts (DLR).",
      },
      {
        iconName: "Lock",
        title: "Enterprise Security & OTPs",
        desc: "High-priority OTP authentication routes for sensitive customer logins and verification workflows.",
      },
    ],
    modules: [
      {
        title: "Telecom Messaging & Broadcast Engine",
        desc: "Engineered for marketing agencies and enterprises requiring dependable high-speed message delivery.",
        items: [
          "High-throughput telecom queue processing up to 500 messages per second",
          "Personalized SMS broadcasting with dynamic tags (e.g. Member Name, Balance, Custom Link)",
          "Automated opt-out (STOP) management ensuring telecom compliance",
          "Multi-lingual character encoding support and long-message concatenation",
          "Scheduled campaign drafts with automatic time-zone delivery windows",
        ],
      },
      {
        title: "Client CRM & Deal Management",
        desc: "Comprehensive client pipeline tailored for marketing consultancies and B2B service firms.",
        items: [
          "Visual deal stages from 'Lead Captured' to 'Proposal Sent' and 'Closed Won'",
          "Contact management with custom tags, interaction history, and notes",
          "Automated client welcome emails and workspace onboarding links",
          "Shared team inbox for incoming inquiries and client correspondence",
          "Client project tracking with milestone status indicators",
        ],
      },
      {
        title: "Prepaid Wallet & Billing Automation",
        desc: "Zero-friction financial rails ensuring continuous campaign dispatch without credit bottlenecks.",
        items: [
          "Self-service M-Pesa STK Push wallet top-ups directly within the dashboard",
          "Automated VAT tax invoices generated and emailed upon credit replenishment",
          "Low-balance alert triggers warning managers before credits deplete",
          "Multi-tier volume discount rules for enterprise clients",
          "Real-time ledger statements detailing every credit deduction",
        ],
      },
      {
        title: "Telecom Gateway Integration & APIs",
        desc: "Developer-first REST APIs allowing third-party ERPs and web platforms to trigger messages.",
        items: [
          "API key generation with granular permission scopes and rate limiting",
          "Sub-second transactional OTP delivery for multi-factor authentication",
          "Real-time webhook listener dispatching delivery status updates to client servers",
          "Comprehensive API documentation with cURL, Python, and JavaScript snippets",
          "Dedicated cloud infrastructure with 99.9% uptime SLA",
        ],
      },
    ],
    specs: [
      { label: "Pilot Client", value: "ljkmarketingagency.co.ke" },
      { label: "Throughput", value: "500 Messages / Second" },
      { label: "Sender IDs", value: "Alphanumeric Certified" },
      { label: "Billing", value: "Automated Daraja M-Pesa Wallet" },
      { label: "Architecture", value: "Next.js 15 + Django REST + Postgres" },
      { label: "Carrier Routes", value: "Certified East African Telecom" },
    ],
    techStack: ["Next.js 15", "Django REST", "PostgreSQL", "Telecom Gateways"],
    mockup: {
      browserUrl: "https://www.ljkmarketingagency.co.ke/app/campaigns",
      windowTitle: "LJK Marketing Agency — Business Telecom Workspace",
      metrics: [
        { label: "Campaigns Dispatched", value: "128,400", trend: "99.2% Delivery" },
        { label: "Active Sender IDs", value: "Verified", trend: "Telecom Route" },
        { label: "Lead Conversions", value: "32.4%", trend: "Tracked" },
      ],
      ledgerItems: [
        {
          title: "LJK Telecom Broadcast — Alphanumeric Sender",
          subtitle: "Batch #LJK-774 · 24,000 Delivered SMS",
          amount: "99.4% Delivery",
          status: "Dispatched",
        },
        {
          title: "CRM Deal Conversion Funnel",
          subtitle: "Lead Attribution & Client Wallet Debited",
          amount: "Active",
          status: "Attributed",
        },
      ],
    },
  },
  {
    id: "logistics",
    slug: "logistics",
    rank: 5,
    name: "CT Drive — Freight, Waybills & Fleet Logistics OS",
    shortTag: "CT Drive Logistics",
    category: "Logistics & Supply Chain",
    statusBadge: "CT Drive Logistics Platform",
    statusTone: "blue",
    domain: "ctdrive.co.ke",
    liveUrl: "https://www.ctdrive.co.ke/",
    heroHeadline: "Waybill Automation, Fleet Dispatch & Real-Time Cargo Tracking",
    summary:
      "CT Drive (ctdrive.co.ke) is Corban Technologies' logistics operating system engineered for cargo transporters, parcel couriers, and regional fleet operators. Simplifies waybill generation, shipment tracking timelines, dispatch manifest scheduling, driver assignations, and proof-of-delivery receipts.",
    highlights: [
      {
        iconName: "Barcode",
        title: "Automated Waybill & Barcode Issuance",
        desc: "Instant waybill PDF generation with unique scannable barcodes for parcels, cargo pallets, and container loads.",
      },
      {
        iconName: "Navigation",
        title: "Real-Time Shipment Milestone Tracking",
        desc: "Live status updates: Created, Manifested, In Transit, Arrived at Hub, and Out for Delivery.",
      },
      {
        iconName: "Truck",
        title: "Fleet Vehicle & Driver Dispatch",
        desc: "Assign trucks, assign drivers, generate cargo manifests, and balance multi-hub transport capacities.",
      },
      {
        iconName: "Smartphone",
        title: "Automated Customer SMS Alerts",
        desc: "Senders and receivers receive instant tracking links and automated milestone SMS notifications.",
      },
      {
        iconName: "FileCheck2",
        title: "Digital Proof of Delivery (POD)",
        desc: "Delivery drivers capture recipient signatures, ID photos, and OTP confirmation codes on arrival.",
      },
      {
        iconName: "Clock",
        title: "Multi-Hub Depot Operations",
        desc: "Streamline cargo handoffs between central depots in Mombasa, Nairobi, Nakuru, Kisumu, and regional drop points.",
      },
    ],
    modules: [
      {
        title: "Waybill & Parcel Ingestion Center",
        desc: "High-speed front-desk cargo intake interface for logistics agents and depot staff.",
        items: [
          "Rapid sender and consignee detail capture with address autocompletion",
          "Weight, volumetric dimension, and package fragility classification",
          "Automated freight rate calculation based on weight, distance, and insurance",
          "Instant thermal waybill label printing with scannable Code-128 barcodes",
          "Payment integration for cash, corporate billing accounts, or M-Pesa STK Push",
        ],
      },
      {
        title: "Fleet Manifest & Route Dispatch",
        desc: "Optimized logistics dispatch console for warehouse managers and fleet controllers.",
        items: [
          "Consolidated trip manifests grouping multiple parcels onto designated trucks",
          "Truck capacity utilization indicators (weight and volume load meters)",
          "Driver assignment with digital delivery trip sheets and contact lists",
          "Inter-depot transfer manifests with origin and destination station sign-offs",
          "Fuel allocation, toll fees, and transit expense recording",
        ],
      },
      {
        title: "Consignee Tracking & Customer Experience",
        desc: "Self-service web and mobile tracking interface for senders and recipients.",
        items: [
          "Public tracking lookup page requiring only the unique waybill number",
          "Milestone timeline displaying exact timestamps and station checkpoints",
          "SMS notifications dispatched upon critical transit updates",
          "Estimated arrival time (ETA) calculations based on route progress",
          "Delivery address change or pickup point selection requests",
        ],
      },
      {
        title: "Digital Proof of Delivery (POD) & Billing",
        desc: "Eliminates lost delivery sheets and provides instant financial reconciliation.",
        items: [
          "Mobile-optimized delivery driver sign-off screen",
          "OTP delivery confirmation sent directly to the recipient's phone",
          "Immediate cloud upload of stamped delivery documents and recipient signatures",
          "Corporate monthly billing statements with linked POD proof attachments",
          "Claims management and damaged goods incident logging",
        ],
      },
    ],
    specs: [
      { label: "Platform Brand", value: "CT Drive (ctdrive.co.ke)" },
      { label: "Barcode Standard", value: "Code-128 & QR Compatible" },
      { label: "Transit Routes", value: "Multi-Hub (Mombasa-Nairobi-Regional)" },
      { label: "Database Engine", value: "PostgreSQL with Drizzle ORM" },
      { label: "Hosting", value: "High-Availability Cloud Container" },
      { label: "POD Security", value: "OTP & Digital Signature Validated" },
    ],
    techStack: ["Next.js", "Drizzle ORM", "PostgreSQL", "Cloud Compute"],
    mockup: {
      browserUrl: "https://www.ctdrive.co.ke/dispatch/manifest",
      windowTitle: "CT Drive — Fleet & Waybill Dispatch Center",
      metrics: [
        { label: "Active Waybills", value: "342 Parcels", trend: "In Transit" },
        { label: "On-Time Dispatch", value: "98.8%", trend: "Mombasa-Nairobi" },
        { label: "Fleet Capacity", value: "18 Trucks", trend: "Allocated" },
      ],
      ledgerItems: [
        {
          title: "Waybill #CT-MBS-9021 (Mombasa to Nairobi)",
          subtitle: "Carrier Manifest: Truck KBZ 412M · In Transit",
          amount: "Out for Delivery",
          status: "In Transit",
        },
        {
          title: "Digital Proof of Delivery (POD)",
          subtitle: "Recipient Signature Verified via OTP",
          amount: "Confirmed",
          status: "Delivered",
        },
      ],
    },
  },
  {
    id: "events",
    slug: "events",
    rank: 6,
    name: "Sherehe — Digital Event Ticketing & QR Passes",
    shortTag: "Sherehe Tickets",
    category: "Events & Digital Passes",
    statusBadge: "Sherehe Live Platform",
    statusTone: "emerald",
    domain: "sherehe.co.ke",
    liveUrl: "https://www.sherehe.co.ke/",
    heroHeadline: "Instant M-Pesa Ticketing, Encrypted QR Passes & Gate Scanner Validation",
    summary:
      "Sherehe (sherehe.co.ke) is Kenya's high-speed event ticketing ecosystem for concert organizers, conferences, and sports venues across Kenya. Offers direct Safaricom Daraja ticket purchasing, anti-counterfeit QR code passes, real-time gate scanner mobile app, and instant organizer settlements.",
    highlights: [
      {
        iconName: "QrCode",
        title: "Encrypted Anti-Counterfeit QR Passes",
        desc: "Dynamic single-use QR codes sent via SMS, email, and wallet passes with zero ticket forgery risk.",
      },
      {
        iconName: "Smartphone",
        title: "Frictionless Daraja STK Push Checkout",
        desc: "Attendees enter their phone number and receive an instant M-Pesa PIN prompt for sub-5-second checkout.",
      },
      {
        iconName: "Scan",
        title: "Sub-Second Gate Scanner Validation",
        desc: "Dedicated mobile scanner app for event gate stewards validating tickets in 0.4 seconds and catching duplicates.",
      },
      {
        iconName: "Ticket",
        title: "Multi-Tier Ticket & Promo Management",
        desc: "Create Early Bird, Regular, VIP, VVIP, and Group ticket bundles with automated countdown timers.",
      },
      {
        iconName: "BarChart3",
        title: "Live Organizer Revenue Dashboard",
        desc: "Real-time ticket sales volume, gate admission velocity heatmaps, and gross box office tracking.",
      },
      {
        iconName: "Coins",
        title: "Automated Organizer Settlements",
        desc: "Automated B2C disbursement and bank settlement payouts following successful event reconciliations.",
      },
    ],
    modules: [
      {
        title: "Event Organizer Console & Ticketing Setup",
        desc: "Comprehensive web management dashboard for event promoters, venues, and festival directors.",
        items: [
          "Rapid event landing page creation with custom branding, posters, and venue maps",
          "Multi-tier ticket categories with custom quantity limits and sales start/end times",
          "Promo code and discount coupon engine with percentage or fixed fee deductions",
          "Affiliate marketing links allowing promoters to track ticket referral conversions",
          "Complimentary VIP pass generation and direct digital dispatch",
        ],
      },
      {
        title: "High-Speed Mobile Gate Scanner App",
        desc: "Ultra-fast mobile gate check-in application built for high-throughput venue turnstiles.",
        items: [
          "Instant camera barcode / QR code scanning under 0.4 seconds per attendee",
          "Visual and audio feedback (Green Chime = Valid, Red Alarm = Duplicate / Invalid)",
          "Offline ticket database caching allowing validation even if venue Wi-Fi drops",
          "Gate admission logs showing which gate, time, and steward scanned each pass",
          "Real-time inside-venue attendee headcount tracking",
        ],
      },
      {
        title: "Frictionless Attendee Checkout Experience",
        desc: "Designed to maximize checkout conversions with zero unnecessary registration hurdles.",
        items: [
          "Instant mobile-optimized checkout requiring only attendee name, phone, and email",
          "Safaricom Daraja STK Push trigger directly to the buyer's handset",
          "Immediate SMS with direct link to view and download high-resolution QR tickets",
          "Digital PDF ticket attachment sent to email with venue directions and calendar invite",
        ],
      },
      {
        title: "Financial Settlement & Reconciliation Engine",
        desc: "Transparent, automated revenue distribution for event organizers and venue partners.",
        items: [
          "Real-time gross box office reconciliation against Safaricom Paybill collections",
          "Transparent platform fee deduction with zero hidden charges",
          "Direct B2C M-Pesa or Bank wire payouts to organizer accounts",
          "Detailed financial audit statements for accounting and KRA withholding tax compliance",
          "Post-event comprehensive attendee demographics and sales report",
        ],
      },
    ],
    specs: [
      { label: "Live Domain", value: "sherehe.co.ke" },
      { label: "Gate Scan Latency", value: "0.4s / Pass (Sub-Second)" },
      { label: "Payment Verification", value: "Instant Daraja STK Webhooks" },
      { label: "Security Engine", value: "Time-Signed Encrypted QR" },
      { label: "Hosting Infrastructure", value: "Edge-Cached Next.js + Postgres" },
      { label: "Offline Mode", value: "Gate Scanner Cache Resilient" },
    ],
    techStack: ["Next.js", "PostgreSQL", "Daraja API", "QR Crypto"],
    mockup: {
      browserUrl: "https://www.sherehe.co.ke/organizer/gate-scan",
      windowTitle: "Sherehe Tickets Kenya — Gate Admission Controller",
      metrics: [
        { label: "Tickets Scanned", value: "3,850", trend: "Zero duplicates" },
        { label: "Gross Box Office", value: "KES 5.2M", trend: "Daraja Verified" },
        { label: "Gate Scan Speed", value: "0.4s / pass", trend: "Encrypted QR" },
      ],
      ledgerItems: [
        {
          title: "Gate QR Scanner #GATE-02 (VIP Pass)",
          subtitle: "Attendee: D. Otieno · Sherehe Tickets Kenya",
          amount: "ADMITTED",
          status: "Verified",
        },
        {
          title: "M-Pesa STK Instant Checkout",
          subtitle: "2x Early Bird Tickets · Daraja B2C Cleared",
          amount: "KES 3,000.00",
          status: "Cleared",
        },
      ],
    },
  },
];

export function getAllProducts(): ProductItem[] {
  return PRODUCTS_DATA;
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS_DATA.find((p) => p.slug === slug || p.id === slug);
}
