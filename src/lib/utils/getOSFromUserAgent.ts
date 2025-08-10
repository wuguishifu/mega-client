export function getOSFromUserAgent(userAgent: string | null, defaultOs = 'mac'): string {
  if (!userAgent) {
    return defaultOs;
  }

  const ua = userAgent.toLowerCase();

  if (ua.includes('win')) {
    return 'windows';
  }
  if (ua.includes('mac')) {
    return 'mac';
  }
  if (ua.includes('linux')) {
    return 'linux';
  }
  if (ua.includes('android')) {
    return 'android';
  }
  if (ua.includes('like mac') || ua.includes('ios')) {
    return 'ios';
  }

  return defaultOs;
}

const appleOsLiterals = ['mac', 'ios'];

export function getMeta(userAgent: string | null, defaultMeta = '⌘'): string {
  if (!userAgent) {
    return defaultMeta;
  }

  const os = getOSFromUserAgent(userAgent, 'ios');
  if (appleOsLiterals.includes(os)) {
    return '⌘';
  }

  return '^';
}
