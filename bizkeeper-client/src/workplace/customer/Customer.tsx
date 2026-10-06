import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Search,
  FileUpload,
  Email,
  Phone,
  Delete,
  Visibility,
} from '@mui/icons-material';

// Inline type definitions (previously from customerService)
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  emailOptIn: boolean;
  smsOptIn?: boolean;
  tags?: string[];
  notes?: string;
  totalSpent?: number;
  visitCount?: number;
  lastVisit?: string;
  createdAt: string;
}

interface CustomerListResponse {
  customers: Customer[];
  total: number;
  page: number;
  totalPages: number;
}

// Stub service implementation (demo data)
const customerService = {
  async getCustomers(params: any): Promise<CustomerListResponse> {
    // Return demo data for now
    const demoCustomers: Customer[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        source: 'manual',
        emailOptIn: true,
        smsOptIn: true,
        tags: ['VIP', 'Regular'],
        totalSpent: 250,
        visitCount: 12,
        lastVisit: '2026-01-05',
        createdAt: '2025-06-15',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1987654321',
        source: 'website',
        emailOptIn: true,
        tags: ['New'],
        totalSpent: 75,
        visitCount: 3,
        lastVisit: '2026-01-03',
        createdAt: '2025-12-20',
      },
    ];
    return {
      customers: demoCustomers,
      total: demoCustomers.length,
      page: params.page || 1,
      totalPages: 1,
    };
  },

  async createCustomer(data: any): Promise<Customer> {
    console.log('Create customer (demo mode):', data);
    return {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
  },

  async importCustomers(customers: any[]): Promise<{ success: number; failed: number }> {
    console.log('Import customers (demo mode):', customers);
    return { success: customers.length, failed: 0 };
  },

  async getCustomer(id: string): Promise<Customer> {
    console.log('Get customer (demo mode):', id);
    return {
      id,
      name: 'Demo Customer',
      email: 'demo@example.com',
      phone: '+1234567890',
      source: 'manual',
      emailOptIn: true,
      tags: ['Demo'],
      createdAt: new Date().toISOString(),
    };
  },

  async deleteCustomer(id: string): Promise<void> {
    console.log('Delete customer (demo mode):', id);
  },
};

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Pagination and filtering
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  // Dialogs
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Form states
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'manual',
    emailOptIn: false,
  });

  const [importData, setImportData] = useState('');

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response: CustomerListResponse = await customerService.getCustomers({
        page,
        limit: 20,
        search: search || undefined,
        source: sourceFilter || undefined,
      });
      
      setCustomers(response.customers);
      setTotal(response.total);
      setTotalPages(Math.ceil(response.total / 20));
    } catch (err) {
      setError('Failed to load customers');
      console.error('Error loading customers:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, sourceFilter]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const handleCreateCustomer = async () => {
    try {
      setError('');
      
      const customerData = {
        ...newCustomer,
        consent: newCustomer.emailOptIn ? {
          channel: 'email' as const,
          type: 'opt_in' as const,
          text: 'User opted in to receive marketing emails via manual entry',
        } : undefined,
      };

      await customerService.createCustomer(customerData);
      setSuccess('Customer created successfully');
      setCreateDialogOpen(false);
      setNewCustomer({ name: '', email: '', phone: '', source: 'manual', emailOptIn: false });
      loadCustomers();
    } catch (err) {
      setError('Failed to create customer');
      console.error('Error creating customer:', err);
    }
  };

  const handleImportCustomers = async () => {
    try {
      setError('');
      
      if (!importData.trim()) {
        setError('Please paste CSV data');
        return;
      }

      // Parse CSV data (simple implementation)
      const lines = importData.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const customers = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const customer: any = {};
        
        headers.forEach((header, index) => {
          if (header === 'name') customer.name = values[index];
          else if (header === 'email') customer.email = values[index];
          else if (header === 'phone') customer.phone = values[index];
          else if (header === 'emailoptin') customer.emailOptIn = values[index]?.toLowerCase() === 'true';
        });
        
        return customer;
      }).filter(c => c.email || c.name); // Filter out empty rows

      const result = await customerService.importCustomers(customers);
      setSuccess(`Import completed: ${result.success} imported, ${result.failed} failed`);
      
      setImportDialogOpen(false);
      setImportData('');
      loadCustomers();
    } catch (err) {
      setError('Failed to import customers');
      console.error('Error importing customers:', err);
    }
  };

  const handleViewCustomer = async (customer: Customer) => {
    try {
      const details = await customerService.getCustomer(customer.id);
      setSelectedCustomer({ ...customer, ...details });
      setDetailDialogOpen(true);
    } catch (err) {
      setError('Failed to load customer details');
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    
    try {
      await customerService.deleteCustomer(id);
      setSuccess('Customer deleted successfully');
      loadCustomers();
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  const getSourceColor = (source?: string) => {
    switch (source) {
      case 'landing': return 'primary';
      case 'qr': return 'secondary';
      case 'wifi': return 'success';
      case 'reservation': return 'info';
      case 'import': return 'warning';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading && customers.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Customer Management
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<FileUpload />}
            onClick={() => setImportDialogOpen(true)}
          >
            Import CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setCreateDialogOpen(true)}
            sx={{ backgroundColor: '#7443C0', '&:hover': { backgroundColor: '#5C359A' } }}
          >
            Add Customer
          </Button>
        </Box>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ minWidth: 300 }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Source</InputLabel>
              <Select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                label="Source"
              >
                <MenuItem value="">All Sources</MenuItem>
                <MenuItem value="landing">Landing Page</MenuItem>
                <MenuItem value="qr">QR Code</MenuItem>
                <MenuItem value="wifi">Wi-Fi Portal</MenuItem>
                <MenuItem value="reservation">Reservation</MenuItem>
                <MenuItem value="import">Import</MenuItem>
                <MenuItem value="manual">Manual</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary">
              {total} customers total
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {customer.name || 'No Name'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      {customer.email || 'No Email'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Phone sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      {customer.phone || 'No Phone'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.source || 'unknown'}
                      color={getSourceColor(customer.source)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewCustomer(customer)}
                        sx={{ color: 'primary.main' }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteCustomer(customer.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <Box display="flex" justifyContent="center" p={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
          />
        </Box>
      </Card>

      {/* Create Customer Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              fullWidth
            />
            <TextField
              label="Phone"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Source</InputLabel>
              <Select
                value={newCustomer.source}
                onChange={(e) => setNewCustomer({ ...newCustomer, source: e.target.value })}
                label="Source"
              >
                <MenuItem value="manual">Manual Entry</MenuItem>
                <MenuItem value="landing">Landing Page</MenuItem>
                <MenuItem value="qr">QR Code</MenuItem>
                <MenuItem value="wifi">Wi-Fi Portal</MenuItem>
                <MenuItem value="reservation">Reservation</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" alignItems="center">
              <input
                type="checkbox"
                id="emailOptIn"
                checked={newCustomer.emailOptIn}
                onChange={(e) => setNewCustomer({ ...newCustomer, emailOptIn: e.target.checked })}
              />
              <label htmlFor="emailOptIn" style={{ marginLeft: 8 }}>
                Customer has opted in to receive marketing emails
              </label>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateCustomer} 
            variant="contained"
            sx={{ backgroundColor: '#7443C0', '&:hover': { backgroundColor: '#5C359A' } }}
          >
            Create Customer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onClose={() => setImportDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Import Customers from CSV</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Paste your CSV data below. Expected format: name,email,phone,emailOptIn
          </Typography>
          <TextField
            multiline
            rows={10}
            placeholder="name,email,phone,emailOptIn
John Doe,john@example.com,555-1234,true
Jane Smith,jane@example.com,555-5678,false"
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImportDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleImportCustomers} 
            variant="contained"
            sx={{ backgroundColor: '#7443C0', '&:hover': { backgroundColor: '#5C359A' } }}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>

      {/* Customer Detail Dialog */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <Typography><strong>Name:</strong> {selectedCustomer.name || 'No Name'}</Typography>
              <Typography><strong>Email:</strong> {selectedCustomer.email || 'No Email'}</Typography>
              <Typography><strong>Phone:</strong> {selectedCustomer.phone || 'No Phone'}</Typography>
              <Typography><strong>Source:</strong> {selectedCustomer.source || 'Unknown'}</Typography>
              <Typography><strong>Created:</strong> {formatDate(selectedCustomer.createdAt)}</Typography>
              <Typography><strong>Last Visit:</strong> {selectedCustomer.lastVisit ? formatDate(selectedCustomer.lastVisit) : 'Never'}</Typography>
              {selectedCustomer.tags && selectedCustomer.tags.length > 0 && (
                <Box>
                  <Typography><strong>Tags:</strong></Typography>
                  <Box display="flex" gap={1} mt={1}>
                    {selectedCustomer.tags.map((tag: string, index: number) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerPage;
