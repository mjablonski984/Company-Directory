export default class Validation{

    static validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static validateName(name) 
    {
        var re = /^[A-Za-z]+[A-Za-z \-\']*$/;
        return re.test(name);
    }
}