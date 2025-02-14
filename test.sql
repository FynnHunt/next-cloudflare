SELECT 
    posts.*, 
    (6371 * acos(
        cos(radians(52.2387456)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(0.1343488)) + 
        sin(radians(52.2387456)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) AS distance_km
FROM posts
WHERE 
    (6371 * acos(
        cos(radians(52.2387456)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(0.1343488)) + 
        sin(radians(52.2387456)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) <= ?3
ORDER BY distance_km;


SELECT 
    posts.*, 
    (6371 * acos(
        cos(radians(52.2387456)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(0.1343488)) + 
        sin(radians(52.2387456)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) AS distance_km
FROM posts
WHERE 
    (6371 * acos(
        cos(radians(52.2387456)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(0.1343488)) + 
        sin(radians(52.2387456)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) <= 3
ORDER BY distance_km;

SELECT posts.*, (6371 * acos( cos(radians(52.2387456)) * cos(radians(CAST(posts.latitude AS REAL))) * cos(radians(CAST(posts.longitude AS REAL)) - radians(0.1343488)) + sin(radians(52.2387456)) * sin(radians(CAST(posts.latitude AS REAL))) )) AS distance_km FROM posts WHERE (6371 * acos( cos(radians(52.2387456)) * cos(radians(CAST(posts.latitude AS REAL))) * cos(radians(CAST(posts.longitude AS REAL)) - radians(0.1343488)) + sin(radians(52.2387456)) * sin(radians(CAST(posts.latitude AS REAL))) )) <= 3 ORDER BY distance_km;
