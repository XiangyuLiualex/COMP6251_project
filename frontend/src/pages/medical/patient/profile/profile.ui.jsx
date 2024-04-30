import {
    useProfileQuery,
    useUpdateProfileMutation,
} from "../../../../entities/general/profile.query";
import { sessionStore } from "../../../../entities/session";
import ProfileList from "../../general/generalProfile.ui";


export function PatientProfilePage() {
    const id = sessionStore.getState().uid;
    const { data, isLoading, isError, refetch } = useProfileQuery(id);
    const patchMutate = useUpdateProfileMutation("PATCH");
    const postMutate = useUpdateProfileMutation("POST");

    if (isLoading) {
        return <div>Loading...</div>; // 或其他加载指示器
    }
    if (isError) {
        return <div>Error: {isError.message}</div>; // 显示错误信息
    }

    const profile = data[0] === undefined ? {} : data[0];
    const mutateProfile = data[0] === undefined ? postMutate : patchMutate;

    if (mutateProfile.isSuccess) {
        refetch();
    }

    console.log("here i am" + profile.name);
    const handleUpdateProfile = (
        profileId,
        name,
        gender,
        profession,
        phoneNum,
        birthday,
        aboutMe
    ) => {
        mutateProfile.mutate({
            profileId: profileId,
            name: name,
            gender: gender,
            profession: profession,
            phoneNum: phoneNum,
            birthday: birthday,
            aboutMe: aboutMe,
        });
    };

    return (
        <div>
            <h1>Profile</h1>
            <ProfileList profile={profile} onUpdateProfile={handleUpdateProfile} />
        </div>
    );
}
