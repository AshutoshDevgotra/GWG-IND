import { useState } from 'react';
import { Button } from './ui/button';
import { Wallet } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { initializeRazorpay, createRazorpayOrder, handlePayment } from '@/lib/razorpay';
import { db, auth } from '@/lib/firebase';
import { doc, updateDoc, increment, collection, addDoc } from 'firebase/firestore';

export function WalletButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMoney = async () => {
    if (!auth.currentUser) {
      toast.error('Please sign in to add money');
      return;
    }

    const amountValue = parseInt(amount);
    if (isNaN(amountValue) || amountValue < 100) {
      toast.error('Please enter a valid amount (minimum ₹100)');
      return;
    }

    setIsLoading(true);
    try {
      await initializeRazorpay();
      const order = await createRazorpayOrder(amountValue);
      
      await handlePayment({
        amount: amountValue,
        orderId: order.id,
        onSuccess: async (response: { razorpay_payment_id: any; }) => {
          // Update wallet balance
          const walletRef = doc(db, 'wallets', auth.currentUser!.uid);
          await updateDoc(walletRef, {
            balance: increment(amountValue)
          });

          // Add transaction record
          await addDoc(collection(db, 'transactions'), {
            userId: auth.currentUser!.uid,
            amount: amountValue,
            type: 'credit',
            description: 'Added money to wallet',
            timestamp: new Date().toISOString(),
            paymentId: response.razorpay_payment_id
          });

          toast.success(`Successfully added ₹${amountValue} to wallet`);
          setIsOpen(false);
          setAmount('');
        },
        onError: (error) => {
          toast.error('Payment failed: ' + error.description);
        }
      });
    } catch (error) {
      toast.error('Failed to process payment');
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Wallet className="w-4 h-4" />
        Wallet
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount (₹)</label>
              <Input
                type="number"
                min="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <Button
              onClick={handleAddMoney}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Add Money'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}