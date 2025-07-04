import Profile from "app/features/customer/profile";

export const metadata = {
  title: "Profile",
  description: "Edit your profile",
};

export default async function Page() {
  return <Profile />;
}
