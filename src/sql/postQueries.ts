export const postsWithinDistanceOfPointQuery = `
WITH calculated_posts AS (
  SELECT 
    posts.*, 
    (6371 * acos(
      cos(radians(?1)) * 
      cos(radians(CAST(posts.latitude AS REAL))) * 
      cos(radians(CAST(posts.longitude AS REAL)) - radians(?2)) + 
      sin(radians(?1)) * 
      sin(radians(CAST(posts.latitude AS REAL)))
    )) AS distance_km
  FROM posts
)
SELECT * FROM calculated_posts
WHERE distance_km <= ?3
ORDER BY CAST(date AS INTEGER) DESC;
`;

export const createPostQuery =
  "INSERT INTO POSTS (id, content, votes, latitude, longitude, hidden, user_id, date) VALUES (?1, ?2, 0, ?3, ?4, 'false', ?5, ?6);";

export const upsertUserPostVoteQuery =
  "INSERT INTO votes (id, post_id, user_id, vote) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(post_id, user_id) DO UPDATE SET vote = excluded.vote;";

export const getTotalPostVotesQuery = `SELECT SUM(vote) AS total_votes FROM votes WHERE post_id = ?1;`;
