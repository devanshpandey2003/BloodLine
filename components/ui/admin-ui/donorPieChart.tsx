import { PieChart } from '@mui/x-charts/PieChart';

export const DonorPieChart = () => {
    return (
        <div>
            <PieChart
            series={[
                {
                    data: [
                        {id:0 , value:10, label:"Blood Group A"},
                        {id:1 , value:8, label:"Blood Group O+"},
                        {id:2 , value:9, label:"Blood Group AB+"},
                        {id:3 , value:6, label:"Blood Group O-"},
                        {id:4 , value:30, label:"Blood Group B-"},
                        
                    ],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: 150,
                    cy: 150,
                }
            ]} />
        </div>

    )
}