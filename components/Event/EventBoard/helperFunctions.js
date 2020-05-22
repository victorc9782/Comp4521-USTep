
import Calendar from 'dayjs/plugin/calendar';
import dayjs from 'dayjs';


export function translateDateOnEventBoard(date) {
    var datetime = dayjs(date);
    dayjs.extend(Calendar);
    var calendartime = datetime.calendar(dayjs(), {
        sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
        nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
        nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
        lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
        lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
        sameElse: 'ddd, D MMM [at] h:mm A' // Everything else ( Sun, Mar 12 at 2:30 AM )
    });
    return (calendartime);
}


export function translateDateOnCreateEvent(date) {
    var datetime = dayjs(date);
    return datetime.format('ddd, MMM D YYYY');
}

export function translateTimeOnCreateEvent(date) {
    var datetime = dayjs(date);
    return datetime.format('hh:mm A');
}