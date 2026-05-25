export function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0 KB';
  }

  const kilobytes = bytes / 1024;
  const megabytes = kilobytes / 1024;

  if (megabytes >= 1) {
    return `${megabytes.toFixed(1)} MB`;
  }

  return `${kilobytes.toFixed(0)} KB`;
}