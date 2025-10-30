const validator = rquire("validator");

export const validateSignupData = (req, res) => {
    const { firstName, lastName, emailId, password }= req.body;
    if (!firstName || !lastName) throw new Error("name invalid");
    else if (!validator.isEmail(emailId)) throw new Error("email invalid");
    else if (!validator.isStrongPassword(password)) throw new Error("enter strong password");
}

export const validateEditProfileData = (req, res) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "phototUrl", "gender", "age", "about"];

    const isEditAllowed = Object.keys(req.body).every((field) => {
        allowedEditFields.includes(field);
    })

    return isEditAllowed;
}