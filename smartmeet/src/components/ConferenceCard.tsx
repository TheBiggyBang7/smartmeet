
import React from "react";
import { Conference } from "@/types";
import { CardHover } from "@/components/ui/card-hover";
import { Button } from "@/components/ui/button";
import { AvatarStatus } from "@/components/ui/avatar-status";
import { Calendar } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

interface ConferenceCardProps {
  conference: Conference;
  isEnrolled: boolean;
  onEnroll: (conference: Conference) => void;
}

export function ConferenceCard({ conference, isEnrolled, onEnroll }: ConferenceCardProps) {
  const isUpcoming = new Date(`${conference.date}T${conference.time}`) > new Date();
  const isFull = conference.participants.length >= conference.maxParticipants;
  
  return (
    <CardHover>
      <CardHover.Header>
        <CardHover.Title className="flex items-center">
          <span className="mr-3">{conference.title}</span>
          {!isUpcoming && (
            <span className="text-xs font-normal bg-muted px-2 py-1 rounded">Past</span>
          )}
        </CardHover.Title>
        <CardHover.Description>{conference.description}</CardHover.Description>
      </CardHover.Header>
      
      <CardHover.Content>
        <div className="flex items-center text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>
            {conference.date} at {conference.time}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Hosted by</div>
          <div className="flex items-center space-x-3">
            <AvatarStatus 
              src={conference.host.avatar}
              alt={conference.host.name}
              fallback={conference.host.name.charAt(0)}
              status={conference.host.isOnline ? "online" : "offline"}
              size="sm"
            />
            <span>{conference.host.name}</span>
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-2">Participants ({conference.participants.length}/{conference.maxParticipants})</div>
          <div className="flex -space-x-2">
            {conference.participants.slice(0, 5).map(participant => (
              <AvatarStatus 
                key={participant.id}
                src={participant.avatar}
                alt={participant.name}
                fallback={participant.name.charAt(0)}
                status={participant.isOnline ? "online" : "offline"}
                size="sm"
                className="border-2 border-background"
              />
            ))}
            {conference.participants.length > 5 && (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                +{conference.participants.length - 5}
              </div>
            )}
          </div>
        </div>
      </CardHover.Content>
      
      <CardHover.Footer>
        <Button 
          onClick={() => onEnroll(conference)}
          disabled={!isUpcoming || isFull || isEnrolled}
          variant={isEnrolled ? "outline" : "default"}
          className="w-full"
        >
          {isEnrolled 
            ? "Enrolled" 
            : isFull 
              ? "Conference Full" 
              : "Enroll Now"
          }
        </Button>
      </CardHover.Footer>
    </CardHover>
  );
}
