
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Phone, Video, VideoOff } from "lucide-react";
import { User } from "@/types";
import Peer from "simple-peer";

interface VideoCallProps {
  otherUser: User;
  onEnd: () => void;
}

export function VideoCall({ otherUser, onEnd }: VideoCallProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isInitiator, setIsInitiator] = useState(true);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);

  // Initialize local stream
  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
        
        // In a real app, this is where we would signal to the other user
        // that we're ready to call and then wait for them to accept
        initializePeer(mediaStream);
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };
    
    getMedia();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);

  const initializePeer = (mediaStream: MediaStream) => {
    // In a real app, we would determine if we're the initiator based on signaling
    const peer = new Peer({
      initiator: isInitiator,
      trickle: false,
      stream: mediaStream,
    });

    peer.on("signal", data => {
      // In a real app, we would send this signal data to the other user
      console.log("Signal data generated:", data);
      
      // For this demo, we're simulating the other user accepting the call immediately
      setTimeout(() => {
        setIsConnected(true);
      }, 1000);
    });

    peer.on("connect", () => {
      console.log("Peer connection established");
      setIsConnected(true);
    });

    peer.on("stream", remoteStream => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    peer.on("error", err => {
      console.error("Peer error:", err);
    });

    peerRef.current = peer;
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    onEnd();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow relative">
        {/* Remote video (full size) */}
        <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {!isConnected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
              <div className="text-center">
                <div className="animate-pulse text-xl mb-2">Connecting...</div>
                <div>Calling {otherUser.name}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Local video (picture-in-picture) */}
        <div className="absolute bottom-4 right-4 w-32 h-24 md:w-48 md:h-36 rounded-lg overflow-hidden border-2 border-white shadow-lg">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Controls */}
      <div className="py-4 px-2 flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full h-12 w-12 ${!audioEnabled ? 'bg-destructive text-destructive-foreground' : ''}`}
          onClick={toggleAudio}
        >
          {audioEnabled ? <Mic /> : <MicOff />}
        </Button>
        
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={endCall}
        >
          <Phone className="rotate-135" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full h-12 w-12 ${!videoEnabled ? 'bg-destructive text-destructive-foreground' : ''}`}
          onClick={toggleVideo}
        >
          {videoEnabled ? <Video /> : <VideoOff />}
        </Button>
      </div>
    </div>
  );
}
