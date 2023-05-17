export default function makeTruncatedString(string: string, maxLength: number) {
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}...`
    : string
}
