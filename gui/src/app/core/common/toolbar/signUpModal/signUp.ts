import { Birthday } from './birthday';

export class SignUp {
    constructor(
        public id: number,
        public title: string,
        public firstname: string,
        public lastname: string,
        public birtday: Birthday,
        public username: string,
        public password: string,
        public passwordCheck: string
    ){}
}