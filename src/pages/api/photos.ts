import type { NextApiRequest, NextApiResponse } from "next";
import { Photo } from "../../components/types/photoTypes";

const makeResponseSlow = async () => new Promise((a) => setTimeout(a, 1000));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Photo[] | { message: string }>
) {
  await makeResponseSlow();

  res.status(200).json([
    {
      id: 1,
      title: `${
        req.query.name.toString() || "Unknown"
      }: accusamus beatae ad facilis cum similique qui sunt`,
      thumbnail: `https://picsum.photos/150/150?${Math.random()}`,
      isFavorite: false,
    },
    {
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      thumbnail: `https://picsum.photos/150/150?${Math.random()}`,
      isFavorite: false,
    },
    {
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      thumbnail: `https://picsum.photos/150/150?${Math.random()}`,
      isFavorite: false,
    },
    {
      id: 4,
      title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      thumbnail: `https://picsum.photos/150/150?${Math.random()}`,
      isFavorite: false,
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      thumbnail: `https://picsum.photos/150/150?${Math.random()}`,
      isFavorite: false,
    },
  ]);
}
