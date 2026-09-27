# Acceptance criteria — three selected stories

Assumptions first, then the criteria. Each block names the story it belongs to. 3 to 5 criteria per story, every one in Given / When / Then form, and every set covers a validation or error case — not three happy paths.

---

## Assumptions

These must settle the two questions the scenario leaves open. Either answer is accepted; no answer is not.

- **Overlap:** a booking that ends exactly when another begins is allowed under R3, because touching boundary hours do not occupy the room simultaneously.
- **Duration:** a booking of exactly two hours is allowed under R2, because the rule specifies a maximum duration of at most two hours inclusive.

---

## US-01 — View availability

### AC-01
- **Given** a student is viewing the study room availability page
- **When** they select a valid future date and time slot
- **Then** the system displays a list of all unblocked and unreserved rooms for that slot

### AC-02
- **Given** a study room is marked as blocked by an administrator
- **When** a student checks availability for that room
- **Then** the room is displayed as unavailable and cannot be selected

### AC-03
- **Given** a student selects a past date or time
- **When** they attempt to view availability
- **Then** the system rejects the request and displays a validation error message

---

## US-02 — Book room

### AC-04
- **Given** a room is free for a requested 2-hour future slot (e.g., 14:00 to 16:00)
- **When** the student submits a booking request
- **Then** the reservation is confirmed and the room status updates to reserved

### AC-05
- **Given** an existing booking ends at 14:00
- **When** a student requests a new booking starting at 14:00 for the same room
- **Then** the system approves the booking without triggering an overlap error

### AC-06
- **Given** a student attempts to book a room for a duration of 2.5 hours (exceeding 2 hours)
- **When** they submit the reservation
- **Then** the system rejects the booking with an error stating the maximum limit is 2 hours

### AC-07
- **Given** a room is already booked from 10:00 to 12:00
- **When** another student attempts to book the same room from 11:00 to 13:00
- **Then** the system rejects the request due to time slot overlap

---

## US-04 — Block or unblock room

### AC-08
- **Given** an administrator is viewing room management settings
- **When** they select an active room and set its status to "Blocked"
- **Then** the room is immediately blocked and removed from student search results

### AC-09
- **Given** a room is currently blocked
- **When** a student attempts to create a new reservation for that room
- **Then** the system prevents the booking and displays a blocked status message

### AC-10
- **Given** a room is currently in "Blocked" status
- **When** the administrator selects the room and clicks "Unblock"
- **Then** the room status updates to active and becomes available for future student bookings