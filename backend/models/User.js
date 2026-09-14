// export const userCollection = () => "users";

export const userCollection = () => "users";

export function userPayload(body) {
  return {
    name: String(body.name || "").trim(),

    email: String(body.email || "").trim().toLowerCase(),

    password: String(body.password || ""),

    location: String(body.location || "Lahore").trim(),

    phone: String(body.phone || "").trim(),

    role: "user",

    createdAt: new Date()
  };
}