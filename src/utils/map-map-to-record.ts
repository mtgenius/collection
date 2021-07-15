export default function mapMapToRecord<T>(
  map: Readonly<Map<number | string, T>>,
): Record<number | string, T> {
  const record: Record<number | string, T> = {};
  for (const [key, value] of map.entries()) {
    record[key] = value;
  }
  return record;
}
