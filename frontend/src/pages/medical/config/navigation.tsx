import { Role } from "../../../entities/session/session.types";
import { ListItemLinkProps } from "../common/naviList";
import PeopleIcon from '@mui/icons-material/People';
import { pathKeys } from "./path";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export interface NaviListConfig extends ListItemLinkProps {
    disabled?: boolean;
    // isShow?: boolean;
}
export const guestPrimary = {
    profile: 'Profile',
    selfRegister: 'self-register',
}
export const patientConfig: NaviListConfig[] = [
    { primary: guestPrimary.profile, to: '/patient/profile', icon: <AccountBoxIcon /> },
    { primary: guestPrimary.selfRegister, to: pathKeys.patient.selfRegister(), icon: <HistoryEduIcon /> },
    { primary: 'Medical History', to: pathKeys.patient.history(), icon: <PeopleIcon /> },
    { primary: 'Medical Tests', to: pathKeys.patient.tests(), icon: <BloodtypeIcon /> },
    { primary: 'Book Appointment', to: '/patient/appointment', icon: <Diversity1Icon /> },
    { primary: 'My Appointment', to:'/patient/myAppointment',icon:<EventNoteIcon/>}
];
export const adminConfig: NaviListConfig[] = [
    { primary: 'Profile', to: pathKeys.admin.profile(), icon: <PeopleIcon /> },
    { primary: 'Approvals', to: pathKeys.admin.approvals(), icon: <PeopleIcon /> },
];

export const gpConfig: NaviListConfig[] = [
    { primary: 'Profile', to: pathKeys.practitioner.gp.profile(), icon: <PeopleIcon /> },
    { primary: 'Appointment', to: '/practitioner/gp/appointment', icon: <EditCalendarIcon /> },
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