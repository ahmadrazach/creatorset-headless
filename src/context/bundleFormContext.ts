import { createFormContext } from "@mantine/form";
import { ProductNode } from "../../common/types";

export interface BundleFormValues {
    products: ProductNode[];
}

export const [BundleFormProvider, useBundleFormContext, useBundleForm] =
    createFormContext<BundleFormValues>();
