import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor() {

    }
    async adminSignIn(username: string, password: string) {
        if (username === 'admin' && password === 'password') {
            return {admin : true}
        }else{
            throw new BadRequestException("Invalid Credentials")
        }
        

    }
}