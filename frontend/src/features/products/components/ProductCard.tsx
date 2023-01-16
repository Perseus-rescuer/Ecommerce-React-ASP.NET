import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagAddOutline, IoEyeOutline } from "react-icons/io5";

import { Button } from "@/components/Elements/Button";
import { Icon } from "@/components/Elements/Icon";
import { Image } from "@/components/Elements/Image";

import type { ProductBriefDto } from "../types";

type ProductCardProps = {
  product: ProductBriefDto;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative bg-white overflow-hidden rounded-md shadow-lg">
      <div className="relative">
        <Image src={product.pictureUrl} fluid />
        <div className="absolute -right-20 opacity-0 top-0 transform translate-y-16 transition-all ease-in-out group-hover:right-2 group-hover:opacity-100">
          <Button size="xs" variant="dark" className="mb-1">
            <Icon icon={IoMdHeartEmpty} />
          </Button>
          <Button size="xs" variant="dark" className="mb-1">
            <Icon icon={IoEyeOutline} />
          </Button>
          <Button size="xs" variant="dark">
            <Icon icon={IoBagAddOutline} />
          </Button>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl text-sonic-silver overflow-hidden relative max-h-[calc(2_*_1em_*_1.3)] mb-3 hover:text-eerie-black">
          {product.name}
        </h2>
        <div>
          <span className="mr-1 font-bold">
            {product.defaultPrice?.currency?.symbol}
          </span>
          <span className="text-eerie-black text-2xl font-bold">
            {product.defaultPrice?.amount}
          </span>
        </div>
      </div>
    </article>
  );
}
