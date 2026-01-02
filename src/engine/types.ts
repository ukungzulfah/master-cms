import React, { createContext } from 'react';
import type { BoxProps, TextFieldProps, SelectProps, ButtonProps, CheckboxProps, FormControlLabelProps, TypographyProps, CardProps, DividerProps, AlertProps, TabsProps, AccordionProps, ModalProps, CircularProgressProps, LinearProgressProps, SkeletonProps, AvatarProps, ChipProps, BadgeProps, PaperProps, SliderProps, RadioProps, SwitchProps, FabProps, TooltipProps, AutocompleteProps, PaginationProps, BreadcrumbsProps, SpeedDialProps, DrawerProps, AppBarProps, TableProps, TableHeadProps, TableBodyProps, TableRowProps, TableCellProps } from '@mui/material';

// ============================================================================
// TYPES & CONTEXT
// ============================================================================

export const LayoutContext = createContext<'none' | 'row' | 'column'>('none');

export type ContainerProps = BoxProps & { child?: React.ReactNode | any };

export type MultiChildProps = BoxProps & { children?: React.ReactNode };

export type ExpandedProps = BoxProps & { child?: React.ReactNode | any, flex?: number };

export type SizedBoxProps = { width?: number | string, height?: number | string };

export type PaddingProps = BoxProps & { child?: React.ReactNode | any, padding?: any };

export type AlignProps = BoxProps & { child?: React.ReactNode | any, alignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' };

export type StackProps = BoxProps & { children?: React.ReactNode };

export type SpacerProps = BoxProps & { flex?: number };

export type TextFieldPropsExt = TextFieldProps & { label?: string };

export type DropdownProps = SelectProps & { options: { value: any; label: string }[]; label?: string };

export type ButtonPropsExt = ButtonProps & { child?: React.ReactNode | any };

export type CheckboxPropsExt = FormControlLabelProps;

export type TypographyPropsExt = TypographyProps & { child?: React.ReactNode | any };

export type IconPropsExt = { name: string; fontSize?: 'small' | 'medium' | 'large' | 'inherit'; color?: string };

export type CardPropsExt = CardProps & { child?: React.ReactNode | any };

export type DividerPropsExt = DividerProps;

export type AlertPropsExt = AlertProps & { child?: React.ReactNode | any };

export type TabsPropsExt = TabsProps & { tabs: { label: React.ReactNode | string; content: React.ReactNode }[] };

export type AccordionPropsExt = AccordionProps & { title: React.ReactNode | string; content: React.ReactNode };

export type ModalPropsExt = ModalProps & { child?: React.ReactNode | any; open: boolean; onClose: () => void };

export type CircularProgressPropsExt = CircularProgressProps;

export type LinearProgressPropsExt = LinearProgressProps;

export type SkeletonPropsExt = SkeletonProps;

export type AvatarPropsExt = AvatarProps & { src?: string; alt?: string; children?: React.ReactNode };

export type ChipPropsExt = ChipProps & { label: string };

export type BadgePropsExt = BadgeProps & { child?: React.ReactNode | any; badgeContent?: React.ReactNode };

export type PaperPropsExt = PaperProps & { child?: React.ReactNode | any };

export type DatePickerPropsExt = TextFieldProps & { label?: string };

export type SliderPropsExt = SliderProps;

export type RadioPropsExt = FormControlLabelProps;

export type SwitchPropsExt = FormControlLabelProps;

export type FabPropsExt = FabProps & { child?: React.ReactNode | any };

export type TooltipPropsExt = TooltipProps & { child?: React.ReactNode | any; title: string };

export type AutocompletePropsExt = AutocompleteProps<any, any, any, any> & { options: any[]; label?: string };

export type PaginationPropsExt = PaginationProps;

export type BreadcrumbsPropsExt = BreadcrumbsProps & { items: { label: string; href?: string }[] };

export type SpeedDialPropsExt = SpeedDialProps & { actions: { icon: React.ReactNode; name: string; onClick?: () => void }[] };

export type DrawerPropsExt = DrawerProps & { child?: React.ReactNode | any; open: boolean; onClose: () => void };

export type AppBarPropsExt = AppBarProps & { child?: React.ReactNode | any };

export type DataGridPropsExt = {
  columns: { field: string; headerName: string; width?: number; sortable?: boolean; renderCell?: (params: any) => React.ReactNode }[];
  rows: any[];
  pageSize?: number;
  rowsPerPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onSortModelChange?: (model: any) => void;
  loading?: boolean;
  checkboxSelection?: boolean;
  onSelectionModelChange?: (selection: any[]) => void;
  height?: string | number;
  stickyHeader?: boolean;
};