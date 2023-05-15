import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {EventsService} from "./events.service";
import {CreateEventDto} from "./dto/create-event.dto";
import {Event} from "./entities/event.entity";

@Controller('events')
export class EventsController {

    constructor(private eventsService: EventsService) {
    }

    @Get()
    getEvents(): Promise<Event[]> {
        return this.eventsService.getEvents();
    }

    @Get(':id')
    getOneEvent(@Param('id', ParseIntPipe) id: number): Promise<Event> {
        return this.eventsService.getOneEvent(id);
    }

    @Get('all/:id')
    getEventsByUser(@Param('id') id: string): Promise<Event[]> {
        return this.eventsService.getEventsByUser(id);
    }

    @Post()
    createEvent(@Body() newEvent: CreateEventDto): Promise<Event> {
        return this.eventsService.createEvent(newEvent);
    }

    @Delete(':id')
    deleteEvent(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.deleteEvent(id);
    }
}
