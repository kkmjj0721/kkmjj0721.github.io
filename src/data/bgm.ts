export type BgmTrack = {
  id: string;
  title: string;
  artist: string;
  src: string;
  enabled: boolean;
  licenseStatus: "verified" | "unverified";
  provenanceUrl?: string;
};

export const bgmTracks = [
  {
    id: "departures",
    title: "Departures",
    artist: "EGOIST",
    src: "/audio/bgm/Departures.mp3",
    enabled: true,
    licenseStatus: "unverified",
  },
] as const satisfies readonly BgmTrack[];

export const defaultBgmTrack = bgmTracks[0];
