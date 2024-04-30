import { Role } from "../../../entities/session/session.types";
import { ListItemLinkProps } from "../common/naviList";
import PeopleIcon from '@mui/icons-material/People';
import { pathKeys } from "./path";

export interface NaviListConfig extends ListItemLinkProps {
    disabled?: boolean;
    // isShow?: boolean;
}
export const guestPrimary = {
    profile: 'Profile',
    selfRegister: 'self-register',
}
export const patientConfig: NaviListConfig[] = [
    { primary: guestPrimary.profile, to: '/patient/profile', icon: <PeopleIcon /> },
    { primary: guestPrimary.selfRegister, to: pathKeys.patient.selfRegister(), icon: <PeopleIcon /> },
    { primary: 'Medical History', to: pathKeys.patient.history(), icon: <PeopleIcon /> },
    { primary: 'Medical Tests', to: pathKeys.patient.tests(), icon: <PeopleIcon /> },
    { primary: 'Book Appointment', to: '/patient/appointment', icon: <PeopleIcon /> },
    { primary: 'My Appointment', to:'/patient/myAppointment',icon:<PeopleIcon/>}
];
export const adminConfig: NaviListConfig[] = [
    { primary: 'Profile', to: pathKeys.admin.profile(), icon: <PeopleIcon /> },
    { primary: 'Approvals', to: pathKeys.admin.approvals(), icon: <PeopleIcon /> },
];

export const gpConfig: NaviListConfig[] = [
    { primary: 'Profile', to: pathKeys.practitioner.gp.profile(), icon: <PeopleIcon /> },
    { primary: 'Appointment', to: '/practitioner/gp/appointment', icon: <PeopleIcon /> },
    { primary: 'Today Appointment', to: '/practitioner/gp/today', icon: <PeopleIcon /> },
    { primary: 'Medical Tests', to: '/practitioner/gp/tests', icon: <PeopleIcon /> },
];


export type GenericLayoutProps = {
    role: Role;
}

export const patientPageLayoutConfig: GenericLayoutProps = {
    role: "patient"
}

export const adminPageLayoutConfig: GenericLayoutProps = {
    role: "admin"
}

export const gpPageLayoutConfig: GenericLayoutProps = {
    role: "gp"
}