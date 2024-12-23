export type AffiliationStatus = 'CREATED' | 'ACTIVE' | 'SUSPENDED' | 'FINISHED';
export type AffiliationType = 'Professor' | 'Student';

export interface AffiliationDetails {
  userId: string;
  siape: string;
  name: string;
  surname: string;
  status: AffiliationStatus;
  education: string;
  institutionalEmail: string;
  createdAt: string;
}

export interface AffiliationResponse {
  id: string;
  userId: string;
  startingDate: string;
  endingDate: string | null;
  affiliationType: AffiliationType;
  status: AffiliationStatus;
  affiliationDetails: AffiliationDetails;
  createdAt: string;
}
