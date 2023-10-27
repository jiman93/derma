export const PosterPhases = {
  Creation: 'Creation',
  VotePhase: 'Vote Phase',
  PosterApproval: 'Poster Approval',
  ContributionPhase: 'Contribution Phase',
  DistributionPhase: 'Distribution Phase',
} as const;

export const FollowReason = {
  Click: 'Click',
  Organising: 'Masjid',
  Witnessing: 'Witnessing',
  Donating: 'Donating',
  Liking: 'Liking',
} as const;

export const DermaEntity = {
  User: 'User',
  Masjid: 'Masjid',
  Organisation: 'Organisation',
  Poster: 'Poster',
} as const;

export const PosterType = {
  CharitableCauses: 'Charitable Causes',
  MosqueDevelopment: 'Mosque Developmen',
  EducationSupport: 'EducationSupport',
  HealthcareAssistance: 'Healthcare Assistance',
  EmergencyRelief: 'Emergency Relief',
} as const;

export const PosterStatus = {
  Pending: 'Pending',
  Voted: 'Voted',
  Contributed: 'Contributed',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
  Archived: 'Archived',
} as const;

export const ContributionType = {
  Organising: 'Organising',
  Voting: 'Voting',
  Referring: 'Referring',
  Donating: 'Donating',
  Liking: 'Liking',
  Commenting: 'Commenting',
} as const;

export const InvolvementType = {
  Organising: 'Organising',
  Commenting: 'Commenting',
  Administrating: 'Administrating',
  Witnessing: 'Witnessing',
} as const;

//  1 = highest ; 4 = lowest
export const PosterPriority = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
} as const;

export const UserRegistrationMethod = {
  SignUp: 'Sign Up',
  SocialLogin: 'Social Login',
} as const;
