export const ALLOWED_DOMAIN = 'wasegaku.ac.jp';
export function isAllowedWorkspaceEmail(email: string, verified = true): boolean {
  return verified && email.trim().toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`);
}
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  const head = local.slice(0, Math.min(2, local.length));
  return `${head}***@${domain}`;
}
