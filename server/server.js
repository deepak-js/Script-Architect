const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const META_PIXEL_ID = 'YOUR_PIXEL_ID'; // Replace with your Pixel ID
const META_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your Access Token

// Hash helper for Meta CAPI (SHA-256)
function hashData(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

// Send Event to Meta Conversions API
async function sendMetaEvent(customer, orderId, paymentId) {
    if (META_PIXEL_ID === 'YOUR_PIXEL_ID' || META_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN') {
        console.log('Skipping Meta Event: Pixel ID or Access Token not set.');
        return;
    }

    try {
        const eventData = {
            data: [
                {
                    event_name: 'Purchase',
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: 'website',
                    user_data: {
                        em: [hashData(customer.email.toLowerCase())],
                        fn: [hashData(customer.name.toLowerCase())]
                    },
                    custom_data: {
                        currency: 'INR',
                        value: 999,
                        order_id: orderId,
                        transaction_id: paymentId
                    }
                }
            ],
            access_token: META_ACCESS_TOKEN
        };

        await axios.post(
            `https://graph.facebook.com/v17.0/${META_PIXEL_ID}/events`,
            eventData
        );
        console.log('Meta Purchase Event sent successfully');
    } catch (error) {
        console.error('Failed to send Meta Event:', error.response?.data || error.message);
    }
}

const app = express();
app.use(cors());
app.use(express.json());

// Razorpay instance
const razorpay = new Razorpay({
    key_id: 'rzp_live_RvNISuYOnmlknX',
    key_secret: 'A3QRUqNsK36DRwh40VOeEWcY'
});

const DB_FILE = path.join(__dirname, 'customers.json');

// Initialize DB file if it doesn't exist
async function initDB() {
    try {
        await fs.access(DB_FILE);
    } catch {
        await fs.writeFile(DB_FILE, JSON.stringify([], null, 2));
    }
}

// Read customers from DB
async function readCustomers() {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
}

// Write customers to DB
async function writeCustomers(customers) {
    await fs.writeFile(DB_FILE, JSON.stringify(customers, null, 2));
}

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: 99900, // ₹999 in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                customer_name: name,
                customer_email: email
            }
        });

        // Store customer with pending status
        const customers = await readCustomers();
        customers.push({
            orderId: order.id,
            name,
            email,
            amount: 999,
            status: 'pending',
            createdAt: new Date().toISOString(),
            paymentId: null,
            paidAt: null
        });
        await writeCustomers(customers);

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: 'rzp_live_RvNISuYOnmlknX'
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Verify payment
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', 'A3QRUqNsK36DRwh40VOeEWcY')
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            // Update customer status
            const customers = await readCustomers();
            const customerIndex = customers.findIndex(c => c.orderId === razorpay_order_id);

            if (customerIndex !== -1) {
                customers[customerIndex].status = 'paid';
                customers[customerIndex].paymentId = razorpay_payment_id;
                customers[customerIndex].paidAt = new Date().toISOString();
                await writeCustomers(customers);

                res.json({
                    success: true,
                    message: 'Payment verified successfully',
                    customer: customers[customerIndex]
                });
            } else {
                res.status(404).json({ error: 'Order not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
});

// Get all customers (for admin)
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await readCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

// Razorpay Webhook (for automatic payment tracking)
app.post('/api/webhook', async (req, res) => {
    try {
        const secret = 'A3QRUqNsK36DRwh40VOeEWcY';
        const signature = req.headers['x-razorpay-signature'];

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        if (signature === expectedSignature) {
            const event = req.body.event;

            if (event === 'payment.captured') {
                const payment = req.body.payload.payment.entity;
                const orderId = payment.order_id;

                // Update customer status
                const customers = await readCustomers();
                const customerIndex = customers.findIndex(c => c.orderId === orderId);

                if (customerIndex !== -1) {
                    customers[customerIndex].status = 'paid';
                    customers[customerIndex].paymentId = payment.id;
                    customers[customerIndex].paidAt = new Date().toISOString();
                    customers[customerIndex].paidAt = new Date().toISOString();
                    await writeCustomers(customers);

                    // Send Purchase Event to Meta
                    await sendMetaEvent(customers[customerIndex], orderId, payment.id);
                }
            }

            res.json({ status: 'ok' });
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook failed' });
    }
});

initDB().then(() => {
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
