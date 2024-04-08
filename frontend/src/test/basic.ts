function formDataToJson<T>(formData: FormData): Partial<T> {
    const result: any = {};

    for (let entry of formData.entries()) {
        const [key, value] = entry;
        result[key as keyof T] = value;
    }

    return result;
}
type SignUpForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const formD = new FormData();
formD.append("firstName", "John");
formD.append("lastName", "Doe");
formD.append("email", "sa@email.com");

var res= formDataToJson<SignUpForm>(formD);

console.log(res);