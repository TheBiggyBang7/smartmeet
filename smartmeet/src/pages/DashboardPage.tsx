
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { conferences, feedbacks } from "@/data/mockData";
import { Calendar, Users } from "lucide-react";
import { AvatarStatus } from "@/components/ui/avatar-status";
import { Rating } from "@/components/ui/rating";
import { Link } from "react-router-dom";
import { CardHover } from "@/components/ui/card-hover";

const DashboardPage = () => {
  const { user } = useAuth();
  
  // Get upcoming conferences
  const upcomingConferences = conferences
    .filter(conf => new Date(`${conf.date}T${conf.time}`) > new Date())
    .filter(conf => conf.host.id === user?.id || conf.participants.some(p => p.id === user?.id))
    .slice(0, 3);
  
  // Get received feedback
  const receivedFeedback = feedbacks
    .filter(feedback => feedback.to.id === user?.id)
    .slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Upcoming Conferences" 
          value={upcomingConferences.length.toString()} 
          description="Conferences you're enrolled in"
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatCard 
          title="Feedback Received" 
          value={receivedFeedback.length.toString()} 
          description="Ratings from other users"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard 
          title="Average Rating" 
          value={receivedFeedback.length > 0 
            ? (receivedFeedback.reduce((acc, f) => acc + f.rating, 0) / receivedFeedback.length).toFixed(1)
            : "N/A"
          } 
          description="Based on user feedback"
          icon={<Rating value={4.5} readOnly size="sm" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Conferences</h2>
            <Link to="/conferences" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          
          {upcomingConferences.length > 0 ? (
            <div className="space-y-4">
              {upcomingConferences.map(conference => (
                <CardHover key={conference.id}>
                  <CardHover.Header>
                    <CardHover.Title>{conference.title}</CardHover.Title>
                    <CardHover.Description>{conference.date} at {conference.time}</CardHover.Description>
                  </CardHover.Header>
                  <CardHover.Content>
                    <div className="flex items-center space-x-3">
                      <AvatarStatus 
                        src={conference.host.avatar}
                        alt={conference.host.name}
                        fallback={conference.host.name.charAt(0)}
                        status={conference.host.isOnline ? "online" : "offline"}
                        size="sm"
                      />
                      <span>Hosted by {conference.host.name}</span>
                    </div>
                  </CardHover.Content>
                </CardHover>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                You have no upcoming conferences.
                <div className="mt-2">
                  <Link to="/conferences" className="text-primary hover:underline">
                    Browse conferences
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Feedback</h2>
          </div>
          
          {receivedFeedback.length > 0 ? (
            <div className="space-y-4">
              {receivedFeedback.map(feedback => (
                <Card key={feedback.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <AvatarStatus 
                        src={feedback.from.avatar}
                        alt={feedback.from.name}
                        fallback={feedback.from.name.charAt(0)}
                        status={feedback.from.isOnline ? "online" : "offline"}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{feedback.from.name}</h4>
                          <Rating value={feedback.rating} readOnly />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </p>
                        {feedback.comment && (
                          <p className="mt-2 text-sm">{feedback.comment}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                You haven't received any feedback yet.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="text-primary">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
export default DashboardPage;

