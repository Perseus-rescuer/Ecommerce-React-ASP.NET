import { Menu, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

import { Button } from "@/components/Elements/Button";
import { Icon } from "@/components/Elements/Icon";
import { Image } from "@/components/Elements/Image";
import { NumericStepper } from "@/components/Elements/NumericStepper";
import { useStore } from "@/stores";

import { useCart } from "../api/getCart";

export function ShoppingCartMenu() {
  const { data } = useCart({ cartId: "5ae7cdcb-47c4-4e87-b2fb-8c51ecf9efc6" });
  const { cartStore } = useStore();

  useEffect(() => {
    if (data) cartStore.setCartData(data);
  }, [cartStore, data]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Button} size="xs" variant="basic">
        <Icon icon={MdOutlineShoppingCart} size="md" color="onyx" />
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute origin-top-right top-12 right-5 w-[30rem] bg-white shadow-md focus:outline-none"
          static
        >
          {data?.cartItems.map((item) => (
            <Menu.Item
              key={item.id}
              as="div"
              className="flex gap-x-4 w-full p-4 border-b-sonic-silver border-b border-solid border-x-0 border-t-0"
              disabled
            >
              <Image src={item.pictureUrl} size="xs" />
              <div>
                <Link
                  to={`product/${item.id}`}
                  className="text-xl relative overflow-hidden max-h-[calc(2_*_1em_*_1.3)] text-ellipsis"
                >
                  {item.productName}
                </Link>

                <h3 className="text-xl text-salmon-pink font-semibold mt-2 mb-4">
                  {item.price}
                </h3>

                <div className="flex justify-between items-center gap-x-2">
                  <NumericStepper initialValue={1} min={0} max={1000} />
                  <span className="text-lg">
                    Total: <span className="font-semibold">R$ 150,00</span>
                  </span>
                </div>
              </div>
            </Menu.Item>
          ))}
          <Menu.Item as="div" className="p-4" disabled>
            <h2 className="text-2xl text-eerie-black font-bold mb-5">
              Total: {cartStore.subTotal}
            </h2>
            <Button
              content="Go to shopping cart"
              size="lg"
              variant="dark"
              fluid
            />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}