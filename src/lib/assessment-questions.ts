import { ENQUIRY_CATEGORIES, type EnquiryCategory } from "@/lib/enquiry-shared";

// Single source of truth for the /assessment wizard's category-specific
// qualifying questions — shared by the wizard (to render steps) and the
// admin dashboard (to label stored answers), so the two can never drift
// apart. Question `id`s are the keys stored in Enquiry.answers.

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
}

export const ASSESSMENT_CATEGORIES: readonly EnquiryCategory[] = ENQUIRY_CATEGORIES;

export const ASSESSMENT_QUESTIONS: Record<EnquiryCategory, AssessmentQuestion[]> = {
  "Microsoft Azure": [
    {
      id: "currentEnvironment",
      question: "Where does your infrastructure live today?",
      options: ["On-premise", "Already on another cloud (AWS/GCP)", "Partially on Azure"],
    },
    {
      id: "driver",
      question: "What's driving this?",
      options: ["Cost reduction", "Scaling", "Hardware end-of-life", "Compliance", "Disaster recovery"],
    },
    {
      id: "workloadSize",
      question: "Roughly how many servers/workloads?",
      options: ["Fewer than 50", "50–200", "More than 200"],
    },
    {
      id: "timeline",
      question: "Timeline?",
      options: ["Immediate (0–3 months)", "This year", "Just exploring"],
    },
  ],
  "Dynamics 365 (ERP/CRM)": [
    {
      id: "currentSystem",
      question: "What are you using today?",
      options: ["Legacy ERP (SAP/Oracle/Tally)", "Spreadsheets", "None", "Existing D365 needing work"],
    },
    {
      id: "modules",
      question: "Which modules are you interested in?",
      options: ["Finance", "Supply Chain", "Sales CRM", "Customer Service", "Field Service", "Multiple"],
    },
    {
      id: "companySize",
      question: "How many users?",
      options: ["Fewer than 50", "50–200", "More than 200"],
    },
    {
      id: "timeline",
      question: "Timeline?",
      options: ["Immediate (0–3 months)", "This year", "Just exploring"],
    },
  ],
  "Microsoft 365 / Modern Workplace": [
    {
      id: "currentPlatform",
      question: "What's your current email/collaboration platform?",
      options: ["Google Workspace", "On-premise Exchange", "A different M365 tenant", "None"],
    },
    {
      id: "primaryNeed",
      question: "What's the primary need?",
      options: ["Migration", "Security hardening", "Teams rollout", "Device management"],
    },
    {
      id: "userCount",
      question: "How many users?",
      options: ["Fewer than 50", "50–200", "More than 200"],
    },
    {
      id: "timeline",
      question: "Timeline?",
      options: ["Immediate (0–3 months)", "This year", "Just exploring"],
    },
  ],
  "Power BI & Analytics": [
    {
      id: "currentReporting",
      question: "How do you report today?",
      options: ["Excel / manual", "Another BI tool", "Some Power BI already"],
    },
    {
      id: "goal",
      question: "What's the goal?",
      options: ["Executive dashboards", "Self-service BI", "Data integration", "Training"],
    },
    {
      id: "dataSources",
      question: "What data sources need connecting?",
      options: ["Azure SQL", "Dynamics 365", "Salesforce", "On-premise database", "Other"],
    },
  ],
  "Managed Cloud Services": [
    {
      id: "currentSetup",
      question: "What's your current setup?",
      options: ["Public cloud", "Private (VMware/HyperV)", "Hybrid", "On-premise only"],
    },
    {
      id: "painPoint",
      question: "What's the biggest pain point?",
      options: ["No 24/7 monitoring", "High costs", "Security gaps", "No in-house expertise"],
    },
    {
      id: "planInterest",
      question: "Which plan interests you?",
      options: ["Silver", "Gold", "Platinum", "Not sure yet"],
    },
  ],
  "Cloud Migration": [
    {
      id: "source",
      question: "What are you migrating from?",
      options: ["On-premise", "AWS", "Google Cloud", "Other"],
    },
    {
      id: "target",
      question: "What are you migrating to?",
      options: ["Azure", "Multi-cloud", "Not decided"],
    },
    {
      id: "workloadSize",
      question: "Roughly how many servers/workloads?",
      options: ["Fewer than 50", "50–200", "More than 200"],
    },
    {
      id: "timeline",
      question: "Timeline?",
      options: ["Immediate (0–3 months)", "This year", "Just exploring"],
    },
  ],
  "Cloud Security": [
    {
      id: "concern",
      question: "What's the primary concern?",
      options: ["Compliance (ISO/HIPAA/PCI)", "A recent incident", "Routine hardening", "Identity & access", "Backup & DR"],
    },
    {
      id: "currentTools",
      question: "What security tooling do you have today?",
      options: ["None", "Some (Defender/Sentinel)", "A third-party SIEM"],
    },
    {
      id: "industry",
      question: "What industry are you in?",
      options: ["Financial services", "Healthcare", "Manufacturing", "Retail", "Other"],
    },
  ],
  Other: [
    {
      id: "details",
      question: "Briefly, what are you looking for?",
      options: [],
    },
  ],
};
