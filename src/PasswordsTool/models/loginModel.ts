class Login{
    //public by default
    loginName: string;

    loginDescription: string;

    loginUsername:string;
    
    loginPassword:string;

    constructor(){
        this.loginName = "Bart";
        this.loginDescription = "Simpson Description";
        this.loginUsername = "bsimpson";
        this.loginPassword = "@820z8zsk7_1";

    }

    setLogin(name: string, description:string, username:string,password:string){
        this.loginName = name;
        this.loginDescription = description;
        this.loginUsername = username;
        this.loginPassword = password;
    }
}