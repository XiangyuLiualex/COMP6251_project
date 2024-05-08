import {
    useProfileQuery,
    useUpdateProfileMutation,
} from "../../../../entities/general/profile.query";
import { sessionStore } from "../../../../entities/session";
import ProfileList from "../../general/generalProfile.ui";


export function GpProfilePage() {
    const id = sessionStore.getState().uid;
    const { data, isLoading, isError, refetch } = useProfileQuery(id);
    const patchMutate = useUpdateProfileMutation("PATCH");
    // const [shouldRefetch, setShouldRefetch] = React.useState(false);

    // 使用 useEffect 来观察 isSuccess 的变化，而不是在渲染逻辑中直接进行条件判断


    if (isLoading) {
        return <div>Loading...</div>; // 或其他加载指示器
    }
    if (isError) {
        return <div>Error: {isError.message}</div>; // 显示错误信息
    }

    const profile = data
    const mutateProfile = patchMutate;

    if (mutateProfile.isSuccess) {
        refetch();
    }

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

export function ViewPatientPage({ patientId }) {

    console.log("patientId:", patientId)
    const { data, isLoading, isError, refetch } = useProfileQuery(patientId);
    console.log("data:", data)
    return (
        <div>
            <h1>Profile</h1>
            <ProfileList profile={data} onUpdateProfile={null} />
        </div>
    )
}


