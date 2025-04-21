
import { User, Conference, Feedback } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=10',
    isOnline: true,
  },
  {
    id: '5',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    isOnline: false,
  },
];

// Mock Conferences
export const conferences: Conference[] = [
  {
    id: '1',
    title: 'Product Strategy Meeting',
    description: 'Quarterly review of product roadmap and strategy',
    date: '2025-05-10',
    time: '10:00 AM',
    host: users[0],
    participants: [users[1], users[2]],
    maxParticipants: 10,
  },
  {
    id: '2',
    title: 'Team Building Workshop',
    description: 'Interactive session to improve team communication',
    date: '2025-05-15',
    time: '2:00 PM',
    host: users[1],
    participants: [users[0], users[3], users[4]],
    maxParticipants: 15,
  },
  {
    id: '3',
    title: 'Engineering Standup',
    description: 'Daily engineering team standup',
    date: '2025-04-25',
    time: '9:30 AM',
    host: users[2],
    participants: [users[0], users[4]],
    maxParticipants: 8,
  },
  {
    id: '4',
    title: 'Design Review',
    description: 'Review of recent design prototypes',
    date: '2025-05-02',
    time: '11:00 AM',
    host: users[3],
    participants: [users[1], users[2]],
    maxParticipants: 6,
  },
];

// Mock Feedback
export const feedbacks: Feedback[] = [
  {
    id: '1',
    rating: 5,
    comment: 'Great communication and presentation skills!',
    from: users[1],
    to: users[0],
    createdAt: '2025-04-10T14:30:00Z',
  },
  {
    id: '2',
    rating: 4,
    comment: 'Very helpful discussion, would recommend collaborating again.',
    from: users[0],
    to: users[2],
    createdAt: '2025-04-12T09:15:00Z',
  },
  {
    id: '3',
    rating: 5,
    comment: 'Excellent technical expertise and clear explanations.',
    from: users[3],
    to: users[0],
    createdAt: '2025-04-15T16:45:00Z',
  },
];

// Mock current user
export const currentUser = users[0];
