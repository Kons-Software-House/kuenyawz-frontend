import { PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';

import { retrieveProducts } from '../../../../services/ProducApiService';
import { Product } from '../../../../types/Product';

const COLORS = ['#B88655', '#D49A6A', '#E59B4C', '#B38486', '#899B78'];

interface CategoryStats {
  name: string;
  value: number;
}


export default function CategorySpreadChart() {
  const [data, setData] = useState<CategoryStats[]>([
    { name: 'Cake', value: 0 },
    { name: 'Pasta', value: 0 },
    { name: 'Pastry', value: 0 },
    { name: 'Pie', value: 0 },
    { name: 'Other', value: 0 },
  ]);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const params = { pageSize: 1000, available: true };
        const data = await retrieveProducts(params);
        const products: Product[] = data.content;
        const categoryStats: CategoryStats[] = [
          { name: 'Cake', value: 0 },
          { name: 'Pasta', value: 0 },
          { name: 'Pastry', value: 0 },
          { name: 'Pie', value: 0 },
          { name: 'Other', value: 0 },
        ];

        products.forEach(product => {
          switch (product.category) {
            case 'CAKE':
              categoryStats[0].value += 1;
              break;
            case 'PASTA':
              categoryStats[1].value += 1;
              break;
            case 'PASTRY':
              categoryStats[2].value += 1;
              break;
            case 'PIE':
              categoryStats[3].value += 1;
              break;
            default:
              categoryStats[4].value += 1;
          }
        });

        setData(categoryStats);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategoryStats();
  }, []);


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
        <PieHelper color='bg-tetriary-400' label='Pie' />
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