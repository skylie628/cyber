import UserListSection from "@/features/profile/Components/list/UserListSection";
const ProfilePage = () => {
  return (
    <div className="w-11/12 max-w-[1920px] min-w-[300px] flex flex-col min-h-screen py-8 z-10">
      <div className="lg:grid lg:grid-cols-4 flex flex-col gap-8 min-h-screen">
        <UserListSection />
      </div>
    </div>
  );
};
export default ProfilePage;
