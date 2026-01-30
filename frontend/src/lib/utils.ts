// Common utility functions
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString()
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString()
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
