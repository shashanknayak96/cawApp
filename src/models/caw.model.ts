export class CawMessage{
    constructor(
        public cawMessage: string,
        public userId: string,
        public timestamp: string,
        public totalLikes: number, 
        public cawId?: string,
    ){

    }
}