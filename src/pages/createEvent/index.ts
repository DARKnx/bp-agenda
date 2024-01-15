export const combineDateTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const combinedDateTime = new Date(date);
  combinedDateTime.setUTCHours(hours, minutes);
  return combinedDateTime;
};

const formatTimeHoursAndMinutes = (date: Date): string => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const generateTimeSlots = (
  start: Date,
  end: Date,
  step: number
): { start: string; end: string }[] => {
  const timeSlots = [];
  let currentTime = new Date(start);

  while (currentTime < end) {
    const endTime = new Date(currentTime.getTime() + step * 60000);
    timeSlots.push({
      start: formatTimeHoursAndMinutes(currentTime),
      end: formatTimeHoursAndMinutes(endTime),
    });
    currentTime = endTime;
  }
  return timeSlots;
};

const isTimeOverlap = (start1: string, end1: string, start2: string, end2: string): boolean => {
  const startTime1 = new Date(`2000-01-01T${start1}`);
  const endTime1 = new Date(`2000-01-01T${end1}`);
  const startTime2 = new Date(`2000-01-01T${start2}`);
  const endTime2 = new Date(`2000-01-01T${end2}`);
  return startTime1 < endTime2 && endTime1 > startTime2;
};

export const getAvailableTimes = (
  selectedDate: Date,
  brokerSchedules: { startDate: string; endDate: string }[] | null,
  duration: number,
  startWork: string | Date,
  endWork: string | Date
): { start: string; end: string }[] | null => {
  startWork = combineDateTime(selectedDate, startWork as string);
  endWork = combineDateTime(selectedDate, endWork as string);

  const step = { '30 minutos': 30, '1 hora': 60, '1 hora e 30 minutos': 90, '2 horas': 120 }[duration];

  const allTimes = generateTimeSlots(startWork, endWork, step as number);

  if (!brokerSchedules || brokerSchedules.length === 0) {
    return allTimes;
  }

  const occupiedTimes = brokerSchedules.map((schedule) => {
    return {
      start: formatTimeHoursAndMinutes(new Date(schedule.startDate) as any),
      end: formatTimeHoursAndMinutes(new Date(schedule.endDate) as any),
    };
  });

  const availableTimes = allTimes.filter((timeSlot) => {
    for (const occupiedTime of occupiedTimes) {
      if (isTimeOverlap(timeSlot.start, timeSlot.end, occupiedTime.start, occupiedTime.end)) {
        return false;
      }
    }
    return true;
  });

  return availableTimes;
};