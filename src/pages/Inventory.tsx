import React, { useState } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DownloadIcon, 
  FilterIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search,
  FileText,
  Download,
  Copy,
  Calendar,
  X
} from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import ProductDrawer from '@/components/inventory/ProductDrawer';
import AddProductModal from '@/components/inventory/AddProductModal';
import { Product, StatusType } from '@/types/product';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock data for inventory items
const initialInventoryItems: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    category: 'Vegetable',
    quantity: 50,
    unit: 'LB',
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469',
    sku: 'SKU-TOM123',
    description: 'Fresh, ripe tomatoes for salads and cooking',
    createdAt: '2025-04-20',
    stockHistory: [
      {
        action: 'Added 50 LB of Fresh Tomatoes',
        date: '2025-04-20'
      },
      {
        action: 'Stock adjustment: -5 LB (Quality control)',
        date: '2025-04-22'
      }
    ]
  },
  {
    id: '2',
    name: 'Burger Buns',
    category: 'Bun',
    quantity: 100,
    unit: 'Pack',
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1594972654147-abcf7e246e44',
    sku: 'SKU-BUN456',
    description: 'Soft burger buns, 8 per pack',
    createdAt: '2025-04-19',
    stockHistory: [
      {
        action: 'Added 100 Packs of Burger Buns',
        date: '2025-04-19'
      }
    ]
  },
  // ... keep existing code for remaining inventory items, adding createdAt field to each
  {
    id: '3',
    name: 'Lettuce',
    category: 'Vegetable',
    quantity: 15,
    unit: 'Head',
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
    sku: 'SKU-LET789',
    description: 'Fresh green lettuce for salads and sandwiches',
    createdAt: '2025-04-18',
    stockHistory: [
      {
        action: 'Added 30 Heads of Lettuce',
        date: '2025-04-18'
      },
      {
        action: 'Stock adjustment: -15 Head (Sold)',
        date: '2025-04-24'
      }
    ]
  },
  {
    id: '4',
    name: 'Onions',
    category: 'Vegetable',
    quantity: 0,
    unit: 'LB',
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924',
    sku: 'SKU-ONI012',
    description: 'Yellow onions for cooking',
    createdAt: '2025-04-15',
    stockHistory: [
      {
        action: 'Added 40 LB of Onions',
        date: '2025-04-15'
      },
      {
        action: 'Stock adjustment: -40 LB (Sold out)',
        date: '2025-04-23'
      }
    ]
  },
  {
    id: '5',
    name: 'Hot Dog Buns',
    category: 'Bun',
    quantity: 75,
    unit: 'Pack',
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
    sku: 'SKU-HDB345',
    description: 'Soft hot dog buns, 6 per pack',
    createdAt: '2025-04-17',
    stockHistory: [
      {
        action: 'Added 75 Packs of Hot Dog Buns',
        date: '2025-04-17'
      }
    ]
  },
  {
    id: '6',
    name: 'Bell Peppers',
    category: 'Vegetable',
    quantity: 30,
    unit: 'Each',
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
    sku: 'SKU-BEP678',
    description: 'Colorful bell peppers, mix of red, yellow and green',
    createdAt: '2025-04-21',
    stockHistory: [
      {
        action: 'Added 30 Bell Peppers',
        date: '2025-04-21'
      }
    ]
  },
  {
    id: '7',
    name: 'Spinach',
    category: 'Vegetable',
    quantity: 8,
    unit: 'LB',
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    sku: 'SKU-SPI901',
    description: 'Fresh spinach leaves',
    createdAt: '2025-04-16',
    stockHistory: [
      {
        action: 'Added 20 LB of Spinach',
        date: '2025-04-16'
      },
      {
        action: 'Stock adjustment: -12 LB (Sold)',
        date: '2025-04-24'
      }
    ]
  },
];

// Get unique categories from inventory items
const getUniqueCategories = (items: Product[]) => {
  return [...new Set(items.map(item => item.category))];
};

