import { request } from "./request";

const subUrl = "/auth/login";

export const getToken = async (body: { email: string; password: string }) => {
  const url = `${subUrl}`;

  const data = await request({
    method: "post",
    url: url,
    body: JSON.stringify(body),
  });
  return data;
};
