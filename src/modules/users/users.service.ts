import {BadRequestException, Injectable} from '@nestjs/common';
import {users} from "../../moks";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt'
import {CreateUserDTO, UpdateUserDTO} from "./dto";
import {AppError} from "../../common/constants/errors";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    }
    async hashPassword(password){
        return bcrypt.hash(password, 10)
    }

    async findUserByEmail(email: string){
        return this.userRepository.findOne({ where: { email: email } });
    }
   async createUser(dto): Promise<CreateUserDTO> {
    /*    const existUser = await this.findUserByEmail(dto.email)*/
      /* if (existUser) throw new BadRequestException(AppError.USER_EXIST)*/
        dto.password = await this.hashPassword(dto.password)
       await this.userRepository.create({
            firstName: dto.firstName,
           username: dto.username,
           email: dto.email,
           password: dto.password
       })
      /* await this.userRepository.create(newUser)*/
       return dto
   }
async publicUser(email:string){
        return this.userRepository.findOne({
            where:{email},
        attributes: {exclude: ['password']}
        })
}
async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO>{
        await this.userRepository.update(dto, {where: {email}})
    return dto
}
async deleteUser (email:string) {
        await this.userRepository.destroy({where: {email}})
    return true
}
}
