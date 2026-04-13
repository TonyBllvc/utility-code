import { Link } from "react-router-dom";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { FaRegStar, FaStar, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useState } from "react";
import { DefaultCartIcon } from "../svg/default_product_image";
import { ToolTipText } from "../../utils/helper/textManager";

export const ProductCardViewMode = ({ product, viewMode }) => {
    const [imgError, setImgError] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(true);

    const formatPrice = (amount) => `₦${amount.toLocaleString()}`;

    return (
        <Link to={`/shop/product/${product.id}`}>
            <Card
                className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden ${viewMode === "list" ? "flex" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className={`relative overflow-hidden flex items-center justify-center bg-gray-50 ${viewMode === "list" ? "w-56 flex-shrink-0" : ""}`}
                >
                    {(!imgError && product?.image) ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            onError={() => setImgError(true)}
                            className={`object-fill group-hover:scale-105 transition-transform duration-300 ${viewMode === "list" ? "w-full h-56" : "w-full h-56"}`}
                        />
                    ) : (
                        <DefaultCartIcon />
                    )}

                    {/* Discount Badge */}
                    {product.discount && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{product.discount}%
                        </div>
                    )}

                    {/* Top Badges */}
                    {product.badge && (
                        <Badge
                            variant={
                                product.badge === "New"
                                    ? "default"
                                    : product.badge === "Hot"
                                        ? "destructive"
                                        : "secondary"
                            }
                            className="absolute top-3 left-3"
                        >
                            {product.badge}
                        </Badge>
                    )}

                    {/* Wishlist Button */}
                    <button
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLiked(!isLiked);
                        }}
                    >
                        {isLiked ? (
                            <FaHeart className="w-4 h-4 text-red-500 transition-colors" />
                        ) : (
                            <FaRegHeart className="w-4 h-4 text-gray-500 transition-colors" />
                        )}
                    </button>

                    {/* Quick Actions - Show on Hover */}
                    {/* <div
                        className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200">
                            <FaEye className="w-4 h-4" />
                            Quick View
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md bg-user-primary text-white hover:bg-green-600 transition-all duration-700 z-[999]">
                            <RiShoppingCartLine className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div> */}
                </div>

                <CardContent
                    className={`p-4 space-y-3 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}
                >
                    <div>
                        <div className="text-xs text-gray-500 mb-1">by  <ToolTipText
                            text={product.vendor}
                            xs={30}
                            sm={35}
                            md={35}
                            lg={60}
                            xl={90}
                            className="text-user-primary-blue font-medium ml-1"
                            tooltipPosition="bottom"
                        /> </div>

                        <h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-user-primary transition-colors cursor-pointer mb-2">
                            {product.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    i < Math.floor(product.rating) ? (
                                        <FaStar key={i} className="w-3 h-3 text-yellow-500" />
                                    ) : (
                                        <FaRegStar key={i} className="w-3 h-3 text-gray-400" />
                                    )
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-orange-600">
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-user-primary text-white hover:bg-green-600 transition-all duration-700 text-sm">
                            <RiShoppingCartLine className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
