import toast from "react-hot-toast";
import axios from "axios";
import { getCookie } from "cookies-next";

export interface SuccessResponseType {
  success: string;
}

interface RequestType {
  method: string;
  url: string;
  body?: string | FormData;
  contentType?: string;
  isToast?: boolean;
}

const path = "/api";

export const request = async <T>({
  method,
  url,
  body,
  contentType = "application/json",
  isToast = true,
}: RequestType): Promise<T | undefined> => {
  const tokens = !!getCookie("jwt") ? getCookie("jwt") : null;

  const headers = !!tokens
    ? {
        "Content-Type": contentType,
        Authorization: "Bearer " + String(tokens),
      }
    : {
        "Content-Type": contentType,
      };

  const handleGetDelete = async () => {
    try {
      const res = await axios<T>({
        method: method,
        url: `${path}${url}`,
        headers: headers,
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handlePostPatch = async () => {
    try {
      const res = await axios<T>({
        method: method,
        url: `${path}${url}`,
        headers: headers,
        data: body,
      });
      isToast && toast.success("Success");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  switch (method) {
    case "get": {
      const data = await handleGetDelete();
      return data;
    }
    case "delete": {
      const data = await handleGetDelete();
      return data;
    }
    case "post": {
      const data = await handlePostPatch();
      return data;
    }
    case "patch": {
      const data = await handlePostPatch();
      return data;
    }
  }
};

request.get = async <T>(url: string) => {
  const tokens = !!getCookie("jwt") ? getCookie("jwt") : null;
  return axios
    .get<T>(`${path}${url}`, {
      headers: !!tokens
        ? {
            contentType: "application/json",
            Authorization: "Bearer " + String(tokens),
          }
        : { contentType: "application/json" },
    })
    .then((res) => res.data);
};
