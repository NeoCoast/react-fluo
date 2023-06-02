export interface Author {
  name: string,
  avatar?: string,
}

export interface Reply {
  text: string,
  date: Date,
  author?: Author,
}

export interface Comment {
  id: number,
  date: Date,
  text: string,
  author?: Author,
  replies: Reply[]
}
interface Highlight {
  id: number,
  start: number,
  end: number,
  selection: string,
  style: string,
  comments: Comment[],
}

export default Highlight;
