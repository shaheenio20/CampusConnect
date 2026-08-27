/**
 * Converts standard 12-hour format time string (e.g. "10:00 AM", "01:30 PM", "12:00 PM")
 * into total minutes from midnight (0 - 1439) for precise interval comparison.
 */
export const parseTimeToMinutes = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return null;
  const cleaned = timeStr.trim();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let [_, hoursStr, minutesStr, period] = match;
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period.toUpperCase() === "PM" && hours < 12) hours += 12;
  if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

/**
 * Checks if two events conflict in BOTH date AND overlapping time ranges.
 * Two time intervals [start1, end1) and [start2, end2) overlap if:
 * start1 < end2 AND start2 < end1
 */
export const doEventsConflict = (eventA, eventB) => {
  if (!eventA || !eventB) return false;
  if (eventA.id && eventB.id && eventA.id === eventB.id) return false;

  // Must be on the exact same date
  if (eventA.date !== eventB.date) return false;

  const startA = parseTimeToMinutes(eventA.startTime);
  const endA = parseTimeToMinutes(eventA.endTime);
  const startB = parseTimeToMinutes(eventB.startTime);
  const endB = parseTimeToMinutes(eventB.endTime);

  // Fallback to date match if time parsing is unavailable
  if (startA === null || endA === null || startB === null || endB === null) {
    return true;
  }

  // Check if time windows overlap
  return startA < endB && startB < endA;
};

/**
 * Finds the first event from registeredEvents that conflicts with the given event.
 */
export const getConflictingEvent = (event, registeredEvents = []) => {
  if (!event || !registeredEvents || !registeredEvents.length) return null;
  return registeredEvents.find((e) => doEventsConflict(event, e)) || null;
};

/**
 * Detects all conflicting groups within a list of registered events.
 * Returns groups of events whose dates and time slots overlap.
 */
export const getConflictGroups = (registeredEvents = []) => {
  if (!registeredEvents || !registeredEvents.length) return [];

  const conflictMap = new Map();

  for (let i = 0; i < registeredEvents.length; i++) {
    for (let j = i + 1; j < registeredEvents.length; j++) {
      const e1 = registeredEvents[i];
      const e2 = registeredEvents[j];
      if (doEventsConflict(e1, e2)) {
        if (!conflictMap.has(e1.id)) conflictMap.set(e1.id, new Set([e1.id]));
        if (!conflictMap.has(e2.id)) conflictMap.set(e2.id, new Set([e2.id]));

        conflictMap.get(e1.id).add(e2.id);
        conflictMap.get(e2.id).add(e1.id);
      }
    }
  }

  const processed = new Set();
  const result = [];

  registeredEvents.forEach((evt) => {
    if (conflictMap.has(evt.id) && !processed.has(evt.id)) {
      const relatedIds = Array.from(conflictMap.get(evt.id));
      relatedIds.forEach((id) => processed.add(id));
      const groupEvents = registeredEvents.filter((e) => relatedIds.includes(e.id));
      result.push({
        date: evt.date,
        events: groupEvents,
      });
    }
  });

  return result;
};
