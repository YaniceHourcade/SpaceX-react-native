import { Launch, Paginated, Rocket, SpaceXAgency } from "../types/spacedevs";

const BASE = "https://lldev.thespacedevs.com/2.2.0";

async function get<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  params &&
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v)),
    );
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API Error ${res.status}`);
  return res.json();
}

export const spacedevsApi = {
  upcomingLaunches: (limit = 10) =>
    get<Paginated<Launch>>("/launch/upcoming/", { search: "SpaceX", limit }),
  pastLaunches: (limit = 10) =>
    get<Paginated<Launch>>("/launch/previous/", { search: "SpaceX", limit }),
  launchById: (id: string) => get<Launch>(`/launch/${id}/`),
  rocketById: (id: number) => get<Rocket>(`/config/launcher/${id}/`),
  spacexAgency: () => get<SpaceXAgency>(`/agencies/121/`),
};
