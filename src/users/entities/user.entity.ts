import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/utility/common/entity/base.entity";
import { Roles } from "src/utility/common/user-role";

@Entity('users')
//User
export class UserEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    email: string

    @Column({ select: false })
    password: string

    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
    roles: Roles[]
}
