export interface userPostData {
    name:string;
    email: string;
    email_verified:boolean;
    picture: string;
    sub:string
}
export interface UserData{
    id:string,
    name:string,
    lastName:string,
    dni:string,
    country:string,
    city:string,
    birthdate:Date,
    bio:string,
    availableToWork:boolean,
    professionalRate:string,
    newMember:boolean
    }