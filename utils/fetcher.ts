import axios, { isAxiosError } from "axios";

type FetcherParams = {
  endpoint: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: unknown;
  token?: string;
  file?: boolean;
  role?: "public" | "admin";
};

export async function fetcher({
  endpoint,
  method,
  data,
  token,
  role,
  file,
}: FetcherParams) {
  const prefix = process.env.NEXT_PUBLIC_MODE == "development" ? "dev" : "api";

  const options = {
    url: `https://${prefix}.jakartapastisehat.com/api${endpoint}`,
    method,
  };

  if (data) {
    Object.assign(options, { data });
  }

  if (file) {
    Object.assign(options, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  if (token) {
    Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (role) {
    Object.assign(options, {
      headers: {
        "X-ROLE": role,
      },
    });
  }

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
}
