import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const BDChart = ({startDate, endDate, task }) => {
    const generateDateRange = (start, end) => {
        const result = [];
        const cur = new Date(start);
        const last = new Date(end);

        while (cur <= last) {
            result.push(cur.toISOString().slice(0, 10));
            cur.setDate(cur.getDate() + 1);
        }
        return result;
    };

    const dates = generateDateRange(startDate, endDate);
    const daysCount = dates.length;
    const totalPoints = task.reduce((a, c) => {
        return a + (c.points || 0);
    }, 0);    

    console.log("task", task);
    // console.log(totalPoints);

    const dailyPoints = dates.reduce((acc, date) => {
        acc[date] =  { create: 0, done: 0};
        return acc;
    }, {});

    task.forEach(t => {
        const points = t.points || 0;

        const createDate = t.createDate ? t.createDate.slice(0, 10) : null;
        if(createDate && dailyPoints[createDate]) {
            dailyPoints[createDate].create += points;
        }

        const doneDate = t.doneDate ? t.doneDate.slice(0, 10) : null;
        if(doneDate && dailyPoints[doneDate]) {
            dailyPoints[doneDate].done += points;
        }
    });

    const remainingPointsArray = [];
    let cumulativeCreated = 0;
    let cumulativeDone = 0;

    dates.forEach(date => {
        const daily = dailyPoints[date];
        // console.log(dailyPoints[date])
        cumulativeCreated += daily.create;
        cumulativeDone += daily.done;

        remainingPointsArray.push(cumulativeCreated - cumulativeDone);
    });

    const data = dates.map((date, i) => ({
        date,
        remaining: remainingPointsArray[i],
        ideal: Math.max(totalPoints - (totalPoints / (daysCount - 1) * i), 0)
    }));   

    console.log("data", data);

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="remaining" stroke="#007bff" name="実際の残り工数" />
                    <Line type="linear" dataKey="ideal" stroke="#ff0000" strokeDasharray="5 5" name="理想線" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default BDChart;