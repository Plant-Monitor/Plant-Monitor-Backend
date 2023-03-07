import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Snapshot } from "src/models/snapshots/interfaces/snapshot.interface";
import { Action, ActionStatus, ActionType } from "../interaces/action.interface";

export type ActionDocument = HydratedDocument <ActionDocObject>;

@Schema()
export class ActionDocObject implements Action {
    @Prop()
    action_id: string;
    @Prop()
    timestamp: Date;
    @Prop()
    action_type: ActionType;
    @Prop()
    status: ActionStatus;
    @Prop()
    metric: string;
    @Prop()
    message: string;
    @Prop()
    level: number;
    @Prop()
    current_snapshot: Snapshot;
}

export const ActionSchema = SchemaFactory.createForClass(ActionDocObject);