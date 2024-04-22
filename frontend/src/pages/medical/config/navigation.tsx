import { Role } from "../../../entities/session/session.types";
import { ListItemLinkProps } from "../common/naviList";
import PeopleIcon from '@mui/icons-material/People';
import { pathKeys } from "./path";

export interface NaviListConfig extends ListItemLinkProps {
    disabled?: boolean;
    // isShow?: boolean;
}
export const patientConfig: NaviListConfig[] = [
    { primary: 'Profile', to: '/patient/profile', icon: <PeopleIcon /> },
    { primary: 'self-register', to: pathKeys.patient.selfRegister(), icon: <PeopleIcon /> },
    { primary: 'Medical History', to: pathKeys.patient.history(), icon: <PeopleIcon /> },
    { primary: 'Medical Tests', to: pathKeys.patient.tests(), icon: <PeopleIcon /> }
];
export const adminConfig: NaviListConfig[] = [
    { primary: 'Profile', to: '/admin/profile', icon: <PeopleIcon /> },
    { primary: 'Approvals', to: '/admin/approvals', icon: <PeopleIcon /> },
];

export const gpConfig: NaviListConfig[] = [
    { primary: 'Profile', to: '/gp/profile', icon: <PeopleIcon /> },
    { primary: 'Medical History', to: '/gp/medical-history', icon: <PeopleIcon /> },
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