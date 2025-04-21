
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/components/ui/rating";
import { User } from "@/types";
import { AvatarStatus } from "@/components/ui/avatar-status";

interface FeedbackFormProps {
  user: User;
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

export function FeedbackForm({ user, onSubmit, onCancel }: FeedbackFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <AvatarStatus 
          src={user.avatar}
          alt={user.name}
          fallback={user.name.charAt(0)}
          status={user.isOnline ? "online" : "offline"}
        />
        <div>
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-muted-foreground">Rate your experience</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Rating</label>
          <Rating 
            value={rating} 
            onChange={setRating} 
            size="lg"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Comments (optional)
          </label>
          <Textarea
            id="comment"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit Feedback</Button>
        </div>
      </form>
    </div>
  );
}
