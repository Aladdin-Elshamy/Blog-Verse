export interface Blog {
  title: string;
  body: string;
  photo: string;
  _id: string;
  author: {
    name: string;
    _id: string;
    email: string;
  };
  tags: string[];
  createdAt: string;
}
