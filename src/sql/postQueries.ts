export const postsWithinDistanceOfPointQuery = `SELECT 
    posts.*, 
    (6371 * acos(
        cos(radians(?1)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(?2)) + 
        sin(radians(?1)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) AS distance_km
FROM posts
WHERE 
    (6371 * acos(
        cos(radians(?1)) * 
        cos(radians(CAST(posts.latitude AS REAL))) * 
        cos(radians(CAST(posts.longitude AS REAL)) - radians(?2)) + 
        sin(radians(?1)) * 
        sin(radians(CAST(posts.latitude AS REAL)))
    )) <= ?3
ORDER BY distance_km;`;

export const createPostQuery =
  "INSERT INTO POSTS (id, content, votes, latitude, longitude, hidden, user_id) VALUES (?1, ?2, 0, ?3, ?4, 'false', ?5)";

export const upsertUserPostVoteQuery =
  "INSERT INTO votes (id, post_id, user_id, vote) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(post_id, user_id) DO UPDATE SET vote = excluded.vote";

export const getTotalPostVotesQuery = `SELECT SUM(vote) AS total_votes FROM votes WHERE post_id = ?1`;
