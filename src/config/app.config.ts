interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Recruitment Manager'],
  customerRoles: [],
  tenantRoles: ['Recruitment Manager'],
  tenantName: 'Organization',
  applicationName: 'HR Management',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage profile searches',
    'View details of specific profile searches',
    'View HR profile search list',
    'View all profile searches in the system',
  ],
};
