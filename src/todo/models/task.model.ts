import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Task } from '../interfaces/todo.interface';

@Table({})
export class Todo extends Model<Task> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.ENUM("pending", "done"),
        allowNull: false,
        defaultValue: "pending",
    })
    status: "pending" | "done";

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}