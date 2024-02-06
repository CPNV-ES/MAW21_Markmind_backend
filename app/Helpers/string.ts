export function toSnakeCase(value: string): string {
  return value.toLowerCase().replace(' ', '_')
}