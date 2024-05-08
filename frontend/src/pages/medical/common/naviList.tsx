import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { Role } from "../../../entities/session/session.types";
import { NaviListConfig, adminConfig, gpConfig, guestPrimary, patientConfig } from "../config/navigation";
import { UseGuestCheck } from "../../../entities/patient/patient.query";


// todo refresh flash show hidden item
// save in store
function pattientGuestValid(patientConfig: NaviListConfig[]) {
    const { data, error, isError } = UseGuestCheck();
    console.log("check", data);
    if (!data) {
        return patientConfig;
    }

    if (data.ifPatientValid) {
        return patientConfig;
    } else if (!data.ifPatientValid) {
        return patientConfig.filter((item) =>
            item.primary === guestPrimary.profile || item.primary === guestPrimary.selfRegister);
    }

    return patientConfig;
}


export function NavLists({ role }: { role: Role }) {
    let config
    switch (role) {
        case "patient":
            config = pattientGuestValid(patientConfig);
            break;
        case "admin":
            config = adminConfig;
            break;
        case "gp":
            config = gpConfig;
            break;
        default:
            config = patientConfig;
            throw new Error("Role not found");
    }

    return (
        <Paper elevation={0}>
            <List component="nav">
                {config.map((item) => {
                    if (!item.disabled) {
                        return <ListItemLink key={"nav" + item.primary} to={item.to} primary={item.primary} icon={item.icon} />
                    } else {
                        return null;
                    }
                })}

            </List>
        </Paper>
    )

}


export interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}


//ref https://juejin.cn/post/6985068487479656461
const Link = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
    function Link(itemProps, ref) {
        return <NavLink ref={ref} {...itemProps} />;
    },
);

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;
    return (
        <ListItem key={"nav" + primary}>
            <ListItemButton component={Link} to={to}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItemButton>
        </ListItem >

    );
}



