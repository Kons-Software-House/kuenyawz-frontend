import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { retrieveOrders } from '../../../services/OrderApiService';
import { Order } from '../../../types/Order';

export default function OrdersGrowthChart() {
    const [chartData, setChartData] = useState<{ name: string, Orders: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Generate past 6 months with consistent formatting
    const generatePastSixMonths = () => {
        const months: { name: string, Orders: number }[] = [];
        const currentDate = new Date();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            months.push({
                name: date.toLocaleString('default', { month: 'short' }),
                Orders: 0
            });
        }

        return months;
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);

                // Calculate date range dynamically
                const currentDate = new Date();
                const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);
                const fromDate = sixMonthsAgo.toISOString().split('T')[0];
                const toDate = currentDate.toISOString().split('T')[0];

                const params = {
                    from: fromDate,
                    to: toDate,
                    statuses: "DELIVERED,CONFIRMED,PROCESSING"
                };

                // Fetch orders and extract content from the response
                const ordersResponse = await retrieveOrders(params);
                const orders = ordersResponse.content || [];

                // Generate initial chart data with past 6 months
                const initialChartData = generatePastSixMonths();

                // Group orders by month
                const monthlyOrders = orders.reduce((acc: Record<string, number>, order: Order) => {
                    if (order && order.createdAt || order.eventDate) {
                        const orderDate = new Date(order.createdAt || order.eventDate);
                        const month = orderDate.toLocaleString('default', { month: 'short' });
                        acc[month] = (acc[month] || 0) + 1;
                    }
                    return acc;
                }, {} as Record<string, number>);

                // Update chart data with actual order counts
                const updatedChartData = initialChartData.map(item => ({
                    ...item,
                    Orders: monthlyOrders[item.name] || 0
                }));

                setChartData(updatedChartData);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to fetch orders');
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (isLoading) return <div className="w-full h-[300px] flex items-center justify-center">Loading...</div>;

    if (error) return <div className="w-full h-[300px] flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="Orders"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Jumlah Pesanan"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}