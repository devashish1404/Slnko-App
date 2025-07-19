export type Department =
  | 'Projects'
  | 'Engineering'
  | 'Infra'
  | 'BD'
  | 'Marketing'
  | 'Internal'
  | 'Other';

export const categoryOptions: string[] = [
  'Site Meal Per-diem Allowance',
  'Site Lodging and Accommodation Expense',
  'Site Travelling Expenses',
  'Site Labour Charges',
  'Site Staff Telephone Expenses',
  'Site Courier and Parcel Expense',
  'Site Material Purchases',
  'Site Stationery Expenses',
  'Site Miscellaneous Expenses',
  'Site Vehicle Repair and Maintenance Expense',
];

export const categoryDescriptions: Record<string, string> = {
  'Site Meal Per-diem Allowance':
    'Please select this head to book allowance for personnel at project site given as per company policy for meals at project site.',
  'Site Lodging and Accommodation Expense':
    'Please select this head to book all lodging related expenses incurred by personnel at project site such as hotel, rentals of places and likewise. Please make sure to collect receipts or bills',
  'Site Travelling Expenses':
    'Please select this head to book all travelling related expenses incurred by personnel at project site such as bus-ticket, train-ticket, flight-ticket, reimbursements for fuel, hire of bikes or cabs and likewise. Please make sure to collect receipts or bills',
  'Site Staff Telephone Expenses':
    'Please select this head to book all telephone related expenses incurred by personnel at project site that happens for project at site. Please make sure to collect receipts or bills',
  'Site Courier and Parcel Expense':
    'Please select this head to book all expenses for parcels and couriers from project sites incurred by personnel at project sites. Please make sure to collect receipts or bills',
  'Site Labour Charges':
    'Please select this head to book all labour related expenses incurred by personnel at project site that happens for project at site. Please make sure to collect receipts or bills',
  'Site Material Purchases':
    'Please select this head to book all purchases incurred by personnel at project site that happens for project at site such as for cements, mechanical parts, modules and likewise chargeable to project clients. Please make sure to collect receipts or bills',
  'Site Stationery Expenses':
    'Please select this head to book all stationery items related expenses incurred by personnel at project site such as pens, papers and likewise. Please make sure to collect receipts or bills',
  'Site Miscellaneous Expenses':
    'Please select this head to book all other related expenses incurred by personnel at project site that happens for project at site which are not covered in the above heads. Please make sure to collect receipts or bills',
  'Site Vehicle Repair and Maintenance Expense':
    'Please select this head to book all vehicle repair and maintenance related expenses incurred by personnel at project site that happens for project at site. Please make sure to collect receipts or bills',
};

export const bdAndSalesCategoryOptions: string[] = [
  'Business Promotion',
  'Business Development - Travelling Expense',
  'Lodging - Business Travel',
  'Business Development - Per Diem and Meal Expenses',
];

export const bdAndSalesCategoryDescriptions: Record<string, string> = {
  'Business Promotion':
    'Please select this head for all kinds of expenses related to expos, conferences and likewise.',
  'Business Development - Travelling Expense':
    'Please select this head to book all travelling related expenses incurred for client visit and meeting such as bus-ticket, train-ticket, flight-ticket, reimbursements for fuel, hire of bikes or cabs and likewise. Please make sure to collect receipts or bills',
  'Lodging - Business Travel':
    'Please select this head to book all lodging related expenses incurred for client visit and meeting such as hotel, rentals of places and likewise. Please make sure to collect receipts or bills',
  'Business Development - Per Diem and Meal Expenses':
    'Please select this head to book expenses and allowance for food incurred during client visits and meetings provided as per company policy.',
};

export const officeAdminCategoryOptions: string[] = [
  'Meals Expense - Office',
  'Office Travelling and Conveyance Expenses',
  'Repair and Maintenance',
];

export const officeAdminCategoryDescriptions: Record<string, string> = {
  'Meals Expense - Office':
    'Please select this head to book expenses for food incurred during office meetings and late-sitting hours provided as per company policy. Please make sure to collect receipts or bills',
  'Office Travelling and Conveyance Expenses':
    'Please select this head to book all travelling related expenses incurred for official visits and meeting such as bus-ticket, train-ticket, flight-ticket, reimbursements for fuel, hire of bikes or cabs and likewise. Please make sure to collect receipts or bills',
  'Repair and Maintenance':
    'Please select this head to book all expenses incurred for repair and maintenance of less than INR 10,000 for office equipments and computers. Please make sure to collect receipts or bills. Please make sure all payment above INR 10,000 is to be made directly from bank after raising PO.',
};

export function getCategoryOptionsByDepartment(department: Department): string[] {
  const common = officeAdminCategoryOptions;

  if (['Projects', 'Engineering', 'Infra'].includes(department)) {
    return [...common, ...categoryOptions];
  } else if (['BD', 'Marketing', 'Internal'].includes(department)) {
    return [...common, ...bdAndSalesCategoryOptions];
  }

  return common;
}

export function getCategoryDescription(category: string): string {
  return (
    categoryDescriptions[category] ||
    bdAndSalesCategoryDescriptions[category] ||
    officeAdminCategoryDescriptions[category] ||
    'No description available.'
  );
}
