import Product from "../../../domain/product/entity/product";
import { OutputListProductDto } from "./list.product.dto";

export default class OutputMapper {
  public static toOutput(product: Product[]): OutputListProductDto {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
