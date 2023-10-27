import { PlaceData } from '.';
import {
  ContributionType,
  DermaEntity,
  FollowReason,
  InvolvementType,
  PosterPhases,
  PosterPriority,
  PosterStatus,
  PosterType,
  UserRegistrationMethod,
} from '../lib/constant';

export type PosterStatus = (typeof PosterStatus)[keyof typeof PosterStatus];
export type FollowReason = (typeof FollowReason)[keyof typeof FollowReason];
export type DermaEntity = (typeof DermaEntity)[keyof typeof DermaEntity];
export type ContributionType = (typeof ContributionType)[keyof typeof ContributionType];
export type InvolvementType = (typeof InvolvementType)[keyof typeof InvolvementType];
export type PosterPhases = (typeof PosterPhases)[keyof typeof PosterPhases] | '';
export type PosterPriority = (typeof PosterPriority)[keyof typeof PosterPriority];
export type PosterType = (typeof PosterType)[keyof typeof PosterType];
export type UserRegistrationMethod =
  (typeof UserRegistrationMethod)[keyof typeof UserRegistrationMethod];

export interface Follow {
  userId: string;
  username: string;
  userImagePath: string;
  followingId: string;
  followingEntity: DermaEntity;
  startDate: string;
  endDate: string;
  reason: FollowReason;
}

export interface Approval {
  organisationId: string;
  posterId: string;
  date: string;
  reason: string;
  isApproved: boolean;
}

export interface Administrating {
  id: string;
  organisationId: string;
  masjidId: string;
  startDate: string;
  endDate: string;
  isActive: string;
  approvals: Approval[];
}

export interface Referral {
  id: string;
  refereeId: string;
  referrerId: string;
  date: string;
}

export interface Transaction {
  id: string;
  senderId: string;
  senderType: string;
  recipientId: string;
  recipientType: string;
}

export interface Distribution {
  organiserId: string;
  recipientId: string; // if there's problem recipient will be the masjid iteself.
  date: string;
  amount: number;
  imageUrl: string;
}

interface Achievement {
  id: string;
  date: string;
  type: string;
}

interface ListItem {
  id: string;
  name: string;
  username: string;
  avatarPath: string;
}

export interface ContributionEntry {
  type: ContributionType;
  date: string;
  transactionId: string;
  referralId: string;
  commentId: string;
}

export interface InvolvementEntry {
  type: InvolvementType;
  date: string;
  administratingId: string;
  commentId: string;
}

interface Photo {
  id: string;
  name: string;
  format: string;
  size: number;
  imagePath: string;
  createdDate: string;
}

export interface Contribution {
  id: string;
  user: ListItem;
  masjid: ListItem;
  poster: ListItem;
  entries: ContributionEntry[];
}

export interface Involvement {
  id: string;
  organisation: ListItem;
  masjid: ListItem;
  poster: ListItem;
  entries: InvolvementEntry[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  dob: string;
  location: {
    streetAddress: string;
    state: string;
    district: string;
  };
  avatarImage: Photo;
  email: string;
  registration: {
    joinDate: Date;
    method: UserRegistrationMethod;
    referralId: string;
  };
  achievements: Achievement[];
  followers: Follow[];
  followings: Follow[];
  organisation: Organisation;
  posters: Poster[];
  contributions: Contribution[];
}

export interface Organisation {
  id: string;
  name: string;
  username: string;
  creationDate: string;
  location: {
    streetAddress: string;
    state: string;
    district: string;
  };
  website: string;
  avatarImage: Photo;
  achievements: Achievement[];
  followers: Follow[];
  people: User[];
  posters: Poster[];
  involvements: Involvement[];
}

export interface Masjid {
  id: string;
  name: string;
  alias: string;
  avatarImage: Photo;
  location: {
    state: string;
    district: string;
  };
  placeData: PlaceData;
  photos: Photo[];
  admin: Organisation;
  followers: Follow[];
  posters: Poster[];
  archivedPosters: Poster[];
}

export interface Poster {
  id: string;
  name: string;
  avatarImage: Photo;
  remark: string;
  masjid: ListItem;
  type: PosterType;
  priority: PosterPriority;
  photos: Photo[];
  contributions: Contribution[];
  involvements: Involvement[];
  creator: ListItem;
  recipients: ListItem[];
  followers: Follow[];
  votes: {
    isActive: boolean;
    upvote: number;
    downvote: number;
    voteStartDate: string;
    voteEndDate: string;
  };
  comments: Comment[];
  approval: Approval;
  startDate: string;
  endDate: string;
  status: PosterStatus;
  targetAmount: number;
  contributedAmount: number;
  currentAmount: number;
  likes: number;
  distributions: Distribution[];
}

export interface Comment {
  id: string;
  user: ListItem;
  type?: PosterPhases;
  text: string;
  replies: Comment[];
  createdDate: string;
  upvote: number;
  downvote: number;
}
