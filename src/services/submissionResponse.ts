function describe(value: unknown): string {
  if (Array.isArray(value)) return value.map(describe).join(' ');
  if (value && typeof value === 'object') return Object.entries(value).map(([key, detail]) => `${key.replace(/_/g, ' ')}: ${describe(detail)}`).join('\n');
  return String(value ?? '');
}
export async function readSavedSubmission(response: Response, requireReference = false) {
  const json = await response.json().catch(() => null);
  if (!response.ok) throw new Error(describe(json?.errors || json?.message || json || 'Submission failed. Please try again.'));
  if (!json?.data?.id || (requireReference && !json.data.reference_id)) {
    throw new Error('The server did not confirm your submission. Please contact our office before sending again.');
  }
  return json;
}
