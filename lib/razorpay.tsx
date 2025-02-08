import { loadScript } from "@/app/utils/loadScript";


export const initializeRazorpay = async () => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    throw new Error('Razorpay SDK failed to load');
  }
};

export const createRazorpayOrder = async (amount: number) => {
  try {
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const handlePayment = async ({
  amount,
  orderId,
  onSuccess,
  onError,
}: {
  amount: number;
  orderId: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: amount * 100,
    currency: 'INR',
    name: 'Expert Connect',
    description: 'Add money to wallet',
    order_id: orderId,
    handler: (response: any) => {
      onSuccess(response);
    },
    prefill: {
      name: 'User',
      email: 'user@example.com',
      contact: '',
    },
    theme: {
      color: '#1e40af',
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
  
  paymentObject.on('payment.failed', (response: any) => {
    onError(response.error);
  });
};