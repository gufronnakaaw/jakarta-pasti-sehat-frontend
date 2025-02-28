import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    admin_id: string;
    fullname: string;
    access_token: string;
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    admin_id: string;
    fullname: string;
    access_token: string;
    role: string;
    id?: string;
  }

  interface Session {
    user: {
      admin_id: string;
      fullname: string;
      access_token: string;
      role: string;
    };
  }
}
