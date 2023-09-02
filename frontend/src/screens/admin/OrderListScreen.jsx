import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { FaTimes, FaCheck } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetOrdersQuery, useGetOrderInTransitMutation, useFulfilledOrderMutation } from "../../slices/ordersApiSlice"

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const { data: orderInTransit } = useGetOrderInTransitMutation();
  const { data: isFulfilled } = useFulfilledOrderMutation();

  return <>
      <h1>Orders</h1>
      {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>In Transit</th>
              <th>Fulfilled</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{ order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
                </td>
                <td>
                  {order.isInTransit ? (
                    order.transitAt ? order.transitAt.substring(0, 10) : <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                  </td>
                <td>
                  {order.isFulfilled ? (
                    order.fulfilledAt ? order.fulfilledAt.substring(0, 10) : <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
}

export default OrderListScreen
