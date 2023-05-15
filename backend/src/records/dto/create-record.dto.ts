export class CreateRecordDto {
    date: Date;
    entry: Date;
    exit?: Date;
    breakTimeMinutes?: number;
    userId: string;
}