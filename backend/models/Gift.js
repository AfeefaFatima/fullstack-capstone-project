export const giftCollection = () => "gifts";

export function giftPayload(body, userId) {
  return {
    title: String(body.title || "").trim(),
    description: String(body.description || "").trim(),
    category: String(body.category || "Other").trim(),
    condition: String(body.condition || "Good").trim(),
    location: String(body.location || "Lahore").trim(),
    imageUrl: String(body.imageUrl || "/uploads/gift-box.svg").trim(),
    status: "available",
    ownerId: userId,
    createdAt: new Date(),
    comments: []
  };
}
