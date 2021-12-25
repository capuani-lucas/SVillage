import React, { useState } from "react"
import { Calendar } from "react-native-calendars"
import { View } from "react-native"
import { DateData } from "react-native-calendars/src/types"



const CalendarView: React.FC<{setCurrentDay: any, markedShifts: any}> = ({setCurrentDay, markedShifts}) => {

    const [selectedDate, setSelectedDate] = useState<any>(markedShifts);

    const pickDay = (day: DateData) => {
        const obj: any = {};
        obj[day.dateString] = {selected: true};
        setSelectedDate(obj)
        setCurrentDay(day);
    }

    return (

        <View style={{marginTop: 10}}>
            <Calendar 
        
                markedDates={selectedDate}
                onDayPress={pickDay}
        
            />
        </View>

    )

}

export default CalendarView