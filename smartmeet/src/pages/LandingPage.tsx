
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Calendar, Users, Video } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/90 to-accent/90 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Connect, Collaborate, Converse
              </h1>
              <p className="text-xl mb-6 text-white/90">
                The premier platform for seamless video calls and conference management.
                Connect with colleagues, join important conferences, and collaborate effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-lg h-80 bg-white/10 rounded-lg shadow-lg backdrop-blur-sm flex items-center justify-center">
                <Video className="h-24 w-24 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Phone className="h-10 w-10 text-primary" />}
              title="Video Calls"
              description="Connect with colleagues through high-quality video calls. Share your screen and collaborate in real-time."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Conference Management"
              description="Schedule, manage, and join conferences with ease. Get reminders and never miss an important meeting."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="User Feedback"
              description="Leave feedback after calls to help improve future interactions and track performance."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who use ConnectConverse for their communication needs.
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8">Create Your Account</Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} ConnectConverse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default LandingPage;
