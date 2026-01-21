export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export const RESERVED_USERNAMES = [
  'admin',
  'api',
  'www',
  'mail',
  'support',
  'help',
  'about',
  'contact',
  'terms',
  'privacy',
  'faq',
];

export async function validateUsername(
  username: string,
  checkExisting: (username: string) => Promise<boolean>
): Promise<{ valid: boolean; error?: string }> {
  if (!username || username.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }
  
  if (!USERNAME_REGEX.test(username)) {
    return {
      valid: false,
      error: 'Username must be 3-20 characters, letters, numbers, underscores only',
    };
  }
  
  const lowerUsername = username.toLowerCase();
  
  if (RESERVED_USERNAMES.includes(lowerUsername)) {
    return { valid: false, error: 'This username is reserved' };
  }
  
  if (lowerUsername.includes('admin') || lowerUsername.includes('mod')) {
    return {
      valid: false,
      error: 'Username cannot contain admin or mod',
    };
  }
  
  const isTaken = await checkExisting(username);
  if (isTaken) {
    return { valid: false, error: 'Username is already taken' };
  }
  
  return { valid: true };
}

export function generateUsernameFromEmail(email: string): string {
  const baseName = email.split('@')[0];
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseName}_${randomSuffix}`;
}

export function sanitizeUsername(username: string): string {
  return username
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '')
    .substring(0, 20);
}

export function formatUsername(username: string): string {
  return username
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function generateUsernameSuggestions(
  baseName: string,
  count: number = 5
): string[] {
  const suggestions: string[] = [];
  const adjectives = ['the', 'super', 'cool', 'pro', 'real', 'happy'];
  const numbers = ['007', '99', '123', '2024', '88', '77'];
  
  for (let i = 0; i < count; i++) {
    const suffix = Math.random() > 0.5 ? `_${numbers[i % numbers.length]}` : '';
    const prefix = Math.random() > 0.5 ? `${adjectives[i % adjectives.length]}_` : '';
    suggestions.push(`${prefix}${baseName}${suffix}`);
  }
  
  return suggestions;
}

export function isValidUsernameFormat(username: string): boolean {
  return USERNAME_REGEX.test(username);
}

export function getProfileUrl(username: string, baseUrl: string = 'https://habittracker.com'): string {
  return `${baseUrl}/u/${encodeURIComponent(username)}`;
}
