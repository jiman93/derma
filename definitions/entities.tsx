import { PlaceData } from '.';

interface Follow {
  userId: string;
  followingId: string;
  startDate: string;
  endDate: string;
  reason: 'Click' | 'Organising' | 'Witnessing' | 'Donating' | 'Liking';
  entity: 'User' | 'Masjid' | 'Poster';
}

interface Approval {
  userId: string;
  posterId: string;
  date: string;
  reason: string;
  isApproved: boolean;
}

interface Admin {
  userId: string;
  masjidId: string;
  startDate: string;
  endDate: string;
  isActive: string;
  approvals: Approval[];
}

interface Contribution {
  userId: string;
  recipientId: string; //  Attending | Administrating  == masjidId, referring == userId
  participation: {
    type: 'Organising' | 'Witnessing' | 'Attending' | 'Referring' | 'Administrating';
    date: string;
    points: number; // Organising = 3, Witnessing = 1.5, Attending = 1, Referring = 1, Administrating = 3
  };
  giving: {
    type: 'Donating' | 'Liking';
    date: string;
    amount: string;
    points: number; // Donating = 2, Liking = 1
  };
  completionDate: string;
  weightage: number; // if both participation and giving present, weight = 1.5 otherwise 1
  total: number; // Witness = 1.5 + Donating = 2  * weightage = 1.5  => total = 5.25
}

export interface User {
  id: string;
  name: string;
  alias: string;
  dob: string;
  imageUrl: string;
  email: string;
  badge: 'Gold' | 'Silver' | 'Copper';
  administrating: Admin[];
  registration: {
    joinDate: string;
    method: 'Sign Up' | 'Social Login';
    refereeId: string;
  };
  achievements: [{}];
  followers: Follow[];
  followings: Follow[];
  contributions: Contribution[];
}

export interface Masjid {
  id: string;
  name: string;
  alias: string;
  location: {
    state: string;
    district: string;
  };
  placeData: PlaceData;
  photos: [{ id: string; imagePath: string; createdDate: string }];
  admins: Admin[];
  followers: Follow[];
  accountBalance: number;
  contributed: {
    postersOrganised: number;
    amountCollected: number;
    likesCollected: number;
  };
  posters: [{ posterId: string; posterName: string }];
  archivedPosters: [{ posterId: string; posterName: string; archivedDate: string }];
}

export interface Poster {
  id: string;
  name: string;
  masjid: {
    id: string;
    name: string;
  };
  type:
    | 'Charitable Causes'
    | 'Mosque Development'
    | 'Education Support'
    | 'Healthcare Assistance'
    | 'Emergency Relief';
  photos: [{ id: string; imagePath: string; createdDate: string }];
  remark: string;
  contributions: Contribution[];
  recipients: [
    {
      userId: string;
      userName: string;
    }
  ];
  followers: Follow[];
  votes: {
    isActive: boolean;
    upvote: number;
    downvote: number;
    voteStartDate: string;
    voteEndDate: string;
  };
  comments: [
    {
      userId: string;
      userName: string;
      createdDate: string;
      text: string;
    }
  ];
  approval: Approval;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Voted' | 'Contributed' | 'Completed' | 'Cancelled' | 'Archived';
  targetAmount: number;
  contributedAmount: number;
  currentAmount: number;
  likes: number;
  distributions: [
    {
      organiserId: string;
      recipientId: string; // if there's problem recipient will be the masjid iteself.
      date: string;
      amount: number;
      imageUrl: string;
    }
  ];
}
