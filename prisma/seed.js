const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedBooks = async () => {
    try {
        await prisma.book.createMany({
            data:[
                {
                  title: "The Catcher in the Rye",
                  author: "J.D. Salinger",
                  description: "A classic novel about the angst of a teenage boy",
                  published_date: "July 16, 1951",
                  genre: "Fiction",
                  cover_img_url: "https://example.com/catcher-in-the-rye.jpg",
                },
                {
                  title: "To Kill a Mockingbird",
                  author: "Harper Lee",
                  description: "A novel about racial injustice and moral growth",
                  published_date: "July 11, 1960",
                  genre: "Fiction",
                  cover_img_url: "https://example.com/to-kill-a-mockingbird.jpg",
                },
                {
                  title: "1984",
                  author: "George Orwell",
                  description: "A dystopian novel exploring the dangers of totalitarianism",
                  published_date: "June 8, 1949",
                  genre: "Fiction",
                  cover_img_url: "https://example.com/1984.jpg",
                },
                {
                  title: "The Great Gatsby",
                  author: "F. Scott Fitzgerald",
                  description: "A story of the American Dream and its illusions",
                  published_date: "April 10, 1925",
                  genre: "Fiction",
                  cover_img_url: "https://example.com/the-great-gatsby.jpg",
                },
                {
                  title: "One Hundred Years of Solitude",
                  author: "Gabriel García Márquez",
                  description: "A landmark novel in magical realism",
                  published_date: "May 30, 1967",
                  genre: "Magical Realism",
                  cover_img_url: "https://example.com/one-hundred-years-of-solitude.jpg",
                },
                {
                  title: "The Hobbit",
                  author: "J.R.R. Tolkien",
                  description: "A fantasy novel about the journey of Bilbo Baggins",
                  published_date: "September 21, 1937",
                  genre: "Fantasy",
                  cover_img_url: "https://example.com/the-hobbit.jpg",
                },
                {
                  title: "Pride and Prejudice",
                  author: "Jane Austen",
                  description: "A classic novel of manners and love",
                  published_date: "January 28, 1813",
                  genre: "Romance",
                  cover_img_url: "https://example.com/pride-and-prejudice.jpg",
                },
                {
                  title: "The Da Vinci Code",
                  author: "Dan Brown",
                  description: "A mystery thriller involving a code-breaking symbologist",
                  published_date: "March 18, 2003",
                  genre: "Thriller",
                  cover_img_url: "https://example.com/the-da-vinci-code.jpg",
                },
                {
                  title: "The Shining",
                  author: "Stephen King",
                  description: "A horror novel about a family's stay at a haunted hotel",
                  published_date: "January 28, 1977",
                  genre: "Horror",
                  cover_img_url: "https://example.com/the-shining.jpg",
                },
                {
                  title: "The Alchemist",
                  author: "Paulo Coelho",
                  description: "A philosophical novel about a journey to find one's destiny",
                  published_date: "1988",
                  genre: "Philosophical Fiction",
                  cover_img_url: "https://example.com/the-alchemist.jpg",
                },
              ]
              
        })
    }catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
      }
}

seedBooks() 
