import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import StatusBadge from '../shared/StatusBadge';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDrawer = ({ product, isOpen, onClose }: ProductDrawerProps) => {
  const handleDelete = () => {
    toast.success(`${product?.name} has been deleted successfully`);
    onClose();
  };
  
  if (!product) return null;
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md w-full md:w-[400px] overflow-y-auto" side="right">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle>Product Details</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 flex-grow overflow-y-auto">
          {/* Product Image */}
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 border rounded-lg overflow-hidden">
              <img 
                src={product.image || '/placeholder.svg'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <div className="mt-2 flex items-center">
                <StatusBadge status={product.status} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Stock</p>
                <p className="font-medium">{product.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unit</p>
                <p className="font-medium">{product.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">SKU</p>
                <p className="font-medium">{product.sku}</p>
              </div>
            </div>
            
            {product.description && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Description</p>
                <p className="mt-1">{product.description}</p>
              </div>
            )}
            
            {/* Stock History */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Stock History</h4>
              <div className="space-y-2">
                {product.stockHistory?.map((history, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-3 py-1">
                    <p className="text-sm">{history.action}</p>
                    <p className="text-xs text-gray-500">{history.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <SheetFooter className="border-t pt-4 flex flex-row gap-2">
          <Button variant="outline" className="flex-1" onClick={() => toast.info('Edit functionality will be implemented soon')}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" className="flex-1" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDrawer