import { SelectItem } from "./select";
import * as SelectPrimitive from "@radix-ui/react-select"

// https://github.com/radix-ui/primitives/issues/2706
export default function SelectClear({
    className,
    children,
    value = null as unknown as string,
    ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, "value"> & {
    value?: string;
}) {
    return (
        <SelectItem key={"reset"} className="opacity-50" value={value} {...props}>
            {children ?? "Reset"}
        </SelectItem>
    );
}