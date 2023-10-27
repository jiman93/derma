import { faker } from '@faker-js/faker';
import {
  Administrating,
  Comment,
  Contribution,
  ContributionEntry,
  Distribution,
  Follow,
  Involvement,
  InvolvementEntry,
  Masjid,
  Organisation,
  Poster,
  User,
} from '../definitions/entities';
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
} from './constant';

const mockListItem = () => {
  return {
    id: faker.string.uuid(),
    name: faker.internet.displayName(),
    username: faker.internet.userName(),
    avatarPath: faker.image.url(),
  };
};

const singlePhoto = () => {
  return {
    id: faker.string.uuid(),
    name: faker.internet.displayName(),
    imagePath: faker.image.url(),
    createdDate: faker.date.past().toISOString(),
    size: 0,
    format: 'png',
  };
};

const photos = () => {
  const items = Array(6)
    .fill(0)
    .map((_) => {
      return {
        id: faker.string.uuid(),
        name: faker.internet.displayName(),
        imagePath: faker.image.url(),
        createdDate: faker.date.past().toISOString(),
        size: 0,
        format: 'png',
      };
    });
  return items;
};

export function createMockOrganisation(): Organisation {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    creationDate: faker.date.past().toISOString(),
    location: {
      streetAddress: faker.location.streetAddress(),
      state: faker.location.state(),
      district: faker.location.city(),
    },
    website: faker.internet.email(),
    avatarImage: singlePhoto(),
    followers: mockFollows(),
    posters: Array(10)
      .fill(0)
      .map((_) => createMockPoster()),
    people: Array(5)
      .fill(0)
      .map((_) => createMockUser()),
    involvements: mockInvolvements(),
    achievements: [],
  };
}

export function createMockUser(): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    dob: faker.date.birthdate().toISOString(),
    location: {
      streetAddress: faker.location.streetAddress(),
      state: faker.location.state(),
      district: faker.location.city(),
    },
    avatarImage: singlePhoto(),
    email: faker.internet.email(),
    registration: {
      joinDate: faker.date.past(),
      method: faker.helpers.arrayElement(Object.values(UserRegistrationMethod)),
      referralId: faker.string.uuid(),
    },
    followers: mockFollows(),
    followings: mockFollows(),
    posters: Array(5)
      .fill(0)
      .map((_) => createMockPoster()),
    organisation: null,
    contributions: mockContributions(),
    achievements: [],
  };
}

export function mockMasjid(): Masjid {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    alias: faker.company.name(),
    avatarImage: singlePhoto(),
    location: {
      state: faker.location.state(),
      district: faker.location.city(),
    },
    placeData: null,
    photos: photos(),
    admin: createMockOrganisation(),
    followers: mockFollows(),
    posters: Array(10)
      .fill(0)
      .map((_) => createMockPoster()),
    archivedPosters: Array(20)
      .fill(0)
      .map((_) => createMockPoster()),
  };
}

function mockAdmins(): Administrating[] {
  const admins: Administrating[] = [];
  for (let i = 0; i < 5; i++) {
    admins.push({
      id: faker.string.uuid(),
      organisationId: faker.string.uuid(),
      masjidId: faker.string.uuid(),
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      isActive: faker.datatype.boolean().toString(),
      approvals: [],
    });
  }
  return admins;
}

function mockFollows(): Follow[] {
  const follows: Follow[] = [];
  for (let i = 0; i < 20; i++) {
    follows.push({
      userId: faker.string.uuid(),
      username: faker.person.fullName(),
      userImagePath: faker.image.url(),
      followingId: faker.string.uuid(),
      followingEntity: faker.helpers.arrayElement(Object.values(DermaEntity)),
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      reason: faker.helpers.arrayElement(Object.values(FollowReason)),
    });
  }
  return follows;
}

