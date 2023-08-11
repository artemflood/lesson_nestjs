import {Model, Table, Column} from "sequelize-typescript";
@Table
export class User extends Model{
    @Column
    firstName: string

    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    /*@Column
    list: string*/
}























