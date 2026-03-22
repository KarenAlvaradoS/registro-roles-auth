export function mapUser(user) {
  return {
    id: user.id,
    name: user.name.trim(),
    email: user.email.toLowerCase(),
  };
}