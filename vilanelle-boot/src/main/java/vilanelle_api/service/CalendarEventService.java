package vilanelle_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vilanelle_api.dao.IDAOCalendarEvent;
import vilanelle_api.model.CalendarEvent;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarEventService {

    @Autowired
    private IDAOCalendarEvent daoCalendarEvent;

    public List<CalendarEvent> getAll(){
        return daoCalendarEvent.findAll();
    }

    public CalendarEvent getById(Integer id){
        Optional<CalendarEvent> opt = daoCalendarEvent.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            return opt.get();
        }
    }

    public CalendarEvent creatOrUpdateMap(CalendarEvent calendarEvent) {
        return daoCalendarEvent.save(calendarEvent);
    }

    public void deleteById(Integer id) {
        daoCalendarEvent.deleteById(id);
    }

    public void delete(CalendarEvent calendarEvent) {
        daoCalendarEvent.delete(calendarEvent);
    }

}
