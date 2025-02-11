# Bank of Little Rock 

A modern banking portal demo built with Next.js and React, featuring account management, transactions, loans, and interactive data visualization.

## Features

- **Secure Authentication**: Login system with session management
- **Dashboard Overview**: Account balances and recent activity
- **Transaction Management**: View and download transaction history with PDF generation
- **Loan Management**: Interactive charts showing loan distribution and trends
- **Responsive Design**: Mobile-first approach with modern UI components

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Recharts for data visualization
- jsPDF for PDF generation

## Getting Started

### Local Development

```sh
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd banking-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8080` to view the application.

### Docker Deployment

```sh
# Build the Docker image
docker build -t bank-of-little-rock .

# Run the container
docker run -p 8080:8080 bank-of-little-rock
```

The application will be available at `http://localhost:8080`.

## Project Structure

- `/src/pages` - Main application pages
- `/src/components` - Reusable UI components
- `/public` - Static assets including bank logo
- `/src/contexts` - React context providers
- `/src/components/ui` - shadcn/ui components

## Development

The project uses:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## Docker Environment Variables

The following environment variables can be configured when running the Docker container:

```sh
# Example with custom configuration
docker run -p 8080:8080 \
  -e NODE_ENV=production \
  -e API_URL=https://api.example.com \
  bank-of-little-rock
```

Available environment variables:
- `NODE_ENV`: Set to 'production' for production deployment
- `API_URL`: Backend API URL (if applicable)
- `PORT`: Port to run the application (defaults to 8080)
