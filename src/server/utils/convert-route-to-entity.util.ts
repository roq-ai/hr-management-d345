const mapping: Record<string, string> = {
  candidates: 'candidate',
  organizations: 'organization',
  'profile-searches': 'profile_search',
  users: 'user',
  vacancies: 'vacancy',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
