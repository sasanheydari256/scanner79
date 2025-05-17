import { AccessOrDeniedEvent, DownloadEBadge } from '../../constants/api';

export async function fetchScanData({ RegId, EventId, HallName }) {
  return await AccessOrDeniedEvent(RegId, EventId, HallName);
}

export async function fetchPdfUrl(EventId, RegId) {
  return await DownloadEBadge(EventId, RegId);
}
