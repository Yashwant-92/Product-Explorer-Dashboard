'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { getProduct } from "@/lib/api";
import Image from "next/image";
import { ArrowLeft, Heart, Star, ShoppingCart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id as string);
        setProduct(data);
        
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          setIsFavorite(favorites.includes(data.id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleFavorite = () => {
    if (!product) return;
    const savedFavorites = localStorage.getItem("favorites");
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (favorites.includes(product.id)) {
      favorites = favorites.filter((favId: number) => favId !== product.id);
      setIsFavorite(false);
    } else {
      favorites.push(product.id);
      setIsFavorite(true);
    }
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
        <button 
          onClick={() => router.back()}
          className="mt-4 text-indigo-600 font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square bg-slate-50 rounded-3xl p-12 flex items-center justify-center overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-12"
              priority
            />
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 rounded-full">
                {product.category}
              </span>
              <button
                onClick={toggleFavorite}
                className={`p-2.5 rounded-full border transition-all ${
                  isFavorite 
                    ? "bg-rose-50 border-rose-200 text-rose-600" 
                    : "bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200"
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="font-bold text-amber-700">{product.rating.rate}</span>
                <span className="text-amber-600/60 text-sm">({product.rating.count} reviews)</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <span className="text-slate-500 text-sm font-medium">In Stock</span>
            </div>

            <div className="mb-8">
              <p className="text-4xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="prose prose-slate mb-10">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98]">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">30-Day Return</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Secure Payment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
