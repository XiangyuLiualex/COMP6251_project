// TODO: handling all the paths
export const pathKeys = {
    root: '/',
    apiLogin() { return apiPrefix('/login') },
    apiSignup() { return apiPrefix('/signup') },
    login() { return this.root.concat('login') },
    signUp() { return this.root.concat('sign-up') },
    apiGetGpss() { return apiPrefix('/gpss') },
    apiGetSlots() { return apiPrefix('/slots') },

    apiHistory() {
        return apiPrefix('/medical-history');
    },
    patient: {
        root() {
            return pathKeys.root.concat('patient/');
        },
        apiGetNotification() {
            return apiPrefix('/notification');
        },
        apiReadNotification(id: number) {
            return apiPrefix('/notification/' + id);
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

    },
    slots: {
        root() {
            return pathKeys.root.concat('slots/');
        },
        apiUpdateSlotById(sid: string) {
            return apiPrefix(pathKeys.slots.root().concat(sid));
        }
    },
    appointment: {
        root() {
            return pathKeys.root.concat('appointment/');
        },
        apiAddAppointment() {
            return apiPrefix("/appointment");
        },
        apiGetAppointmentById(gpid: string) {
            return apiPrefix(pathKeys.root.concat('appointment?gpId=' + gpid));
        },
        apiUpdateAppointmentById(appointmentId: string) {
            return apiPrefix(pathKeys.appointment.root().concat(appointmentId));
        },
        apiGetAppointmentByIdAndDate(gpid: string, date: string) {
            return apiPrefix(pathKeys.root.concat('appointment?date=' + date + '&gpId=' + gpid));
        },
        apiGetAppointmentByPId(patientId: string) {
            return apiPrefix(pathKeys.root.concat('appointment?patientId=' + patientId));
        },
    },
    profile: {
        root() {
            return pathKeys.root.concat('profile/');
        },
        apiGetProfileById(userId: string) {
            return apiPrefix(pathKeys.root.concat('profile?userId=' + userId));
        },
        apiEditProfile() {
            return apiPrefix(pathKeys.profile.root());
        }
    },
    test: {
        root() {
            return pathKeys.root.concat('test/')
        },
        apiAddTest() {
            return apiPrefix("/test")
        },
        apiGetTestById(patientId: string) {
            return apiPrefix('/test?patientId=' + patientId);
        },
        apiUpdateTestById(testId: string) {
            return apiPrefix(pathKeys.test.root().concat(testId));
        },
        apiGetTestByAppointmentId(appointmentId: string) {
            return apiPrefix(pathKeys.root.concat('test?appointmentId=' + appointmentId));
        }
    },
    prescription: {
        root() {
            return pathKeys.root.concat('prescription/')
        },
        apiAddPrescription() {
            return apiPrefix("/prescription")
        },
        apiViewPrescriptionById(appointmentId: string) {
            return apiPrefix(pathKeys.root.concat('prescription?appointmentId=' + appointmentId));
        }
    },
    apiGetHistory(id: string) {
        return apiPrefix("/medical-history".concat(`?patientId=${id}`));
    }
}

export function apiPrefix(input: string) {
    if (import.meta.env.PROD) {
        return 'https://api.chzfakevox.com/api'.concat(input);
    } else {
        // return 'http://localhost:3001/api'.concat(input);
        return 'http://localhost:8080'.concat(input);
    }
}

// function urls(url: string) {
// return "http://localhost:3001/api/".concat(url)
// }