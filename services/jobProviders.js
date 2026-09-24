/*
Authorized provider adapter.
Use this file to connect a legitimate job API available to your project.
Expected normalized fields:
external_id, provider, source_type, company, title, description, skills,
location, state, country, min_salary, max_salary, experience_min,
experience_max, job_type, work_mode, application_url, posted_at.

The bundled demo provider is intentionally labeled DEMO.
*/
class DemoProvider{
 async fetchJobs(){
  return []; // Initial data is in database/seed.sql.
 }
}
module.exports={DemoProvider};
