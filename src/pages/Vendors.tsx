
import React from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

// Mock data for vendors
const vendors = [
  {
    id: '1',
    name: 'Fresh Farms Produce',
    contact: 'John Smith',
    email: 'john@freshfarms.com',
    phone: '(555) 123-4567',
    categories: ['Vegetables', 'Fruits'],
    avatar: 'FF',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Bakery Supplies Inc.',
    contact: 'Sarah Johnson',
    email: 'sarah@bakerysupplies.com',
    phone: '(555) 987-6543',
    categories: ['Buns', 'Bakery'],
    avatar: 'BS',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Global Spice Traders',
    contact: 'Michael Wong',
    email: 'michael@globalspice.com',
    phone: '(555) 456-7890',
    categories: ['Spices', 'Seasonings'],
    avatar: 'GS',
    status: 'Inactive'
  },
  {
    id: '4',
    name: 'Dairy Delights Co.',
    contact: 'Emma Davis',
    email: 'emma@dairydelights.com',
    phone: '(555) 234-5678',
    categories: ['Dairy'],
    avatar: 'DD',
    status: 'Active'
  },
];

const Vendors = () => {
  const handleAction = (action: string, vendorName: string) => {
    toast.info(`${action} ${vendorName} - This feature is coming soon!`);
  };
  
  return (
    <>
      <PageTitle 
        title="Vendor Management"
        description="Manage your suppliers and vendors"
        actions={
          <Button onClick={() => toast.info("Add Vendor functionality will be implemented soon!")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className={`h-2 ${vendor.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className="p-6">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 bg-primary text-white">
                      <AvatarFallback>{vendor.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{vendor.name}</h3>
                      <p className="text-sm text-gray-500">{vendor.contact}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction('Edit', vendor.name)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('View orders from', vendor.name)}>
                        View Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Delete', vendor.name)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`mailto:${vendor.email}`} className="text-primary hover:underline">
                      {vendor.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`tel:${vendor.phone}`} className="hover:underline">
                      {vendor.phone}
                    </a>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {vendor.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <span className={`text-sm ${vendor.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                    {vendor.status}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleAction('Place order with', vendor.name)}>
                    Place Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Vendors;
