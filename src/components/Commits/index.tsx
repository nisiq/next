interface CalendarProps {
    year: number;
    month: number;
  }
  

export default function Commits({ year, month }: CalendarProps) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return(
        <div>
        {daysArray.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
    )
}