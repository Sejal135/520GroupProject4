import React, { useState } from 'react'
import { ThumbsUp, MessageSquare } from 'lucide-react'

const Review = ({ title, author, date, content, likes, onLike, onComment }) => (
  <div className="bg-[#001530] p-4 rounded-lg mb-4">
    <div className="flex justify-between items-center mb-2">
      <div>
        <h3 className="font-semibold text-[#FFDD00]">{author}</h3>
        <p className="text-sm text-[#FFDD00]/70">{date}</p>
      </div>
    </div>
    <h4 className="text-lg font-bold text-[#FFB300] mb-2">{title}</h4>
    <p className="text-white mb-4">{content}</p>
    <div className="flex justify-between items-center">
      <button 
        onClick={onLike}
        className="flex items-center text-[#FFDD00] hover:text-[#FFB300]"
      >
        <ThumbsUp className="w-4 h-4 mr-2" />
        Recommend ({likes})
      </button>
      <button 
        onClick={onComment}
        className="flex items-center text-[#FFDD00] hover:text-[#FFB300]"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Comment
      </button>
    </div>
  </div>
)

export default function Location() {
  const [reviews, setReviews] = useState([
    { id: 1, title: 'Incredible Blend of Modern and Traditional', author: 'Alex Chen', date: '2024-03-15', content: 'Tokyo is an incredible blend of modern technology and traditional culture. The city never sleeps, and there\'s always something new to discover!', likes: 24 },
    { id: 2, title: 'Efficient Transportation', author: 'Sarah Johnson', date: '2024-03-10', content: 'I was amazed by the efficiency of Tokyo\'s public transportation. It made exploring the city so easy and convenient.', likes: 18 },
    { id: 3, title: 'Unparalleled Food Scene', author: 'Mike Thompson', date: '2024-03-05', content: 'The food scene in Tokyo is unparalleled. From high-end sushi restaurants to street food, every meal was an adventure.', likes: 32 },
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newComment, setNewComment] = useState('')

  const handleLike = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
    ))
  }

  const handleComment = (reviewId) => {
    console.log(`Opening comment form for review ${reviewId}`)
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim() && newTitle.trim()) {
      const newReview = {
        id: reviews.length + 1,
        title: newTitle,
        author: 'You',
        date: new Date().toISOString().split('T')[0],
        content: newComment,
        likes: 0
      }
      setReviews([newReview, ...reviews])
      setNewTitle('')
      setNewComment('')
    }
  }

  return (
    <div className="min-h-screen bg-[#000080] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#FFDD00] mb-4">Tokyo, Japan</h1>
        <div className="mb-8">
          <img 
            src="/placeholder.svg" 
            alt="Tokyo Skyline" 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#FFDD00] mb-4">Write a Review</h2>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title of your review"
              className="w-full p-3 rounded-lg bg-[#001530] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full p-3 rounded-lg bg-[#001530] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
              rows="4"
            />
            <button 
              type="submit"
              className="bg-[#FFB300] text-[#000080] px-6 py-2 rounded-lg hover:bg-[#FFDD00]"
            >
              Submit Review
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FFDD00] mb-4">User Reviews</h2>
          {reviews.map(review => (
            <Review 
              key={review.id}
              {...review}
              onLike={() => handleLike(review.id)}
              onComment={() => handleComment(review.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
