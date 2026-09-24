# CareerJob — Complete Database Project

CareerJob is a database-first full-stack job discovery and recommendation platform.

## Main idea

The MySQL database is the heart of the project. Users, profiles, skills, companies, jobs, saved jobs, applications, recommendations and synchronization logs are stored in normalized relational tables.

The recommendation engine reads the user's profile and ranks jobs using:
- skill overlap
- preferred location
- Maharashtra proximity
- experience range
- job type
- work mode
- salary
- job freshness

## Two login systems

### User
Users register/login and can:
- complete profile
- add skills
- search/filter jobs
- see personalized recommendations
- see match percentage and reasons
- save jobs
- open provider application links
- track application stages

### Admin
Admin has a separate login page and dashboard.
Admin can:
- view users
- view companies
- add/edit/delete jobs
- activate/deactivate jobs
- trigger job synchronization
- see synchronization history
- inspect database statistics

## Demo admin

Default seed account:
- Email: `admin@careerjob.local`
- Password: `Admin@12345`

Change this in production.

## Job data

The project ships with a substantial seed dataset of realistic companies and job opportunities focused on India/Maharashtra. These are **sample/demo records**, not claims of currently open vacancies.

For legitimate real-time data, connect an authorized job API/provider in `services/jobProviders.js`. The provider adapter stores normalized results in MySQL. Do not scrape sites that prohibit automated collection.

## Installation

1. Install Node.js 18+.
2. Install MySQL 8+.
3. Create database and tables:

```bash
mysql -u root -p < database/schema.sql
```

4. Insert demo data:

```bash
mysql -u root -p careerjob < database/seed.sql
```

5. Copy `.env.example` to `.env`.
6. Set your MySQL credentials.
7. Install packages:

```bash
npm install
```

8. Start:

```bash
npm start
```

9. Open:
- User site: `http://localhost:5000`
- Admin site: `http://localhost:5000/admin.html`

## Important

The application does not pretend that seed records are live vacancies. Each seed job has `source_type = 'DEMO'`.

For a production project, use a provider that grants API access and follow its terms/licensing.
