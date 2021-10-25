import { orderService } from '../services/order.service'
import { userService } from '../services/user.service'


export function loadOrders() {
  return async dispatch => {
    try {
      const orders = await orderService.query()
      const loggedinUser = await userService.getLoginUser()
      const userOrders = orders.filter(order => order.sellerId === loggedinUser._id)
      dispatch({ type: 'SET_ORDERS', userOrders })
      // socketService.on('new order', (order) => {
      //   dispatch({ type: 'ADD_ORDER', order: order })
      // })

    } catch (err) {
      console.log('OrderActions: err in loadOrders', err)
    }
  }
}

export function addOrder(order) {
  return async dispatch => {
    try {
      const addedOrder = await orderService.add(order)
      dispatch({ type: 'ADD_ORDER', addedOrder })
    } catch (err) {
      console.log('OrderActions: err in addOrder', err)
    }
  }
}

export function removeOrder(orderId) {
  return async dispatch => {
    try {
      await orderService.remove(orderId)
      dispatch({ type: 'REMOVE_ORDER', orderId })
    } catch (err) {
      console.log('OrderActions: err in removeOrder', err)
    }
  }
}

export function acceptOrder(acceptedOrder) {
  return async dispatch => {
    try {
      acceptedOrder.status = 'active'
      const updatedOrder = await orderService.update(acceptedOrder)
      console.log('updatedOrder: ',updatedOrder);
      // dispatch({ type: 'UPDATE_ORDER', updatedOrder })
    } catch (err) {
      console.log('OrderActions: err in acceptOrder', err)
    }
  }
}

