import { Book } from "@prisma/client";

const mockBooks : Book[]= [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel about the Jazz Age in the 1920s.",
      imageId: "https://via.placeholder.com/100x150?text=The+Great+Gatsby",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A classic of modern American literature.",
      imageId: "https://via.placeholder.com/100x150?text=To+Kill+a+Mockingbird",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel set in a totalitarian society.",
      imageId: "https://via.placeholder.com/100x150?text=1984",
    },
  ];
  
  export default mockBooks;