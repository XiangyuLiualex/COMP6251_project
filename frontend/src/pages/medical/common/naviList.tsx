import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { Role } from "../../../entities/session/session.types";
import { NaviListConfig, adminConfig, gpConfig, patientConfig } from "../config/navigation";
import { UseGuestCheck } from "../../../entities/patient/patient.query";


function pattientGuestValid(patientConfig: NaviListConfig[]) {
    const { data } = UseGuestCheck();
    if (data.patientId === false) {
        return patientConfig;
    } else if (data.patientId === true) {
        return patientConfig.filter((item) => item.primary !== "Self Register");
    } else {
        console.error("patientId is not boolean");
        return patientConfig;
    }
}


export function NavLists({ role }: { role: Role }) {
    let config
    switch (role) {
        case "patient":
            config = patientConfig;
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



