
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageLayout from "@/components/layout/PageLayout";
import { PurchaseRequest } from "@/types/request";
import { getRequests, removeRequest } from "@/services/requestService";
import { formatCurrency } from "@/lib/utils";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const RequestsPage = () => {
  const { t } = useLanguage();
  const [requests, setRequests] = useState<PurchaseRequest[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Load requests from local storage
  useEffect(() => {
    setRequests(getRequests());
  }, []);
  
  // Handle request deletion
  const handleDeleteRequest = () => {
    if (!selectedRequestId) return;
    
    const success = removeRequest(selectedRequestId);
    
    if (success) {
      setRequests(prev => prev.filter(req => req.id !== selectedRequestId));
      toast.success(t('requestRemoved'));
    } else {
      toast.error(t('requestRemoveError'));
    }
    
    setIsDeleteDialogOpen(false);
    setSelectedRequestId(null);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Get status badge color
  const getStatusBadge = (status: PurchaseRequest['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">{t('approved')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive">{t('rejected')}</Badge>;
      default:
        return <Badge variant="outline">{t('pending')}</Badge>;
    }
  };

  return (
    <PageLayout>
      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">{t('myRequests')}</h1>
        
        {requests.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-gray-600 mb-4">{t('noRequests')}</h2>
            <p className="text-gray-500 mb-8">{t('browseProductsToRequest')}</p>
            <Button asChild>
              <a href="/products">{t('browseProducts')}</a>
            </Button>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>{t('requestsExplanation')}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('product')}</TableHead>
                  <TableHead>{t('quantity')}</TableHead>
                  <TableHead>{t('total')}</TableHead>
                  <TableHead>{t('requestDate')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.product.name}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{formatCurrency(request.product.price * request.quantity)}</TableCell>
                    <TableCell>{formatDate(request.requestDate)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRequestId(request.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        {t('remove')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmRemoval')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('removeRequestConfirmation')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRequest} className="bg-red-500 hover:bg-red-600">
              {t('remove')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default RequestsPage;
