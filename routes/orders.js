const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { AppError } = require('../middleware/errorHandler');
const auth = require('../middleware/auth');

// Create new order
router.post('/', auth, async (req, res, next) => {
    try {
        const { items, shippingAddress } = req.body;
        
        // Calculate total amount
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
});

// Get all orders for the authenticated user
router.get('/', auth, async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        next(error);
    }
});

// Get specific order by ID
router.get('/:id', auth, async (req, res, next) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        res.json(order);
    } catch (error) {
        next(error);
    }
});

// Update order
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { items, shippingAddress, status } = req.body;
        
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        // Update fields if provided
        if (items) {
            order.items = items;
            order.totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }
        if (shippingAddress) order.shippingAddress = shippingAddress;
        if (status) order.status = status;

        await order.save();
        res.json(order);
    } catch (error) {
        next(error);
    }
});

// Delete order
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const order = await Order.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 