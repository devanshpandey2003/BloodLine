
import { Gauge } from '@mui/x-charts/Gauge';

function DonorGuageChart() {
    return (
        <div>
            <div className='h-[200px] w-[200px] '>
                <Gauge
                    value={75}
                    startAngle={0}
                    endAngle={360}
                    innerRadius="80%"
                    outerRadius="100%"
                // ...
                />
            </div>

            <h2 className='font-semibold text-[18px] m-[40px] '> 
                Prospects
            </h2>
        </div>
    )
}

export default DonorGuageChart

