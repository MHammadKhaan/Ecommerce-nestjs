import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: 'boolean', default: false })
    isActive: boolean
    @CreateDateColumn()
    createdAt: Timestamp
    @UpdateDateColumn()
    updatedAt: Timestamp
}