function mockReplies(): Comment[] {
  const follows: Comment[] = [];
  for (let i = 0; i < 3; i++) {
    follows.push({
      id: faker.string.uuid(),
      user: mockListItem(),
      text: faker.lorem.paragraph(),
      replies: [],
      createdDate: faker.date.recent().toISOString(),
      upvote: faker.number.int({ min: 1, max: 10 }),
      downvote: faker.number.int({ min: 1, max: 10 }),
    });
  }
  return follows;
}

function mockComments(): Comment[] {
  const follows: Comment[] = [];
  for (let i = 0; i < 10; i++) {
    follows.push({
      id: faker.string.uuid(),
      user: mockListItem(),
      text: faker.lorem.paragraph(),
      replies: mockReplies(),
      createdDate: faker.date.recent().toISOString(),
      upvote: faker.number.int({ min: 1, max: 10 }),
      downvote: faker.number.int({ min: 1, max: 10 }),
      type: faker.helpers.arrayElement(Object.values(PosterPhases)),
    });
  }
  return follows;
}

function mockContributionEntry(): ContributionEntry {
  return {
    type: faker.helpers.arrayElement(Object.values(ContributionType)),
    date: faker.date.recent().toISOString(),
    transactionId: faker.string.uuid(),
    referralId: faker.string.uuid(),
    commentId: faker.string.uuid(),
  };
}

export function mockContributions(): Contribution[] {
  const contributions: Contribution[] = [];
  for (let i = 0; i < 5; i++) {
    contributions.push({
      id: faker.string.uuid(),
      user: mockListItem(),
      masjid: mockListItem(),
      poster: mockListItem(),
      entries: Array(5)
        .fill(0)
        .map((_) => mockContributionEntry()),
    });
  }
  return contributions;
}

function mockInvolvementEntry(): InvolvementEntry {
  return {
    type: faker.helpers.arrayElement(Object.values(InvolvementType)),
    date: faker.date.recent().toISOString(),
    administratingId: faker.string.uuid(),
    commentId: faker.string.uuid(),
  };
}

export function mockInvolvements(): Involvement[] {
  const involvements: Involvement[] = [];
  for (let i = 0; i < 5; i++) {
    involvements.push({
      id: faker.string.uuid(),
      organisation: mockListItem(),
      masjid: mockListItem(),
      poster: mockListItem(),
      entries: [mockInvolvementEntry(), mockInvolvementEntry()],
    });
  }
  return involvements;
}

function mockDistribution(): Distribution {
  return {
    organiserId: faker.string.uuid(),
    recipientId: faker.string.uuid(),
    date: faker.date.past().toString(),
    amount: faker.number.int({ min: 10, max: 200 }),
    imageUrl: faker.image.url(),
  };
}

export function createMockPoster(): Poster {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    masjid: mockListItem(),
    avatarImage: singlePhoto(),
    type: faker.helpers.arrayElement(Object.values(PosterType)),
    priority: faker.helpers.arrayElement(Object.values(PosterPriority)),
    photos: photos(),
    remark: faker.lorem.paragraph(),
    contributions: mockContributions(),
    involvements: mockInvolvements(), // Assume you have a function to create mock data for Contribution
    creator: mockListItem(),
    recipients: [],
    followers: mockFollows(),
    votes: {
      isActive: faker.datatype.boolean(),
      upvote: faker.number.int({ min: 10, max: 100 }),
      downvote: faker.number.int({ min: 10, max: 100 }),
      voteStartDate: faker.date.past().toString(),
      voteEndDate: faker.date.future().toString(),
    },
    comments: mockComments(),
    approval: null, // Assume you have a function to create mock data for Approval
    startDate: faker.date.past().toString(),
    endDate: faker.date.future().toString(),
    status: faker.helpers.arrayElement(Object.values(PosterStatus)),
    targetAmount: faker.number.float({ min: 100, max: 5000, precision: 0.01 }),
    contributedAmount: faker.number.float({ min: 100, max: 5000, precision: 0.01 }),
    currentAmount: faker.number.float({ min: 100, max: 5000, precision: 0.01 }),
    likes: faker.number.int({ min: 10, max: 200 }),
    distributions: Array(5)
      .fill(0)
      .map((_) => mockDistribution()),
  };
}
