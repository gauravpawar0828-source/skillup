USE careerjob;

INSERT INTO skills(name) VALUES
('JavaScript'),('Node.js'),('Express.js'),('MySQL'),('SQL'),('React'),('HTML'),('CSS'),('Java'),
('Python'),('C++'),('C'),('Git'),('REST API'),('MongoDB'),('AWS'),('Docker'),('TypeScript'),
('Angular'),('Spring Boot'),('Data Structures'),('Machine Learning'),('Pandas'),('Power BI'),
('Figma'),('UI/UX'),('Cyber Security'),('Linux'),('Azure'),('Kubernetes')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO companies(name,industry,description,website,headquarters,is_verified) VALUES
('Tata Consultancy Services','IT Services','Large technology services and consulting organization.','https://www.tcs.com','Mumbai, Maharashtra',1),
('Infosys','IT Services','Technology services, consulting and digital transformation company.','https://www.infosys.com','Pune, Maharashtra',1),
('Accenture India','Consulting & Technology','Technology and business consulting organization.','https://www.accenture.com','Mumbai, Maharashtra',1),
('Capgemini India','IT Services','Technology, engineering and consulting services.','https://www.capgemini.com','Mumbai, Maharashtra',1),
('Tech Mahindra','IT Services','Digital transformation, consulting and technology services.','https://www.techmahindra.com','Pune, Maharashtra',1),
('LTIMindtree','IT Services','Technology consulting and digital solutions organization.','https://www.ltimindtree.com','Mumbai, Maharashtra',1),
('Persistent Systems','Software & Cloud','Software engineering, cloud and digital product engineering.','https://www.persistent.com','Pune, Maharashtra',1),
('Reliance Jio','Telecom & Technology','Digital services and telecommunications organization.','https://www.jio.com','Navi Mumbai, Maharashtra',1),
('Deloitte India','Consulting','Audit, consulting, financial advisory, risk and technology services.','https://www.deloitte.com','Mumbai, Maharashtra',1),
('Zoho','Software Products','Business software and cloud applications company.','https://www.zoho.com','Chennai, Tamil Nadu',1),
('Freshworks','SaaS','Customer and employee experience software company.','https://www.freshworks.com','Chennai, Tamil Nadu',1),
('Microsoft India','Technology','Cloud, software and developer platform company.','https://www.microsoft.com','Hyderabad, Telangana',1),
('Amazon India','E-commerce & Cloud','Technology, e-commerce and cloud services organization.','https://www.amazon.jobs','Mumbai, Maharashtra',1),
('Flipkart','E-commerce','Indian digital commerce and technology company.','https://www.flipkartcareers.com','Bengaluru, Karnataka',1),
('Wipro','IT Services','Information technology, consulting and business process services.','https://www.wipro.com','Pune, Maharashtra',1)
ON DUPLICATE KEY UPDATE industry=VALUES(industry),website=VALUES(website);

