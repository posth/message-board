export class User {

    //Having public in the argument of the constructor is the same result as having a variable and instantiating it in the constructor of this class
    constructor(public email: string,
                public password: string,
                public firstName?: string,
                public lastName?: string) {
                    //Question mark means these are not necessary - they are optional
    }
}