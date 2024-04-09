// TODO: handling all the paths
export const pathKeys = {
    root: '/',
    patient:{
        root(){
            return pathKeys.root.concat('patient/');
        },
        selfRegister(){
            return pathKeys.patient.root().concat('self-reg-form');
        }
    }
}