INSERT INTO jobs(external_id,provider,source_type,company_id,title,description,skills,location,state,country,min_salary,max_salary,experience_min,experience_max,job_type,work_mode,application_url,posted_at,is_active)
SELECT * FROM (
SELECT 'seed-tcs-node-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Tata Consultancy Services'),'Junior Node.js Developer',
'Build REST APIs and backend services, write SQL queries, test integrations and work with engineering teams.',
'Node.js,JavaScript,Express.js,MySQL,REST API,Git','Mumbai, Maharashtra','Maharashtra','India',450000,750000,0,2,'Full-time','Hybrid','https://www.tcs.com/careers',DATE_SUB(NOW(),INTERVAL 1 DAY),1
UNION ALL SELECT 'seed-infosys-java-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Infosys'),'Graduate Engineer Trainee - Java',
'Entry-level engineering role involving Java, SQL, application development and debugging.',
'Java,SQL,Spring Boot,Git,Data Structures','Pune, Maharashtra','Maharashtra','India',400000,650000,0,1,'Full-time','On-site','https://www.infosys.com/careers',DATE_SUB(NOW(),INTERVAL 2 DAY),1
UNION ALL SELECT 'seed-acc-react-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Accenture India'),'Frontend Developer - React',
'Develop responsive web interfaces and collaborate with backend and design teams.',
'JavaScript,React,HTML,CSS,Git,TypeScript','Mumbai, Maharashtra','Maharashtra','India',500000,900000,1,3,'Full-time','Hybrid','https://www.accenture.com/in-en/careers',DATE_SUB(NOW(),INTERVAL 1 DAY),1
UNION ALL SELECT 'seed-cap-python-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Capgemini India'),'Python Developer',
'Develop application components, automation scripts and data integrations.',
'Python,SQL,REST API,Git,AWS','Mumbai, Maharashtra','Maharashtra','India',450000,800000,0,2,'Full-time','Hybrid','https://www.capgemini.com/in-en/careers/',DATE_SUB(NOW(),INTERVAL 3 DAY),1
UNION ALL SELECT 'seed-techm-fullstack-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Tech Mahindra'),'Full Stack Developer',
'Build full-stack applications with modern JavaScript technologies and relational databases.',
'JavaScript,Node.js,React,MySQL,Express.js,REST API','Pune, Maharashtra','Maharashtra','India',550000,1000000,1,4,'Full-time','Hybrid','https://careers.techmahindra.com/',DATE_SUB(NOW(),INTERVAL 4 DAY),1
UNION ALL SELECT 'seed-ltim-data-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='LTIMindtree'),'Data Analyst',
'Analyze business datasets, create dashboards and communicate insights.',
'SQL,Python,Pandas,Power BI,Excel','Mumbai, Maharashtra','Maharashtra','India',450000,850000,0,2,'Full-time','Hybrid','https://www.ltimindtree.com/careers/',DATE_SUB(NOW(),INTERVAL 2 DAY),1
UNION ALL SELECT 'seed-persistent-cloud-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Persistent Systems'),'Cloud Engineer',
'Support cloud deployments and automate engineering workflows.',
'AWS,Docker,Linux,Kubernetes,Git,Python','Pune, Maharashtra','Maharashtra','India',600000,1200000,1,4,'Full-time','Hybrid','https://www.persistent.com/careers/',DATE_SUB(NOW(),INTERVAL 5 DAY),1
UNION ALL SELECT 'seed-jio-web-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Reliance Jio'),'Web Developer',
'Develop and maintain customer-facing web experiences.',
'JavaScript,HTML,CSS,React,Node.js,Git','Navi Mumbai, Maharashtra','Maharashtra','India',400000,700000,0,2,'Full-time','On-site','https://careers.jio.com/',DATE_SUB(NOW(),INTERVAL 1 DAY),1
UNION ALL SELECT 'seed-deloitte-cyber-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Deloitte India'),'Cyber Security Analyst',
'Assist security monitoring, risk assessment and incident analysis.',
'Cyber Security,Linux,SQL,Python,Git','Mumbai, Maharashtra','Maharashtra','India',500000,950000,0,3,'Full-time','Hybrid','https://www.deloitte.com/in/en/careers.html',DATE_SUB(NOW(),INTERVAL 6 DAY),1
UNION ALL SELECT 'seed-zoho-java-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Zoho'),'Software Developer',
'Work on product features, debugging and database-backed applications.',
'Java,SQL,Data Structures,Git,Spring Boot','Chennai, Tamil Nadu','Tamil Nadu','India',450000,850000,0,3,'Full-time','On-site','https://www.zoho.com/careers/',DATE_SUB(NOW(),INTERVAL 7 DAY),1
UNION ALL SELECT 'seed-freshworks-react-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Freshworks'),'Associate Software Engineer',
'Build SaaS product features with frontend and backend technologies.',
'JavaScript,React,Node.js,SQL,Git,HTML,CSS','Chennai, Tamil Nadu','Tamil Nadu','India',550000,950000,0,2,'Full-time','Remote','https://www.freshworks.com/company/careers/',DATE_SUB(NOW(),INTERVAL 2 DAY),1
UNION ALL SELECT 'seed-ms-cloud-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Microsoft India'),'Software Engineer',
'Design, implement and test scalable software systems.',
'Python,C++,Data Structures,Azure,Git,SQL','Hyderabad, Telangana','Telangana','India',1200000,2500000,0,3,'Full-time','Hybrid','https://jobs.careers.microsoft.com/',DATE_SUB(NOW(),INTERVAL 3 DAY),1
UNION ALL SELECT 'seed-amazon-backend-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Amazon India'),'Software Development Engineer I',
'Design and implement reliable backend services and APIs.',
'Java,Python,Data Structures,AWS,SQL,REST API','Mumbai, Maharashtra','Maharashtra','India',1200000,2200000,0,2,'Full-time','On-site','https://www.amazon.jobs/en/locations/mumbai-area-india',DATE_SUB(NOW(),INTERVAL 1 DAY),1
UNION ALL SELECT 'seed-flipkart-frontend-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Flipkart'),'Frontend Engineer',
'Build high-performance user interfaces for large-scale commerce products.',
'JavaScript,React,TypeScript,HTML,CSS,Git','Bengaluru, Karnataka','Karnataka','India',1000000,2000000,1,4,'Full-time','Hybrid','https://www.flipkartcareers.com/',DATE_SUB(NOW(),INTERVAL 4 DAY),1
UNION ALL SELECT 'seed-wipro-fresher-01','CareerJob Demo Dataset','DEMO',(SELECT id FROM companies WHERE name='Wipro'),'Project Engineer - Fresher',
'Entry-level engineering role across application development and support.',
'Java,Python,SQL,Git,Data Structures','Pune, Maharashtra','Maharashtra','India',350000,600000,0,1,'Full-time','On-site','https://careers.wipro.com/',DATE_SUB(NOW(),INTERVAL 1 DAY),1
) AS x
ON DUPLICATE KEY UPDATE title=x.title,updated_at=NOW();

INSERT INTO sync_logs(provider,status,jobs_received,jobs_added,message)
VALUES('CareerJob Demo Dataset','Success',15,15,'Initial database seed. Demo records are clearly marked DEMO.');
