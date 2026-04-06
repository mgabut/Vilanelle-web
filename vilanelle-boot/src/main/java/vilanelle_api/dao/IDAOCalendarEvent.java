package vilanelle_api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vilanelle_api.model.CalendarEvent;

public interface IDAOCalendarEvent extends JpaRepository <CalendarEvent, Integer> {
}
