import React, { useState } from "react";
import { FaEye, FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { RiShoppingCartLine } from "react-icons/ri";
import { DefaultCartIcon } from "../svg/default_product_image";
import { ToolTipText, } from "../../utils/helper/textManager";
// import { TruncatedText, limitHandlerPerScreenSize } from '../../helper/textManager';

export default function ProductCard({
    id,
    name,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    vendor,
    discount,
    isWishListed = false,
}) {
    const [isLiked, setIsLiked] = useState(isWishListed);
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);

    const formatPrice = (amount) => {
        return `₦${amount.toLocaleString()}`;
    };

    return (
        <div
            className="bg-white rounded-xl border cursor-pointer border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-square w-full max-h-[300px] sm:h-auto overflow-hidden flex items-center justify-center bg-gray-50">
                {!imgError && image ? (
                    <img
                        src={image}
                        alt={name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <DefaultCartIcon />
                )}

                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{discount}%
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full"
                    onClick={() => setIsLiked(!isLiked)}
                >
                    {isLiked ? <FaHeart className={`w-4 h-4 transition-colors text-red-500 `} /> :
                        <FaRegHeart className={`w-4 h-4 transition-colors text-gray-500`} />
                    }
                </button>

                {/* Quick Actions - Show on Hover */}
                <div
                    className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200">
                        <FaEye className="w-4 h-4" />
                        Quick View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md bg-user-primary text-white hover:bg-green-600 transition-all duration-700">
                        <RiShoppingCartLine className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
                {/* Vendor */}
                <div className="text-xs text-gray-500">
                    by
                    <ToolTipText
                        text={vendor}
                        xs={30}
                        sm={35}
                        md={35}
                        lg={60}
                        xl={90}
                        className="text-user-primary-blue font-medium ml-1"
                        tooltipPosition="bottom"
                    />
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-user-primary transition-colors cursor-pointer">
                    {name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <div className="flex items-center gap-2">
                                {
                                    i < Math.floor(rating) ? (
                                        <FaStar
                                            key={i}
                                            className={`w-3 h-3 ${"text-yellow-500"
                                                }`}
                                        />
                                    ) : (
                                        <FaRegStar
                                            key={i}
                                            className={`w-3 h-3 text-gray-500`}
                                        />
                                    )
                                }
                            </div>
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">({reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-orange-600">
                        {formatPrice(price)}
                    </span>
                    {originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatPrice(originalPrice)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-user-primary text-white hover:bg-green-600 transition-all duration-700 text-sm">
                    <RiShoppingCartLine className="w-4 h-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
