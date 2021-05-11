export class UserModel{

    constructor(
        public userTag: string,
        public firstName: string,
        public lastName: string,
        public email: string, 
        public password: string, 
        public messages?: [],
        public followers?: [],
        public following?: [],
        public likesMessages?: [],
        public userId?: string,
    ){

    }
}