type DateRangeType = 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'this_month' | 'last_month' | 'custom' | 'all';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<Product[]>(initialInventoryItems);
  const [filteredItems, setFilteredItems] = useState<Product[]>(initialInventoryItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<DateRangeType>('all');
  const [filterStartDate, setFilterStartDate] = useState<Date | undefined>(undefined);
  const [filterEndDate, setFilterEndDate] = useState<Date | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  const categories = getUniqueCategories(inventoryItems);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, filterCategory, filterStatus, filterDateRange, filterStartDate, filterEndDate);
  };
  
  const handleItemClick = (item: Product) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };
  
  const handleAddProduct = (newProduct: Product) => {
    const updatedItems = [newProduct, ...inventoryItems];
    setInventoryItems(updatedItems);
    applyFilters(searchQuery, filterCategory, filterStatus, filterDateRange, filterStartDate, filterEndDate);
  };
  
  const handleExportClick = (format: 'pdf' | 'excel' | 'copy') => {
    const formatName = format === 'excel' ? 'Excel' : format === 'pdf' ? 'PDF' : 'clipboard';
    toast.success(`Inventory data exported to ${formatName} successfully.`);
  };
  
  const applyFilters = (
    name: string = searchQuery, 
    category: string = filterCategory, 
    status: string = filterStatus,
    dateRange: DateRangeType = filterDateRange,
    startDate: Date | undefined = filterStartDate,
    endDate: Date | undefined = filterEndDate
  ) => {
    let result = [...inventoryItems];
    
    // Filter by search query (name, category, or SKU)
    if (name.trim() !== '') {
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(name.toLowerCase()) || 
          item.category.toLowerCase().includes(name.toLowerCase()) ||
          item.sku.toLowerCase().includes(name.toLowerCase())
      );
    }
    
    // Filter by category
    if (category !== 'all') {
      result = result.filter(item => item.category === category);
    }
    
    // Filter by status
    if (status !== 'all') {
      result = result.filter(item => item.status === status);
    }
    
    // Filter by date range
    if (dateRange !== 'all' && result.length > 0) {
      const today = new Date();
      let start: Date | null = null;
      let end: Date | null = null;
      
      switch (dateRange) {
        case 'today':
          start = new Date(today);
          start.setHours(0, 0, 0, 0);
          end = new Date(today);
          end.setHours(23, 59, 59, 999);
          break;
        case 'yesterday':
          start = subDays(today, 1);
          start.setHours(0, 0, 0, 0);
          end = subDays(today, 1);
          end.setHours(23, 59, 59, 999);
          break;
        case 'last_7_days':
          start = subDays(today, 7);
          start.setHours(0, 0, 0, 0);
          end = new Date(today);
          end.setHours(23, 59, 59, 999);
          break;
        case 'last_30_days':
          start = subDays(today, 30);
          start.setHours(0, 0, 0, 0);
          end = new Date(today);
          end.setHours(23, 59, 59, 999);
          break;
        case 'this_month':
          start = startOfMonth(today);
          end = endOfMonth(today);
          break;
        case 'last_month':
          start = startOfMonth(subMonths(today, 1));
          end = endOfMonth(subMonths(today, 1));
          break;
        case 'custom':
          if (startDate && endDate) {
            start = startDate;
            start.setHours(0, 0, 0, 0);
            end = endDate;
            end.setHours(23, 59, 59, 999);
          }
          break;
      }
      
      if (start && end) {
        result = result.filter(item => {
          if (!item.createdAt) return false;
          const itemDate = new Date(item.createdAt);
          return itemDate >= start! && itemDate <= end!;
        });
      }
    }
    
    setFilteredItems(result);
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  const handleFilterChange = () => {
    applyFilters(filterName, filterCategory, filterStatus, filterDateRange, filterStartDate, filterEndDate);
    setIsFilterOpen(false);
    toast.success('Filters applied successfully');
  };
  
  const handleDateRangeChange = (value: DateRangeType) => {
    setFilterDateRange(value);
    setIsDatePickerOpen(false);
    
    // Reset custom date range if not selecting custom
    if (value !== 'custom') {
      setFilterStartDate(undefined);
      setFilterEndDate(undefined);
      // Apply filters immediately
      applyFilters(filterName, filterCategory, filterStatus, value);
    }
  };
  
  const handleResetFilters = () => {
    setFilterName('');
    setFilterCategory('all');
    setFilterStatus('all');
    setFilterDateRange('all');
    setFilterStartDate(undefined);
    setFilterEndDate(undefined);
    setSearchQuery('');
    setFilteredItems(inventoryItems);
    toast.info('Filters reset');
  };

  const getDateRangeDisplayText = () => {
    if (filterDateRange === 'all') return 'May 4, 2025';
    if (filterDateRange === 'today') return 'Today';
    if (filterDateRange === 'yesterday') return 'Yesterday';
    if (filterDateRange === 'last_7_days') return 'Last 7 Days';
    if (filterDateRange === 'last_30_days') return 'Last 30 Days';
    if (filterDateRange === 'this_month') return 'This Month';
    if (filterDateRange === 'last_month') return 'Last Month';
    if (filterDateRange === 'custom' && filterStartDate && filterEndDate) {
      return `${format(filterStartDate, 'MMM d')} - ${format(filterEndDate, 'MMM d')}`;
    }
    return 'Select Date';
  };
  
  return (
    <>
      <PageTitle 
        title="Inventory Management"
        description="Manage your inventory items"
        actions={
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        }
      />
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex md:w-1/2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by name, category, or SKU..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Date Picker */}
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 min-w-[160px]">
                <Calendar className="h-4 w-4" />
                <span className="truncate">{getDateRangeDisplayText()}</span>
                <ChevronRight className={`h-4 w-4 opacity-50 transition-transform ${isDatePickerOpen ? "rotate-90" : ""}`} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" side="bottom" align="start">
              <div className="flex flex-col">
                <Button 
                  variant={filterDateRange === 'today' ? 'secondary' : 'ghost'} 
                  className="justify-start rounded-none h-9 px-4"
                  onClick={() => handleDateRangeChange('today')}
                >
                  Today
                </Button>
                <Button 
                  variant={filterDateRange === 'yesterday' ? 'secondary' : 'ghost'} 
                  className="justify-start rounded-none h-9 px-4"
                  onClick={() => handleDateRangeChange('yesterday')}
                >
                  Yesterday
                </Button>
                <Button 
                  variant={filterDateRange === 'last_7_days' ? 'secondary' : 'ghost'} 
                  className="justify-start rounded-none h-9 px-4"
                  onClick={() => handleDateRangeChange('last_7_days')}
                >
                  Last 7 Days
                </Button>
                <Button 
                  variant={filterDateRange === 'last_30_days' ? 'secondary' : 'ghost'} 
                  className="justify-start rounded-none h-9 px-4"
                  onClick={() => handleDateRangeChange('last_30_days')}
                >
                  Last 30 Days
                </Button>
                <Button 
                  variant={filterDateRange === 'this_month' ? 'secondary' : 'ghost'} 
                  className="justify-start rounded-none h-9 px-4"
                  onClick={() => handleDateRangeChange('this_month')}
                >
                  This Month
                </Button>
                <Button 
                  variant={filterDateRange === 'last_month' ? 'secondary' : 'ghost'} 
                  className="justify-start rounded-none h-9 px-4"
                  onClick={() => handleDateRangeChange('last_month')}
                >
                  Last Month
                </Button>
                <Button 
                  variant={filterDateRange === 'custom' ? 'secondary' : 'ghost'} 
                  className="justify-start rounded-none h-9 px-4"
                  onClick={() => {
                    setFilterDateRange('custom');
                    if (!filterStartDate || !filterEndDate) {
                      const today = new Date();
                      setFilterStartDate(today);
                      setFilterEndDate(today);
                    }
                  }}
                >
                  Custom Range
                </Button>
                
                {filterDateRange === 'custom' && (
                  <div className="p-3 border-t">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium mb-1">Start Date</p>
                          <div className="border rounded-md">
                            <CalendarComponent
                              mode="single"
                              selected={filterStartDate}
                              onSelect={setFilterStartDate}
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">End Date</p>
                          <div className="border rounded-md">
                            <CalendarComponent
                              mode="single"
                              selected={filterEndDate}
                              onSelect={setFilterEndDate}
                              disabled={(date) => 
                                date > new Date() || 
                                (filterStartDate ? date < filterStartDate : false)
                              }
                              initialFocus
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          size="sm"
                          onClick={() => {
                            applyFilters(
                              filterName, 
                              filterCategory, 
                              filterStatus, 
                              'custom', 
                              filterStartDate, 
                              filterEndDate
                            );
                            setIsDatePickerOpen(false);
                          }}
                          disabled={!filterStartDate || !filterEndDate}
                        >
                          Apply Range
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Filter Button */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <FilterIcon className="h-4 w-4 mr-1" />
                Filter
                {(filterName || filterCategory !== 'all' || filterStatus !== 'all') && (
                  <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    •
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4 p-2">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex justify-between items-center">
                    <span>Filter Inventory</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-muted-foreground"
                      onClick={handleResetFilters}
                    >
                      Reset
                    </Button>
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input 
                        placeholder="Filter by name" 
                        value={filterName} 
                        onChange={(e) => setFilterName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="In Stock">In Stock</SelectItem>
                          <SelectItem value="Low Stock">Low Stock</SelectItem>
                          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button onClick={handleFilterChange}>Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Export Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExportClick('pdf')}>
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportClick('excel')}>
                <Download className="h-4 w-4 mr-2" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportClick('copy')}>
                <Copy className="h-4 w-4 mr-2" />
                Copy to clipboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map(item => (
                  <tr 
                    key={item.id} 
                    onClick={() => handleItemClick(item)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors border-b"
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            src={item.image || '/placeholder.svg'} 
                            alt={item.name}
                            className="h-10 w-10 rounded object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm">{item.category}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm">{item.quantity}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm">{item.unit}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-gray-100">
                        <Search className="h-16 w-16 text-gray-300" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No inventory items found</h3>
                      <p className="text-gray-500 max-w-md text-center">
                        No items match your current search or filter criteria. Try adjusting your filters or search terms.
                      </p>
                      {(filterName || filterCategory !== 'all' || filterStatus !== 'all' || filterDateRange !== 'all') && (
                        <Button 
                          variant="outline" 
                          onClick={handleResetFilters}
                          className="mt-2"
                        >
                          <X className="h-4 w-4 mr-1" /> Clear Filters
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredItems.length > 0 ? startIndex + 1 : 0}</span> to{" "}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredItems.length)}</span> of{" "}
            <span className="font-medium">{filteredItems.length}</span> items
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Detail Drawer */}
      <ProductDrawer
        product={selectedItem}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      
      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </>
  );
};

export default Inventory;