#Q1
#SELECT printf("%-10s",name) AS name FROM instructor
SELECT  name FROM instructor
	WHERE dept_name LIKE 'Finance'
    ORDER BY name ASC;
    
#Q2
SELECT title FROM course 
	WHERE dept_name like 'Biology' AND credits >= 3
    ORDER BY title ASC;
    
#Q3
SELECT name FROM student 
	WHERE dept_name like 'Comp%' AND tot_cred > 50
    ORDER BY name ASC;
    
#Q4
SELECT name FROM instructor JOIN teaches ON (instructor.ID = teaches.ID)
	WHERE teaches.semester LIKE 'Summer' AND teaches.year = 2010
    ORDER BY name ASC;
    
#Q5
SELECT SUM(salary) FROM instructor 
	WHERE dept_name LIKE 'Comp%';
    
#Q6
SELECT 	COUNT(*) AS Number_of_Instructors FROM instructor 
	WHERE dept_name LIKE 'Finance';
    
#Q7
SELECT name FROM student 
	WHERE tot_cred = (SELECT MAX(tot_cred) FROM student);
    
#Q8
SELECT takes.course_id AS course_id, title, year, semester FROM takes JOIN course ON (takes.course_id = course.course_id)
	WHERE ID = 45678
    ORDER BY takes.course_id ASC;
    
#Q9
SELECT student.name FROM student JOIN advisor ON (student.ID = advisor.s_ID) JOIN instructor ON (instructor.ID = advisor.i_ID)
	WHERE instructor.name LIKE 'Einstein'
    ORDER BY student.name ASC;
    
#Q10
##################

#Q11
SELECT DISTINCT name FROM student JOIN takes ON (student.ID = takes.ID) JOIN course ON (course.course_id = takes.course_id)
	WHERE course.dept_name LIKE 'Comp%'
    ORDER BY student.name ASC;
    
#Q12
SELECT instructor.ID FROM instructor
	WHERE ID NOT IN ( SELECT ID FROM teaches)
    ORDER BY instructor.ID ASC;
    
#Q13
SELECT instructor.ID, name FROM instructor
	WHERE ID NOT IN ( SELECT ID FROM teaches)
    ORDER BY name ASC;
    
#Q14
SELECT 	COUNT(*) AS Number_of_As FROM takes JOIN course ON (takes.course_id = course.course_id) 
	WHERE course.title LIKE 'Intro. to Computer Science' AND takes.grade LIKE 'A';

#Q15
SELECT title, year, semester, grade FROM student JOIN takes ON (student.ID = takes.ID) JOIN course ON (course.course_id = takes.course_id)
	WHERE student.name LIKE 'Shankar'
    ORDER BY title ASC;
    
#Q16
SELECT title FROM course
	WHERE course_id LIKE 'CS-1%'
    ORDER BY title DESC;
    
#Q17
SELECT DISTINCT dept_name FROM instructor
	WHERE 60000 < salary < 80000
    ORDER BY dept_name ASC;
    
#Q18
SELECT name, salary FROM instructor
	ORDER BY salary ASC;
    
#Q19
CREATE VIEW salary_data AS SELECT dept_name, round(AVG(salary),4) AS avg_sal
FROM instructor
GROUP BY dept_name;

SELECT printf("%-10s",dept_name) AS dept_name, printf("%-10s",avg_sal) AS avg_sal 
FROM salary_data
    WHERE avg_sal > 40000
    ORDER BY dept_name;
    
SELECT name, i_ID FROM student JOIN advisor ON (student.ID = advisor.s_ID)
    WHERE student.dept_name LIKE 'Biology';
    
SELECT course.course_id, prereq_id
FROM course
LEFT JOIN prereq ON (course.course_id = prereq.course_id);

#CREATE VIEW course_pairs AS SELECT course.course_id AS course_id, prereq_id
#FROM course
#LEFT JOIN prereq ON (prereq.course_id = course.course_id);

SELECT title FROM course_pairs JOIN course ON (course_pairs.prereq_id = course.course_id)
    GROUP BY prereq_id
    ORDER BY COUNT(*) DESC
    LIMIT 1;

CREATE VIEW instructor_id AS SELECT instructor.id AS ID
FROM instructor;

SELECT DISTINCT printf("%-10s",ID) AS ID FROM instructor_id
	WHERE ID NOT IN ( SELECT ID FROM teaches)
    ORDER BY instructor.ID ASC;
