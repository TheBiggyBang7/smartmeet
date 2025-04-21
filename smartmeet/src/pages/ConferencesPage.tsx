
import React, { useState } from "react";
import { conferences } from "@/data/mockData";
import { Conference } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { ConferenceCard } from "@/components/ConferenceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ConferencesPage = () => {
  const { user } = useAuth();
  const [enrolledConferences, setEnrolledConferences] = useState<string[]>([]);
  
  // Filter upcoming and past conferences
  const now = new Date();
  const upcomingConferences = conferences.filter(conf => 
    new Date(`${conf.date}T${conf.time}`) > now
  );
  const pastConferences = conferences.filter(conf => 
    new Date(`${conf.date}T${conf.time}`) <= now
  );
  
  const handleEnroll = (conference: Conference) => {
    if (!user) return;
    
    if (enrolledConferences.includes(conference.id)) {
      // In a real app, this would call an API to unenroll
      setEnrolledConferences(prev => prev.filter(id => id !== conference.id));
      toast.info(`Unenrolled from "${conference.title}"`);
    } else {
      // In a real app, this would call an API to enroll
      setEnrolledConferences(prev => [...prev, conference.id]);
      toast.success(`Enrolled in "${conference.title}"`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Conferences</h1>
      
      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingConferences.length > 0 ? (
              upcomingConferences.map(conference => (
                <ConferenceCard 
                  key={conference.id}
                  conference={conference}
                  isEnrolled={enrolledConferences.includes(conference.id)}
                  onEnroll={handleEnroll}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No upcoming conferences scheduled.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastConferences.length > 0 ? (
              pastConferences.map(conference => (
                <ConferenceCard 
                  key={conference.id}
                  conference={conference}
                  isEnrolled={enrolledConferences.includes(conference.id)}
                  onEnroll={handleEnroll}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No past conferences found.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="enrolled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledConferences.length > 0 ? (
              conferences
                .filter(conf => enrolledConferences.includes(conf.id))
                .map(conference => (
                  <ConferenceCard 
                    key={conference.id}
                    conference={conference}
                    isEnrolled={true}
                    onEnroll={handleEnroll}
                  />
                ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                You haven't enrolled in any conferences yet.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConferencesPage;
