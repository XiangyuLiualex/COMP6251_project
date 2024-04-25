import { useProfileQuery, useUpdateProfileMutation } from "../../../../entities/general/profile.query";
import { sessionStore } from "../../../../entities/session";
import ProfileList from "../../general/generalProfile.ui";

export function GpProfilePage() {
    const id = sessionStore.getState().uid;
    // const role = sessionStore.getState().role;
    // const token = sessionStore.getState().token;
    const { data, isLoading, error, refetch } =useProfileQuery(id);
    const {mutate: mutateProfile,isError,isSuccess,} = useUpdateProfileMutation()
    if (isLoading) {
        return <div>Loading...</div>; // 或其他加载指示器
    }
    if (error) {
        return <div>Error: {error.message}</div>; // 显示错误信息
    }
    if (isSuccess) {
        // isSuccess 变为 true 时执行的函数
        refetch();
        // 可在这里调用需要执行的函数
      }
    const profile=data[0];
    console.log("here i am"+profile.name)
    const handleUpdateProfile = (profileId,name,gender,profession,hobby,email,aboutMe) => {
        mutateProfile({
            profileId:profileId,
            name:name,
            gender:gender,
            profession:profession,
            hobby:hobby,
            email:email,
            aboutMe:aboutMe
        });
      };

    return (
        <div>
            <h1>Profile</h1>
            <ProfileList profile={profile} onUpdateProfile={handleUpdateProfile}/>
        </div>
    )
}