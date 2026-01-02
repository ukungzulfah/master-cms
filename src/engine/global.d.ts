import type {
  ContainerProps, MultiChildProps, ExpandedProps, SizedBoxProps, PaddingProps, AlignProps, StackProps, SpacerProps, TextFieldPropsExt, DropdownProps, ButtonPropsExt, CheckboxPropsExt, TypographyPropsExt, IconPropsExt, CardPropsExt, DividerPropsExt, AlertPropsExt, TabsPropsExt, AccordionPropsExt, ModalPropsExt, CircularProgressPropsExt, LinearProgressPropsExt, SkeletonPropsExt, AvatarPropsExt, ChipPropsExt, BadgePropsExt, PaperPropsExt, DatePickerPropsExt, SliderPropsExt, RadioPropsExt, SwitchPropsExt, FabPropsExt, TooltipPropsExt, AutocompletePropsExt, PaginationPropsExt, BreadcrumbsPropsExt, SpeedDialPropsExt, DrawerPropsExt, AppBarPropsExt, DataGridPropsExt
} from './types';
import React from 'react';

declare global {
  interface Window {
    Container: (props: ContainerProps) => React.ReactElement;
    Expanded: (props: ExpandedProps) => React.ReactElement;
    Row: (props: MultiChildProps) => React.ReactElement;
    Column: (props: MultiChildProps) => React.ReactElement;
    SizedBox: (props: SizedBoxProps) => React.ReactElement;
    Center: (props: { child?: React.ReactNode | any } & ContainerProps) => React.ReactElement;
    Padding: (props: PaddingProps) => React.ReactElement;
    Align: (props: AlignProps) => React.ReactElement;
    Stack: (props: StackProps) => React.ReactElement;
    Spacer: (props: SpacerProps) => React.ReactElement;
    TextField: (props: TextFieldPropsExt) => React.ReactElement;
    Dropdown: (props: DropdownProps) => React.ReactElement;
    Button: (props: ButtonPropsExt) => React.ReactElement;
    Checkbox: (props: CheckboxPropsExt) => React.ReactElement;
    Typography: (props: TypographyPropsExt) => React.ReactElement;
    Icon: (props: IconPropsExt) => React.ReactElement;
    Card: (props: CardPropsExt) => React.ReactElement;
    Divider: (props: DividerPropsExt) => React.ReactElement;
    Alert: (props: AlertPropsExt) => React.ReactElement;
    Tabs: (props: TabsPropsExt) => React.ReactElement;
    Accordion: (props: AccordionPropsExt) => React.ReactElement;
    Modal: (props: ModalPropsExt) => React.ReactElement;
    CircularProgress: (props: CircularProgressPropsExt) => React.ReactElement;
    LinearProgress: (props: LinearProgressPropsExt) => React.ReactElement;
    Skeleton: (props: SkeletonPropsExt) => React.ReactElement;
    Avatar: (props: AvatarPropsExt) => React.ReactElement;
    Chip: (props: ChipPropsExt) => React.ReactElement;
    Badge: (props: BadgePropsExt) => React.ReactElement;
    Paper: (props: PaperPropsExt) => React.ReactElement;
    DatePicker: (props: DatePickerPropsExt) => React.ReactElement;
    Slider: (props: SliderPropsExt) => React.ReactElement;
    Radio: (props: RadioPropsExt) => React.ReactElement;
    Switch: (props: SwitchPropsExt) => React.ReactElement;
    Fab: (props: FabPropsExt) => React.ReactElement;
    Tooltip: (props: TooltipPropsExt) => React.ReactElement;
    Autocomplete: (props: AutocompletePropsExt) => React.ReactElement;
    Pagination: (props: PaginationPropsExt) => React.ReactElement;
    Breadcrumbs: (props: BreadcrumbsPropsExt) => React.ReactElement;
    SpeedDial: (props: SpeedDialPropsExt) => React.ReactElement;
    Drawer: (props: DrawerPropsExt) => React.ReactElement;
    AppBar: (props: AppBarPropsExt) => React.ReactElement;
    DataGrid: (props: DataGridPropsExt) => React.ReactElement;
  }
}

export {};