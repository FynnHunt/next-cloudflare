const now = Date.now();
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export const mockPosts = [
  {
    id: "test1",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    longitude: "123",
    latitude: "123",
    hidden: "false",
    votes: 10,
    user_id: "test",
    date: now.toString(),
    comments: [],
  },
  {
    id: "test2",
    content: "test",
    longitude: "123",
    latitude: "123",
    hidden: "false",
    votes: 10,
    user_id: "test",
    date: (now - 3 * HOUR).toString(),
    comments: [],
  },
  {
    id: "test3",
    content: "test",
    longitude: "123",
    latitude: "123",
    hidden: "false",
    votes: 10,
    user_id: "test",
    date: (now - 12 * DAY).toString(),
    comments: [],
  },
  {
    id: "test4",
    content: "test",
    longitude: "123",
    latitude: "123",
    hidden: "false",
    votes: 10,
    user_id: "test",
    date: (now - 90 * DAY).toString(),
    comments: [],
  },
];

export const mockComments = [
  {
    id: "comment1",
    user_id: "test-commenter-1",
    post_id: "test1",
    content: "I noticed this too — thanks for posting about it.",
  },
  {
    id: "comment2",
    user_id: "test-commenter-2",
    post_id: "test1",
    content: "This is really useful local information.",
  },
  {
    id: "comment3",
    user_id: "test-commenter-3",
    post_id: "test2",
    content: "Good to know!",
  },
];
