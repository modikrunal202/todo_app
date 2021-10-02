import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("categories")
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  category_name: string;

  @ManyToOne(() => User, (user: User) => user.categories)
  @JoinColumn({name: 'user_id'})
  user_id: User;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
