package vilanelle_api.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="celendarevent")
public class CalendarEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime start;

    private LocalDateTime end;

    @Column(nullable = false)
    private Boolean allDay = false;

    @Column(length = 1000)
    private String description;

    /** Règle de récurrence au format iCalendar (ex: "DTSTART:20240101T190000\nRRULE:FREQ=WEEKLY;UNTIL=20241231T235959") */
    @Column(length = 500)
    private String rrule;

    /** Durée de chaque occurrence pour les événements récurrents (ex: "02:00") */
    @Column(length = 10)
    private String duration;

    public CalendarEvent() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDateTime getStart() { return start; }
    public void setStart(LocalDateTime start) { this.start = start; }

    public LocalDateTime getEnd() { return end; }
    public void setEnd(LocalDateTime end) { this.end = end; }

    public Boolean getAllDay() { return allDay; }
    public void setAllDay(Boolean allDay) { this.allDay = allDay; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getRrule() { return rrule; }
    public void setRrule(String rrule) { this.rrule = rrule; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
}
