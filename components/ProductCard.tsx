'use client';

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(product.id);
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm hover:bg-white transition-colors"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite ? "fill-rose-500 stroke-rose-500" : "stroke-slate-400"
          }`}
        />
      </button>

      <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-slate-50 p-8">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 rounded-md">
              {product.category}
            </span>
          </div>
          <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
          <div className="mt-auto flex items-center justify-between">
            <p className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-slate-600">★ {product.rating.rate}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
