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
        return a + c.points;
    }, 0);    

    const createPoints = {};
    const sumCreatePoints = [];
    const donePoints = {};
    const sumDonePoints = [];

    task.forEach(t => {
        if(t.doneDate ==! null){ 
        const d = t.doneDate;
        if(!donePoints[d]) donePoints[d] = [];
        donePoints[d].push(t.points);
        }
      }
    )
    for(let i = 0; i < daysCount; i++) {
        const sumDone = donePoints[dates[i]].reduce((a, c) => {
            return a + c
        }, 0);
        sumDonePoints.push(sumDone);
    };

    
    task.forEach(t => {
    const d = t.createDate;
    if(!createPoints[d]) createPoints[d] = [];
    createPoints[d].push(t.points);
    });
    for(let i = 0; i < daysCount; i++) {
        const sumCreate = createPoints[dates[i]].reduce((a, c) => {
            return a + c
        }, 0);
        sumCreatePoints.push(sumCreate);
    };
    

    // console.log(createPoints);
    //console.log(donePoints);

    const data = dates.map((date, i) => ({
        date,
        remaining: sumCreatePoints[i] - sumDonePoints[i],
        ideal: Math.max(totalPoints - (totalPoints / (daysCount - 1)) * i, 0)
    }));

    //console.log(data);

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