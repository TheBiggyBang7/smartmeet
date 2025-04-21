
import React from "react";
import { User } from "@/types";
import { CardHover } from "@/components/ui/card-hover";
import { AvatarStatus } from "@/components/ui/avatar-status";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface UserSearchResultsProps {
  users: User[];
  onCallUser: (user: User) => void;
}

export function UserSearchResults({ users, onCallUser }: UserSearchResultsProps) {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No users found. Try adjusting your search terms.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user) => (
        <CardHover key={user.id} className="overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <AvatarStatus
                src={user.avatar}
                alt={user.name}
                fallback={user.name.charAt(0)}
                status={user.isOnline ? "online" : "offline"}
              />
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button
              size="icon"
              variant={user.isOnline ? "default" : "outline"}
              disabled={!user.isOnline}
              onClick={() => onCallUser(user)}
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </CardHover>
      ))}
    </div>
  );
}
