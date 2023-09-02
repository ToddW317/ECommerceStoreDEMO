import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateToInTransit,
    updateToIsFulfilled,
    getOrders
    } from '../controllers/orderController.js';
    import {protect, admin} from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/InTransit').put(protect, admin, updateToInTransit);
router.route('/:id/Fulfilled').put(protect, admin, updateToIsFulfilled);

export default router;