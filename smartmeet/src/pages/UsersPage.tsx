
import React, { useState } from "react";
import { users } from "@/data/mockData";
import { User } from "@/types";
import { UserSearchResults } from "@/components/UserSearchResults";
import { SearchInput } from "@/components/ui/search-input";
import { VideoCall } from "@/components/VideoCall";
import { FeedbackForm } from "@/components/FeedbackForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCallUser = (user: User) => {
    setSelectedUser(user);
    setIsCallActive(true);
  };
  
  const handleEndCall = () => {
    setIsCallActive(false);
    setShowFeedbackForm(true);
  };
  
  const handleSubmitFeedback = (rating: number, comment: string) => {
    // In a real app, this would send the feedback to an API
    toast.success(`Feedback submitted for ${selectedUser?.name}`);
    setShowFeedbackForm(false);
    setSelectedUser(null);
  };
  
  const handleCancelFeedback = () => {
    setShowFeedbackForm(false);
    setSelectedUser(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      
      <div className="mb-6">
        <SearchInput
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-lg"
        />
      </div>
      
      <UserSearchResults 
        users={filteredUsers} 
        onCallUser={handleCallUser}
      />
      
      {/* Call Dialog */}
      <Dialog open={isCallActive} onOpenChange={setIsCallActive}>
        <DialogContent className="sm:max-w-[800px] p-0 h-[600px]">
          {selectedUser && (
            <VideoCall 
              otherUser={selectedUser} 
              onEnd={handleEndCall}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Feedback Dialog */}
      <Dialog open={showFeedbackForm} onOpenChange={setShowFeedbackForm}>
        <DialogContent className="sm:max-w-[500px] p-0">
          {selectedUser && (
            <FeedbackForm 
              user={selectedUser}
              onSubmit={handleSubmitFeedback}
              onCancel={handleCancelFeedback}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
