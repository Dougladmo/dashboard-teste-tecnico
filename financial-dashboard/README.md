# Financial Dashboard

A financial dashboard built with Next.js and TypeScript, featuring login authentication, dynamic filters, transaction charts, and persistent state — all without a database.

## Features

- **Authentication** — Login page with protected dashboard route
- **Summary Cards** — Revenue, expenses, pending transactions, and net balance
- **Charts** — Stacked bar chart and line/area chart powered by ApexCharts
- **Global Filters** — Filter by date range, account, industry, and state; all content updates dynamically
- **Session Persistence** — Auth session and filter values persisted via `localStorage`
- **Responsive Design** — Mobile-first layout with collapsible sidebar
- **Unit Tests** — Jest + Testing Library for context and utility coverage

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript 5](https://www.typescriptlang.org/)
- [styled-components 6](https://styled-components.com/)
- [ApexCharts](https://apexcharts.com/) via `react-apexcharts`
- [MUI](https://mui.com/) (available, custom components used throughout)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)

## Prerequisites

- Node.js 18.17 or later
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd financial-dashboard

# Install dependencies
npm install
```

## Running Locally

```bash
# Development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage report
npm run test:coverage
```

## Demo Credentials

```
Email:    admin@dashboard.com
Password: admin123
```

## Data Source

The app reads from `transactions.json` (included in the root of the project) via an internal API route at `/api/transactions`.

Field reference:

| Field | Type | Description |
|-------|------|-------------|
| `date` | number | EPOCH in milliseconds |
| `amount` | string | Value without decimal separator — `"5565"` = $55.65 |
| `transaction_type` | string | `"deposit"` (revenue) or `"withdraw"` (expense) |
| `currency` | string | Transaction currency |
| `account` | string | Origin or destination company |
| `industry` | string | Industry category of the company |
| `state` | string | US state where the company is incorporated |

> The `transactions.json` file was not modified from the original provided in the challenge.

## Project Structure

```
src/
├── app/
│   ├── api/transactions/   # API route serving transactions.json
│   ├── dashboard/          # Protected dashboard page + layout
│   ├── login/              # Login page
│   └── page.tsx            # Root route guard
├── components/
│   ├── auth/               # LoginForm
│   ├── charts/             # StackedBarChart, TransactionLineChart
│   ├── dashboard/          # MetricsCards, FiltersPanel, TransactionsTable
│   ├── layout/             # Sidebar, MobileTopbar
│   └── ui/                 # Shared UI components (MultiSelect, etc.)
├── context/
│   ├── AuthContext.tsx     # Session management
│   ├── DataContext.tsx     # Transaction data fetching
│   └── FilterContext.tsx   # Global filter state
├── lib/
│   └── filterUtils.ts      # Filter and metrics calculation logic
├── styles/
│   ├── GlobalStyles.ts
│   └── theme.ts
└── types/
    └── index.ts
```

## Notes

- No external database is used. Session and filter state are persisted exclusively through `localStorage`.
- Charts are dynamically imported with `ssr: false` to prevent server-side rendering conflicts with ApexCharts.
- The API route includes HTTP cache headers (`s-maxage=3600`) and an in-process module-level cache to avoid re-reading the 11 MB JSON file on every request.
