import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#B88655', '#D49A6A', '#E59B4C', '#B38486', '#899B78'];

export function CategorySpreadChart() {
  const data = [
    { name: 'Cake', value: 10 },
    { name: 'Pasta', value: 5 },
    { name: 'Pastry', value: 20 },
    { name: 'Pie & Pudding', value: 15 },
    { name: 'Other', value: 50 },
  ]
  return (
    <div className="aspect-[1/1] h-80  flex flex-col items-center">
      <PieChart width={200} height={200} className="mt-4">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))
          }
        </Pie>
      </PieChart>
      <div className="grid grid-cols-2 text-sm w-full py-4 px-10">
        <PieHelper color='bg-tetriary-100' label='Cake' />
        <PieHelper color='bg-tetriary-200' label='Pasta' />
        <PieHelper color='bg-tetriary-300' label='Pastry' />
        <PieHelper color='bg-tetriary-400' label='Pie & Pudding' />
        <PieHelper color='bg-tetriary-500' label='Other' />
      </div>
    </div>
  )
}

type PieHelperProps = {
  color: string;
  label: string;
}

function PieHelper({ color, label }: PieHelperProps) {
  return (
    <div className="flex items-center">
      <div className={`w-4 h-4 rounded-full ${color} mr-2`}></div>
      <p>{label}</p>
    </div>
  )
}