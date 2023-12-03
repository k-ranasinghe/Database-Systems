-- Q1
-- drop table grade_point;
CREATE TABLE grade_point
	(Grade			varchar(2), 
	 Point			varchar(3), 
	 PRIMARY KEY (Grade)
	);

-- Q2
INSERT INTO grade_point (Grade, Point)
VALUES 
    ('A+', '4.2'),
    ('A', '4.0'),
    ('A-', '3.7'),
    ('B+', '3.5'),
    ('B', '3.0'),
    ('B-', '2.7'),
    ('C+', '2.3'),
    ('C', '2.0'),
    ('C-', '1.5'),
    ('D', '1.0');

-- SELECT * FROM grade_point;

-- Q3
SELECT s.Name, SUM(CASE WHEN g.Point IS NULL THEN NULL ELSE CAST(g.Point AS DECIMAL(3, 1)) END) AS TotalGP
FROM student s
LEFT JOIN takes t ON s.ID = t.ID
LEFT JOIN grade_point g ON t.grade = g.Grade
GROUP BY s.ID, s.Name
ORDER BY TotalGP DESC;


-- Q4
-- drop function student_count;
DELIMITER //

CREATE FUNCTION student_count (course_id VARCHAR(20))
RETURNS INTEGER
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE count INTEGER;
    SELECT COUNT(*) INTO count
    FROM takes
    WHERE takes.course_id = course_id;
    RETURN count;
END;
//

DELIMITER ;


-- Q5
SELECT course_id
FROM takes
GROUP BY course_id
HAVING student_count(course_id) > 5
ORDER BY course_id ASC;


-- Q6
-- drop trigger before_insert_takes;
DELIMITER //

CREATE TRIGGER before_insert_takes
BEFORE INSERT ON takes
FOR EACH ROW
BEGIN
    IF NEW.grade NOT IN ('A+', 'A-', 'A', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D') THEN
        SET NEW.grade = NULL;
    END IF;
END;
//

DELIMITER ;

-- delete from takes;
-- insert into takes values ('00128', 'CS-101', '1', 'Fall', '2009', 'A');
-- insert into takes values ('00128', 'CS-347', '1', 'Fall', '2009', 'A-');
-- insert into takes values ('12345', 'CS-101', '1', 'Fall', '2009', 'C');
-- insert into takes values ('12345', 'CS-190', '2', 'Spring', '2009', 'A');
-- insert into takes values ('12345', 'CS-315', '1', 'Spring', '2010', 'A');
-- insert into takes values ('12345', 'CS-347', '1', 'Fall', '2009', 'A');
-- insert into takes values ('19991', 'HIS-351', '1', 'Spring', '2010', 'B');
-- insert into takes values ('23121', 'FIN-201', '1', 'Spring', '2010', 'C+');
-- insert into takes values ('44553', 'PHY-101', '1', 'Fall', '2009', 'B-');
-- insert into takes values ('45678', 'CS-101', '1', 'Fall', '2009', 'F');
-- insert into takes values ('45678', 'CS-101', '1', 'Spring', '2010', 'B+');
-- insert into takes values ('45678', 'CS-319', '1', 'Spring', '2010', 'B');
-- insert into takes values ('54321', 'CS-101', '1', 'Fall', '2009', 'A-');
-- insert into takes values ('54321', 'CS-190', '2', 'Spring', '2009', 'B+');
-- insert into takes values ('55739', 'MU-199', '1', 'Spring', '2010', 'A-');
-- insert into takes values ('76543', 'CS-101', '1', 'Fall', '2009', 'A');
-- insert into takes values ('76543', 'CS-319', '2', 'Spring', '2010', 'A');
-- insert into takes values ('76653', 'EE-181', '1', 'Spring', '2009', 'C');
-- insert into takes values ('98765', 'CS-101', '1', 'Fall', '2009', 'C-');
-- insert into takes values ('98765', 'CS-315', '1', 'Spring', '2010', 'B');
-- insert into takes values ('98988', 'BIO-101', '1', 'Summer', '2009', 'A');
-- insert into takes values ('98988', 'BIO-301', '1', 'Summer', '2010', null);
-- SELECT * FROM takes;
-- INSERT INTO takes VALUES ('00128', 'BIO-301', '1', 'Summer', '2010', 'W');
-- SELECT * FROM takes;


-- Q7
-- drop view faculty;
CREATE VIEW faculty AS SELECT ID, name, dept_name
FROM instructor;

-- SELECT * FROM faculty;


-- Q8
-- drop user 'uomcse'@'localhost';
CREATE USER 'uomcse'@'localhost' IDENTIFIED BY 'uomcse123';

-- SELECT * FROM mysql.user WHERE user='uomcse';


-- Q9
GRANT SELECT ON university.faculty TO 'uomcse'@'localhost';
-- SHOW GRANTS FOR 'uomcse'@'localhost';


-- Q10
GRANT ALL PRIVILEGES ON university.takes TO 'uomcse'@'localhost';
-- SHOW GRANTS FOR 'uomcse'@'localhost';

