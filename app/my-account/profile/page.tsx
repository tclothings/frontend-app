import Profile from "app/features/customer/profile";

export const metadata = {
  title: "Profile",
  description: "View profile.",
};

export default async function ProfilePage() {
  return <Profile />;
}
