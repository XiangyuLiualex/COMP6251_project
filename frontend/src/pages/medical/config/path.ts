
// TODO: handling all the paths
export const pathKeys = {
    root: '/',
    apiLogin() { return apiPrefix('/login') },
    apiSignup() { return apiPrefix('/signup') },
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
        profile() {
            return pathKeys.admin.root().concat('profile');
        },
        approvals() {
            return pathKeys.admin.root().concat('approvals');
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
    },
    practitioner: {
        root() {
            return pathKeys.root.concat('practitioner/');
        },
        gp: {
            root() {
                return pathKeys.practitioner.root().concat('gp/');
            },
            profile() {
                return pathKeys.practitioner.gp.root().concat('profile');
            },

        }

    }
}

export function apiPrefix(input: string) {
    return 'http://localhost:3001/api'.concat(input);
}

// function urls(url: string) {
// return "http://localhost:3001/api/".concat(url)
// }