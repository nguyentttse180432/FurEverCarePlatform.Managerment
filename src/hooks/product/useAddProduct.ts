import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addProduct } from "../../services/product.service";
import { Product } from "../../types/Product";
export const useAddProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
      mutationFn: (product: Product) => addProduct(product),
      onSuccess: (product: Product) => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        navigate("/product", { replace: true });
        console.log("User added successfully", product);
      },
    });
  };