import { sign } from "crypto";

// TODO: handling all the paths
export const pathKeys = {
    root: '/',
    login() { return this.root.concat('login') },
    signUp() { return this.root.concat('sign-up') },
    patient: {
        root() {
            return pathKeys.root.concat('patient/');
        },
        selfRegister() {
            return pathKeys.patient.root().concat('self-register');
        },
        apiSelfRegister() {
            // FIXME register is used by json server auth
            return apiPrefix(pathKeys.patient.root().concat('self-reg'));
        },
        apiGuestCheck() {
            return apiPrefix(pathKeys.patient.root().concat('guest-check'));
        },
        tests() {
            return pathKeys.patient.root().concat('medical-tests');
        },
        history() {
            return pathKeys.patient.root().concat('medical-history');
        }
    },
    admin: {
        root() {
            return pathKeys.root.concat('admin/');
        },
        apiGetAllApprovals() {
            return apiPrefix(pathKeys.admin.root().concat('approvals'));
        },
        apiUpdateApproval() {
            return apiPrefix(pathKeys.admin.root().concat('approval'));
        },
        apiApproveSelfRegister(pid: string) {
            return apiPrefix(pathKeys.admin.root().concat('approve').concat("/" + pid));
        }
    }
}

function apiPrefix(input: string) {
    return '/api'.concat(input);
}