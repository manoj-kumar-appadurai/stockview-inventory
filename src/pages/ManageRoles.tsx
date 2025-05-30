
import React, { useState } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, X, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  users: User[];
}

const initialRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full access to all features and settings',
    users: [
      { id: '1', name: 'John Doe', email: 'john@example.com', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=5232C3&color=fff' },
      { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=5232C3&color=fff' },
    ]
  },
  {
    id: '2',
    name: 'Inventory Manager',
    description: 'Can manage inventory items and stock levels',
    users: [
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=5232C3&color=fff' },
      { id: '4', name: 'Emily Davis', email: 'emily@example.com', avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=5232C3&color=fff' },
      { id: '5', name: 'David Wilson', email: 'david@example.com', avatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=5232C3&color=fff' },
    ]
  },
  {
    id: '3',
    name: 'Vendor Coordinator',
    description: 'Can manage vendor relationships and orders',
    users: [
      { id: '6', name: 'Lisa Chen', email: 'lisa@example.com', avatar: 'https://ui-avatars.com/api/?name=Lisa+Chen&background=5232C3&color=fff' },
    ]
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to inventory data',
    users: [
      { id: '7', name: 'Robert Brown', email: 'robert@example.com', avatar: 'https://ui-avatars.com/api/?name=Robert+Brown&background=5232C3&color=fff' },
      { id: '8', name: 'Jessica Lee', email: 'jessica@example.com', avatar: 'https://ui-avatars.com/api/?name=Jessica+Lee&background=5232C3&color=fff' },
    ]
  },
];

const ManageRoles = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  
  const handleRemoveUser = (roleId: string, userId: string) => {
    const role = roles.find(r => r.id === roleId);
    
    if (role && role.name === 'Admin' && role.users.length <= 1) {
      toast.error("Cannot remove the last admin user.");
      return;
    }
    
    const updatedRoles = roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          users: role.users.filter(user => user.id !== userId)
        };
      }
      return role;
    });
    
    setRoles(updatedRoles);
    toast.success("User removed from role successfully!");
  };
  
  const handleAddNewRole = () => {
    toast.info("Add Role functionality will be implemented soon!");
  };
  
  const handleAddUserToRole = (roleId: string) => {
    toast.info("Add user to role functionality will be implemented soon!");
  };
  
  return (
    <>
      <PageTitle 
        title="Manage Roles"
        description="Assign and manage user roles and permissions"
        actions={
          <Button onClick={handleAddNewRole}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Role
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant={role.name === 'Admin' ? 'default' : 'outline'}>
                    {role.name}
                  </Badge>
                  <CardTitle className="mt-2 text-lg">{role.name} Role</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add User to {role.name} Role</DialogTitle>
                      <DialogDescription>
                        Select a user to add to this role. They will receive all permissions associated with the role.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4">
                      <p className="text-sm text-gray-500 mb-2">This feature will be implemented soon!</p>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>Cancel</Button>
                      <Button onClick={() => handleAddUserToRole(role.id)}>Add User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-3">
                {role.users.map((user) => (
                  <div 
                    key={user.id}
                    className="relative group"
                  >
                    <Avatar className="h-12 w-12 border-2 border-white">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <button
                      onClick={() => handleRemoveUser(role.id, user.id)}
                      className="absolute -top-1 -right-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      title={`Remove ${user.name}`}
                    >
                      <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </button>
                    
                    <div className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {user.name}
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddUserToRole(role.id)}
                  className="h-12 w-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Plus className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ManageRoles;
