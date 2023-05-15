export class CreateEventDto {
    userId: string;
    scheduleId: number;
    name?: string;
    date: Date;
    entryHour?: Date;
    exitHour?: Date;
    vacation?: boolean;
    sickLeave?: boolean;
    holiday?: boolean;
}