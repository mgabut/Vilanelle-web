package vilanelle_api.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vilanelle_api.model.CalendarEvent;
import vilanelle_api.service.CalendarEventService;

import java.util.List;

@RestController
@RequestMapping("/api/calendarEvent")
public class CalendarEventRestController {

    @Autowired
    private CalendarEventService srv;

    @GetMapping
    public List<CalendarEvent> findAll(){
        return this.srv.getAll();
    }

    @GetMapping("/{id}")
    public CalendarEvent getCalendarEventById(@PathVariable Integer id) {return this.srv.getById(id);}

    @PostMapping
    public CalendarEvent createEvenement(@RequestBody CalendarEvent calendarEvent){return this.srv.creatOrUpdateMap(calendarEvent);}

    @PutMapping("/{id}")
    public CalendarEvent updateCalendarEvent(@PathVariable Integer id, @RequestBody CalendarEvent calendarEvent) {
        calendarEvent.setId(id);
        return srv.creatOrUpdateMap(calendarEvent);
    }

    @DeleteMapping("/{id}")
    public void deleteCalendarEvent(@PathVariable Integer id) {
        srv.deleteById(id);
    }
}
