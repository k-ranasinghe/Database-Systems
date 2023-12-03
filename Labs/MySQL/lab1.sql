SELECT name FROM instructor
	WHERE dept_name LIKE 'Biology';
 
SELECT title FROM course
	WHERE dept_name LIKE 'Physics' AND credits LIKE '3';
 
 SELECT name FROM instructor
	WHERE dept_name LIKE 'Physics' AND salary > 50000;
 
SELECT name, tot_cred FROM student
	WHERE tot_cred >= 100
    ORDER BY tot_cred DESC;
    
SELECT building FROM instructor JOIN department ON (department.dept_name = instructor.dept_name)
	WHERE name LIKE 'Mozart';
    
SELECT title FROM course JOIN section ON (course.course_id = section.course_id)
	WHERE section.semester LIKE 'Summer' AND section.year LIKE '2009';
    
SELECT day, start_hr, start_min FROM course JOIN section JOIN time_slot ON (course.course_id = section.course_id AND section.time_slot_id = time_slot.time_slot_id)
	WHERE course.title LIKE 'Genetics' AND section.year LIKE '2010';
    
SELECT course.course_id, title FROM course JOIN takes ON (course.course_id = takes.course_id)
	WHERE takes.ID LIKE '12345';
    
SELECT title FROM course
	WHERE course.course_id = 
     (SELECT prereq.prereq_id FROM course JOIN prereq ON (prereq.course_id = course.course_id)
		WHERE course.title LIKE 'Robotics');
        
SELECT name FROM student
	WHERE dept_name LIKE 'Comp. Sci.';
    