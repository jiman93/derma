import { faker } from '@faker-js/faker';
import { Admin, Contribution, Follow, Masjid, Poster } from '../definitions/entities';

export function mockMasjid(): Masjid {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    alias: faker.company.name(),
    location: {
      state: faker.location.state(),
      district: faker.location.city(),
    },
    placeData: null,
    photos: [
      {
        id: faker.string.uuid(),
        imagePath: faker.image.url(),
        createdDate: faker.date.past().toISOString(),
      },
      {
        id: faker.string.uuid(),
        imagePath: faker.image.url(),
        createdDate: faker.date.past().toISOString(),
      },
    ],
    admins: mockAdmins(),
    followers: mockFollows(),
    accountBalance: faker.number.float({ min: 10, max: 10000, precision: 0.01 }),
    contributions: mockContributions(),
    posters: [
      {
        posterId: faker.string.uuid(),
        posterName: faker.lorem.words(),
        imageUrl: faker.image.urlPicsumPhotos(),
      },
    ],
    archivedPosters: [
      {
        posterId: faker.string.uuid(),
        posterName: faker.lorem.words(),
        archivedDate: faker.date.past().toISOString(),
      },
    ],
  };
}

function mockAdmins(): Admin[] {
  const admins: Admin[] = [];
  for (let i = 0; i < 5; i++) {
    admins.push({
      userId: faker.string.uuid(),
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
      followingEntity: faker.helpers.arrayElement(['User', 'Masjid', 'Poster']),
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      reason: faker.helpers.arrayElement([
        'Click',
        'Organising',
        'Witnessing',
        'Donating',
        'Liking',
      ]),
    });
  }
  return follows;
}

function mockContributions(): Contribution[] {
  const contributions: Contribution[] = [];
  for (let i = 0; i < 5; i++) {
    contributions.push({
      userId: faker.string.uuid(),
      username: faker.person.fullName(),
      masjidId: faker.string.uuid(),
      posterId: faker.string.uuid(),
      participation: [
        {
          type: faker.helpers.arrayElement([
            'Organising',
            'Witnessing',
            'Attending',
            'Referring',
            'Administrating',
          ]),
          date: faker.date.past().toISOString(),
          points: faker.number.int({ min: 1, max: 5 }),
        },
      ],
      giving: [
        {
          type: faker.helpers.arrayElement(['Donating', 'Liking']),
          date: faker.date.past().toISOString(),
          amount: faker.finance.amount(),
          points: faker.number.int({ min: 1, max: 2 }),
        },
      ],
      completionDate: faker.date.past().toISOString(),
      lastContributionDate: faker.date.recent().toISOString(),
      weightage: faker.helpers.arrayElement([1, 1.5]),
      total: faker.number.int({ min: 10, max: 1000 }),
    });
  }
  return contributions;
}

export function createMockPoster(): Poster {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    masjid: {
      id: faker.string.uuid(),
      name: faker.company.name(),
    },
    type: faker.helpers.arrayElement([
      'Charitable Causes',
      'Mosque Development',
      'Education Support',
      'Healthcare Assistance',
      'Emergency Relief',
    ]),
    photos: [
      {
        id: faker.string.uuid(),
        imagePath: faker.image.urlPicsumPhotos(),
        createdDate: faker.date.past().toString(),
      },
    ],
    remark: faker.lorem.paragraph(),
    contributions: mockContributions(), // Assume you have a function to create mock data for Contribution
    recipients: [
      {
        userId: faker.string.uuid(),
        userName: faker.internet.userName(),
      },
    ],
    followers: mockFollows(),
    votes: {
      isActive: faker.datatype.boolean(),
      upvote: faker.number.int({ min: 10, max: 100 }),
      downvote: faker.number.int({ min: 10, max: 100 }),
      voteStartDate: faker.date.past().toString(),
      voteEndDate: faker.date.future().toString(),
    },
    comments: [
      {
        userId: faker.string.uuid(),
        userName: faker.internet.userName(),
        createdDate: faker.date.past().toString(),
        text: faker.lorem.sentence(),
      },
    ],
    approval: null, // Assume you have a function to create mock data for Approval
    startDate: faker.date.past().toString(),
    endDate: faker.date.future().toString(),
    status: faker.helpers.arrayElement([
      'Pending',
      'Voted',
      'Contributed',
      'Completed',
      // 'Cancelled',
      // 'Archived',
    ]),
    targetAmount: faker.number.float({ min: 100, max: 5000, precision: 0.01 }),
    contributedAmount: faker.number.float({ min: 100, max: 5000, precision: 0.01 }),
    currentAmount: faker.number.float({ min: 100, max: 5000, precision: 0.01 }),
    likes: faker.number.int({ min: 10, max: 200 }),
    distributions: [
      // {
      //   organiserId: faker.datatype.uuid(),
      //   recipientId: faker.datatype.uuid(),
      //   date: faker.date.past().toString(),
      //   amount: faker.datatype.number(),
      //   imageUrl: faker.image.imageUrl(),
      // },
    ],
  };
}
