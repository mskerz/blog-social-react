import moment from "moment/min/moment-with-locales";

class TimeFormat {
    static format(date) {
        return moment(date).locale('th').format('LLL');
    }

    static timeAgo(date) {
        return moment(date).locale('th').fromNow();
    }

    static smartDate(date) {
        const now = moment();
        const inputDate = moment(date);
        const diffSeconds = now.diff(inputDate, 'seconds');
        const diffMinutes = now.diff(inputDate, 'minutes');
        const diffHours = now.diff(inputDate, 'hours');
        const diffDays = now.diff(inputDate, 'days');
        const diffWeeks = now.diff(inputDate, 'weeks');
        const diffMonths = now.diff(inputDate, 'months');
        const diffYears = now.diff(inputDate, 'years');

        if (diffSeconds < 10) {
            return 'ไม่กี่วินาทีที่แล้ว';
        } else if (diffSeconds < 60) {
            return `${diffSeconds} วินาทีที่แล้ว`;
        } else if (diffMinutes < 60) {
            return `${diffMinutes} นาทีที่แล้ว`;
        } else if (diffHours < 24) {
            return `${diffHours} ชั่วโมงที่แล้ว`;
        } else if (diffDays < 7) {
            return `${diffDays} วันที่แล้ว`;
        } else if (diffWeeks < 5) {
            return `${diffWeeks} สัปดาห์ที่แล้ว`;
        } else if (diffMonths < 12) {
            return `${diffMonths} เดือนที่แล้ว`;
        } else {
            return `${diffYears} ปีที่แล้ว`;
        }
    }
}
 
export { TimeFormat };
