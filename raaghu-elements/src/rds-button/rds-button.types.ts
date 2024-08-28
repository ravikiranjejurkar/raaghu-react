import { ReactNode } from "react";
import { colors, placements, size } from "../../libs";

export interface RdsButtonProps {
    submit?: boolean;
    count?: number;
    isFabIcon?: boolean;
    isRounded?: boolean;
    id?: string;
    buttonId?: string;
    isLoading?: boolean;
    showLoadingSpinner?: boolean;
    children?: ReactNode;
    isDisabled?: boolean;
    colorVariant?: colors;
    label?: string;
    block?: boolean;
    size?: string;
    roundedButton?: boolean;
    roundedCorner?: boolean;
    icon?: string;
    isOutline?: boolean;
    tooltip?: boolean;
    tooltipPlacement?: placements;
    tooltipTitle?: any;
    type?: "button" | "submit";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    formName?: string;
    iconHeight?: string;
    iconWidth?: string;
    iconFill?: boolean;
    iconStroke?: boolean;
    class?: string;
    arialabel?: string;
    databsdismiss?: string;
    databstarget?: string;
    databstoggle?: string;
    ariacontrols?: string;
    iconColorVariant?: string;
    style?: any;
    dataTestId?: string;
    iconSize?:size;
    isRoundedButton?: boolean;
}
