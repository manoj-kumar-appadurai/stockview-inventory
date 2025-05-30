
import React, { useState } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Bell, Shield, Database, Globe, PieChart, BellOff } from 'lucide-react';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'StockView Inc.',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlerts: true,
    inventoryUpdates: true,
    vendorNotifications: true,
    systemAnnouncements: false,
    dailyReports: true,
    emailNotifications: true,
    pushNotifications: false,
  });
  
  const handleGeneralSettingsChange = (field: string, value: string) => {
    setGeneralSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNotificationToggle = (field: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };
  
  const handleSaveSettings = (type: string) => {
    toast.success(`${type} settings saved successfully!`);
  };
  
  return (
    <>
      <PageTitle 
        title="Settings"
        description="Configure your StockView application"
      />
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 max-w-2xl">
          <TabsTrigger value="general" className="flex items-center">
            <PieChart className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic settings for your StockView application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName"
                    value={generalSettings.companyName}
                    onChange={(e) => handleGeneralSettingsChange('companyName', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={generalSettings.timezone} 
                      onValueChange={(value) => handleGeneralSettingsChange('timezone', value)}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-12">UTC-12 (Baker Island)</SelectItem>
                        <SelectItem value="UTC-10">UTC-10 (Hawaii)</SelectItem>
                        <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                        <SelectItem value="UTC-7">UTC-7 (Mountain Time)</SelectItem>
                        <SelectItem value="UTC-6">UTC-6 (Central Time)</SelectItem>
                        <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                        <SelectItem value="UTC-4">UTC-4 (Atlantic Time)</SelectItem>
                        <SelectItem value="UTC">UTC (Universal Time)</SelectItem>
                        <SelectItem value="UTC+1">UTC+1 (Central European Time)</SelectItem>
                        <SelectItem value="UTC+2">UTC+2 (Eastern European Time)</SelectItem>
                        <SelectItem value="UTC+3">UTC+3 (Moscow Time)</SelectItem>
                        <SelectItem value="UTC+5:30">UTC+5:30 (India)</SelectItem>
                        <SelectItem value="UTC+8">UTC+8 (China, Singapore)</SelectItem>
                        <SelectItem value="UTC+9">UTC+9 (Japan, Korea)</SelectItem>
                        <SelectItem value="UTC+10">UTC+10 (Australia Eastern)</SelectItem>
                        <SelectItem value="UTC+12">UTC+12 (New Zealand)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select 
                      value={generalSettings.dateFormat} 
                      onValueChange={(value) => handleGeneralSettingsChange('dateFormat', value)}
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                        <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={generalSettings.theme} 
                    onValueChange={(value) => handleGeneralSettingsChange('theme', value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button type="button" onClick={() => handleSaveSettings('General')}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alert Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                      <p className="text-sm text-gray-500">Receive notifications when items are running low</p>
                    </div>
                    <Switch 
                      id="lowStockAlerts" 
                      checked={notificationSettings.lowStockAlerts}
                      onCheckedChange={() => handleNotificationToggle('lowStockAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inventoryUpdates">Inventory Updates</Label>
                      <p className="text-sm text-gray-500">Get notified when inventory changes are made</p>
                    </div>
                    <Switch 
                      id="inventoryUpdates" 
                      checked={notificationSettings.inventoryUpdates}
                      onCheckedChange={() => handleNotificationToggle('inventoryUpdates')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="vendorNotifications">Vendor Notifications</Label>
                      <p className="text-sm text-gray-500">Receive updates about vendor activity and orders</p>
                    </div>
                    <Switch 
                      id="vendorNotifications" 
                      checked={notificationSettings.vendorNotifications}
                      onCheckedChange={() => handleNotificationToggle('vendorNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="systemAnnouncements">System Announcements</Label>
                      <p className="text-sm text-gray-500">Important updates about StockView</p>
                    </div>
                    <Switch 
                      id="systemAnnouncements" 
                      checked={notificationSettings.systemAnnouncements}
                      onCheckedChange={() => handleNotificationToggle('systemAnnouncements')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dailyReports">Daily Reports</Label>
                      <p className="text-sm text-gray-500">Receive daily inventory status reports</p>
                    </div>
                    <Switch 
                      id="dailyReports" 
                      checked={notificationSettings.dailyReports}
                      onCheckedChange={() => handleNotificationToggle('dailyReports')}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Delivery Methods</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="emailNotifications" 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <Switch 
                      id="pushNotifications" 
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="button" onClick={() => handleSaveSettings('Notification')}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Button type="button" onClick={() => toast.success("Password changed successfully!")}>
                    Update Password
                  </Button>
                </div>
                
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      id="twoFactor" 
                      onCheckedChange={() => toast.info("Two-factor authentication setup will be implemented soon!")}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  <p className="text-sm text-gray-500">Currently signed in on 1 device</p>
                  
                  <Button 
                    variant="outline"
                    onClick={() => toast.success("You have been signed out from all other devices")}
                  >
                    Sign out from all other devices
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Settings */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect StockView with other services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Accounting Software",
                    description: "Connect with your accounting platform",
                    icon: <Database className="h-8 w-8 text-primary" />,
                    connected: false
                  },
                  {
                    name: "E-commerce Platform",
                    description: "Sync inventory with your online store",
                    icon: <Globe className="h-8 w-8 text-primary" />,
                    connected: true
                  },
                  {
                    name: "POS System",
                    description: "Connect with your point of sale system",
                    icon: <PieChart className="h-8 w-8 text-primary" />,
                    connected: false
                  },
                  {
                    name: "Email Marketing",
                    description: "Integrate with email campaign tools",
                    icon: <Mail className="h-8 w-8 text-primary" />,
                    connected: false
                  }
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-primary/10 rounded-full">
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant={integration.connected ? "destructive" : "outline"}
                      onClick={() => toast.info(`Integration functionality will be implemented soon!`)}
                    >
                      {integration.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

import { Mail } from 'lucide-react';

export default Settings;
