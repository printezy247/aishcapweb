import { CT1 } from "@/config/track-record";
import type { TrackRecordSource } from "@/lib/track-record";

/** Phase 1 source: the committed config file. */
export const configFileSource: TrackRecordSource = {
  getTrackRecord: () => CT1,
};

/** The single point to swap in a verified (API) source in Phase 2. */
export const trackRecordSource: TrackRecordSource = configFileSource;
