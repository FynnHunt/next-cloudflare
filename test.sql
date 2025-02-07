SELECT 
    posts.*, 
    (6371 * acos(
        cos(radians(52.060020)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(-1.340450)) + 
        sin(radians(52.060020)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) AS distance_km
FROM posts
WHERE 
    (6371 * acos(
        cos(radians(52.060020)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(-1.340450)) + 
        sin(radians(52.060020)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) <= 10
ORDER BY distance_km;
