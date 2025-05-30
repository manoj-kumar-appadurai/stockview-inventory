
import React from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ArrowRight, PlusCircle, Package, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { toast } from 'sonner';

const Dashboard = () => {
  // Mock data for sales trend chart
  const salesData = [
    { name: '13 MON', sales: 4000, trades: 2400 },
    { name: '14 TUE', sales: 3000, trades: 1398 },
    { name: '15 WED', sales: 2000, trades: 9800 },
    { name: '16 THU', sales: 2780, trades: 3908 },
    { name: '17 FRI', sales: 1890, trades: 4800 },
    { name: '18 SAT', sales: 2390, trades: 3800 },
    { name: '19 SUN', sales: 3490, trades: 4300 },
  ];

  // Mock data for accepted items
  const acceptedItems = [
    { name: 'Fresh Tomatoes', sku: 'SKU-TOM123', quantity: 24, status: 'In Stock' },
    { name: 'Burger Buns', sku: 'SKU-BUN456', quantity: 36, status: 'In Stock' },
    { name: 'Lettuce', sku: 'SKU-LET789', quantity: 12, status: 'In Stock' },
    { name: 'Onions', sku: 'SKU-ONI012', quantity: 3, status: 'Low Stock' },
  ];

  return (
    <>
      <PageTitle
        title="Dashboard"
        description="Welcome to your inventory dashboard"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Items */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Items in stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold">156</h3>
              <div className="flex items-center text-sm font-medium text-green-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span>+2.5%</span>
                <span className="ml-1 text-gray-500">from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Stock */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Critical Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold">12</h3>
              <div className="flex items-center text-sm font-medium text-red-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span>+4.3%</span>
                <span className="ml-1 text-gray-500">from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unavailable Stock */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Unavailable Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold">0</h3>
              <div className="flex items-center text-sm font-medium text-green-600">
                <ArrowDown className="mr-1 h-4 w-4" />
                <span>-1.2%</span>
                <span className="ml-1 text-gray-500">from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Excess Inventory */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Excess Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold">20</h3>
              <div className="flex items-center text-sm font-medium text-yellow-600">
                <span>No change</span>
                <span className="ml-1 text-gray-500">from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Average Transaction Value */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-gray-500">
              <DollarSign className="h-4 w-4 mr-1 text-green-500" />
              Average Transaction Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">$827.99</h3>
              <div className="flex items-center text-sm font-medium text-green-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span>+6.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trade-Ins Amount */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-gray-500">
              <RefreshCw className="h-4 w-4 mr-1 text-blue-500" />
              Trade-Ins Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">$12,405.56</h3>
              <div className="flex items-center text-sm font-medium text-red-600">
                <ArrowDown className="mr-1 h-4 w-4" />
                <span>-3.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Category */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-gray-500">
              <TrendingUp className="h-4 w-4 mr-1 text-purple-500" />
              Top Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Vegetables</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Refunds Amount */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-gray-500">
              <RefreshCw className="h-4 w-4 mr-1 text-red-500 rotate-180" />
              Refunds Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">$345.99</h3>
              <div className="flex items-center text-sm font-medium text-green-600">
                <ArrowDown className="mr-1 h-4 w-4" />
                <span>-6.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trends and Accepted Items */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sales Trends */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Sales Trends</CardTitle>
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-1"></div>
                  <span>Sales</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-1"></div>
                  <span>Trade-Ins</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#5232C3"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="trades"
                    stroke="#2DD4BF"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Accepted Items */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Accepted Items</CardTitle>
              <span className="text-sm text-gray-500">4 total items</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-[2fr_1fr_1fr] text-xs font-medium text-gray-500 pb-1">
                <div>Product Info</div>
                <div>Quantity</div>
                <div>Status</div>
              </div>
              <div className="space-y-3">
                {acceptedItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mt-1">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.sku}</div>
                      </div>
                    </div>
                    <div className="text-sm">{item.quantity} pcs</div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'In Stock'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full mr-1 ${item.status === 'In Stock' ? 'bg-green-600' : 'bg-yellow-600'
                            }`}
                        ></span>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-primary" size="sm">
                View All Items
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>


    </>
  );
};

export default Dashboard;
