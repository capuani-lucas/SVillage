import { DateData } from "react-native-calendars/src/types";
import { ScheduleObject, ScheduleState } from "./redux/reduxConstants";

// export const getScheduleForCurrentMonth = (obj: Array<ScheduleObject>): ScheduleObject|null => {
//     return getScheduleForSpecificMonth(obj, new Date().toLocaleString("default", {month: "long"}));
// }

// export const getScheduleForSpecificMonth = (obj: Array<ScheduleObject>, month: string): ScheduleObject|null => {
//     for (let i: number = 0; i < obj.length; i++) {
//         if (obj[i].month === month) {
//             return obj[i];
//         }
//     }
//     return null;
// }

export const getMarkedShifts = (obj: ScheduleObject, name: string): any => {

    if (obj === undefined || obj.shifts === undefined) {
        return {};
    }

    const toReturn: any = {};
    const allShifts = Object.keys(obj.shifts);

    for (let i = 0; i < allShifts.length; i++) {
        const people = obj.shifts[allShifts[i]].people;
        for (let j = 0; j < people.length; j++) {
            if (people[j].name === name) {
                toReturn[obj.shifts[allShifts[i]].stamp] = {marked: true};
            }
        }
    }


    return toReturn;
}


export const getAllWorkingOnDate = (obj: ScheduleObject, month: string, day: number): any => {

    if(obj === undefined || obj.shifts === undefined || obj.shifts[`${month}${day}`] === undefined) {
        return noDataMessage;
    }
    return obj.shifts[`${month}${day}`].people;
}


export const getWorkingTimeAtDate = (obj: ScheduleObject, name: string, month: string, day: number): string => {
    if(obj === undefined ||  obj.shifts === undefined || obj.shifts[`${month}${day}`] === undefined) {
        return noDataMessage;
    }
    const shiftsForDay = obj.shifts[`${month}${day}`].people;
    for (let i = 0; i < shiftsForDay.length; i++) {
        if (shiftsForDay[i].name === name) {
            return `Working ${shiftsForDay[i].time}`;
        }
    }
    return notWorkingMessage;
} 

// export const getShiftsForName = (obj: ScheduleObject): Array<string> => {

//     return [""]
// }

const getCurrentDayTimestamp = (d: Date): string => {
    let date = d;
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
}

export const getCurrentDay = (): DateData => {
    const date = new Date();

    return {
        dateString: getCurrentDayTimestamp(date),
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDay(),
        timestamp: 0
    }
}

export const months: Array<string> = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
export const notWorkingMessage: string = "Not working today";
export const noDataMessage: string = "No data for current day";