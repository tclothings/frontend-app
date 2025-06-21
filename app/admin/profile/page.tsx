import Profile from "app/features/customer/profile";

export const metadata = {
  title: "Orders",
  description: "View orders list.",
};

export default async function Page() {
  return <Profile />;
}
