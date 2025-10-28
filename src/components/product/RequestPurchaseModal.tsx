
import { useState } from "react";
import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";

interface RequestPurchaseModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const RequestPurchaseModal = ({ product, open, onClose }: RequestPurchaseModalProps) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      contact: "",
      email:"",
      adresse:"",
      notes: "",
      quantity : 1,
    }
  });


  const handleSubmit = form.handleSubmit(async(values) => {
    if (!product) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/request-product`, {
        name: values.name,
        phoneNumber: values.contact,
        email: values.email,
        adresse: values.adresse,
        addNote :values.notes,
        product_id : product.id,
      },{ headers : {
        'Content-type' : 'application/json',
        'Accept': 'application/json',
      }
      });
      /*
      saveRequest({
        product,
        quantity: values.quantity,
        customerName: values.name,
        contactInfo: values.contact,
        notes: values.notes,
        paymentType: "immediate"
      });
      */
      toast.success(t('requestSubmitted'), {
        description: t('requestSubmittedDesc')
      });
      
      form.reset({
        name: "",
        contact: "",
        email:"",
        adresse:"",
        notes: "",
      });
      
      onClose();
    } catch (error) {
      toast.error(t('requestFailed'), {
        description: t('requestFailedDesc')
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('requestPurchase')}: {product.name}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('fullName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('contactInfo')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('phoneNumber')}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('emailAddress')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('quantity')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      value={field.value}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('additionalNotes')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <p className="text-sm font-medium">
                {t('totalEstimate')}: {product.price} {t('formatCurrency')}
              </p>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                {t('cancel')}
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting || product.status != 'available'}
              >
                {isSubmitting ? t('submitting') : t('submitRequest')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestPurchaseModal;
