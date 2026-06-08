export interface LeadPayload {
  name: string;
  phone: string;
  niche?: string;
  message?: string;
  source: string;
  captchaToken?: string;
}

export async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/lead.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.ok) {
    throw new Error(result?.message || 'Не удалось отправить заявку');
  }

  if (typeof window !== 'undefined' && 'ym' in window) {
    const ym = (window as Window & { ym?: (...args: unknown[]) => void }).ym;
    ym?.(undefined, 'reachGoal', 'lead_sent');
  }

  return result;
}
