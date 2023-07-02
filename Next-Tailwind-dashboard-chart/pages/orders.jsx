import React from "react";
import { data } from "../data/Data";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

const orders = () => {
  return (
    <div>
      <div className="flex justify-between p-4">
        <h2>Orders</h2>
        <h2>Welcome Back, Clint</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 rounded-lg border bg-white overflow-y-auto">
          <div className="my-3 p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-between cursor-pointer">
            <span>Order</span>
            <span className="text-right sm:text-left">Status</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      $ {order.total.toLocaleString()}
                    </p>
                    <p className="text-gray-800 text-sm">{order.name.first}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-right sm:text-left">
                  <span
                    className={
                      order.status === "Processing"
                        ? "bg-green-300 p-2 rounded-lg"
                        : order.status === "Completed"
                        ? "bg-blue-300 p-2 rounded-lg"
                        : "bg-yellow-300 p-2 rounded-lg"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p className="hidden md:flex">{order.date}</p>
                <div className="flex justify-between items-center">
                  <p>{order.method}</p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default orders;
