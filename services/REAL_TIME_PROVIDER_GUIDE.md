# Real-time provider integration

CareerJob deliberately does not label the bundled seed data as live vacancies.

To make production data live:
1. Obtain authorized API access from a job provider.
2. Implement `fetchJobs()` in `services/jobProviders.js`.
3. Normalize provider records to the documented fields.
4. Keep provider attribution and source type.
5. Run `POST /api/admin/sync` from the admin panel.
6. Store the normalized records in MySQL.

Do not scrape job sites if their terms or robots rules prohibit automated collection.
