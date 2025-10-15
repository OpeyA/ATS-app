export const milestones = [ "Submission","Client Submission", "Interview", "Offer Accepted", "Offer Extended", "Start Date", "Archive"] as const;

export type Milestone = typeof milestones[number];

export type Highlight = "blue"  | "yellow" | "orange" | "pink";

export const priority = ["Cold", "Warm", "Hot"] as const;
export type Priority = typeof priority[number];

export type Modality = "Remote" | "Hybrid" | "Onsite";

export type SkillKind = "hard" | "soft";

export interface Skill {
  id: string;
  name: string;
  kind: SkillKind;
}

export interface User {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ExternalLink {
  id: string;
  name: string;
  url: string;
}

export interface Note {
  id: string;
  text: string;
  user: User;
  createdAt: string;
}

export interface ContactRef{
  id:string;
  name: string;
}

export interface CompanyRef{
  id: string;
  name: string;
  contacts: ContactRef[];
}

export interface Job {
  //Header
    id: string;
  title: string;

  //Header permanent
  status: boolean;
  isOpen: boolean;
  isPublished: boolean;
  priority: Priority;
  //highlightColor: Highlight or  string w/ HEXCODE;
  highlightColor: string;
  milestones: Milestone[];
  currMilestone: string;

  //Overview
  owner?: User;
  assignee?: User;
  createdDate: string;
  modifiedDate: string;
  kickOffDate?: string;

  //Details
  salary?: number;
  //grossRev: number;
  minExperience?: number;
  industry?: string;
  modality: Modality;
  skills: Skill[];
  certifications: string[];
  benefits: string[];

  //Company Info
  companyID?: string;
  companyName?: string;
  contactID?: string;
  contactName?: string;

  //Location Addresses
  locations : Location[];

  //Descriptions
  internalDesc?: string;
  pubDesc?: string;

  //External Links 
  externalLinks?: ExternalLink[];

  //Notes
  notes?: Note[];

}

