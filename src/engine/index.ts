import React from 'react';
import { ContainerImpl, FlexLayoutImpl, ExpandedImpl, SizedBoxImpl, CenterImpl, PaddingImpl, AlignImpl, StackImpl, SpacerImpl, TextFieldImpl, DropdownImpl, ButtonImpl, CheckboxImpl, TypographyImpl, IconImpl, CardImpl, DividerImpl, AlertImpl, TabsImpl, AccordionImpl, ModalImpl, CircularProgressImpl, LinearProgressImpl, SkeletonImpl, AvatarImpl, ChipImpl, BadgeImpl, PaperImpl, DatePickerImpl, SliderImpl, RadioImpl, SwitchImpl, FabImpl, TooltipImpl, AutocompleteImpl, PaginationImpl, BreadcrumbsImpl, SpeedDialImpl, DrawerImpl, AppBarImpl, DataGridImpl } from './components';
import type { ContainerProps, MultiChildProps, ExpandedProps, SizedBoxProps, PaddingProps, AlignProps, StackProps, SpacerProps, TextFieldPropsExt, DropdownProps, ButtonPropsExt, CheckboxPropsExt, TypographyPropsExt, IconPropsExt, CardPropsExt, DividerPropsExt, AlertPropsExt, TabsPropsExt, AccordionPropsExt, ModalPropsExt, CircularProgressPropsExt, LinearProgressPropsExt, SkeletonPropsExt, AvatarPropsExt, ChipPropsExt, BadgePropsExt, PaperPropsExt, DatePickerPropsExt, SliderPropsExt, RadioPropsExt, SwitchPropsExt, FabPropsExt, TooltipPropsExt, AutocompletePropsExt, PaginationPropsExt, BreadcrumbsPropsExt, SpeedDialPropsExt, DrawerPropsExt, AppBarPropsExt, DataGridPropsExt } from './types';

// ============================================================================
// PUBLIC WRAPPERS (Functional API)
// ============================================================================

export const Container = (props: ContainerProps) => React.createElement(ContainerImpl, props);
export const Expanded = (props: ExpandedProps) => React.createElement(ExpandedImpl, props);
export const Row = (props: MultiChildProps) => React.createElement(FlexLayoutImpl, { ...props, type: 'row' });
export const Column = (props: MultiChildProps) => React.createElement(FlexLayoutImpl, { ...props, type: 'column' });
export const SizedBox = (props: SizedBoxProps) => React.createElement(SizedBoxImpl, props);
export const Center = (props: { child?: React.ReactNode | any } & ContainerProps) => React.createElement(CenterImpl, props);
export const Padding = (props: PaddingProps) => React.createElement(PaddingImpl, props);
export const Align = (props: AlignProps) => React.createElement(AlignImpl, props);
export const Stack = (props: StackProps) => React.createElement(StackImpl, props);
export const Spacer = (props: SpacerProps) => React.createElement(SpacerImpl, props);
export const TextField = (props: TextFieldPropsExt) => React.createElement(TextFieldImpl, props);
export const Dropdown = (props: DropdownProps) => React.createElement(DropdownImpl, props);
export const Button = (props: ButtonPropsExt) => React.createElement(ButtonImpl, props);
export const Checkbox = (props: CheckboxPropsExt) => React.createElement(CheckboxImpl, props);
export const Typography = (props: TypographyPropsExt) => React.createElement(TypographyImpl, props);
export const Icon = (props: IconPropsExt) => React.createElement(IconImpl, props);
export const Card = (props: CardPropsExt) => React.createElement(CardImpl, props);
export const Divider = (props: DividerPropsExt) => React.createElement(DividerImpl, props);
export const Alert = (props: AlertPropsExt) => React.createElement(AlertImpl, props);
export const Tabs = (props: TabsPropsExt) => React.createElement(TabsImpl, props);
export const Accordion = (props: AccordionPropsExt) => React.createElement(AccordionImpl, props);
export const Modal = (props: ModalPropsExt) => React.createElement(ModalImpl, props);
export const CircularProgress = (props: CircularProgressPropsExt) => React.createElement(CircularProgressImpl, props);
export const LinearProgress = (props: LinearProgressPropsExt) => React.createElement(LinearProgressImpl, props);
export const Skeleton = (props: SkeletonPropsExt) => React.createElement(SkeletonImpl, props);
export const Avatar = (props: AvatarPropsExt) => React.createElement(AvatarImpl, props);
export const Chip = (props: ChipPropsExt) => React.createElement(ChipImpl, props);
export const Badge = (props: BadgePropsExt) => React.createElement(BadgeImpl, props);
export const Paper = (props: PaperPropsExt) => React.createElement(PaperImpl, props);
export const DatePicker = (props: DatePickerPropsExt) => React.createElement(DatePickerImpl, props);
export const Slider = (props: SliderPropsExt) => React.createElement(SliderImpl, props);
export const Radio = (props: RadioPropsExt) => React.createElement(RadioImpl, props);
export const Switch = (props: SwitchPropsExt) => React.createElement(SwitchImpl, props);
export const Fab = (props: FabPropsExt) => React.createElement(FabImpl, props);
export const Tooltip = (props: TooltipPropsExt) => React.createElement(TooltipImpl, props);
export const Autocomplete = (props: AutocompletePropsExt) => React.createElement(AutocompleteImpl, props);
export const Pagination = (props: PaginationPropsExt) => React.createElement(PaginationImpl, props);
export const Breadcrumbs = (props: BreadcrumbsPropsExt) => React.createElement(BreadcrumbsImpl, props);
export const SpeedDial = (props: SpeedDialPropsExt) => React.createElement(SpeedDialImpl, props);
export const Drawer = (props: DrawerPropsExt) => React.createElement(DrawerImpl, props);
export const AppBar = (props: AppBarPropsExt) => React.createElement(AppBarImpl, props);
export const DataGrid = (props: DataGridPropsExt) => React.createElement(DataGridImpl, props);