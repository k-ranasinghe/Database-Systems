#SELECT name,population FROM country
	#WHERE name IN ('Brazil', 'Russia', 'India', 'China', 'Sweden', 'Norway', 'Denmark');
    
#SELECT name,SurfaceArea FROM country
	#WHERE SurfaceArea BETWEEN 50000 AND 70000
    
SELECT name FROM country
	WHERE name LIKE 'Un%';
SELECT name FROM country
	WHERE name LIKE '%nd';
SELECT name FROM country
	WHERE name LIKE '%x%';
SELECT name FROM country
	WHERE name LIKE 'C%ia';
SELECT name FROM country
	WHERE name LIKE '%a%a%a%';
SELECT name FROM country
	WHERE name LIKE '_n%'
ORDER BY name;
SELECT name FROM country
	WHERE name LIKE '____';
SELECT name, Region FROM country
	WHERE Region LIKE '%rica%';
SELECT name, Region, Continent FROM country
	WHERE Region LIKE Continent;
SELECT name, population / 1000000 FROM country
	WHERE Continent LIKE 'Asia';
SELECT name, GNP, Region, ROUND(Population/1000000, 2), ROUND(SurfaceArea/1000000, 2) FROM country
	WHERE SurfaceArea > 3000000 OR Population > 250000000;